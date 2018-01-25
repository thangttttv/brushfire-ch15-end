/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
var Q = require("q");

module.exports = {
    index1: function (req, res) {

        //message =async(Message.getMessageWelcome(1));

       // sails.log("data4",JSON.stringify(message));

        var promise = Q.fcall(function () {
            return "Resolve it";
            });

       /* var check = 1;
        var promise = function(check) {
            return Q.promise(function(resolve, reject) {
                if (check) {
                    resolve("Resolve it");
                } else {
                    reject("Error");
                }
            });
        };
        */
        promise.then(function(data) {
            console.log(data);
        }, function(error) {
            console.log(error);
        });

       var message1 ;
        MessageLog.getLastRecord(1).then(function(message1) {
            // now you have your rows, you can see if there are <20 of them
            console.log("1",message1);
            data1 = 500;
            return   Promise.resolve(data1);

        }).then(function(data1){
            sails.log("2",data1);
        }).catch(sails.log('loi nhe'));;

         console.log("message1",message1);
        MessageLog.create({page_id:1,sender_id:1,recipient_id:1,message:'noi dung',sent_at:new Date(1461110400000)}).exec
        (function (err, messageLog){
                if (err) {
                    sails.log.error(err);
                }else{
                    sails.log('MessageLog\'s id is:', messageLog.id);
                }
                res.json(messageLog);
            }
        );
        console.log("message2",message1);
       /* Message.find({ where: { page_id: 1, type:'welcome' }, sort: 'id desc'}).exec(function(err, messages){
            sails.log(err);
            //if (err) return res.send(err, 500);
           // sails.log(messages);
            res.json(messages);
            // res.status(200).send("OK");
            // res.send('Error, wrong validation token');
        });*/
       // res.send('Error, wrong validation token');
    },

    index: function(req, res) {
        if (req.query['hub.verify_token'] === 'anh_hoang_dep_trai_vo_doi') {
            res.send(req.query['hub.challenge']);
        }
        res.send('Error, wrong validation token');
    },
};

