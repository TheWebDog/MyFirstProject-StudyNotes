const express = require('express')
const router = express.Router()
const fsPromises = require('fs').promises

// 接收文章
router.post('/submitPage', function (req, res) {
  // 获取数据
  var { tittle, content, md_content, classify } = req.body
  // 保存文章成md文件
  // 读取分类目录
  fsPromises
    .readdir('./articles')
    .then((files) => {
      if (!files.includes(classify)) {
        // 创建分类文件夹
        return fsPromises.mkdir(`./articles/${classify}`)
      } else {
        // 不创建分类文件夹 进行下一步
        return
      }
    })
    .then(() => {
      // 读取文章目录
      return fsPromises.readdir(`./articles/${classify}`)
    })
    .then((files2) => {
      // 判断是否存在重名文章
      if (!files2.includes(`${tittle}.md`)) {
        return fsPromises.readFile('./public/template.md', 'utf-8')
      } else {
        res.send('存在重名文章')
        // return (new Promise((resolve, reject)=>{reject('存在重名文章')}));
        return Promise.reject('存在重名文章')
      }
    })
    .then((data) => {
      // 开始保存文章
      var FinalContent = data
        .replace('$tittle', tittle)
        .replace('$classify', classify)
        .replace('$content', content)
      return fsPromises.writeFile(
        `./articles/${classify}/${tittle}.md`,
        FinalContent
      )
    })
    .then(() => {
      res.send('文件写入成功')
      return
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/getClassify', function (req, res) {
  fsPromises
    .readdir('./articles')
    .then((files) => {
      res.send(files)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
