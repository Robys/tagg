const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
    owner:String,
    title:String,
    publisher:String,
    platform:String,
    status:String,
    value:{
        type:String,
        default:"0"
    },
    description:String,
    location: String,
    createdAt:String,
    cover:{
        filename: String,
        path: String
    }

})

const games = mongoose.model('Game',GameSchema)
module.exports = {
    games,
    getGames: () => games.find(),
    addGame: async (game) => await games.create(game),
    deleteGame: async (_id) => await games.findByIdAndDelete(_id)
}