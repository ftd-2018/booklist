import fetch from './fetch'

/**
 *  登录
 */
export const login = data => fetch('auth/login', data);

/**
 *  获取文章审查机制列表
 */
export const getReviewList = data => fetch('admin/review/getList', data); 

/**
 *  发布
 */
export const publish = data => fetch('admin/review/publish', data);

/**
 *  撤销
 */
export const revoke = data => fetch('admin/review/revoke', data);

/**
 *  获取用户列表
 */
export const getUserList = data => fetch('admin/user/getUserList', data);

/**
 *  修改用户积分
 */
export const updateCredit = data => fetch('admin/user/updateCredit', data);

/**
 *  获取提现列表
 */
export const getEnchaList = data => fetch('admin/enchashment/getList', data);

/**
 *  提现
 */
export const enchashment = data => fetch('admin/enchashment/enchashment', data);

/**
 *  提现撤销
 */
export const enchaRevoke = data => fetch('admin/enchashment/revoke', data);



