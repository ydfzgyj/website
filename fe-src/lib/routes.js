import homePage from 'home';
import helloPage from 'hello';

export default [
	{ path: '/', component: homePage },
	{ path: '/hello', component: helloPage },
	{ path: '*', redirect: '/' }
];