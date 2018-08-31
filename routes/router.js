const Router = require('koa-router');
const router = new Router;
router.get('/', async (ctx)=>{
  await ctx.render('index', {
    title: '假装这是一个正经的标题'
  });
});
router.get(/^\/user\/(?=reg|login)/, async (ctx)=>{
  const show = /reg$/.test(ctx.path);
  await ctx.render('register', {
    show
  });
})

module.exports = router;