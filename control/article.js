const {db} = require('../schema/config');
const articleScheam = require('../schema/article');
const Article = db.model('articles', articleScheam);

exports.addPage = async (ctx) => {
  await ctx.render('add-article', {
    title: '文章发表页面',
    session: ctx.session
  });
};

exports.add = async (ctx) => {
  if (ctx.session.isNew) {
    return ctx.body = {
      msg: '用户未登录',
      status: 0
    }
  }
  // 用户登录的情况
  const data = ctx.request.body;
  data.author = ctx.session.username;
  await new Promise((resolve, reject)=>{
    new Article(data).save((err, data)=>{
      if (err) {
        return reject(err);
      }
      resolve(data);
    })
  }).then((data)=>{
    ctx.body = {
      msg: '保存成功',
      status: 1
    }
  }).catch(err=>{
    ctx.body = {
      msg: '发布失败',
      status: 0
    }
  });
};