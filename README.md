# grunt-seajs-config

* 生成seajs config文件的grunt插件, 用于生成seajs config的map选项来保证自动更新所有的cmd模块, 这个插件会遍历指定的文件列表,
    然后将文件中的第1个define的id取出，同时计算文件内容的摘要信息，这样保证了有更新的文件才会修改版本号，同时免去了手动修改版本号的烦恼。
* 生成的文件类似于:
```js
    seajs.config({
        "map": [
            [
                "id",
                "id?765858dd7574523a7b2385e20956c5d2ba3eb198"
            ]
        ]
    })
```

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-seajs-config --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-seajs-config');
```

## The "seajs_config" task

### Overview
In your project's Gruntfile, add a section named `seajs_config` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  seajs_config: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.src
Type: `String`
Default value: `null`

The original seajs config file which you what concat. if null, a new file will be created

#### options.dest
Type: `String`
Default value: `dist/seajs_config.js`

The target seajs config file path.

### Usage Examples
下面的例子中会遍历files.src中的文件，并将提取后的配置生成到tmp/seajs_config.js，若已有seajs_config文件，可设置上options.src，
这样会合并后一起生成。

```js
grunt.initConfig({
  seajs_config: {
    options: {
    	dest: "tmp/seajs_config.js"
    }
    files: {
        // 需要提取的cmd文件
        src: ["test/fixtures/seajs_module.js"]
    },
  },
});
```

## Release History
* 2014-04-01   v0.1.0        支持上seajs map配置信息的自动生成
