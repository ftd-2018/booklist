'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "{message:'请求成功', data:1}";
  }
}

module.exports = HomeController;
