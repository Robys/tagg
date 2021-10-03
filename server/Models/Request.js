const {Schema,model} = require('mongoose')

const RequestSchema = Schema({
    status:String,
    createdAt:String,
    envolved: [{type:Schema.Types.ObjectId,ref:"User"}],
    selected: {type:Schema.Types.ObjectId,ref:"Game"},
    requested: {type:Schema.Types.ObjectId,ref:"Game"}
})

const REQUEST = model('Request',RequestSchema)

module.exports = {
    REQUEST,
    REQUESTNUMBER:()=> REQUEST.aggregate([
        { $project: {createdAt:"$createdAt" }, },
        { $group: {_id:{createdAt:"$createdAt"},requests:{$sum:1}} },
        {$addFields: {createdAt: "$_id.createdAt"}},
        {$project:{_id:false}}
    ])}