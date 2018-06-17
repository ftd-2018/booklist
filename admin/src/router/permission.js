import router from './index.js'
import store from '../store'

const whiteList = ['/login']// 不重定向白名单

router.beforeEach((to, from, next) => {
	if(localStorage.getItem('token')){ // 判断是否有token
		if(to.path === '/login'){
			next({ 
				path: '/'
			})
		}else{
			next();
		}
	}else{
		if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next();
		}else{
			next({ 
				path: '/login'
			})	
		}	
		
	}
});

