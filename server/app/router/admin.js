module.exports = app => {
  const { router, controller } = app;
  const adminInterceptor = app.middleware.adminInterceptor();
  router.post('/admin/addAdmin', adminInterceptor, controller.admin.admin.add);
  router.post('/auth/login', adminInterceptor, controller.admin.auth.login);
}