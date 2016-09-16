const path = require('path');
const pkg = require('../package.json');
// import * as fs from 'fs';
// import * as os from 'os';
const app = new (require('koa'))();
const router = new (require('koa-router'))();
const connection = require('mysql').createConnection(require('../mysql-config.json').mysql);

router
	.get('/mysql', async (ctx) => {
		connection.connect();
		const result = await new Promise((resolve) => {
			connection.query('SELECT `tid`,`title`,`posttime` FROM `blog_article` ORDER BY `tid` DESC LIMIT 10', (e, result) => {
				if (e) throw e;
				resolve(result);
			});
		});
		connection.end();
		ctx.type = '.json';
		ctx.body = result;
	})
	// .get('/tasks', (ctx) => {
	// 	ctx.type = '.json';
	// 	ctx.body = Object.keys(tasks).map((taskName) => {
	// 		return {
	// 			name: taskName,
	// 			logs: tasks[taskName].getLogs()
	// 		}
	// 	});
	// })
	// .get('/tasks/:taskName', (ctx) => {
	// 	const {taskName} = ctx.params;
	// 	ctx.type = '.json';
	// 	if(taskName in tasks) {
	// 		ctx.body = {
	// 			name: taskName,
	// 			logs: tasks[taskName].getLogs()
	// 		};
	// 	} else {
	// 		ctx.body = {
	// 			errorMsg: 'Task Not Found.'
	// 		};
	// 		ctx.status = 404;
	// 	}
	// })
	// .post('/tasks/:taskName', (ctx) => {
	// 	const {taskName} = ctx.params;
	// 	tasks[taskName].wrappedStart();
	// 	ctx.status = 201;
	// })
	// .del('/tasks/:taskName', (ctx) => {
	// 	const {taskName} = ctx.params;
	// 	tasks[taskName].cancel();
	// 	ctx.status = 200;
	// })
	.get('/package', (ctx) => {
		ctx.type = '.json';
		ctx.body = pkg;
	});

app
	.use(router.routes())
	.use(router.allowedMethods())
	.use(require('koa-rewrite')(/^\/((debug\/)?)(?!.*\..*)/, '/$1'))
	.use(require('koa-static')(path.join(__dirname, '../static')));

const port = process.env.PORT || 3000;
console.log(`Gao Yingjian's Website Server v${pkg.version}, listening on 0.0.0.0:${port}`);
app.listen(port);


// app.get('/mysql', function(req, res) {
// 	connection.connect();
// 	connection.query('SELECT `tid`,`title`,`posttime` FROM `blog_article` ORDER BY `tid` DESC LIMIT 10;', function(err, result) {
// 		if(err) throw err;
// 		res.send(result);
// 		//console.log(result);
// 	});
// 	connection.end();
// });