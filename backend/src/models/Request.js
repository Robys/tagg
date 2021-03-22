const mongoose = require('mongoose')

const RequestSchema = mongoose.Schema({
     madeBy:String,
     selected:String,
     required: String,
     createdAt:String,
     accepted:mongoose.Schema.Types.Boolean
})

module.exports = mongoose.model('Request',RequestSchema)