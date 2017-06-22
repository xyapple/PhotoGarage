'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');
var _pg = require('util/pgTool.js');
// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page 逻辑部分
var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 验证username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            // 如果用户名为空，我们不做验证
            if(!username){
                return;
            }
            // 异步验证用户名是否存在
            _user.checkUsername(username, function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            });
        });
        // 注册按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            // keyCode == 13 表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        var formData = {
                username        : $.trim($('#username').val()),
                password        : $.trim($('#password').val()),
                passwordConfirm : $.trim($('#password-confirm').val()),
                phone           : $.trim($('#phone').val()),
                email           : $.trim($('#email').val()),
                question        : $.trim($('#question').val()),
                answer          : $.trim($('#answer').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }

    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证用户名是否为空
        if(!_pg.validate(formData.username, 'require')){
            result.msg = 'User Name Cannot be empty';
            return result;
        }
        // 验证密码是否为空
        if(!_pg.validate(formData.password, 'require')){
            result.msg = 'Password Cannot be empty';
            return result;
        }
        // 验证密码长度
        if(formData.password.length < 6){
            result.msg = 'Password at lease 6 digite long';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.password !== formData.passwordConfirm){
            result.msg = 'Password does not match';
            return result;
        }
        // 验证手机号
        if(!_pg.validate(formData.phone, 'phone')){
            result.msg = 'Invalided phone number';
            return result;
        }
        // 验证邮箱格式
        if(!_pg.validate(formData.email, 'email')){
            result.msg = 'Invalided Email address';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_pg.validate(formData.question, 'require')){
            result.msg = 'Question cannot be empty';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_pg.validate(formData.answer, 'require')){
            result.msg = 'Answer cannot be empty';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = 'validation success';
        return result;
    }
};
$(function(){
    page.init();
});
