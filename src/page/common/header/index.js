'use strict';
require('./index.css');

var _pg = require('util/pgTool.js');

var header ={
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        var keyword = _pg.getUrlParam('keyword');

        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent: function(){
        var _this = this;
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });

        // 13是回车键的keyCode
        $('#search-btn').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
                console.log('hi')
            }
        });
    },
    //submit search
    searchSubmit: function(){
            var keyword = $.trim($('#search-input').val());
            //if keyword is good, render to list page
            if(keyword){
                window.location.href= './list.html?keyword=' + keyword;
                //if keyword is not here, return home page
            } else{
                _pg.renderHtml();
            }
    }

};

header.init();
