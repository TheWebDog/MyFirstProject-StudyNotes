const express = require('express')
const router = express.Router()
const fsPromises = require('fs').promises
const async = require('async')
const PageModel = require('../models/page')

// 模板
var thetemp = function (fileName, classify, birthTime, count) {
  this.title = fileName
  this.classify = classify
  this.date = birthTime
  this.count = count
}

// 接收文章(暂时还未对数据进行限制！！！！！！！！！！！！！！！！！！！！！！！！)
router.post('/submitPage', function (req, res) {
  // 获取数据
  var { title, content, md_content, classify } = req.body
  // 保存文章成md文件
  ;(async () => {
    var files = await fsPromises.readdir('./articles')
    if (!files.includes(classify)) {
      // 创建分类文件夹
      await fsPromises.mkdir(`./articles/${classify}`)
    }
    var files2 = await fsPromises.readdir(`./articles/${classify}`)

    if (!files2.includes(`${title}.md`)) {
      var data = await fsPromises.readFile('./public/template.md', 'utf-8')
      var FinalContent = data
        .replace('$title', title)
        .replace('$classify', classify)
        .replace('$content', md_content)
      await fsPromises.writeFile(
        `./articles/${classify}/${title}.md`,
        FinalContent
      )
      var time = await fsPromises.stat(`./articles/${classify}/${title}.md`)
      var date = time.birthtime.toLocaleString()
      const thepage = new PageModel({
        title,
        classify,
        date,
        count: 1,
      })
      thepage.save(() => {
        res.send('文件写入成功')
      })
    } else {
      res.send('存在重名文章')
      // return Promise.reject('存在重名文章')
      return
    }
  })()
})

// 获取分类列表
router.get('/getClassify', function (req, res) {
  ;(async () => {
    var files = await fsPromises.readdir('./articles')
    res.send(files)
  })()
})

// 通过分类获取文章
router.post('/getList', function (req, res) {
  var { classifyId } = req.body;
  var thefile = [];// 文件名列表
  var count = []; // 点击量
  var timeList = [];
  (async () => {
    // 获取文章列表
    thefile = await fsPromises.readdir(`./articles/${classifyId}`)
    var promisesOfFs = []
    for (var i = 0; i < thefile.length; i++) {
      // 获取文件信息并塞入数组
      promisesOfFs.push(
        fsPromises.stat(`./articles/${classifyId}/${thefile[i]}`)
      )
    }
    var times = await Promise.all(promisesOfFs) // 并行异步操作 大大节省时间
    for (var i = 0; i < times.length; i++) {
      // 获取信息中的创建时间并塞入数组
      timeList.push(times[i].birthtime.toLocaleString())
    }
    // 从mongo获取点击量count
    PageModel.find({ classify: `${classifyId}` })
      .then((resault) => {
        if (resault.length == 0) {
          console.log(thefile.length)
          for (var i = 0; i < thefile.length; i++) {
            count.push(1)
          }
        } else {
          for (var i = 0; i < resault.length; i++) {
            // console.log(resault[i].count)
            var j = resault[i].count
            count.push(j)
          }
        }
        // 数据整合
        var resault = []
        for (var i = 0; i < thefile.length; i++) {
          resault.push(
            new thetemp(thefile[i], classifyId, timeList[i], count[i])
          )
        }
        res.send(resault)
      })
      .catch((err) => {
        console.log(err)
      })
  })()
})

// 获取热门文章
router.get('/getHot', function (req, res) {
  (async () => {
    var resault = await PageModel.find({}).sort({ 'count': -1 }).limit(5)
    res.send(resault)
  })()
})

module.exports = router
