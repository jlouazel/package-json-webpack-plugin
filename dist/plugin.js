!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e){return new Promise(function(t,n){c.default.readFile(e,"utf8",function(e,o){e&&n(e),t(JSON.parse(o))})})}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(1),c=o(a),f=n(2),l=o(f),s=function(){function e(t){r(this,e),this.options=t}return i(e,[{key:"apply",value:function(e){var t={context:e.options.context,output:e.options.output.path,written:e.options.written,filename:e.options.output.filename},n=l.default.resolve(t.output,"package.json");e.plugin("emit",function(e,o){u(l.default.resolve(t.context,"package.json")).then(function(e){var r={name:e.name,version:e.version,author:e.author,main:t.filename,repository:e.repository,licence:e.licence};c.default.existsSync(t.output)||c.default.mkdirSync(t.output),c.default.writeFile(n,JSON.stringify(r,null,2)+"\n",function(){o()})}).catch(function(e){console.error(e)})})}}]),e}();t.default=s,e.exports=t.default},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")}]);