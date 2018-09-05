const {db} = require('../schema/config');
const articleScheam = require('../schema/article');
const Article = db.model('articles', articleScheam);
const userScheam = require('../schema/user');
const User = db.model('users', userScheam);
const commentScheam = require('../schema/comment');
const Comment = db.model('comment', commentScheam);
const fs = require('fs');
const {join} = require('path');

exports.index = async (ctx)=>{
  ctx.status = 404;
  return await ctx.render('404', {
    title: '404'
  });
  const id = ctx.params.id;
  const arr = fs.readdirSync(join(__dirname, '../views/admin'));
};