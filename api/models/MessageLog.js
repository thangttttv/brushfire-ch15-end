/**
 * MessageLog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var Q = require("q");
module.exports = {

    attributes: {
        id:{
            type:'integer',
            autoIncrement: true,
            primaryKey: true,

        },
        page_id:{
            type:'integer',
        },
        sender_id:{
            type:'string',
        },
        recipient_id:{
            type:'string',
        },
        message:{
            type:'string',
        },
        sent_at:{
            type:'datetime',
        },
    },
    tableName: 'message_logs',

    getLastRecord: function(page_id)
    {
        return new Promise(function(resolve, reject) {

            MessageLog.findOne({ where: { page_id: page_id }, sort: 'id desc'}).exec(function(err, message){
                if (err||message==null) {
                    return reject(err);
                }else{
                    sails.log(message);
                    resolve(message);
                }
            });

            // The Promise constructor should catch any errors thrown on
            // this tick. Alternately, try/catch and reject(err) on catch.

        });
    }
};

