const express = require('express');
const router = express.Router()

// 接收文章
router.post('/submitPage', function (req,res) {
  // 1.req.body 取出 tittle content classify
  // 2.此classify存在 则放入 否则创建新分类
  // 3.以html保存文章，并且储存md文件备份
})

module.exports = router;