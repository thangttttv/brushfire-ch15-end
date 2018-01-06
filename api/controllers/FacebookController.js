/**
 * FacebookController
 *
 * @description :: Server-side logic for managing Facebooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const util = require('util')
var request = require('request');

module.exports = {
    index: function(req, res) {
        request({
            url: 'https://graph.facebook.com/v2.6/156255264959608?fields=access_token',
            qs: {
                //access_token: token_page,
            },
            method: 'GET',
            json: {
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
            }
        });
        res.send('Error, wrong validation token');
    }

};

