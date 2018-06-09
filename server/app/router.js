'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/auth/loginByWeixinAction', controller.auth.loginByWeixinAction);
  router.post('/course/addCourse', controller.course.addCourse);
};
