'use strict'

var _pg = require('util/pgTool.js');

var _user = {
    //check user login
    checkLogin: function (resolve, reject) {
        _pg.request({
            url: _pg.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },

    //user logout
    logout: function (resolve, reject) {
        _pg.request({
            url: _pg.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}
module.exports = _user
