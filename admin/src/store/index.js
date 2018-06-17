import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import user from './user/';
import tag from './tag/';

export default new Vuex.Store({
	modules: {
		user,
		tag
	},
	plugins: [createPersistedState({ storage: window.sessionStorage })]
});
