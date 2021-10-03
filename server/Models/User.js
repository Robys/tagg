const {Schema,model} = require('mongoose')

const UserSchema = Schema({
    roles:{
        type: String,
        enum : ['USER','ADMIN','MANAGER'],
        default: 'USER'
    },
    active:{
        type:Boolean,
        default:true
    },
    facebookId:String,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    picture:String,
    location:String,
    createdAt:String,
    gamecollection:[{type:Schema.Types.ObjectId,ref:"Game"}],
    contacts:[{type:Schema.Types.ObjectId,ref:"User"}],

})

const USER = model('User',UserSchema)

module.exports = {
    USER,
    GETUSERS: () => USER.find(),
    GETUSERBYID : (_id) => USER.findOne({_id:_id}),
    GETUSERBYEMAIL : (email) => USER.findOne({email}),
    GETBYFACEBOOK: async (facebookId) => await users.findOne({facebookId}),
    DELETEUSER : (_id) => USER.findByIdAndDelete(_id),
    ADDUSER : (user) => USER.create(user),
    CREATEMENAGER: (_id) => USER.findByIdAndUpdate(_id, {roles: 'MENAGER'}),
    ACTIVEUSERS : () => USER.aggregate([
        { $project: {active:"$active"} },
        { $group: {_id:{active:"$active"},users:{$sum:1}} },
        {$addFields: {active: "$_id.active"}},
        {$project:{_id:false}}
    ]),
    USERSLOCATION: () => USER.aggregate([
        { $project: {location:"$location"} },
        { $group: {_id:{location:"$location"},users:{$sum:1}} },
        {$addFields: {location: "$_id.location"}},
        {$project:{_id:false}}
    ]),
    ACCOUNTSCREATED: () => USER.aggregate([
        { $project: {createdAt:"$createdAt", location:"$location" }, },
        { $group: {_id:{createdAt:"$createdAt", location:"$location"},users:{$sum:1}} },
        {$addFields: {createdAt: "$_id.createdAt", location: "$_id.location"}},
        {$project:{_id:false}}
    ]) 

}
