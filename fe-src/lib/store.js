import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	nav: {
		title: [],
		buttons: []
	},
	multi: {
		current: 0,
		count: 0,
		all: 0
	},
	path: {}
};

const mutations = {
	nav(state, nav) {
		if(nav.title) {
			state.nav.title = nav.title.map(title => title.length > 20 ? title.slice(0, 20) + '...' : title);
			let title = nav.title.slice(0).reverse();
			title.push('Catch后台管理系统');
			document.title = title.join(' - ');
		}
		if(nav.buttons) {
			state.nav.buttons = nav.buttons;
		}
	},
	path(state, path) {
		if('multiCount' in path) {
			state.multi = {
				current: path.page,
				count: path.multiCount,
				all: Math.ceil(path.multiCount / path.limit)
			};
		}
		const exclusionKey = ['limit', 'page', 'skip', 'multiCount'];
		Object.keys(path).forEach(key => {
			const value = path[key];
			if(exclusionKey.indexOf(key) !== -1 || value === '' || value === undefined || value === null) {
				delete path[key];
			}
		});
		state.path = path;
	}
};

const getters = {
	nav: state => state.nav,
	multi: state => state.multi,
	path: state => state.path
};

export default new Vuex.Store({
	state,
	mutations,
	getters
});