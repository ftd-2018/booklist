'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/auth/loginByWeixinAction', controller.auth.loginByWeixinAction);
  router.post('/course/addCourse', controller.course.addCourse);
  router.post('/course/listMyCourse', controller.course.listMyCourse);
  router.post('/course/listCourseDetail', controller.course.listCourseDetail);
  router.post('/course/listAllCourse', controller.course.listAllCourse);
  router.post('/collect/addOrDeleteCollect', controller.collect.addOrDeleteCollect);
  router.post('/collect/listMyCollect', controller.collect.listMyCollect);
  router.post('/course/listSearchCourse', controller.course.listSearchCourse);
  router.post('/user/setInfo', controller.user.setInfo);
};
