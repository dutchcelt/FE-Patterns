module.exports = function( grunt ){
	"use strict";

	// Project configuration.
	grunt.initConfig(
		{

			// Metadata.
			pkg        : grunt.file.readJSON( 'package.json' ),
			banner     : '/*!\n' +
			             ' * <%= pkg.name %> v<%= pkg.version %> by @dutchcelt\n' +
			             ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
			             ' * <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
			             ' */\n',

			pages: grunt.file.readYAML( '_assemble.yml' ),

			FEP: {
				app : 'app',
				dist: 'dist',
				lib: 'lib',
				temp: '.tmp'
			},

			watch  : {
				styles    : {
					files: ['<%= FEP.app %>/styles/less{,*/}*.less'],
					tasks: ['styles']
				},
				es6       : {
					files: '<%= FEP.app %>/**/*.js',
					tasks: 'modules'
				}
				//livereload: {
				//	options: {
				//		livereload: '<%= connect.options.livereload %>'
				//	},
				//	files  : [
				//		//'<%= FEP.app %>/*.html',
				//		'<%= FEP.app %>/styles/css/{,*/}*.css',
				//		'<%= FEP.app %>/scripts/minified/{,*/}*.js',
				//		'<%= FEP.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				//	]
				//}
			},
			clean : [ './<%= FEP.dist %>' ],

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

			less  : {
				dist: {
					options: {
						plugins: [
							new (require('less-plugin-autoprefix'))({
								browsers: ["last 3 versions"]
							}),
							new (require('less-plugin-clean-css'))({keepSpecialComments:0})
						]

					},
					files  : [
						{
							"<%= FEP.dist %>/styles/css/main.css": "<%= FEP.app %>/styles/less/main.less"
						}
					]
				}
			},
			uglify: {

				fep    : {
					options: {
						banner: '<%= banner %>\n\n'
					},
					files  : [
						{
							expand : true,
							cwd: '<%= FEP.temp %>',
							src    : 'scripts/**/*.js',
							dest   : '<%= FEP.dist %>'//,
							//flatten: true,
							//filter : 'isFile'
						}
					]
				},
				github:{
					options : {
						mangle: false
					},
					files : [{
						expand : true,
						//cwd: './',
						src:[
							'./<%= FEP.lib %>/*.js',
							'./<%= FEP.lib %>/github/**/*.js',
							'!./<%= FEP.lib %>/**/*.@(min|src).js',
							'!./<%= FEP.lib %>/**/*-es6.js'
						],
						dest:'./<%= FEP.dist %>'
					}]
				},
				npm:{
					options : {
						mangle: false
					},
					files : [{
						expand : true,
						//cwd: './',
						src:[
							'./<%= FEP.lib %>/npm/@(domready*|font-awesome*|mustache*)/{,*/}*.js',
							'!./<%= FEP.lib %>/**/*.@(min|src).js'
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
							'./styles/**/*.@(js|css|eot|svg|ttf|woff|woff2|otf)',
						],
						dest:'<%= FEP.dist %>'
					}]
				},
				lib: {
					files: [{
						expand: true,
						cwd: './',
						src:[
							'./<%= FEP.lib %>/**/*.@(js|css|eot|svg|ttf|woff|woff2|otf)',
							'!./<%= FEP.lib %>/**/*.@(min|src).*'
						],
						dest:'<%= FEP.dist %>'
					}]
				},
				config: {
					files: [{
						src:[
							'./config.js'
						],
						dest:'<%= FEP.dist %>/config.js'
					}]
				}
			},

			retire: {
				app : {
					js: ['<%= FEP.app %>/**/*js']
					/** Scan js-files in app/src/ directory and subdirectories. **/
				},
				lib: {
					js: ['<%= FEP.lib %>/**/*js']
					/** Scan js-files in app/src/ directory and subdirectories. **/
				}
			},
			traceur: {
				options: {
					modules: 'instantiate'
				},
				custom: {
					files: [{
						"src":  ['<%= FEP.lib %>/test-es6.js'],
						"dest": '<%= FEP.dist %>/lib/test-es6.js'
					}]
				},
				scripts: {
					files: [{
						expand: true,
						cwd: './<%= FEP.app %>',
						"src":  ['scripts/**/*.js'],
						"dest": '<%= FEP.temp %>'
					}]
				}
			},
			systemjs: {
				options: {
					sfx: false,
					//baseURL: './',
					configFile: "./config.js",
					modules: 'instantiate',
					minify: false,
					build: {
						mangle: false
					}
				},
				dist: {
					files: [{
						//expand: true,
						//cwd: './<%= FEP.app %>',
						"src":  '<%= FEP.lib %>/test-es6.js',
						"dest": '<%= FEP.dist %>/<%= FEP.lib %>/test-es5.js'
					}]
				}
			},
			connect: {
				server:{
					options: {
						//open: true,
						port: 9000,
						base: {
							options: {
								index: 'index.html'
							},
							path:  __dirname + '/<%= FEP.dist %>'
						},
						//keepalive: true,
						//livereload: true,
						hostname  : "*"
					}

				}
			}

		}
	);

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	//grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-less" );
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks( "grunt-highlight" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-retire" );
	//grunt.loadNpmTasks( "grunt-shell" );
	//grunt.loadNpmTasks("grunt-systemjs-builder");
	grunt.loadNpmTasks( "grunt-traceur" );
	//grunt.loadNpmTasks( "grunt-babel" );
	grunt.loadNpmTasks( "grunt-newer" );
	//grunt.loadNpmTasks('grunt-postcss');



	//grunt.registerTask( 'custom', ['systemjs','connect:server:keepalive'] );
	grunt.registerTask( 'styles', [ 'less:dist' ] );
	grunt.registerTask( 'modules', [ 'newer:traceur', 'newer:uglify:fep','newer:uglify:github','newer:uglify:npm'] );
	grunt.registerTask( 'serve', ['connect:server', 'watch'] );

	grunt.registerTask( 'default', [ 'styles', 'modules', 'newer:copy', 'serve' ] );
	grunt.registerTask( 'build', [ 'retire', 'clean', 'default' ] );


	//console.log(__dirname,__filename);

};
