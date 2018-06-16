'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/client')(app);
  require('./router/admin')(app);
};