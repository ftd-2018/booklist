import * as types from './mutation-types';
 
export default {
	logOut({ commit }) {
		return new Promise(async (resolve, reject) => {
			// let result = await logout();
			commit('LOGOUT', '')
			localStorage.removeItem("userInfo")
			resolve()
		}).catch(error => {
			reject(error)
        })
	},
	getUserInfo({commit}, data) {
  		commit('GET_USERINFO', data);
	}
};