const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    roles:{
        type: String,
        enum : ['USER','ADMIN','MENAGER'],
        default: 'USER'
    },
    facebookId:String,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    picture:String,
    location:String,
    createdAt:String

})

const users = mongoose.model('User',UserSchema)

module.exports = {
    users,
    getUsers: async () => await users.find(),
    addUser: async (user) => await users.create(user),
    deleteUser: async (_id) => await users.findByIdAndDelete(_id),
    findById: async (_id) => await users.findById({_id}),
    findByFacebook: async (facebookId) => await users.findOne({facebookId})
}
