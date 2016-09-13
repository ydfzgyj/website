module.exports = templateParams => {
	const css = templateParams.htmlWebpackPlugin.files.css.map(file => `<link rel="stylesheet" href="${file.split('static')[1]}">`).join('');
	templateParams.htmlWebpackPlugin.files.js.unshift(templateParams.htmlWebpackPlugin.options.vueBundle);
	const js = templateParams.htmlWebpackPlugin.files.js.map(file => `<script src="${file.split('static').slice(-1)}"></script>`).join('');
	return `
		<!DOCTYPE HTML>
		<head>
			<meta charset="UTF-8">
			<title>高英健的个人网站</title>
			${css}
		</head>
		<body>
		<div id="app"></div>
		${js}
		</body>
	`;
};
