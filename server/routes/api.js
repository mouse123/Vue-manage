const news = require('../controllers/news.js');
const router = require('koa-router')();

news(router);//;//引入koa-router

module.exports = router;