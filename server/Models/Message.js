const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    content:String,
    readed:{type:Boolean,default:false},
    sender:{type:mongoose.Types.ObjectId,ref:"User"},
    receiver:{type:mongoose.Types.ObjectId,ref:"User"},
    createdAt:String

})

const MESSAGE = mongoose.model('Message',MessageSchema)

module.exports = {
    MESSAGE,
    REMOVEMESSAGE: (_id) => {NOTIFICATION.findByIdAndDelete(_id)},
    UPDATEMESSAGE: (_id) => {NOTIFICATION.updateOne({_id:_id},{"readed":true})},
}