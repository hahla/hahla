// Generated on 2014-01-07 using generator-webapp 0.4.4
// TODO: consider trying this https://github.com/ngbp/ngbp
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  //  require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        project: "hahla",
        connect: {
            server: {
              options: {
                port: 9001,
                base: 'dist'
              }
            }
        },
        karma: {
            simple: {
                configFile: 'conf/karma-simple.conf.js',
                autoWatch: false,
                singleRun: true
            },
            unit: {
                configFile: 'conf/karma-unit.conf.js',
                autoWatch: false,
                singleRun: true
            },
            e2e: {
                configFile: 'conf/karma-e2e.conf.js',
                autoWatch: true,
                singleRun: false
            }
        },
        // configurable paths
        yeoman: {
            app: 'client',
            dist: 'dist'
        },
        less: {
            dev: {
                // options: {
                //     compress: false,
                //     yuicompress: false,
                //     optimization: 2
                // },
                files: {
                    "<%= yeoman.app %>/css/hahla.css": "<%= yeoman.app %>/css/*.less"
                }
            }
        },
        watch: {
            dev: {
                files: ['<%= yeoman.app %>/{,**/}*.{less,html,js,css}'],
                tasks: ['less', 'build-dev'],
                options: {
                    livereload: true
                }
            },
            prod: {
                files: ['<%= yeoman.app %>/{,**/}*.{less,html,js}'],
                tasks: ['less', 'build']
            }
        },
        develop: {
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>',
                    livereload: false
                }
            },
            testserver: {
                options: {
                    port: 9999
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                root: './', // bower task installs things in dist/js
                dest: '<%= yeoman.dist %>'
            },
            html: {
                src: '<%= yeoman.app %>/index.html'
            }
        },
        usemin: {
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        bower: {
          dev: {
            dest: '<%= yeoman.dist %>/js'
          }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [ '**' ]
                    //     '*.{ico,png,txt}',
                    //     '.htaccess',
                    //     'images/{,*/}*.{webp,gif}',
                    //     'styles/fonts/{,*/}*.*',
                    //     'bower_components/sass-bootstrap/fonts/*.*'
                    // ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        uglify: {
            options: {
                compress: { drop_console: true },
                preserveComments: false,
                mangle: false // todo in future, gives another boost
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
/*            'autoprefixer', */
            'connect',
            'watch:dev'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'less:dev',
        'bower',
        'copy:dist',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'rev',
        'usemin',
    ]);

    grunt.registerTask('build-dev', [
        'clean:dist',
        'less:dev',
        'bower',
        'copy:dist',
        'rev',
    ]);
    grunt.registerTask('watch-dev', ['watch:dev']);

    grunt.registerTask('default', [
        'test',
        'build'
    ]);
};
