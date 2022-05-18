const express = require('express');
const mongoose = require('mongoose');
const Cocktail = require('../models/Cocktail');
const User = require('../models/User');
const {cocktails} = require('../multer');
const roles = require("../middleware/roles");
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', roles, async (req, res, next) => {
  try {
    let cocktails;

    if (req.user && req.query.user) {
      const user = await User.findOne({_id: req.query.user});

      if (user.token === req.user.token) {
        cocktails = await Cocktail.find({user: req.user._id}, null, {sort: {'_id': -1}});
        return res.send(cocktails);
      }
    }

    if (req.user && req.user.role === 'admin') {
      cocktails = await Cocktail.find({}, null, {sort: {'_id': -1}});
    } else {
      cocktails = await Cocktail.find({is_published: true}, null, {sort: {'_id': -1}});
    }

    return res.send(cocktails);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', roles, async (req, res, next) => {
  try {
    let cocktail;

    if (req.user && req.user.role === 'admin') {
      cocktail = await Cocktail.findOne({_id: req.params.id})
    } else if (req.user && req.user.role === 'user') {
      const query = {$or: [{_id: req.params.id, user: req.user._id}, {_id: req.params.id, is_published: true}]};
      cocktail = await Cocktail.findOne(query, null, {sort: {'_id': -1}});
    } else {
      cocktail = await Cocktail.findOne({_id: req.params.id, is_published: true});
    }

    res.send(cocktail);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, cocktails.single('image'), async (req, res, next) => {
  try {
    const ingredients = JSON.parse(req.body.ingredients);

    ingredients.forEach(i => {
      if (!i.ingTitle || !i.ingAmount) {
        return res.status(422).send({error: 'Ingredient title and amount are required!'});
      }
    });

    if (!req.body.title || !req.body.recipe || !req.body.ingredients) {
      return res.status(422).send({error: 'Title, recipe and ingredients are required!'});
    }

    const cocktailData = {
      user: req.user._id,
      title: req.body.title,
      image: req.file ? req.file.filename : null,
      recipe: req.body.recipe,
      is_published: req.user.role === 'admin',
      ingredients,
    };

    const cocktail = new Cocktail(cocktailData);
    await cocktail.save();

    return res.send(cocktail);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
  try {
    await Cocktail.updateOne({_id: req.params.id}, {is_published: true});
    return res.send({message: 'Updated successful'});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    await Cocktail.deleteOne({_id: req.params.id});
    return res.send({message: 'Deleted successful'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;