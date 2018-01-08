/**
 * MessageLog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id:{
            type:'primary_key',
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
            type:'timestamp',
        },
    },
    tableName: 'message_logs',
};

