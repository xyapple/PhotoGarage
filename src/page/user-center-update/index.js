'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _pg = require('util/pgTool.js');
var _user  = require('service/user-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户信息
                _user.updateUserInfo(userInfo, function(res, msg){
                    _pg.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _pg.errorTips(errMsg);
                });
            }
            else{
                _pg.errorTips(validateResult.msg);
            }
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _pg.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _pg.errorTips(errMsg);
        });
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证手机号
        if(!_pg.validate(formData.phone, 'phone')){
            result.msg = 'Phone number does not match';
            return result;
        }
        // 验证邮箱格式
        if(!_pg.validate(formData.email, 'email')){
            result.msg = 'Email does not match';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_pg.validate(formData.question, 'require')){
            result.msg = 'Question can not be empty';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_pg.validate(formData.answer, 'require')){
            result.msg = 'Answer can not be empty';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = 'success';
        return result;
    }
};
$(function(){
    page.init();
});
