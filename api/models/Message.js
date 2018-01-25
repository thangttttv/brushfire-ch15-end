/**
 * Message.js
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
            title:{
                type:'string',
            },

            type:{
                  type:'string',
            },
            sent:{
                type:'integer',
            },
            delivered:{
                type:'integer',
            },
            opened:{
                type:'integer',
            },
            clicked:{
                type:'integer',
            },
            created_at:{
                type:'timestamp',
            },
            updated_at:{
                type:'timestamp',
            },
      },
      tableName: 'messages',

      getMessageWelcome: function(page_id){
            this.findOne({ where: { page_id: page_id, type:'welcome' }, sort: 'id desc'}).exec(function(err, message){
               if (err) {
                    return err;
               }else{
                   sails.log(message);
                   return message;
               }
             });
        }
};

