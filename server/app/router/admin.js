module.exports = app => {
  const { router, controller } = app;
  const adminInterceptor = app.middleware.adminInterceptor();
  router.post('/admin/addAdmin', adminInterceptor, controller.admin.admin.add);
  router.post('/auth/login', adminInterceptor, controller.admin.auth.login);
  router.post('/admin/review/getList', adminInterceptor, controller.admin.review.getList);
  router.post('/admin/review/publish', adminInterceptor, controller.admin.review.publish);
  router.post('/admin/review/revoke', adminInterceptor, controller.admin.review.revoke);
  router.post('/admin/user/getUserList', adminInterceptor, controller.admin.user.getUserList);
  router.post('/admin/user/updateCredit', adminInterceptor, controller.admin.user.updateCredit);
  router.post('/admin/enchashment/getList', adminInterceptor, controller.admin.enchashment.getList);
  router.post('/admin/enchashment/enchashment', adminInterceptor, controller.admin.enchashment.enchashment);
  router.post('/admin/enchashment/revoke', adminInterceptor, controller.admin.enchashment.revoke);
}