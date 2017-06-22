'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');
var _pg = require('util/pgTool.js');

$(function(){
    var type = _pg.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
        
    //show the default for now
    $element.show();
});
