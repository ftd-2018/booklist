module.exports = options => {
  return async function adminInterceptor(ctx, next) {
    // if(ctx.path == '/' || ctx.path == '/auth/loginByWeixinAction'){
    //     await next();
    //     return;
    // }
    // // 根据token值获取用户id
    // ctx.app.token = ctx.header['x-bladmin-token'] || '';
    // let token =new ctx.helper.Token(ctx);
    // ctx.app.userId = await token.getUserId();
    await next();
  };
};