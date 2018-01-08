/**
 * WebHookController
 *
 * @description :: Server-side logic for managing Webhooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const util = require('util')
var request = require('request');
var token_page = "EAACOHQOP7HgBAIYAIK7U6GUZAzDUySHkzKncGkS6uuCU2cUA0RKN1r9VnpA2ZBWwOojWilWYcffb4z090GumztNelsnCHcjYDKg8LI14gdwZCZCeqS46ZCZAnNHZB19ZAS2tdJmhb4nzaEYPFFrLSm19UXHlzYpy0cDxD5fP9v3Wzgbj4XJYZBgaP";

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

        request({
            url: 'https://graph.facebook.com/v2.6/426390950873704?fields=access_token',
            qs: {
                access_token: token_page,
            },
            method: 'GET',
            json: {
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(util.inspect(body));
                console.log("toenk"+body.access_token);
                token_page = body.access_token;
            } else {
                console.error("Failed calling get token", response.statusCode, response.statusMessage, body.error);
            }
        });

        console.log('so luong ban entries %d',entries.length);
        for (var i in entries) {
            var entry = entries[i];
            var messaging = entry.messaging;

            console.log(messaging[0]);
            console.log(messaging[0].sender.id);
            console.log('so luong ban tin %d',messaging.length);
            for (var j in messaging) {
                var message = messaging[j];
                console.log(message);
                console.log(message);
                var senderId = message.sender.id;
                var recipientId = message.recipient.id;
                var timestamp = message.timestamp;
                // check message first send
                    // true
                    /*
                    * - get welcome message
                    * - send welcome
                    *
                    * */
                if (message.message.text){
                    MessageLog.findOne({where:{sender_id:senderId}}).exec(function(err,message){
                        if(message==null){
                            /* */
                            FacebookMessageService.sendTextMessage(senderId,"xin chao ban");
                            MessageLog.create({page_id:1,sender_id:senderId,recipient_id:recipientId,message:message.message,sent_at:timestamp}).exec
                                (function (err, messageLog){
                                    if (err) {
                                        sails.err(err);
                                    }
                                    sails.log('Message\'s id is:', messageLog.id);

                                }
                            );
                        }
                    });
                }

                // Check keyword
                    /*
                        - keyword in
                        - keyword A And B
                        - keyword A Not B
                        - keyword and
                     */
                // End default message

                if (message.message) {
                    // If user send text
                    if (message.message.text) {
                        var text = message.message.text;
                        console.log(text); // In tin nhắn người dùng
                        // this.sendMessage(senderId, "Tui là bot đây: " + text);
                        // this.sendQuickReply(senderId);
                        // this.sendImageMessage(senderId);
                        // this.sendAudioMessage(senderId);
                        // this.sendFileMessage(senderId);
                        //  this.sendButtonMessage(senderId);
                        // this.sendVideoMessage(senderId);
                        console.log("indexoff"+text.indexOf("button"));
                        if(text.indexOf("button")>=0)
                        {
                            this.sendButtonMessage(senderId);
                        }else{
                            this.sendGenericMessage(senderId);
                        }


                    }
                }
            }
        }

        res.status(200).send("OK");
    },


};

