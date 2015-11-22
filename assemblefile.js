var assemble = require('assemble');
var extname = require('gulp-extname');
var less = require('gulp-less');
var LessPluginCleanCSS = require('less-plugin-clean-css'),
	LessPluginAutoPrefix = require('less-plugin-autoprefix'),
	cleancss = new LessPluginCleanCSS({ advanced: true }),
	autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

assemble.task('html', function() {
	assemble.src('./app/pages/*.*')
		.pipe(extname())
		.pipe(assemble.dest('./dist/'));
});

assemble.task('css', function () {
	assemble.src('./app/styles/less/main.less')
		.pipe( less({ plugins: [autoprefix,cleancss] }) )
		.pipe(assemble.dest('./dist/styles/css/'));
});

assemble.task('default', ['html', 'css']);
