"use strict";

module.exports = function( grunt ) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        "Gruntfile.js",
        "tasks/*.js"
      ],
      options: {
        jshintrc: ".jshintrc",
      }
    },
    nodeunit: {
    all: [ "test/*_test.js" ],
      options: {
        reporter: "tap"
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks( "tasks" );

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks( "grunt-contrib-nodeunit" );
  grunt.loadNpmTasks( "grunt-contrib-jshint" );

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  // By default, lint and run all tests.
  grunt.registerTask( "default", [ "jshint" ] );

  grunt.registerTask( "test", [ "jshint", "nodeunit" ] );

};
