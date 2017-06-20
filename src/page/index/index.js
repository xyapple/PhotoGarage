
'use strict'

var _pg = require('util/pgTool.js');

var html='<div>{{data}}</div>';
var data ={
    data : 'test'
}
console.log(_pg.renderHtml(html, data));
