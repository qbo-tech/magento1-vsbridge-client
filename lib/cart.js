function isNumeric(val) {
    return Number(parseFloat(val)).toString() === val;
}

module.exports = function (restClient) {
    var module = {};
    
    module.create = function (customerToken, customerId = null) {
        if (customerId) {
            return restClient.post('/customers/' + customerId + '/carts', {}, customerToken);
        } else {
            if (customerToken) {
                return restClient.post('/carts/mine', {}, customerToken);
            } else 
            {
                return restClient.post('/guest-carts');
            }
        }
    }    

    module.update = function (customerToken, cartId, cartItem, adminRequest = false) {
        if (adminRequest) {
            return restClient.post('/carts/' + cartId + '/items/', { cartItem: cartItem });
        } else {
            if (customerToken && isNumeric(cartId)) {
                return restClient.post('/carts/mine/items', { cartItem: cartItem }, customerToken);
            } else 
            {
                return restClient.post('/guest-carts/' + cartId + '/items', { cartItem: cartItem });
            }
        }
    }    
 
    module.delete = function (customerToken, cartId, cartItem, adminRequest = false) {
        if (adminRequest) {
            return restClient.delete('/carts/' + cartId + '/items/' + cartItem.item_id);
        } else {
            if (customerToken && isNumeric(cartId)) {
                return restClient.delete('/carts/mine/items/' + cartItem.item_id, customerToken);
            } else 
            {
                return restClient.delete('/guest-carts/' + cartId + '/items/' + cartItem.item_id);
            }
        }
    }     

    module.pull = function (customerToken, cartId, params, adminRequest = false) {
        if (adminRequest) {
            return restClient.get('/carts/' + cartId + '/items/');
        } else {
            if (customerToken && isNumeric(cartId)) {
                return restClient.get('/carts/mine/items', customerToken);
            } else 
            {
                return restClient.get('/guest-carts/' + cartId + '/items/');
            }
        }
    }                            
    
    module.billingAddress = function (customerToken, cartId, body, adminRequest = false) {
        if (adminRequest) {
            return restClient.post('/carts/' + cartId + '/billing-address', body);
        } else {
            if (customerToken && isNumeric(cartId)) {
                return restClient.post('/carts/mine/billing-address', body, customerToken);
            } else 
            {
                return restClient.post('/guest-carts/' + cartId + '/billing-address', body);
            }
        }
    }      
    
    module.shippingInformation = function (customerToken, cartId, body, adminRequest = false) {
        if (adminRequest) {
            return restClient.post('/carts/' + cartId + '/shipping-information', body);
        } else {
            if (customerToken && isNumeric(cartId)) {
                return restClient.post('/carts/mine/shipping-information', body, customerToken);
            } else 
            {
                return restClient.post('/guest-carts/' + cartId + '/shipping-information', body);
            }
        }
    }                     

    return module;
}