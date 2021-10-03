const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema({
    content:String,
    readed:{type:Boolean,default:false},
    sender:{type:mongoose.Types.ObjectId,ref:"User"},
    receiver:{type:mongoose.Types.ObjectId,ref:"User"},
    createdAt:String

})

const NOTIFICATION = mongoose.model('Notification',NotificationSchema)

module.exports = {
    NOTIFICATION,
    REMOVENOTIFICATION: (_id) => {NOTIFICATION.findByIdAndDelete(_id)},
    UPDATENOTIFICATION: (_id) => {NOTIFICATION.updateOne({_id:_id},{"readed":true})},
}