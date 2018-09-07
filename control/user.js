const {db} = require('../schema/config');
const userScheam = require('../schema/user');
const User = db.model('users', userScheam);
const crypto = require('../util/encrypt');

// 用户注册
exports.reg = async ctx => {
  // 用户注册时的post信息
  const user = ctx.request.body;
  const username = user.username;
  const password = user.password;
  // 检查数据库
  await new Promise((resolve, reject)=>{
    // user数据库查询
    User.find({username}, (err,data)=>{
      if (err) return reject(err);
      if (data.length !== 0) {
        // 数据库已经存在
        return resolve('');
      }
      // 用户名不存在
      const _user = new User({
        username,
        password: crypto(password),
        articleNum: 0,
        commentNum: 0
      });
      _user.save((err,data)=>{
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  })
  .then(async data=>{
    if (data) {
      // 注册成功
      await ctx.render('isOk', {
        status: '注册成功'
      });
    } else {
      // 用户名已存在
      await ctx.render('isOk', {
        status: '用户名已存在'
      });
    }
  })
  .catch(async err=>{
    await ctx.render('isOk', {
      status: '注册失败，请重试'
    })
  })
};

exports.login = async ctx => {
  const user = ctx.request.body;
  const username = user.username;
  const password = user.password;

  await new Promise((resolve, reject)=>{
    User.find({username},(err, data)=>{
      if (err) return reject(err);
      if (data.length === 0) return reject('用户名不存在');
      if (data[0].password === crypto(password)) return resolve(data);
      resolve('')
    })
  })
  .then(async data=>{
    if (!data) {
      return ctx.render('isOk', {
        status: '密码不正确，登陆失败'
      });
    }
    ctx.cookies.set("username", username, {
      domain: 'localhost',
      path: '/',
      maxAge: 36e5,
      httpOlay: false,
      overwrite: false
    });
    ctx.cookies.set("uid", data[0]._id, {
      domain: 'localhost',
      path: '/',
      maxAge: 36e5,
      httpOlay: false,
      overwrite: false
    });
    ctx.session = {
      username,
      uid: data[0]._id,
      avatar: data[0].avatar,
      role: data[0].role
    };


    await ctx.render('isOk', {
      status: '登陆成功'
    })
  })
  .catch(async err=>{
    await ctx.render('isOk', {
      status: '登陆失败'
    });
  })
};

exports.keepLog = async (ctx, next)=>{
  if (ctx.session.isNew) {
    if (ctx.cookies.get("username")) {
      ctx.session = {
        username: ctx.cookies.get('username'),
        uid: ctx.cookies.get("uid"),
        avatar: ctx.cookies.get("avatar")
      }
    }
  }
  await next();
};

exports.logout = async (ctx) => {
  ctx.session = null;
  ctx.cookies.set('username', null, {
    maxAge: 0
  });
  ctx.cookies.set('_uid', null, {
    maxAge: 0
  });
  // 重定向
  ctx.redirect("/");
};
