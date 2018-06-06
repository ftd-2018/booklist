'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528019285960_9766';

  // add your config here
  config.middleware = [];

  // 小程序只能存storage，关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };
  
  config.wx = {
    secret: '4f421381c90f78c9337aff9b37800868',
    appid: 'wx538b02d5b8c48759'
  }


  return config;
};
