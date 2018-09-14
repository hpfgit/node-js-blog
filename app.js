const Koa = require('koa');
const router = require('./routes/router');
const static = require('koa-static');
const views = require('koa-views');
const logger = require('koa-logger');
const {join} = require('path');
const body = require('koa-body');
const session = require('koa-session');
const compress = require('koa-compress');
// 生成koa实例
const app = new Koa;
app.keys = ['风雨是个大帅比'];
// session配置对象
const CONFIG = {
  key: 'Sid',
  maxAge: 36e5,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true
};
// 注册session
app.use(session(CONFIG, app));
// 注册日志模块
// app.use(logger());
// 注册压缩资源模块
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));
// 处理post请求数据
app.use(body());
// 配置静态资源目录
app.use(static(join(__dirname, 'public')));
// 配置视图模板
app.use(views(join(__dirname, 'views'), {
  extension: "pug"
}));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, ()=>{
  console.log('项目启动成功');
});

{
  const {db} = require('./schema/config');
  const userScheam = require('./schema/user');
  const User = db.model('users', userScheam);
  const crypto = require('./util/encrypt');

  User
    .find({'username': 'admin'})
    .then(data=>{
      if (data.length === 0) {
        // 管理员不存在
        new User({
            username: 'admin',
            password: crypto('admin'),
            role: 666,
            articleNum: 0,
            commentNum: 0
          })
          .save()
          .then(data=>{
            console.log('管理员创建成功，用户名：admin，密码：admin');
          })
          .catch(err=>{
            console.log('管理员创建失败');
          })
      } else {
        // 管理员存在
        console.log('管理员创建成功，用户名：admin，密码：admin');
      }
    })
}