import fetch from './fetch'

/**
 *  登录
 */

export const login = data => fetch('auth/login', data);