/* jshint node: true */

module.exports = function( grunt ){
	"use strict";

	require( 'load-grunt-tasks' )( grunt );

	// Project configuration.
	grunt.initConfig(
		{

			// Metadata.
			pkg        : grunt.file.readJSON( 'package.json' ),
			banner     : '///////////////////////////////////////////////////////////////////////////////\n' +
			             '/* <%= pkg.name %> v<%= pkg.version %> by @duthcelt */\n' +
			             '/* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n' +
			             '/* <%= _.pluck(pkg.licenses, "url").join(", ") %> */\n' +
			             '///////////////////////////////////////////////////////////////////////////////\n\n',
			jqueryCheck: 'if (!jQuery) { throw new Error(\"FE-Pattern requires jQuery\") }\n\n',

			FEP: {
				app : 'app',
				dist: 'dist'
			},

			watch  : {
				styles    : {
					files: ['<%= FEP.app %>/styles/less{,*/}*.less'],
					tasks: ['less:app']
				},
				scripts    : {
					files: ['<%= FEP.app %>/scripts/fep{,*/}*.js','<%= FEP.app %>/lib{,*/}*.js'],
					tasks: ['copy:app']
				},
				livereload: {
					options: {
						livereload: '<%= connect.options.livereload %>'
					},
					files  : [
						'<%= FEP.app %>/*.html',
						'<%= FEP.app %>/styles/css/{,*/}*.css',
						'<%= FEP.app %>/scripts/minified/{,*/}*.js',
						'<%= FEP.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
					]
				}
			},
			connect: {
				options   : {
					port      : 9000,
					livereload: 35729,
					// change this to '0.0.0.0' to access the server from outside
					hostname  : 'localhost'
				},
				livereload: {
					options: {
						open: true,
						base: '<%= FEP.app %>'
					}
				},
				test      : {
					options: {
						base: [
							'.tmp',
							'test',
							'<%= FEP.app %>'
						]
					}
				},
				dist      : {
					options: {
						open: true,
						base: '<%= FEP.dist %>'
					}
				}
			},
			clean  : {
				dist  : {
					files: [
						{
							dot: true,
							src: [
								'<%= FEP.dist %>/scripts/minified/*',
								'<%= FEP.dist %>/*',
								'!<%= FEP.dist %>/.git*'
							]
						}
					]
				},
				server: ['<%= FEP.app %>/scripts/minified/*'],
			},

			jshint: {
				options  : {
					jshintrc: 'js/.jshintrc'
				},
				gruntfile: {
					src: 'Gruntfile.js'
				},
				src      : {
					src: ['js/*.js']
				},
				test     : {
					src: ['js/tests/unit/*.js']
				}
			},
			less  : {
				app : {
					files: {
						"<%= FEP.app %>/styles/css/main.css": "<%= FEP.app %>/styles/less/main.less"
					}
				},
				dist: {
					options: {
						cleancss: true
					},
					files  : {
						"<%= FEP.dist %>/styles/css/main.css": "<%= FEP.app %>/styles/less/main.less"
					}
				}
			},
			uglify: {
				dist  : {
					files: [
						{
							expand : true,
							src    : ['.tmp/**/*.js','<%= FEP.app %>/lib/**/*.js','<%= FEP.app %>/scripts/fep/**/*.js'],
							dest   : '<%= FEP.dist %>/scripts/minified',
							flatten: true,
							filter : 'isFile'
						}
					]
				}
			},
			// Put files not handled in other tasks here
			copy  : {
				app  : {
					files: [
						{
							expand : true,
							dot   : true,
							cwd    : '.tmp',
							src    : [
								'**/fonts/*',
								'**/less/*'
							],
							dest   : '<%= FEP.app %>/styles'
						},
						{
							expand : true,
							//cwd    : '.tmp',
							src    : ['.tmp/**/*.js','<%= FEP.app %>/lib/**/*.js','<%= FEP.app %>/scripts/fep/**/*.js'],
							dest   : '<%= FEP.app %>/scripts/minified',
							flatten: true,
							filter : 'isFile'
						}

					]
				},
				dist: {
					files: [
						{
							expand : true,
							dot   : true,
							cwd    : '.tmp',
							src    : [
								'**/fonts/*',
								'**/less/*'
							],
							dest   : '<%= FEP.dist %>/styles'
						},
						{
							expand: true,
							dot   : true,
							cwd   : '<%= FEP.app %>',
							dest  : '<%= FEP.dist %>',
							src   : [
								'*.{ico,png,txt}',
								'styles/fonts/{,*/}*.{svg,woff,eot,ttf,otf,txt}',
								'styles/images/{,*/}*.{jpg,gif,png,webp}',
								'*.html',
								'images/{,*/}*.{webp,gif}'
							]
						}

					]
				}
			},

			qunit: {
				options: {
					inject: 'js/tests/unit/phantom.js'
				},
				files  : ['js/tests/*.html']
			},

			concurrent: {
				server: [
					'less:app'
				],
				dist  : [
					'less:dist'
				]
			},
			bower     : {
				install: {
					options: {
						targetDir     : '.tmp',
						cleanTargetDir: true,
						layout        : 'byComponent'
					}
				}
			}

		}
	);

	// Test task.
	//var testSubtasks = ['dist-css', 'jshint', 'qunit'];
	//grunt.registerTask( 'test', testSubtasks );


	grunt.registerTask( 'server', function( target ){
		if( target === 'dist' ){
			return grunt.task.run( ['build', 'connect:dist:keepalive'] );
		}

		grunt.task.run( [
			                'clean:server',
			                'bower',
			                'copy:app',
			                'less:app',
			                'concurrent:server',
			                'connect:livereload',
			                'watch'
		                ] );
	} );

	//  TODO: add QUnit testing
	/*
	 grunt.registerTask('test', [
	 'clean:server',
	 'concurrent:test',
	 'connect:test',
	 'qunit'
	 ]);
	 */

	grunt.registerTask( 'build', [
		'clean:dist',
		'bower',
		'concurrent:dist',
		'uglify:dist',
		'copy:dist',
		'less:dist'
		//, 'requirejs:dist'
	] );

	grunt.registerTask( 'default', [
		//'jshint',
		//'test', //  TODO: add QUnit testing
		'build'
	] );


}
;
