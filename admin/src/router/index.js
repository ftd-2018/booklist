import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// v1.0.0
const manage = r => require.ensure([], () => r(require('@/pages/manage')), 'manage');
const wxk = r => require.ensure([], () => r(require('@/pages/wxk/')), 'wxk');

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
            path: '/manage',
            component: manage,
            children: [{
                path: '/wxk',
                component: wxk,
                name: '微信库',
                meta: { nav: ['工作台', '微信库'] },
            }]
        }
    ]
})
