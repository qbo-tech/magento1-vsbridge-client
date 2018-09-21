function isNumeric(val) {
    return Number(parseFloat(val)).toString() === val;
}

module.exports = function (MagentoClient) {
    var module = {};
    
    module.create = function (customerToken, cartId, body) {
        if (customerToken && isNumeric(cartId)) {
            return MagentoClient.post(
                '/order/create/token/' + customerToken, { cartId: cartId, orderData:body },
                body
            );
        }
    }       
    return module;
}
