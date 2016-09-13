const gulp = require('gulp');
const concat = require('gulp-concat');
const strip = require('gulp-strip-comments');
const pkg = require('./package.json');

gulp.task('concat-debug', function() {
	return gulp.src([
		'./node_modules/vue/dist/vue.js',
		'./node_modules/vue-router/dist/vue-router.js',
		'./node_modules/vuex/dist/vuex.js'
	])
		.pipe(concat('vue.bundle.js'))
		.pipe(gulp.dest('./static/debug/'));
});

gulp.task('concat', function() {
	return gulp.src([
		'./node_modules/vue/dist/vue.min.js',
		'./node_modules/vue-router/dist/vue-router.min.js',
		'./node_modules/vuex/dist/vuex.min.js'
	])
		.pipe(concat('vue.bundle-v' + pkg.version + '.js'))
		.pipe(strip({
			safe: true
		}))
		.pipe(gulp.dest('./static/'));
});