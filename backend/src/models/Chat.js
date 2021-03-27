const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    from:String,
    receiver:String,
    
})

const Chat = mongoose.model('Chat',ChatSchema)

module.exports = Chat