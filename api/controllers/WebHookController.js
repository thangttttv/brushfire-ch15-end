/**
 * WebHookController
 *
 * @description :: Server-side logic for managing Webhooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: function(req, res) {
    if (req.query['hub.verify_token'] === 'anh_hoang_dep_trai_vo_doi') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
    },

	process: function(req, res) {
        var entries = req.body.entry;
        for (var entry in entries) {
            var messaging = entry.messaging;
            for (var message in messaging) {
                var senderId = message.sender.id;
                if (message.message) {
                    // If user send text
                    if (message.message.text) {
                        var text = message.message.text;
                        console.log(text); // In tin nhắn người dùng
                        sendMessage(senderId, "Tui là bot đây: " + text);
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
            access_token: "EAACEdEose0cBAPZAG9FJLZCUvdaVn8IMn6iUeZBx5NZBpkBlpkcVniUGnNdxPrnPYHUfxQutcAVDP0ZCDifG7lVZBYlror4B7m2DpYObb0ZCtvgAAdn748R1MAtJYS28vH6BMYiCqCFCJMnQgFN8Lp3lQxfEzcji4vqcFiieD3xggY0B6aNKx3D9iWQHhaLhXyovm1NDn9KJQZDZD",
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

