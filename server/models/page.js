
const mongooseConnected = require('../db')

const Page = mongooseConnected.Schema({
  title:String,
  classify:String,
  date:String,
  count: Number,
  pinyinAndTitle:String,
})

const PageModel = mongooseConnected.model('pageData', Page);

module.exports = PageModel