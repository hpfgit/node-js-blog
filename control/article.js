const Article = require('../models/article');
const User = require('../models/user');
const Comment = require('../models/comment');

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
  data.commentNum = 0;
  data.author = ctx.session.uid;
  await new Promise((resolve, reject)=>{
    new Article(data).save((err, data)=>{
      if (err) {
        return reject(err);
      }
      // 更新用户文章计数
      User
        .update({_id: data.author}, {$inc: {
          articleNum: 1
          }}, err => {
          if (err) return console.log(err);
        });
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

exports.getList = async (ctx) => {
  let page = ctx.params.id || 1;
  page--;
  const maxNum = await Article.estimatedDocumentCount((err, num) => err ? console.log(err) : num);
  const artList = await Article
    .find()
    .sort('-created')
    .skip(1 * page)
    .limit(1)
    .populate({
      path: 'author',
      select: 'username _id avatar'
    })
    .then(data => data)
    .catch(err => console.log(err));
  await ctx.render('index', {
    session: ctx.session,
    title: 'node就是博客',
    artList,
    maxNum
  });
};

exports.details = async (ctx) =>{
  const _id = ctx.params.id;
  const article = await Article
    .findById(_id)
    .populate('author','username')
    .then(data=>data);

  const comment = await Comment
    .find({article: _id})
    .sort('-createdAt')
    .populate('from', 'username avatar')
    .then(data=>data)
    .catch(err => console.log(err));

  await ctx.render('article', {
    title: article.title,
    article,
    comment,
    session: ctx.session
  })
};

exports.artlist = async (ctx) => {
  const uid = ctx.session.uid;
  const data = await Article.find({author: uid});
  ctx.body = {
    code: 0,
    count: data.length,
    data
  }
};

exports.del = async ctx => {
  const _id = ctx.params.id;
  let res = {
    state: 1,
    message: '成功'
  }
  await Article.findById(_id)
    .then(data=>data.remove())
    .catch(err=>{
      res = {
        state: 0,
        message: err
      }
    });
  ctx.body = res;
};