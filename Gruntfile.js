//require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks // leftover from babel, not needed because of grunt.loadNpmTasks ?

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // ---------------------------------------------------------------- babel
    "babel": {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "sketch.js": "src/sketch.js"
        },
      },
    },
    // ---------------------------------------------------------------- grunt-contrib-watch
    watch: {
      options: {
        livereload: true,
      },
      src: {
        files: ['src/*'],
        tasks: ['default'],
      }
    },
    // ---------------------------------------------------------------- grunt-contrib-connect
    connect: {
      //uses_defaults: {}
      server: {
        options: {
          //port: 8000,
          //base: '.',
          //protocol: 'http',
          livereload: true,
          open: true,
        }
      }
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // Default task(s).
  grunt.registerTask("default", ["babel"]);
  grunt.registerTask("serve", ["connect", "watch"]);
};
