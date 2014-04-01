"use strict";

var grunt = require("grunt");
var expect = require("expect.js");

describe("grunt seajs config", function() {
    it("should generate correct seajs config file", function() {
        var expected = grunt.file.read("test/expected/seajs_config.js");
        var result = grunt.file.read("tmp/seajs_config.js");
        expect(result).to.equal(expected);
    })
})

