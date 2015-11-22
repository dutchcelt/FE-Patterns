var assemble = require('assemble');
var extname = require('gulp-extname');
var less = require('gulp-less');

assemble.task('html', function() {
	assemble.src('templates/*.hbs')
		.pipe(extname())
		.pipe(assemble.dest('dist/'));
});

assemble.task('css', function () {
	assemble.src('styles/*.less')
		.pipe(less())
		.pipe(assemble.dest('dist/assets/css'));
});

assemble.task('default', ['html', 'css']);
