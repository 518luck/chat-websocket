// node.js应该怎么写?
//使用第三方库 ws库来创建一个webSocket服务器
var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
