const mongoose = require('mongoose')

const SuggestionSchema = mongoose.Schema({
    title:String

})

const SUGGESTION = mongoose.model('Suggestion',SuggestionSchema)

module.exports = {
    GETSUGGESTIONS: () => SUGGESTION.find(),
    CREATESUGGESTION: (title) => SUGGESTION.create({title:title}),
    DELETESUGGESTION: (title) => SUGGESTION.findOneAndDelete(title)
}
