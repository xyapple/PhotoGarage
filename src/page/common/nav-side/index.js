'use strict';
require('./index.css');
var _pg = require('util/pgTool.js');
var templateIndex   = require('./index.string');


//nav-sider bar
var navSide = {
    option: {
        name: '',
        navList:[
            {name: 'user-center', desc: 'User Center', href: './user-center.html'},
            { name: 'order-list', desc: 'My Order', href: './order-list.html'},
        {name: 'user-pass-update', desc: 'Change Password', href: './user-pass-update.html'},
        { name: 'about',desc: 'About PhotoGarage',href: '../about.html'}
    ]

    },
    init: function(option){
        //合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    //render sidebar
    renderNav: function(){
        //计算Active 数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        //render list数据 from index.string templateIndex
        var navHtml = _pg.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        $('.nav-side').html(navHtml);

    }

};

module.exports = navSide;
