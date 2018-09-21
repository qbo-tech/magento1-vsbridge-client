'use strict';

var MagentoClient = require('./lib/vsbridge_client').MagentoClient;
var cart = require('./lib/order');

const MAGENTO_API_VERSION = 'V1';

module.exports.MagentoVSBridgeClient = function (options) {
    var instance = {
        addMethods (key, module) {
            var client = MagentoClient(options);
            if (module) {
                if (this[key])
                    this[key] = Object.assign(this[key], module(client))
                else 
                    this[key] = module(client)
            }
        }
    };
    
    var client = MagentoClient(options);
    instance.order = order(client);

    return instance;
}
