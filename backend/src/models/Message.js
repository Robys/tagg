const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    from:mongoose.Types.ObjectId,
    receiver:mongoose.Types.ObjectId,
    chatId: mongoose.Types.ObjectId,
    content: String,
    createAt:String
    
})

const Message = mongoose.model('Message',MessageSchema)
module.exports = Message;