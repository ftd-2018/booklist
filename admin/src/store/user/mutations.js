import * as types from './mutation-types'

export default{
	[types.LOGOUT]: (state, token) => {
		state.token = token
	},
	[types.GET_USERINFO]: (state, getuserinfo) =>{
		state.username = getuserinfo.username;
	}
}