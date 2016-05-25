# grunt-html5-lint

> HTML5 validation

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html5-lint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html5-lint');
```

### Usage Examples

#### Default Options
In your project's Gruntfile, add a section named `grunt-html5-lint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'grunt-html5-lint': {
    views: 'value' // The value in this key:value pair refer to where your template dir
    defaults: {
      // if you have used nunjucks and wanted to pass defaults value to the objects
      // for example:
      'email': 'a@a.com',
      'username': 'abcd'
    },
    templates: [
      'index.html', // files that you want to be check
      'layout.html'
    ],
    ignoreList: [
      // the format of ignoreList is in the array format
      'message to be ignored',
      'another message'
      // you can simply copy the message you got from the returned on the console
      //for example this
      'Bad value “” for attribute “action” on element “form”: Must be non-empty.'
    ]
  }
})
```
