/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index1: function (req, res) {

        Message.find().exec(function(err, messages){
           sails.log(err);
            //if (err) return res.send(err, 500);
            sails.log(messages);
            res.json(messages);
           // res.status(200).send("OK");
           // res.send('Error, wrong validation token');
        });
       // res.send('Error, wrong validation token');
    },

    index: function(req, res) {
        if (req.query['hub.verify_token'] === 'anh_hoang_dep_trai_vo_doi') {
            res.send(req.query['hub.challenge']);
        }
        res.send('Error, wrong validation token');
    },
};

