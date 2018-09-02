const Koa = require('koa');
const router = require('./routes/router');
const static = require('koa-static');
const views = require('koa-views');
const logger = require('koa-logger');
const {join} = require('path');
const body = require('koa-body');
const session = require('koa-session');
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
}
// 注册session
app.use(session(CONFIG, app));
// 注册日志模块
app.use(logger());
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