module.exports = function( grunt ){
	"use strict";

	// Project configuration.
	grunt.initConfig(
		{

			// Metadata.
			pkg        : grunt.file.readJSON( 'package.json' ),
			banner     : '/*!\n' +
			             ' * <%= pkg.name %> v<%= pkg.version %> by @duthcelt */\n' +
			             ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n' +
			             ' * <%= _.pluck(pkg.licenses, "url").join(", ") %> */\n' +
			             ' */\n\n',
			jqueryCheck: 'if (!jQuery) { throw new Error(\"FE-Pattern requires jQuery\") }\n\n',

			pages: grunt.file.readYAML( '_assemble.yml' ),

			FEP: {
				app : 'app',
				dist: 'dist'
			},
			//
			//watch  : {
			//	styles    : {
			//		files: ['<%= FEP.app %>/styles/less{,*/}*.less'],
			//		tasks: ['less:app']
			//	},
			//	scripts   : {
			//		files: ['<%= FEP.app %>/scripts/fep/modules/*.js', '<%= FEP.app %>/lib{,*/}*.js'],
			//		tasks: ['copy:app']
			//	},
			//	fep       : {
			//		files: '<%= FEP.app %>/scripts/fep/*.js',
			//		tasks: 'concat'
			//	},
			//	livereload: {
			//		options: {
			//			livereload: '<%= connect.options.livereload %>'
			//		},
			//		files  : [
			//			//'<%= FEP.app %>/*.html',
			//			'<%= FEP.app %>/styles/css/{,*/}*.css',
			//			'<%= FEP.app %>/scripts/minified/{,*/}*.js',
			//			'<%= FEP.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
			//		]
			//	}
			//},
			//connect: {
			//	options   : {
			//		livereload: true,
			//		hostname  : "*"
			//	},
			//	livereload: {
			//		options: {
			//			open: true,
			//			base: '<%= FEP.app %>'
			//		}
			//	},
			//	test      : {
			//		options: {
			//			base: [
			//				'.tmp',
			//				'test',
			//				'<%= FEP.app %>'
			//			]
			//		}
			//	},
			//	dist      : {
			//		options: {
			//			open: true,
			//			base: '<%= FEP.dist %>'
			//		}
			//	}
			//},
			//clean  : {
			//	dist  : {
			//		files: [
			//			{
			//				dot: true,
			//				src: [
			//					'<%= FEP.dist %>/scripts/minified/*',
			//					'<%= FEP.dist %>/*',
			//					'!<%= FEP.dist %>/.git*'
			//				]
			//			}
			//		]
			//	},
			//	server: ['<%= FEP.app %>/scripts/minified/*']
			//},
			//
			//jshint: {
			//	options  : {
			//		jshintrc: 'js/.jshintrc'
			//	},
			//	gruntfile: {
			//		src: 'Gruntfile.js'
			//	},
			//	src      : {
			//		src: ['js/*.js']
			//	},
			//	test     : {
			//		src: ['js/tests/unit/*.js']
			//	}
			//},
			//less  : {
			//	app : {
			//		options: {
			//			sourceMap        : true,
			//			sourceMapRootpath: "/",
			//			sourceMapBasepath: "<%= FEP.app %>",
			//			sourceMapFilename: "<%= FEP.app %>/styles/css/main.css.map"
			//		},
			//		files  : [
			//			{
			//				"<%= FEP.app %>/styles/css/main.css": "<%= FEP.app %>/styles/less/main.less"
			//			}
			//		]
			//	},
			//	dist: {
			//		options: {
			//			cleancss: true
			//		},
			//		files  : [
			//			{
			//				"<%= FEP.app %>/styles/less/font-awesome.css": "<%= FEP.app %>/styles/**/font-awesome.less"
			//			},
			//			{
			//				"<%= FEP.dist %>/styles/css/main.css": "<%= FEP.app %>/styles/less/main.less"
			//			}
			//		]
			//	}
			//},
			//uglify: {
			//	default: {
			//		files: {
			//			'<%= FEP.app %>/scripts/minified/require_jquery.js': ['<%= FEP.app %>/scripts/global/prepend.js', '.tmp/requirejs/js/require.js', '.tmp/jquery/jquery.js']
			//		}
			//	},
			//	fep    : {
			//		options: {
			//			banner: '<%= banner %>\n\n'
			//		},
			//		files  : [
			//			{
			//				expand : true,
			//				src    : '<%= FEP.app %>/scripts/fep/modules/*.js',
			//				dest   : '<%= FEP.dist %>/scripts/minified',
			//				flatten: true,
			//				filter : 'isFile'
			//			}
			//		]
			//	},
			//	dist   : {
			//		files: [
			//			{
			//				'<%= FEP.dist %>/scripts/minified/require_jquery.js': ['<%= FEP.app %>/scripts/global/prepend.js', '.tmp/requirejs/js/require.js', '.tmp/jquery/jquery.js']
			//			},
			//			{
			//				expand : true,
			//				src    : ['.tmp/**/*.js', '<%= FEP.app %>/lib/**/*.js', '<%= FEP.app %>/scripts/minified/*.js'],
			//				dest   : '<%= FEP.dist %>/scripts/minified',
			//				flatten: true,
			//				filter : 'isFile'
			//			}
			//		]
			//	}
			//},
			//concat: {
			//	options: {
			//		separator: ';\n\n',
			//		banner   : '<%= banner %>'
			//	},
			//	default: {
			//		src : [
			//			'<%= FEP.app %>/scripts/fep/*.js'
			//
			//		],
			//		dest: '<%= FEP.app %>/scripts/minified/main.js'
			//	}
			//},
			//// Put files not handled in other tasks here
			//copy  : {
			//	app : {
			//		files: [
			//			{
			//				expand : true,
			//				src    : '.tmp/**/*.{svg,woff,eot,ttf,otf,txt}',
			//				dest   : '<%= FEP.app %>/styles/fonts',
			//				flatten: true,
			//				filter : 'isFile'
			//			},
			//			{
			//				expand : true,
			//				src    : ['.tmp/**/*.less', '.tmp/**/*.css', '!.tmp/font-awesome/**/*.less'],
			//				dest   : '<%= FEP.app %>/styles/less',
			//				flatten: true,
			//				filter : 'isFile'
			//			},
			//			{
			//				expand : true,
			//				src    : ['.tmp/**/*.js', '<%= FEP.app %>/lib/**/*.js', '<%= FEP.app %>/scripts/fep/modules/*.js'],
			//				dest   : '<%= FEP.app %>/scripts/minified',
			//				flatten: true,
			//				filter : 'isFile'
			//			}
			//
			//		]
			//	},
			//	dist: {
			//		files: [
			//			{
			//				expand: true,
			//				cwd   : '<%= FEP.app %>',
			//				dest  : '<%= FEP.dist %>',
			//				src   : [
			//					'*.{ico,png,txt}',
			//					//'lib/**/*.js',
			//					//'lib/**/*.css',
			//					//'styles/less/*',
			//					'styles/fonts/*.{svg,woff,eot,ttf,otf,txt}',
			//					'styles/images/**/*.{jpg,gif,png,webp}',
			//					'*.html',
			//					'images/**/*.{webp,gif}'
			//				]
			//			}
			//
			//		]
			//	}
			//},
			//
			//
			//retire: {
			//	app : {
			//		js: ['<%= FEP.app %>/**/minified/*js'] /** Scan js-files in app/src/ directory and subdirectories. **/
			//	},
			//	dist: {
			//		js: ['<%= FEP.dist %>/**/minified/*js'] /** Scan js-files in app/src/ directory and subdirectories. **/
			//	}
			//},
			traceur: {
				options: {
					// traceur options here
					experimental: true,
					// module naming options,
					//moduleNaming: {
					//	stripPrefix: "src/es6",
					//	addPrefix: "com/mycompany/project"
					//},
					copyRuntime: 'src/es5'
				},
				custom: {
					files: [{
						//expand: true,
						//cwd: './<%= FEP.app %>',
						src: ['./<%= FEP.app %>/lib/github/ded/domready@1.0.8/ready.es6'],
						dest: './<%= FEP.app %>/lib/github/ded/domready@1.0.8/ready.js'
					}]
				},
			},
			serve: {
				options: {
					port: 9000
				}
			}

		}
	);

	// Load tasks
	//grunt.loadNpmTasks( "grunt-contrib-clean" );
	//grunt.loadNpmTasks( "grunt-contrib-concat" );
	//grunt.loadNpmTasks( "grunt-contrib-copy" );
	//grunt.loadNpmTasks( "grunt-contrib-jshint" );
	//grunt.loadNpmTasks( "grunt-contrib-less" );
	//grunt.loadNpmTasks('grunt-highlight');
	//grunt.loadNpmTasks( "grunt-contrib-uglify" );
	//grunt.loadNpmTasks( "grunt-contrib-watch" );
	//grunt.loadNpmTasks( "grunt-retire" );
	grunt.loadNpmTasks( "grunt-serve" );
	//grunt.loadNpmTasks( "grunt-shell" );
	//grunt.loadNpmTasks( "grunt-shell" );
	grunt.loadNpmTasks('grunt-traceur');


	grunt.registerTask( 'build', [
		'clean:dist',
		'concat:default',
		'copy:app',
		'copy:dist',
		//'concurrent:dist',
		'retire:dist'
		//,'connect:dist'
		//, 'requirejs:dist'
	] );

	grunt.registerTask( 'default', ['build'] );
	grunt.registerTask( 'dist', ['systemjs','serve'] );
	grunt.registerTask( 'custom', ['traceur:custom','serve'] );

console.log(__dirname,__filename);

}
;
