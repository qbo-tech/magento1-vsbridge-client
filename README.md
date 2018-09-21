# Magento 1 VSBridge client (Use with vue-storefront-api)

This Node.js library enables JavaScript applications to communicate with Magento 1 sites using a custom VSBridge Controller.
This module based on the magento2-rest-client module created by Marko Novak (2016).

This module is used by the [Vue Storefront - first Progressive Web App for eCommerce](https://github.com/DivanteLtd/vue-storefront-api).

**NOTE: the library is not finished yet! Only a subset of Magento2 API is currently implemented.**

## Installation

The library can be installed using the Npm package manager:

```
    npm install --save github:qbo-tech/magento1-vsbridge-client
```

## Usage

The code sample below shows the usage of the library:

```javascript
    var MagentoClient = require('magento1-vsbridge-client').MagentoClient;

    var options = {
          'url': 'http://www.test.com/index.php/vsbridge/order'
    };
    var client = MagentoClient(options);
    client.order(null, cartId, orderData)
        .then(function (order) {
            assert.equal(order.incrementId, 1);
        })
```
# magento1-vsbridge-client
