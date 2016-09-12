import client from 'client';
import routes from 'routes';
import store from 'store';

import './public.less';

window.G = client;
Vue.config.devtools = true;

const router = new VueRouter({
	mode: 'history',
	routes
});
new Vue({
	router,
	template: '<router-view></router-view>',
	store,
	data() {
		return {
			global: G,
			loading: true
		};
	}
}).$mount('#app');

//切换路径
// router.beforeEach(({ next, from, to }) => {
// 	const fromPath = from.path ? from.path.split('?')[0] : '';
// 	const toPath = to.path.split('?')[0];
// 	if(fromPath !== toPath) {
// 		router.app.loading = true;
// 	}
// 	next();
// });
//全局自定义过滤器
Vue.filter('dateFormat', (date, format = 'Y-m-d h:i:s') => {
	if(date === undefined) {
		return '';
	}
	date = new Date(date);
	let addZero = value => value < 10 ? '0' + value : value;
	let time = {
		Y: date.getFullYear(),
		y: addZero(date.getFullYear() % 100),
		m: addZero(date.getMonth() + 1),
		d: addZero(date.getDate()),
		h: addZero(date.getHours()),
		i: addZero(date.getMinutes()),
		s: addZero(date.getSeconds())
	};
	return format.split('').map(value => {
		return value in time ? time[value] : value;
	}).join('');
});
//根据登录状态决定加载的组件
if(!fetch) {
	alert('请升级Chrome到最新版本！');
} else {
	//
}