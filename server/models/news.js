const db = require('../config/db.js'),
	  newsModel = '../schema/news.js';//引入表结构
const CompanyDb = db.Company;//数据库

const News = CompanyDb.import(newsModel);// 用sequelize的import方法引入表结构，实例化了News

const getNewsById = function* (id){
	const newsInfo = yield News.findAll({
		where: {
			news_id: id
		},
		attributes: ['id','news_id','content','status','title','time']
	});
	return newsInfo
}

const createNews = function* (data) {
	yield News.create({
	  news_id: data.news_id,
	  time:data.time, 
	  title:data.title,
	  content: data.content,
	  status: data.status

	})
	return true
}

const removeNews = function* (id){
  yield News.destroy({
    where: {
      id
    }
  })
  return true
}

const updateNews = function* (id,data){
  yield News.update(
    {
      time:data.time, 
	  title:data.title,
	  content: data.content,
    },
    {
      where: {
        id
      }
    }
  )
  return true
}


module.exports = {
  getNewsById,
  createNews,
  removeNews,
  updateNews  // 导出getNewsById的方法，将会在controller里调用
}
