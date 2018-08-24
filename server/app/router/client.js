module.exports = app => {
  const { router, controller } = app;
  const interceptor = app.middleware.interceptor();
  router.get('/auth/loginByWeixinAction', interceptor, controller.auth.loginByWeixinAction);
  router.post('/course/addCourse', interceptor, controller.course.addCourse);
  router.post('/course/listMyCourse', interceptor, controller.course.listMyCourse);
  router.post('/course/listCourseDetail', interceptor, controller.course.listCourseDetail);
  router.post('/course/listAllCourse', interceptor, controller.course.listAllCourse);
  router.post('/collect/addOrDeleteCollect', interceptor, controller.collect.addOrDeleteCollect);
  router.post('/collect/listMyCollect', interceptor, controller.collect.listMyCollect);
  router.post('/collect/listMyCollectRange', interceptor, controller.collect.listMyCollectRange);
  router.post('/course/listSearchCourse', interceptor, controller.course.listSearchCourse);
  router.post('/user/setInfo', interceptor, controller.user.setInfo);
  router.post('/purchase/addPurchase', interceptor, controller.purchase.addPurchase);
  router.post('/purchase/listMyPurchase', interceptor, controller.purchase.listMyPurchase);
  router.post('/purchase/listMyPurchaseAboutMe', interceptor, controller.purchase.listMyPurchaseAboutMe);
  router.post('/enchashment/add', interceptor, controller.enchashment.add);
  router.post('/course/update', interceptor, controller.course.update);
  router.post('/purchase/getPayCount', interceptor, controller.purchase.getPayCount);

}