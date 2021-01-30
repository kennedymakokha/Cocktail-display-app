var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const CocktailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    instruction: {
        type: String,
        required: true
    },
    ingredients: { type: Array },
    measures: { type: Array },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    }
});


const Cocktail = mongoose.model('cocktails', CocktailSchema);

module.exports = Cocktail;