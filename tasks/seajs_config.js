/*
 * grunt-seajs-config
 * https://github.com/chenboxiang/grunt-seajs-config
 *
 * Copyright (c) 2014 boxiang chen
 * Licensed under the MIT license.
 */
"use strict";

module.exports = function(grunt) {
    var cmd = require("cmd-util");
    var ast = cmd.ast;
    var crypto = require("crypto");

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask("seajsConfig", "生成seajs config文件的grunt插件", function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            // 要处理的文件路径 默认不存在
//            src: "seajs_config.js",
            // 处理后生成的文件路径
            dest: "dist/seajs_config.js"
        });

        var srcData = "";
        if (options.src) {
            if (!grunt.file.exists(options.src)) {
                grunt.fail.warn("The src file which is specified in options is not exists.");

            } else {
                srcData = grunt.file.read(options.src);
            }
        }

        var seajsConfig = {
            map: []
        };

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var src = f.src[0];
            var data = grunt.file.read(src);

            grunt.log.verbose.writeln("Parse " + f.src);
            var astCache;
            try {
                astCache = ast.getAst(data);

            } catch (e) {
                grunt.log.error("js parse error " + f.src.red);
                grunt.fail.fatal(e.message + " [ line:" + e.line + ", col:" + e.col + ", pos:" + e.pos + " ]");
            }

            var meta = ast.parseFirst(astCache);

            if (!meta) {
                grunt.log.warn("found non cmd module " + f.src);
                // do nothing
                return;
            }

            if (!meta.id) {
                grunt.log.warn("The cmd module is not transport yet. [" + f.src + "]");
                return;
            }

            // 计算摘要信息
            var digest = crypto.createHash("sha1").update(data, "utf8").digest("hex");
            seajsConfig.map.push([meta.id, meta.id + "?" + digest]);
        });

        // 写入config文件
        var destData = srcData;
        destData += "\n;seajs.config(" + JSON.stringify(seajsConfig, null, 4) + ")";
        grunt.file.write(options.dest, destData);
        grunt.log.ok("The seajs config file [" + options.dest + "] created.");
    });

};
