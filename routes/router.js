const Router = require('koa-router');
const router = new Router;
const user = require('../control/user');

router.get('/', user.keepLog, async (ctx)=>{
  await ctx.render('index', {
    title: '假装这是一个正经的标题',
    session: ctx.session
  });
});
router.get(/^\/user\/(?=reg|login)/, async (ctx)=>{
  const show = /reg$/.test(ctx.path);
  await ctx.render('register', {
    show
  });
});
// 用户登录
router.post('/user/login', user.login);
// 用户注册
router.post('/user/reg', user.reg);
// 用户退出
router.get('/user/logout', user.logout);

module.exports = router;