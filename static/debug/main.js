/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function customFetch(url, data = {}, setting = {}) {
	const method = setting.method || 'POST';
	const config = {
		method: method,
		credentials: 'include'
	};
	if (!setting.intactUrl) {
		url = G.api.modeList[G.api.current].url + url;
	}
	if (method === 'GET') {
		url += url.indexOf('?') === -1 ? '?' : '&';
		url += Object.keys(data).map(i => i + '=' + data[i]).join('&');
	} else if (method === 'POST') {
		const dataKeys = Object.keys(data);
		if (dataKeys.length) {
			if ('file' in data) {
				let body = new FormData();
				dataKeys.forEach(key => body.append(key, data[key]));
				config.body = body;
			} else {
				config.body = JSON.stringify(data);
				config.headers = {
					'Content-Type': 'application/json; charset=utf-8'
				};
			}
		}
	} else {
		return Promise.reject('wrong method type');
	}
	return fetch(url, config).then(rsp => rsp.json());
}

//全局变量
/* harmony default export */ exports["a"] = {
	customFetch
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_home__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hello__ = __webpack_require__(4);



/* harmony default export */ exports["a"] = [{ path: '/', component: __WEBPACK_IMPORTED_MODULE_0_home__["a" /* default */] }, { path: '/hello', component: __WEBPACK_IMPORTED_MODULE_1_hello__["a" /* default */] }, { path: '*', redirect: '/' }];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
		if (nav.title) {
			state.nav.title = nav.title.map(title => title.length > 20 ? title.slice(0, 20) + '...' : title);
			let title = nav.title.slice(0).reverse();
			title.push('Catch后台管理系统');
			document.title = title.join(' - ');
		}
		if (nav.buttons) {
			state.nav.buttons = nav.buttons;
		}
	},
	path(state, path) {
		if ('multiCount' in path) {
			state.multi = {
				current: path.page,
				count: path.multiCount,
				all: Math.ceil(path.multiCount / path.limit)
			};
		}
		const exclusionKey = ['limit', 'page', 'skip', 'multiCount'];
		Object.keys(path).forEach(key => {
			const value = path[key];
			if (exclusionKey.indexOf(key) !== -1 || value === '' || value === undefined || value === null) {
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

/* harmony default export */ exports["a"] = new Vuex.Store({
	state,
	mutations,
	getters
});

/***/ },
/* 3 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_less__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__template_html__);



/* harmony default export */ exports["a"] = {
	template: __WEBPACK_IMPORTED_MODULE_1__template_html___default.a,
	data() {
		return {};
	}
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_less__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__template_html__);



/* harmony default export */ exports["a"] = {
	template: __WEBPACK_IMPORTED_MODULE_1__template_html___default.a,
	data() {
		return {};
	}
};

/***/ },
/* 6 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 7 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = "<div>Hello World!</div>"

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = "<header>\r\n\t<h1>高英健的个人网站</h1>\r\n\t<ul>\r\n\t\t<li><router-link to=\"/\">博客</router-link></li>\r\n\t\t<li><router-link to=\"/hello\">关于</router-link></li>\r\n\t</ul>\r\n</header>"

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_routes__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_store__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__public_less__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__public_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__public_less__);






window.G = __WEBPACK_IMPORTED_MODULE_0_client__["a" /* default */];
Vue.config.devtools = true;

const router = new VueRouter({
	mode: 'history',
	routes: __WEBPACK_IMPORTED_MODULE_1_routes__["a" /* default */]
});
new Vue({
	router,
	template: '<router-view></router-view>',
	store: __WEBPACK_IMPORTED_MODULE_2_store__["a" /* default */],
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
	if (date === undefined) {
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
if (!fetch) {
	alert('请升级Chrome到最新版本！');
} else {
	//
}

/***/ }
/******/ ]);