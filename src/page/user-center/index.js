'use strict'
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _pg = require('util/pgTool.js');
var _user  = require('service/user-service.js');
var templateIndex   = require('./index.string');


var page={
    init: function () {
        this.onLoad();

    },
    onLoad: function(){
        navSide.init({
            name:'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _pg.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _pg.failResponse(errMsg);
        });
    }
}
$(function () {
        page.init();
})
