const path = require('path');
const pkg = require('../package.json');
// import * as fs from 'fs';
// import * as os from 'os';
const app = new (require('koa'))();
const router = new (require('koa-router'))();
const Sequelize = require('sequelize');
const mysqlConfig = require('../mysql-config.json');
const sequelize = new Sequelize(`mysql://${mysqlConfig.mysql.user}:${mysqlConfig.mysql.password}@${mysqlConfig.mysql.host}:${mysqlConfig.mysql.port}/${mysqlConfig.mysql.database}`);
const {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList
} = require('graphql');
const { resolver } = require('graphql-sequelize');

router
	.get('/graphql', async (ctx) => {
		const article = sequelize.define('blog_article', {
			tid: { type: Sequelize.INTEGER, primaryKey: true},
			title: Sequelize.STRING,
			posttime: Sequelize.INTEGER
		}, {
			timestamps: false,
			freezeTableName: true
		});
		let articleType = new GraphQLObjectType({
			name: 'article',
			description: 'blog article',
			fields: {
				tid: {
					type: new GraphQLNonNull(GraphQLInt),
					description: 'The tid of the article.'
				},
				title: {
					type: GraphQLString,
					description: 'The title of the article.',
				},
				posttime: {
					type: GraphQLInt,
					description: 'The posttime of the article.',
				}
			}
		});
		let schema = new GraphQLSchema({
			query: new GraphQLObjectType({
				name: 'RootQueryType',
				fields: {
					articles: {
						type: new GraphQLList(articleType),
						args: {
							limit: {
								type: GraphQLInt
							},
							order: {
								type: GraphQLString
							}
						},
						resolve: resolver(article)
					}
				}
			})
		});
		const query = ctx.query.query;
		const result = await graphql(schema, query);
		ctx.type = '.json';
		ctx.body = result;
	})
	.get('/mysql', async (ctx) => {
		const article = sequelize.define('blog_article', {}, {
			freezeTableName: true // Model tableName will be the same as the model name
		});
		const result = await article.findAll({
			attributes: ['tid', 'title', 'posttime'],
			order: [ ['tid', 'DESC'] ],
			limit: 10
		});
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