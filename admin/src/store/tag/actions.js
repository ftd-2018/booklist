import {
    ADD_VISITED_VIEWS,
    DEL_VISITED_VIEWS
} from './mutation-types';

export default  {
	addVisitedViews({ commit }, view){
	    commit(ADD_VISITED_VIEWS, view)
	},
	delVisitedViews({ commit, state }, view){
		return new Promise((resolve) => {
			commit(DEL_VISITED_VIEWS, view);
			resolve([...state.visitedViews])
		});
	}
}
