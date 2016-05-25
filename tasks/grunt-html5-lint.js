module.exports = function( grunt ) {
  'use strict';

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('html5lint', 'HTML5 validation', function() {
    grunt.config.requires('html5lint.view');
    grunt.config.requires('html5lint.template');

    var html5Lint = require('html5-lint');
    var nunjucks = require('nunjucks');
    var views = grunt.config('html5lint.views');
    var defaults = grunt.config('html5lint.defaults') || {};
    var files = grunt.config('html5lint.templates');
    var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(views));
    var done = this.async();
    var pending = files.length;
    var errors = 0;
    var ignoreList = grunt.config('html5lint.ignoreList') || [];

    function complete() {
      pending -= 1;

      if (!pending && !errors) {
        grunt.log
          .ok([
              files.length,
              ' file',
              files.length === 1 ? '' : 's',
              ' lint free.'
            ].join(''));
      }

      done(errors);
    }

    files.forEach(function(file) {
      var html = env.getTemplate(file).render(defaults);

      html5Lint(html, function(err, results) {
        if (err) {
          return grunt.fatal('Unable to connect to validation server.');
        }

        if (results.messages.length) {
          grunt.log.subhead(file);

          results.messages.forEach(function(msg) {
            var type = msg.type; // error or warning
            var message = msg.message;
            var formatted = [
                            '  ',
                            type,
                            ': ',
                            message
                          ].join('');

            var ignored = ignoreList.some(function(ignore) {
              return ignore === message;
            });

            if (!ignored) {
              if (type === 'error') {
                errors += 1;
                grunt.log.error(formatted);
              } else if ( type !== 'ignored') {
                grunt.fail.warn(formatted);
              }
            }
          });
        }

        complete();
      });
    });
  });
};
