// Generated on 2014-09-23 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  
  var serveStatic = require('serve-static');
//  var serveIndex = require('serve-index');

  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-ts');

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // get the host parameter from the command line
  var host = grunt.option('host') || 'localhost';

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    injector: {
      options: {
        addRootSlash: false,
        ignorePath: './'
      },
      dependencies: {
        files: {
          'app/index.html': ['./bower_components/**/*.js']
        }
      }
    },
    
    ngdocs: {
      all: ['app/modules/**/*.js'],
      options: {
	  title: "LCS Simulator Client Documentation",
	  scripts: ['bower_components/angular/angular.min.js']
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      ts: {
        files: [ 'app/**/*.ts' ],
        tasks: [ 'ts' ],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      js: {
        files: ['app/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['app/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'app/{,*/}*.html',
          'app/{,*/}*.css',
          'app/{,*/}*.js',
          'app/modules/**/*.html',
          '.tmp/**/*.css',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
	// 'serve': {
  //   'path': './app'
	// }
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              // redirect rest calls to the backend server
//              require('connect-modrewrite')(['^/rest http://localhost:18080/rest [P L]',
//                                             //'!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif|\\.woff|\\.woff2$ /index.html']),
              
              // yeoman generated code
              serveStatic('.tmp'),
              connect().use(
                '/bower_components',
                serveStatic('./bower_components')
              ),
              connect().use(
                '/node_modules',
                serveStatic('./node_modules')
              ),
              serveStatic('app'),
              serveStatic(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              serveStatic('.tmp'),
              serveStatic('test'),
              connect().use(
                '/bower_components',
                serveStatic('./bower_components')
              ),
              serveStatic(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: 'dist'
        }
      }
    },
    
    ts: {
      default: {
        src: [ '**/*.ts', '!node_modules/**' ],
        outDir: 'app/modudes/ts'
	// src: [ 'app/scripts/**/*.ts', '!node_modules/**' ]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'app/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/{,*/}*',
            '!dist/.git*',
	    'app/modules/ts'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['app/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['app/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'app/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: 'app/images',
        javascriptsDir: 'app/scripts',
        fontsDir: 'app/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: 'dist/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          'dist/scripts/{,*/}*.js',
          'dist/styles/{,*/}*.css',
          //'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'dist/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['dist','dist/images']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: 'dist/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.svg',
          dest: 'dist/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['*.html', 
            'views/{,*/}*.html', 
            'modules/**/*.html',
            'bower_components/**/*.html'
          ],
          dest: 'dist'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'modules/**/*.html',
            'images/{,*/}*.{webp}',
            'public/{,*/}*.html',
            'public/{,*/}*.jsp',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: 'dist/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: [
            'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
            'bower_components/modules/**/*.html'
          ],
          dest: 'dist'
        }]
      },
      styles: {
        expand: true,
        cwd: 'app/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
//        'compass:server'
      ],
      test: [
//        'compass'
      ],
      dist: [
//        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },
    
    protractor: {
      options: {
        keepAlive: true,
        configFile: 'test/protractor.conf.js',
        noColor: false,
        args: {}
      },
      gruntServe: {
        options: {
          args: {
            baseUrl: 'http://localhost:9000',
            seleniumAddress: 'http://localhost:4444/wd/hub',
	    params: {
	      restBaseUrl: 'http://localhost:8080',
	    }
          }
        }
      },
      wildfly: {
        options: {
          args: {
            baseUrl: 'http://localhost:8080',
            seleniumAddress: 'http://localhost:4444/wd/hub',
	    params: {
	      restBaseUrl: 'http://localhost:8080',
	    }
          }
        }
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('testUnit', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);
  
  grunt.registerTask('testGruntServe', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'protractor:gruntServe'
  ]);
  
  grunt.registerTask('testWildfly', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'protractor:wildfly'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ts',
    'wiredep',
    'injector',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'ngdocs',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'ts',
    'newer:jshint',
    'test',
    'build'
  ]);
};
