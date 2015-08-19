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
			uglify: {
				default: {
					files: {
						'<%= FEP.app %>/scripts/minified/require_jquery.js': ['<%= FEP.app %>/scripts/global/prepend.js', '.tmp/requirejs/js/require.js', '.tmp/jquery/jquery.js']
					}
				},
				fep    : {
					options: {
						banner: '<%= banner %>\n\n'
					},
					files  : [
						{
							expand : true,
							src    : '<%= FEP.app %>/scripts/fep/modules/*.js',
							dest   : '<%= FEP.dist %>/scripts/minified',
							flatten: true,
							filter : 'isFile'
						}
					]
				},
				dist   : {
					files: [
						{
							'<%= FEP.dist %>/scripts/minified/require_jquery.js': ['<%= FEP.app %>/scripts/global/prepend.js', '.tmp/requirejs/js/require.js', '.tmp/jquery/jquery.js']
						},
						{
							expand : true,
							src    : ['.tmp/**/*.js', '<%= FEP.app %>/lib/**/*.js', '<%= FEP.app %>/scripts/minified/*.js'],
							dest   : '<%= FEP.dist %>/scripts/minified',
							flatten: true,
							filter : 'isFile'
						}
					]
				},
				github:{
					files : [{
						expand : true,
						cwd: '<%= FEP.app %>',
						src:[
							'./lib/*.js',
							'./lib/github/**/*.js',
							'!./lib/**/*.@(min|src).js'
						],
						dest:'./<%= FEP.dist %>'
					}]

				},
				npm:{
					files : [{
						expand : true,
						cwd: '<%= FEP.app %>',
						src:[
							'./lib/npm/@(domready*|font-awesome*|mustache*)/**/*.js',
							'./lib/npm/@(domready*|font-awesome*|mustache*).js',
							'!./lib/**/*.@(min|src).js'
						],
						dest:'./<%= FEP.dist %>'
					}]

				}
			},
			copy: {
				default: {
					files: [{
						expand: true,
						cwd: '<%= FEP.app %>',
						src:[
							'./*.html',
							'./styles/**/*.css',
							'./{styles,lib}/**/*.@(css|eot|svg|ttf|woff|woff2|otf)',
							'!./lib/**/*.@(min|src).*'
						],
						dest:'./<%= FEP.dist %>'
					}]
				},
				config: {
					files: [{
						src:[
							'./config.js'
						],
						dest:'./<%= FEP.dist %>/config.js'
					}]
				}
			},

			retire: {
				app : {
					js: ['<%= FEP.app %>/**/lib/**/*js']
					/** Scan js-files in app/src/ directory and subdirectories. **/
				},
				dist: {
					js: ['<%= FEP.dist %>/**/lib/**/*js']
					/** Scan js-files in app/src/ directory and subdirectories. **/
				}
			},
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
				}
			},
			connect: {
				server:{
					options: {
						//open: true,
						port: 9000,
						base: '<%= FEP.dist %>',
						keepalive: true,
						//livereload: true,
						hostname  : "*"
					}

				}
			}
			//"serve": {
			//	"options":{
			//		"port": 9009,
			//		"silently": false
			//	}
			//	,"path": "/Users/p276094/Development/FE-Patterns/dist"
			//}

		}
	);

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-less" );
	grunt.loadNpmTasks( "grunt-highlight" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-retire" );
	grunt.loadNpmTasks( "grunt-shell" );
	grunt.loadNpmTasks( "grunt-traceur" );
	grunt.loadNpmTasks( "grunt-newer" );


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
	grunt.registerTask( 'custom', ['traceur:custom','connect:server:keepalive'] );
	grunt.registerTask( 'modules', ['newer:uglify:github','newer:uglify:npm','newer:copy','connect:server:keepalive'] );


	//console.log(__dirname,__filename);

};
