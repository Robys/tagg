const {model,Schema} = require('mongoose')


const GameSchema = Schema({
    owner:[{type:Schema.Types.ObjectId,ref:"User"}],
    title:String,
    gender:String,
    platform:String,
    status:String,
    value:{
        type:String,
        default:"0"
    },
    description:String,
    createdAt:String,
    cover:String
})

const GAME = model('Game',GameSchema)
module.exports = {
    GAME,
    GETGAME: (_id) => GAME.findById(_id),
    GETGAMES: () => GAME.find(),
    DELETEGAME: (_id) => GAME.findByIdAndDelete(_id),
    GAMESPERPLATFORM : () => GAME.aggregate([
        { $project: {platform:"$platform"} },
        { $group: {_id:{platform:"$platform"},games:{$sum:1}} },
        {$addFields: {platform: "$_id.platform"}},
        {$project:{_id:false}}
    ]),
    GAMESPERVALUE : () => GAME.aggregate([
        { $project: {value:"$value",title:"$title"} }, { $unwind: '$value' },
        { $group: {_id:{value:"$value",title:"$title"},games:{$sum:1}} },
        {$addFields: {value: "$_id.value",title:"$_id.title"}},
        {$project:{_id:false}}
    ]),

}