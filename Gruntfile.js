module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({
    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['index.html']
      }
    },

    // Checks js files
    jshint: {
      all: ['Gruntfile.js', 'scripts/*.js']
    },

    watch: {
      scripts: {
        files: ['Gruntfile.js', 'scripts/*.js'],
        tasks: ['jshint'],
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '*.html',
          'scripts/*.js'        
        ]
      }
    },

    connect: {
      options: {
        port: 9001,
        hostname: 'localhost',
        livereload: 36729
      },
       livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static('./')
            ];
          }
        }
      },
      server: {
        options: {
          middleware: function(connect) {
            return [
              require('connect-livereload')(),
              connect.static('./')
            ];
          }
        }
      }
    },

    useminPrepare: {
      html: 'index.html',
      options:{
        root:'.',
        dest: 'dist'
      }
    },

    filerev: {
      dist: {
        src: [
          'dist/scripts/*.js',
          'dist/styles/*.css',
        ]
      }
    },

    copy: {
      index: {
        src: 'index.html',
        dest: 'dist/index.html',
      },
    },

    usemin: {
      html: 'dist/index.html'
    }
  });

  grunt.registerTask('livereload', [
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('build', [
  'useminPrepare',
  'concat:generated',
  'cssmin:generated',
  'uglify:generated',
  'filerev',
  'copy:index',
  'usemin'
]);

};
