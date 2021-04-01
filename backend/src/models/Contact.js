const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    from:String,
    receiver:String,
    
})

const Contact = mongoose.model('Contact',ContactSchema)

module.exports = Contact