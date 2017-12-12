/**
 * WebHookController
 *
 * @description :: Server-side logic for managing Webhooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const util = require('util')
var request = require('request');

module.exports = {

    index: function(req, res) {
        if (req.query['hub.verify_token'] === 'anh_hoang_dep_trai_vo_doi') {
            res.send(req.query['hub.challenge']);
        }
        res.send('Error, wrong validation token');
    },

    process: function(req, res) {
        console.log('121');
        var entries = req.body.entry;
        // console.log(util.inspect(entries, false, null))

        for (var i in entries) {
            var entry = entries[i];
            var messaging = entry.messaging;
            console.log(messaging);
            //
            messaging.forEach(function(message){
                var senderId = message.sender.id;
                if (message.message) {
                    // If user send text
                    if (message.message.text) {
                        var text = message.message.text;
                        console.log(text); // In tin nhắn người dùng
                        this.sendMessage(senderId, "Tui là bot đây: " + text);
                    }
                }
            } )

           /* for (var message of messaging) {
                var senderId = message.sender.id;
                if (message.message) {
                    // If user send text
                    if (message.message.text) {
                        var text = message.message.text;
                        console.log(text); // In tin nhắn người dùng
                        this.sendMessage(senderId, "Tui là bot đây: " + text);
                    }
                }
            }*/
        }

        res.status(200).send("OK");
    },

    // Gửi thông tin tới REST API để trả lời
    sendMessage: function(senderId, message) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: "EAACEdEose0cBAKjRLV4XFRHiv2gOqVXVJX5EMBslQl6L0ZCWFzbbQCyic6ufpEpV0R6V042xa0Fq02j9wn7YxPCt14jY1U4PfHMYOxsQzk78CTvAqU1ZCKIr4Dj9n9y08tFiBOBKAF5XHXtVY9N2sLdEZBnsin6KWc3nuNyW5rOdsTYpmLmVJiZBaobZBZAWfDK3oOLfQu5wZDZD",
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: {
                    text: message
                },
            }
        });
    }
};

