/**
 * MessageItem.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id:{
            type:'primary_key',

        },
        message_id:{
            type:'integer',
        },
        type:{
            type:'string',
        },
        message:{
            type:'string',
        },

    },
    tableName: 'message_items',
};

