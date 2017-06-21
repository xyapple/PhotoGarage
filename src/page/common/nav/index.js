'use strict';
require('./index.css');
var _pg = require('util/pgTool.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');


var nav ={
    init: function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function(){
        //login click
        $('.js-login').click(function(){
            _pg.doLogin();
        });
        //rigister click
        $('.js-register').click(function(){
            window.location.href='./register.html'
        });
        //logout click
        $('js-logout').click(function () {
            _user.logout(function(res){
                window.location.reload();
            }, function(){
            _pg.failResponse(errMsg);
            });

        })

    },
    //load user info
    loadUserInfo: function(){
        _user.checkLogin(function(res){
            $('.user.before-login').hide().siblings('.user.login').show()
            .find('.username').text(res.username);
        }, function(){
            //do nothing
        });
    },

    //load shoping cart
    loadCartCount: function(){
        _cart.getCartCount(function (res) {
            $('.nav .cart-count').text(res || 0);
        }, function (errMsg) {
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();
