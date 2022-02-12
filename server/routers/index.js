const express = require('express')
const router = express.Router()
const fsPromises = require('fs').promises
const async = require('async')
const PageModel = require('../models/page')

// 文章列表模板
var thetemp = function (fileName, classify, birthTime, count) {
  this.title = fileName
  this.classify = classify
  this.date = birthTime
  this.count = count
}
// 录入信息函数
var informationEntry = async function (classify, title) {
  var time = await fsPromises.stat(`./articles/${classify}/${title}.md`)
  var date = time.birthtime.toLocaleString()
  const thepage = new PageModel({
    title,
    classify,
    date,
    count: 1,
  })
  thepage.save(() => {
    console.log('文件已写入')
  })
}
// 对比两个数组 并返回第一个数组多出来的值 并且去重
function diff(arr1, arr2) {
  var newArr = new Set()
  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) {
      newArr.add(arr1[i])
    }
  }
  newArr = Array.from(newArr)
  return newArr
}


// 接口--------------------------------------------------------------------------------

// 接收文章(暂时还未对数据进行限制！！！！！！！！！！！)
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
      informationEntry(classify, title)
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
  var classify = req.body.classifyId
  var thefile = [] // 文件名列表
  var count = [] // 点击量
  var timeList = []
  ;(async () => {
    // 获取文章列表
    thefile = await fsPromises.readdir(`./articles/${classify}`)
    var promisesOfFs = []
    for (var i = 0; i < thefile.length; i++) {
      // 去除thefile里的".md""
      thefile[i] = thefile[i].slice(0, thefile[i].length - 3)
      // 获取文件信息并塞入数组
      promisesOfFs.push(
        fsPromises.stat(`./articles/${classify}/${thefile[i]}.md`)
      )
    }
    var times = await Promise.all(promisesOfFs) // 并行异步操作 大大节省时间
    for (var i = 0; i < times.length; i++) {
      // 获取信息中的创建时间并塞入数组
      timeList.push(times[i].birthtime.toLocaleString())
    }
    // 从mongo获取点击量count
    PageModel.find({ classify: classify })
      .then((resault) => {
        if (resault.length == 0) {
          // count获取失败
          for (var i = 0; i < thefile.length; i++) {
            count.push(1)
            informationEntry(classify, thefile[i])
          }
        } else {
          for (var i = 0; i < resault.length; i++) {
            var j = resault[i].count
            count.push(j)
          }
        }
        // 数据整合
        var resault = []
        for (var i = 0; i < thefile.length; i++) {
          resault.push(new thetemp(thefile[i], classify, timeList[i], count[i]))
        }
        res.send(resault)
      })
      .catch((err) => {
        console.log(err)
      })
  })()
})

// 通过热门获取文章
router.get('/getHot', function (req, res) {
  ;(async () => {
    var resaultClassify = []
    var allRemovePromises = []
    var deledClassify
    // 从mongoose获取列表
    var resault = await PageModel.find({})
    // mongo的列表取出classify到resaultClassify
    for (var i = 0; i < resault.length; i++) {
      resaultClassify.push(resault[i].classify)
    }
    // 从文件夹获取分类列表
    var classifyList = await fsPromises.readdir(`./articles`)
    // 将文件夹中不存在classify保存到deledClassify
    deledClassify = diff(resaultClassify, classifyList)
    // deledClassify里啥有东西 代表存在数据异常 否则需要进行数据同步
    if (deledClassify.length != 0) {
      // 从mongoose中移除不存在的相关classify文章信息
      for (var i = 0; i < deledClassify.length; i++) {
        var removePromises = PageModel.remove({ classify: deledClassify[i] })
        allRemovePromises.push(removePromises)
      }
      await Promise.all(allRemovePromises)
    }
    // 获取mongoose中存在的点击量排行前十的文章
    var finallyResault = await PageModel.find({}).sort({ count: -1 }).limit(10)
    // 发送数据
    res.send(finallyResault)
  })()
})

// 获取文章
router.post('/getPage', function (req, res) {
  var { classify, title } = req.body
  var pagePath = `./articles/${classify}/${title}.md`
  ;(async () => {
    var pageContent = await fsPromises.readFile(pagePath, 'utf-8')
    res.send(pageContent)
    var findresault = await PageModel.find({ title: title, classify: classify })
    if (findresault.length == 0) {
      // 文章在mongoose中查找不到，补录该文章基本信息
      informationEntry(classify, title)
    } else {
      var numb = ++findresault[0].count
      await PageModel.updateOne(
        { title: title, classify: classify },
        { count: numb }
      ).catch((err) => {
        console.log(err)
      })
    }
  })()
})

module.exports = router
