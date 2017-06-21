'use strict'

var hogan = require('hogan.js');

var conf = {
    serverHost : ''
}
var _pg        = {
  request: function(param) {
      var _this = this;
    $.ajax({
          type     : param.method || 'get',
          url      : param.url || '',
          dataType : param.type || 'json',
          data     : param.data || '',
          success  : function(res){
              //success
            if(0 === res.status){
                typeof param.success === 'function' && param.success(res.data, res.msg);

              }
              //not success
            else if(10 === res.status){
                _this.doLogin();
              }
              //data type error
            else if(1 === res.status){
                typeof param.error === 'function' && param.error(res.msg)
             }
          },
          error    : function(error){
                typeof param.error === 'function' && param.error(error.status)
          }
    });
},
//get server(服务器地址)
getServerUrl: function(path){
    return conf.serverHost + path;
},
// get url
getUrlParam: function(name){
    //google.com/product/list?keyword=xxx&page=1
    //get 'ketword=xxx&page=1'
    var reg    = new RegExp('(^|&)' + name + ' =([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
},
//render html template by hogan
renderHtml: function(htmlTemplate, data){
    var template    = hogan.compile(htmlTemplate)
     var result       = template.render(data);
    return result;
},
// success response for user login
successResponse : function(msg){
    alert(msg || 'U had completed');
},
//fails response for user login
failResponse: function(errMsg){
    alert(errMsg || 'Please try again');
},
//form validation: non-null, number, email
validate: function(value, type){
 var value = $.trim(value);
 //非空验证
     if('require' === type){
         return !!value;
     }
 //手机号
     if('phone' === type){
         var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return phoneNumberPattern.test(value);
     }
 //email
 if('email' === type){
     var regEmail= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return regEmail.test(value)
 }
},
// after login window change
doLogin : function(){
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
},
//return home
returnHome: function () {
    window.location.href = './index.html';

}
};

module.exports = _pg;
