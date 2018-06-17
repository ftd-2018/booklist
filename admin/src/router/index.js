import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// v1.0.0
const manage = r => require.ensure([], () => r(require('@/pages/manage')), 'manage');
const wxk = r => require.ensure([], () => r(require('@/pages/wxk/')), 'wxk');
const login = r => require.ensure([], () => r(require('@/pages/login/')), 'login'); //登录
const review = r => require.ensure([], () => r(require('@/pages/qualitymanage/review/index.vue')), 'review');  // 文章审核机制
const enchashment = r => require.ensure([], () => r(require('@/pages/usermanage/enchashment/index.vue')), 'enchashment'); // 提现
const userInfo = r => require.ensure([], () => r(require('@/pages/usermanage/userinfo/index.vue')), 'userinfo'); // 提现

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/manage'
        },
		{
			path: '*',
			redirect: '/'
		},
        {
            path: '/login',
            name: '登录',
            component: login
        },
        {
            path: '/manage',
            component: manage,
            children: [{
                path: '/review',
                component: review,
                name: '文章审核机制',
                meta: {nav: ['内容管理', '文章审核机制']}
            },{
                path: '/enchashment',
                component: enchashment,
                name: '用户提现记录',
                meta: {nav: ['用户管理', '用户提现记录']}
            },{
                path: '/userinfo',
                component: userInfo,
                name: '用户信息',
                meta: {nav: ['用户管理', '用户信息']}
            }]
        }
    ]
})
