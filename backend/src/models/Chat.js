const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    from:mongoose.Types.ObjectId,
    receiver:mongoose.Types.ObjectId,
    
})

const Chat = mongoose.model('Chat',ChatSchema)

module.exports = Chat