const express = require('express')
const router = express.Router()
const fs = require('fs')

// 接收文章
router.post('/submitPage', function (req, res) {
  // 1.req.body 取出 tittle content classify
  // 2.此classify存在 则放入 否则创建新分类
  // 3.以html保存文章，并且储存md文件备份

  // 获取数据
  var { tittle, content, md_content, classify } = req.body

  // 保存文章

  // // 1.保存成html文件
  // fs.readdir('./source', function (err_readdir, files) {
  //   if (err_readdir) {
  //     // 读取目录
  //     console.log('source目录读取失败')
  //   } else {
  //     // 判断是否需要创建新分类
  //     if (!files.includes(classify)) {
  //       fs.mkdir(`./source/${classify}`, function (err_mkdir) {
  //         if (err_mkdir) {
  //           console.log(`${classify}文件夹创建失败`)
  //         }
  //       })
  //     }
  //     // 文件写入--保存成html文件
  //     // 读取模板
  //     fs.readFile(
  //       './public/template.html',
  //       'utf-8',
  //       function (err_readFile, data) {
  //         if (err_readFile) {
  //           console.log('模板读取失败')
  //         } else {
  //           // 拼接模板
  //           var toTemplate = data
  //             .replace('$tittle', tittle)
  //             .replace('$tittle', tittle)
  //             .replace('$classify', classify)
  //             .replace('$content', content)
  //           // .replace(/$tittle/g, tittle)
  //           // .replace(/$classify/g, classify)
  //           // .replace(/$content/g, content)
  //           // 写入
  //           fs.writeFile(
  //             `./source/${classify}/${tittle}.html`,
  //             toTemplate,
  //             function (err_writeFile) {
  //               if (err_writeFile) {
  //                 console.log('写入失败')
  //               } else {
  //                 console.log('文件写入成功')
  //               }
  //             }
  //           )
  //         }
  //       }
  //     )
  //   }
  // })

  // 2.保存成md文件
  // 读取目录
  fs.readdir('./articles', function (err, files_readdir) {
    if (err) {
      // 读取目录失败
      console.log('articles目录读取失败')
      res.send('articles目录读取失败')
    } else {
      // 读取目录成功
      // 判断是否存在该分类
      if (files_readdir.includes(classify)) {
        // 存在该分类
      } else {
        // 不存在该分类
        // 创建该分类文件夹
        fs.mkdir(`./articles/${classify}`, function (err_mkdir) {
          if (err_mkdir) {
            // 文件夹创建失败
            console.log(`${classify}文件夹创建失败`)
          } else {
            // 文件夹创建成功
          }
        })
      }
      // 读取文章目录
      fs.readdir(
        `./articles/${classify}`,
        function (err_readdir, files_readdir2) {
          if (err_readdir) {
            // 读取文章目录失败
            console.log('读取文章目录失败')
            res.send('读取文章目录失败')
          } else {
            // 读取文章目录成功
            // 判断是否存在重名文章
            if (files_readdir2.includes(`${tittle}.md`)) {
              // 存在重名文章
              res.send('存在重名文章')
            } else {
              // 不存在重名文章
              console.log('不存在重名文章')
              // 开始保存文章
              // 读取模板
              fs.readFile(
                './public/template.md',
                'utf-8',
                function (err_readFile, data) {
                  if (err_readFile) {
                    // 模板读取失败
                    console.log('模板读取失败')
                    res.send('模板读取失败')
                  } else {
                    // 模板读取成功
                    // 拼接模板
                    var FinalContent = data
                      .replace('$tittle', tittle)
                      .replace('$classify', classify)
                      .replace('$content', content)
                    // 写入
                    fs.writeFile(
                      `./articles/${classify}/${tittle}.md`,
                      FinalContent,
                      function (err_writeFile) {
                        if (err_writeFile) {
                          console.log('文件写入失败')
                          res.send('文件写入失败')
                        } else {
                          res.send('文件写入成功')
                        }
                      }
                    )
                  }
                }
              )
            }
          }
        }
      )
    }
  })
})

module.exports = router
