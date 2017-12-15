/**
 * WebHookController
 *
 * @description :: Server-side logic for managing Webhooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const util = require('util')
var request = require('request');
var token_page = "EAACEdEose0cBAFcuIcr6xZCdSBGqMM5NDEZCqr38hJF4PqvOlnt3xmFp8ZAHacLWdKnPtiItVaoxcjwZCsEymYr1AjOLOpUNLdKC1FPG4wDkoNHvKlZC6XjKXTS3ZBZBhUZAN3yKSawZAtmLTfuPpyCPwcvxyK4q5ajggR192b441G2OeH5oQKDyVbVug5qgGe5ntnp4VDJ4IBQZDZD";

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
                       // this.sendMessage(senderId, "Tui là bot đây: " + text);
                       // this.sendQuickReply(senderId);
                        this.sendImageMessage(senderId);
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
                access_token: token_page,
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
    },

    /*
     * Send a message with Quick Reply buttons.
     *
     */
    sendQuickReply :function(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: "What's your favorite movie genre?",
            quick_replies: [
                {
                    "content_type":"text",
                    "title":"Action",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
                },
                {
                    "content_type":"text",
                    "title":"Comedy",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
                },
                {
                    "content_type":"text",
                    "title":"Drama",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
                }
            ]
        }
    };

    this.callSendAPI(messageData);
    },

    /*
     * Send an image using the Send API.
     *
     */
    sendImageMessage :function(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "image",
                payload: {
                    url: "http://img.v96.bdpcdn.net/Assets/Media/2017/12/15/70/bailly3.jpg"
                }
            }
        }
    };

    this.callSendAPI(messageData);
    },

    /*
     * Call the Send API. The message data goes in the body. If successful, we'll
     * get the message id in a response
     *
     */
    callSendAPI :function(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token_page},
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            if (messageId) {
                console.log("Successfully sent message with id %s to recipient %s",
                    messageId, recipientId);
            } else {
                console.log("Successfully called Send API for recipient %s",
                    recipientId);
            }
        } else {
            console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
        }
    });
    }
};

