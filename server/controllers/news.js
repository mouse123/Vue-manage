const news = require('../models/news.js');

const getNewsList = function* () {
	const id = this.params.id;
	const result = yield news.getNewsById(id);
	this.body = result;
}

const createNews = function* (){
  const data = this.request.body;
  const result = yield news.createNews(data);
  console.log(data);
  this.body = {
    success: true
  }
}

const removeNews = function* (){
  const id = this.params.id;
  const result = yield news.removeNews(id);

  this.body = {
    success: true
  }
}

const updateNews = function* (){
  const id = this.params.id;
  const data = this.request.body;
  // status == '0' ? status = true : status =  false;// 状态反转（更新）

  const result = yield news.updateNews(id,data);

  this.body = {
    success: true
  }
}
module.exports = (router) =>{
	router.get('/news/:id',getNewsList),
	router.post('/news', createNews),
  	router.delete('/news/:id', removeNews),
  	router.put('/news/:id', updateNews)
}