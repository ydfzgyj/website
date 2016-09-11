function customFetch(url, data = {}, setting = {}) {
	const method = setting.method || 'POST';
	const config = {
		method: method,
		credentials: 'include'
	};
	if(!setting.intactUrl) {
		url = G.api.modeList[G.api.current].url + url;
	}
	if(method === 'GET') {
		url += url.indexOf('?') === -1 ? '?' : '&';
		url += Object.keys(data).map(i => i + '=' + data[i]).join('&');
	} else if(method === 'POST') {
		const dataKeys = Object.keys(data);
		if(dataKeys.length) {
			if('file' in data) {
				let body = new FormData;
				dataKeys.forEach(key => body.append(key, data[key]));
				config.body = body;
			} else {
				config.body = JSON.stringify(data);
				config.headers = {
					'Content-Type': 'application/json; charset=utf-8'
				}
			}
		}
	} else {
		return Promise.reject('wrong method type');
	}
	return fetch(url, config).then(rsp => rsp.json());
}

//全局变量
export default {
	customFetch
};