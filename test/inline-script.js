/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

"use strict";

var esprima = require("./3rdparty/esprima-1.0.0-dev"),
  escodegen = require("./loader"),
  chai = require("chai"),
  expect = chai.expect,
  fixtures;

function slug(name) {
  return name.toLowerCase().replace(/\s/g, "-");
}

function adjustRegexLiteral(key, value) {
  if (key === "value" && value instanceof RegExp) {
    value = value.toString();
  }
  return value;
}

fixtures = {
  "generate with escaped closing script tag": {
    call: "generate",
    args: [
      {
        type: "Program",
        start: 3,
        end: 37,
        body: [
          {
            type: "VariableDeclaration",
            start: 3,
            end: 37,
            declarations: [
              {
                type: "VariableDeclarator",
                start: 7,
                end: 36,
                id: {
                  type: "Identifier",
                  start: 7,
                  end: 12,
                  name: "test",
                },
                init: {
                  type: "Literal",
                  start: 15,
                  end: 36,
                  value: "</script>",
                  raw: '"\\u003c/script\\u003e"',
                },
              },
            ],
            kind: "var",
          },
        ],
        sourceType: "script",
        comments: [],
      },
      {
        format: {
          escapeScriptClosingTag: true
        }
      }
    ],
    result: `var test = '<\\/script>';`,
  },
};

function testAPI(code, result) {
  var expected, res, actual;
  expected = JSON.stringify(result.result, null, 4);
  if (typeof result.property !== "undefined") {
    res = escodegen[result.property];
  } else {
    res = escodegen[result.call].apply(escodegen, result.args);
  }
  actual = JSON.stringify(res, adjustRegexLiteral, 4);
  expect(actual).to.be.equal(expected);
}

describe("API test", function () {
  Object.keys(fixtures).forEach(function (key) {
    it(key, function () {
      testAPI(key, fixtures[key]);
    });
  });
});
/* vim: set sw=4 ts=4 et tw=80 : */
