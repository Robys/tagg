const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    from:String,
    receiver:String,
    chatId: String,
    content: String,
    createAt:String
    
})

const Message = mongoose.model('Message',MessageSchema)
module.exports = Message;