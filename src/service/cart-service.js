'use strict'
var _pg = require('util/pgTool.js');

var _cart = {

    //cart cart count
    getCartCount: function (resolve, reject) {
        _pg.request({
            url: _pg.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    }
};
module.exports = _cart;
