'use strict';

var request = require('request');

var logger = require('./log');

module.exports.HttpClient = function (options) {
    var instance = {};
  
    var servelrUrl = options.url;

    function apiCall(request_data) {
        logger.debug('Calling endpoint: ' + request_data.method + ' ' + request_data.url);
        logger.debug(request_data.body);
        logger.info({
            url: request_data.url,
            method: request_data.method,
            json: true,
            body: request_data.body,
        });
        /* eslint no-undef: off*/        
        return new Promise(function (resolve, reject) {
            request({
                url: request_data.url,
                method: request_data.method,
                json: true,
                body: request_data.body,
            }, function (error, response, body) {
                logger.debug('Response received.');
                if (error) {
                    logger.error('Error occured: ' + error);
                    reject(error);
                    return;
                } else if (!httpCallSucceeded(response)) {
                    if(typeof(body) !== "undefined") {
                        var errorMessage = 'HTTP ERROR ' + body.result;
                        errorMessage = errorString(body.result, body.hasOwnProperty('parameters') ? body.parameters : {});
                        logger.error('API Error message: ' + errorMessage);
                    } else {
                        errorMessage = errorString("Unknown server error.");
                    }
                    reject(errorMessage); 
                }
                resolve(body);
            });
        });
    }

    function httpCallSucceeded(response) {
        return response.statusCode >= 200 && response.statusCode < 300;
    }

    function errorString(message, parameters) {
        if (parameters === null) {
            return message;
        }
        if (parameters instanceof Array) {
            for (var i = 0; i < parameters.length; i++) {
                var parameterPlaceholder = '%' + (i + 1).toString();
                message = message.replace(parameterPlaceholder, parameters[i]);
            }
        } else if (parameters instanceof Object) {
            for (var key in parameters) {
                var parameterPlaceholder = '%' + key;
                message = message.replace(parameterPlaceholder, parameters[key]);
            }
        }

        return message;
    }

    instance.get = function (resourceUrl) {
        var request_data = {
            url: createUrl(resourceUrl),
            method: 'GET'
        };
        return apiCall(request_data);
    }

    function createUrl(resourceUrl) {
        return servelrUrl + '/' + resourceUrl;
    }

    instance.post = function (resourceUrl, data) {
        var request_data = {
            url: createUrl(resourceUrl),
            method: 'POST',
            body: data
        };
        logger.info("REQUEST DATA: " . request_data);
        return apiCall(request_data);
    }

    return instance;
}
