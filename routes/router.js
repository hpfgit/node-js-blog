const Router = require('koa-router');
const router = new Router;
const user = require('../control/user');
const article = require('../control/article');
const comment = require('../control/comment');
const admin = require('../control/admin');
const upload = require('../util/upload');

router.get('/', user.keepLog, article.getList);
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
// 文章发表页面
router.get('/article', user.keepLog, article.addPage);
// 文章添加页面
router.post('/article', user.keepLog, article.add);
// 文章分页路由
router.get("/page/:id", article.getList);
// 文章详情页
router.get('/article/:id', user.keepLog, article.details);
// 添加评论
router.post('/comment', user.keepLog, comment.save);
// 个人中心
router.get('/admin/:id', user.keepLog, admin.index);
// 用户头像上传
router.post('/upload', user.keepLog, upload.single('file'), user.upload);
// 获取用户的所有的评论
router.get('/user/comments', user.keepLog, comment.comlist);
// 删除评论
router.del('/delete/:id', user.keepLog, comment.del);
router.get('*', async (ctx)=>{
  await ctx.render('404', {
    title: '尼玛的'
  });
});

module.exports = router;