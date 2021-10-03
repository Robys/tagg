const {Schema,model} = require('mongoose')

const ChatSchema = Schema({
    user: {type:Schema.Types.ObjectId,ref:"User"},
    contact: {type:Schema.Types.ObjectId,ref:"User"},
    messages: [{type:Schema.Types.ObjectId,ref:"Message"}],

})

const CHAT = model('Chat',ChatSchema)

module.exports = {CHAT}