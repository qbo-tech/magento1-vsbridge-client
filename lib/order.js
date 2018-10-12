
module.exports = function (MagentoClient) {
    var module = {};
    
    module.create = function (customerToken, cartId, body) {
        if (customerToken && cartId) {
            return MagentoClient.post(
                'order/create/token/' + customerToken + '/cartId/' +  cartId, body
            );
        } else {
            return MagentoClient.post(
                'order/create'  + '/cartId/' +  cartId, body
            );
        }
    }       
    return module;
}
