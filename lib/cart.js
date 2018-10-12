
module.exports = function (restClient) {
    var module = {};
    
    module.create = function (customerToken = null) {
        if (customerToken) {
            return restClient.post('cart/create/token/' + customerToken);
        } 
    }    

    module.update = function (customerToken, cartId, body) {
        if (customerToken && cartId) {
            return restClient.post('cart/update/token/' + customerToken + '/cartId/' + cartId, body);
        } else {
            return restClient.post('cart/update/cartId/' + cartId, body);
        }
    }    
 
    module.delete = function (customerToken, cartId, data) {
        if (customerToken && cartId) {
            return restClient.post('cart/delete/token/' + customerToken + '/cartId/' + cartId, data);
        } else {
            return restClient.post('cart/delete/cartId/' + cartId, data);
        }
    }     

    module.pull = function (customerToken, cartId, params, adminRequest = false) {
            if (customerToken && cartId) {
                return restClient.get('cart/pull/token/' + customerToken + '/cartId/' + cartId);
            } else 
            {
                return restClient.get('cart/pull/cartId/' + cartId);
            }
    }                            
    
    module.billingAddress = function (customerToken, cartId, body, adminRequest = false) {
        if (customerToken && cartId) {
            return restClient.post('cart/billingInformation/token/' + customerToken + '/cartId/' + cartId, body);
        } else {
            return restClient.post('cart/billingInformation/cartId/' + cartId, body);
        }
    }      
    
    module.shippingInformation = function (customerToken, cartId, body, adminRequest = false) {
        if (customerToken && cartId) {
            return restClient.post('cart/shippingInformation/token/' + customerToken + '/cartId/' + cartId, body);
        } else {
            return restClient.post('cart/shippingInformation/cartId/' + cartId, body);
        }
    }                     

    return module;
}