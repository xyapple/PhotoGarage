'use strict';

var _pg = require('util/pgTool.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _pg.request({
            url     : _pg.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _pg.request({
            url     : _pg.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;
