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
     * Send a Structured Message (Generic Message type) using the Send API.
     *
     */
    sendGenericMessage: function (recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [{
                            title: "rift",
                            subtitle: "Next-generation virtual reality",
                            item_url: "https://www.oculus.com/en-us/rift/",
                            image_url: "http://img.v96.bdpcdn.net/Assets/Media/2017/12/15/70/bailly3.jpg",
                            buttons: [{
                                type: "web_url",
                                url: "https://www.oculus.com/en-us/rift/",
                                title: "Open Web URL"
                            }, {
                                type: "postback",
                                title: "Call Postback",
                                payload: "Payload for first bubble",
                            }],
                        }, {
                            title: "touch",
                            subtitle: "Your Hands, Now in VR",
                            item_url: "https://www.oculus.com/en-us/touch/",
                            image_url: "http://img.v96.bdpcdn.net/Assets/Media/2017/12/15/70/bailly3.jpg",
                            buttons: [{
                                type: "web_url",
                                url: "https://www.oculus.com/en-us/touch/",
                                title: "Open Web URL"
                            }, {
                                type: "postback",
                                title: "Call Postback",
                                payload: "Payload for second bubble",
                            }]
                        }]
                    }
                }
            }
        };

        this.callSendAPI(messageData);
    },


    /*
     * Send audio using the Send API.
     *
     */
    sendAudioMessage :function(recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "audio",
                    payload: {
                        url: "http://www.nhacthien.net/uploads/nhacthien/rhine02.mp3"
                    }
                }
            }
        };

        this.callSendAPI(messageData);
    },

    /*
     * Send a video using the Send API.
     *
     */
    sendVideoMessage :function (recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "video",
                    payload: {
                        url: "https://v.vnecdn.net/thethao/video/web/mp4/2017/12/15/truc-tiep-u23-thai-lan-u23-viet-nam-1513335964.mp4"
                    }
                }
            }
        };

        this.callSendAPI(messageData);
    },

    /*
     * Send a file using the Send API.
     *
     */
    sendFileMessage :function (recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "file",
                    payload: {
                        url: "http://www.sjsu.edu/people/shirley.reekie/courses/sailing/s2/Sailing-Made-Simple-whole-book.pdf"
                    }
                }
            }
        };

        this.callSendAPI(messageData);
    },

    /*
     * Send a text message using the Send API.
     *
     */
    sendTextMessage :function (recipientId, messageText) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: messageText,
                metadata: "DEVELOPER_DEFINED_METADATA"
            }
        };

        this.callSendAPI(messageData);
    },

    /*
     * Send a button message using the Send API.
     *
     */
    sendButtonMessage:function (recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "button",
                        text: "This is test text",
                        buttons:[{
                            type: "web_url",
                            url: "https://www.oculus.com/en-us/rift/",
                            title: "Open Web URL"
                        }, {
                            type: "postback",
                            title: "Trigger Postback",
                            payload: "DEVELOPER_DEFINED_PAYLOAD"
                        }, {
                            type: "phone_number",
                            title: "Call Phone Number",
                            payload: "+16505551234"
                        }]
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

