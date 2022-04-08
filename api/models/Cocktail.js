const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngSchema = new Schema({
  ingTitle: {
    type: String,
    required: true,
  },
  ingAmount: {
    type: String,
    required: true,
  },
});

const CocktailSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (value) {
        if (!this.isModified('title')) return true;
        const cocktail = await Cocktail.findOne({title: value});
        return !cocktail;
      },
      message: 'Cocktail with this name already exists!',
    },
  },
  image: String,
  recipe: {
    type: String,
    required: true,
  },
  is_published: {
    type: Boolean,
    default: false,
  },
  ingredients: [
    IngSchema,
  ],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;