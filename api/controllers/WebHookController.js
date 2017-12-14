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
            console.log(messaging[0]);
            console.log(messaging[0].sender.id);

            //   for (var message of messaging) {
            for (var j in messaging) {
                var message = messaging[j];
                console.log(message);
                var senderId = message.sender.id;
                if (message.message) {
                    // If user send text
                    if (message.message.text) {
                        var text = message.message.text;
                        console.log(text); // In tin nhắn người dùng
                        this.sendMessage(senderId, "Tui là bot đây: " + text);
                    }
                }
            }
        }

        res.status(200).send("OK");
    },

    // Gửi thông tin tới REST API để trả lời
    sendMessage: function(senderId, message) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: "EAACEdEose0cBALZBBfzk3ZAU8Kw62ct2wLHaaPWK6MVZCilGrQb32QuNmKy5QVnOw0VZBTzaPaA8x4kNIAsrGLluZBPT0HOYPgCVU8ASdNFQc8sZCcByOwjxjd3aVdvR5AlRtDnZCb5ZAnGaP3Gy9lZCw3msHln1Di8UdZBZBqzZCRTGMdeY1pMMdha44LtuPbi1BXrIC78BDJS5SAZDZD",
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

