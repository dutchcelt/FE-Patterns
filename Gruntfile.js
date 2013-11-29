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
				scripts   : {
					files: ['<%= FEP.app %>/scripts/fep/modules/*.js', '<%= FEP.app %>/lib{,*/}*.js'],
					tasks: ['copy:app']
				},
				fep       : {
					files: '<%= FEP.app %>/scripts/fep/*.js',
					tasks: 'concat'
				},
				livereload: {
					options: {
						livereload: '<%= connect.options.livereload %>'
					},
					files  : [
						//'<%= FEP.app %>/*.html',
						'<%= FEP.app %>/styles/css/{,*/}*.css',
						'<%= FEP.app %>/scripts/minified/{,*/}*.js',
						'<%= FEP.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
					]
				}
			},
			connect: {
				options   : {
					livereload: true,
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
						"<%= FEP.dist %>/styles/css/main.css": "<%= FEP.dist %>/styles/less/main.less"
					}
				}
			},
			uglify: {
				default: {
					files: {
						'<%= FEP.app %>/scripts/minified/require_jquery.js': ['<%= FEP.app %>/scripts/global/prepend.js', '.tmp/requirejs/js/require.js', '.tmp/jquery/jquery.js' ]
					}
				},
				fep   : {
					options: {
						banner   : '<%= banner %>\n\n'
					},
					files: [
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
							'<%= FEP.dist %>/scripts/minified/require_jquery.js': ['<%= FEP.app %>/scripts/global/prepend.js', '.tmp/requirejs/js/require.js', '.tmp/jquery/jquery.js' ]
						},
						{
							expand : true,
							src    : ['.tmp/**/*.js', '<%= FEP.app %>/lib/**/*.js', '<%= FEP.app %>/scripts/minified/main.js'],
							dest   : '<%= FEP.dist %>/scripts/minified',
							flatten: true,
							filter : 'isFile'
						}
					]
				}
			},
			concat: {
				options: {
					separator: ';\n\n',
					banner   : '<%= banner %>'
				},
				default: {
					src : [
						'<%= FEP.app %>/scripts/fep/*.js'

					],
					dest: '<%= FEP.app %>/scripts/minified/main.js'
				}
			},
			// Put files not handled in other tasks here
			copy  : {
				app : {
					files: [
						{
							expand: true,
							dot   : true,
							cwd   : '.tmp',
							src   : [
								'**/fonts/*',
								'**/*.less'
							],
							dest  : '<%= FEP.app %>/styles'
						},
						{
							expand : true,
							src    : ['.tmp/**/*.js', '<%= FEP.app %>/lib/**/*.js', '<%= FEP.app %>/scripts/fep/modules/*.js'],
							dest   : '<%= FEP.app %>/scripts/minified',
							flatten: true,
							filter : 'isFile'
						}

					]
				},
				dist: {
					files: [
						{
							expand: true,
							dot   : true,
							cwd   : '.tmp',
							src   : [
								'**/fonts/*',
								'**/*.less'
							],
							dest  : '<%= FEP.dist %>/styles'
						},
						{
							expand: true,
							dot   : true,
							cwd   : '<%= FEP.app %>',
							dest  : '<%= FEP.dist %>',
							src   : [
								'*.{ico,png,txt}',
								'lib/{,*/}*.js',
								'lib/{,*/}*.css',
								'styles/less/*',
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
					'uglify:default',
					'less:app'
				],
				dist  : [
					'uglify:fep',
					'uglify:dist',
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
			},
			retire    : {
				app : {
					js: ['<%= FEP.app %>/**/minified/*js'] /** Scan js-files in app/src/ directory and subdirectories. **/
				},
				dist: {
					js: ['<%= FEP.dist %>/**/minified/*js'] /** Scan js-files in app/src/ directory and subdirectories. **/
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
			                'concat:default',
			                'copy:app',
			                'concurrent:server',
			                'retire:app',
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
		'concat:default',
		'copy:dist',
		'concurrent:dist',
		'retire:dist'
		//, 'requirejs:dist'
	] );

	grunt.registerTask( 'default', [
		//'jshint',
		//'test', //  TODO: add QUnit testing
		'build'
	] );


}
;
