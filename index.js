'use strict';

var HttpClient = require('./lib/vsbridge_client').HttpClient;
var order = require('./lib/order');
var cart = require('./lib/cart');

const MAGENTO_API_VERSION = 'V1';

module.exports.MagentoClient = function (options) {
    var instance = {
        addMethods (key, module) {
            var client = HttpClient(options);
            if (module) {
                if (this[key])
                    this[key] = Object.assign(this[key], module(client))
                else 
                    this[key] = module(client)
            }
        }
    };
    
    var client = HttpClient(options);
    instance.order = order(client);
    instance.cart = cart(client);

    return instance;
}
