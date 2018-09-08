const concat = require('gulp-concat');
const gulp = require('gulp');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');
const uglifycss = require('gulp-uglifycss');

// Task default
gulp.task('default', ['css', 'lib', 'js']);

// Task para monitorar alterações
gulp.task('w', () => {
	gulp.watch('./src/styles/**/*', ['css']);
	gulp.watch('./src/app/**/*', ['js']);
})

// Task para concatenar estilo css com bootstrap
gulp.task('css', () => {
	gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css', './src/styles/style.css'])
	.pipe(concat('style.css'))
	.pipe(uglifycss())
    .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./public/dist/css'));
});

// Task para concatenar as libs js
gulp.task('lib', () => {
	gulp.src(['./node_modules/vue/dist/vue.min.js'])
	.pipe(concat('lib.js'))
	.pipe(gulp.dest('./public/dist/js'));
});

// Task para concatenar a app Vue
gulp.task('js', () => {
	gulp.src(['./src/app/app.js'])
	.pipe(concat('app.js'))
	.pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./public/dist/js'));
})