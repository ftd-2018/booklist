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
};
