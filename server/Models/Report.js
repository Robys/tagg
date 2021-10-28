const mongoose = require('mongoose')

const ReportSchema = mongoose.Schema({
    content:String,
    done:{type:Boolean,default:false},
    sender:{type:mongoose.Types.ObjectId,ref:"User"},
    createdAt:String

})

const REPORT = mongoose.model('Report',ReportSchema)

module.exports = {REPORT}