"use strict";

module.exports = function( grunt ) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask( "html5lint", "HTML5 validation", function() {
    grunt.config.requires( "html5lint.views" );
    grunt.config.requires( "html5lint.templates" );

    var html5Lint = require( "html5-lint" ),
        nunjucks = require( "nunjucks" ),
        views = grunt.config( "html5lint.views" ),
        defaults = grunt.config( "html5lint.defaults" ) || {},
        files = grunt.config( "html5lint.templates" ),
        env = new nunjucks.Environment( new nunjucks.FileSystemLoader( views ) ),
        done = this.async(),
        pending = files.length,
        errors = 0,
        ignoreList = grunt.config( "html5lint.ignoreList" ) || [];

    function complete() {
      pending--;
      if ( pending === 0 ) {
        var passed = errors === 0;
        if ( passed ) {
          grunt.log.ok( files.length + " file" + ( files.length === 1 ? "" : "s" ) + " lint free." );
        }
        done( passed );
      }
    }

    files.forEach( function( file ) {
      var html = env.getTemplate( file ).render( defaults );

      html5Lint( html, function( err, results ) {
        if ( err ) {
          grunt.fatal( "Unable to connect to validation server." );
          return;
        }
        if ( results.messages.length ) {
          grunt.log.subhead( file );
          results.messages.forEach( function( msg ) {
            var type = msg.type, // error or warning
                message = msg.message,
                formatted = "  " + type + ": " + message;

            var ignored = ignoreList.some( function( ignore ) {
              return ignore === message;
            });                

            if ( !ignored ) {            
              if ( type === "error" ) {
                errors++;
                grunt.log.error( formatted );
              } else if ( type !== "ignored" && type !== "error" ) {
                grunt.fail.warn( formatted );
              }
            }
          });
        }
        complete();
      });
    });
  });
};

