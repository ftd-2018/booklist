module.exports = options => {
  return async function interceptor(ctx, next) {
    if(ctx.path=='/'||ctx.path=='/auth/loginByWeixinAction'){
        return;
    }
    // 根据token值获取用户id
    ctx.app.token = ctx.header['x-booklist-token'] || '';
    let token =new ctx.helper.Token(ctx);
    ctx.app.userId = await token.getUserId();
    await next();
  };
};
