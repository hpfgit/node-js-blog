const Article = require('../models/article');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.save = async (ctx) => {
  let meg = {
    status: 0,
    msg: '登录才能发表评论'
  };
  // 验证用户是否登录
  if (ctx.session.isNew) {
    return ctx.body = meg;
  }
  const data = ctx.request.body;
  data.from = ctx.session.uid;
  const _comment = new Comment(data);
  await _comment
    .save()
    .then(data=>{
      meg = {
        status: 1,
        msg: '评论成功'
      };
      Article.update({_id: data.article},{$inc: {
        commentNum: 1
        }}, err => {
        if (err) {
          return console.log(err);
        }
        console.log('计数器评论成功');
      });
      User.update({_id: data.from}, {$inc: {
        commentNum: 1
        }},err=>{
        if (err) return console.log(err);
        console.log('计数器评论成功');
      })
    })
    .catch(err=>{
      meg = {
        status: 0,
        msg: err
      }
    });
  ctx.body = meg;
};

// 获取用户的评论
exports.comlist = async (ctx) => {
  const uid = ctx.session.uid;
  const data = await Comment.find({from: uid}).populate('article', 'title');
  ctx.body = {
    code: 0,
    count: data.length,
    data
  };
};

// 删除评论
exports.del = async (ctx) => {
  const id = ctx.params.id;
  let res = {
    state: 1,
    message: '成功'
  }
  await Comment.findById(id)
    .then(data=>data.remove())
    .catch(err=>{
      res = {
        state: 0,
        message: err
      }
    });
  ctx.body = res;
};