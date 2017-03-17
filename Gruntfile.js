//require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks // leftover from babel, not needed because of grunt.loadNpmTasks ?

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "babel": {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "sketch.js": "src/sketch.js"
        }
      },
    },
    watch: {
      src: {
        files: ['src/*'],
        tasks: ['default']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask("default", ["babel"]);
};
