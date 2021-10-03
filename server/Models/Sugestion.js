const mongoose = require('mongoose')

const SugestionSchema = mongoose.Schema({
    title:String

})

const SUGESTION = mongoose.model('Sugestion',SugestionSchema)

module.exports = {
    GETSUGESTIONS: () => SUGESTION.find(),
    CREATESUGESTION: (title) => SUGESTION.create({title:title}),
    DELETESUGESTION: (title) => SUGESTION.findOneAndDelete(title)
}
