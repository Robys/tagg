const mongoose = require('mongoose')

const NotifySchema = mongoose.Schema({
     from:String,
     receiver: String,
     content:String,
     published: String,
     accepted:mongoose.Schema.Types.Boolean
})

module.exports = mongoose.model('Notify',NotifySchema)