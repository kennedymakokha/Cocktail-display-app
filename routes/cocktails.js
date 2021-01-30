const express = require('express');
const router = express.Router();
const Cocktails = require('../models/cocktails');
const { json } = require('body-parser');
const { cmdSchema } = require('./../Validations/cocktails');
const Joi = require('@hapi/joi');

router.get('/', async (req, res) => {

    try {

        const Cocks = await Cocktails.find();

        return res.status(200).json({ success: true, message: 'Cocktails  retrieved successfully ', Cocks });

    } catch (error) {

        return res.status(400).json({ success: false, message: 'Cocktails retrieval failed ', error });

    }

});

router.post('/search', async (req, res) => {
    var word = req.query.word
    var searchKey = new RegExp(`${word}`, 'i')
    Cocktails.find({ name: searchKey }, function (err, Cock) {
        if (Cock) {
            return res.status(200).json({ success: true, message: 'Cocktail  retrieved successfully ', Cock });
        }
    });
})
router.post('/', async (req, res) => {

    try {
        const { error } = await Joi.object(cmdSchema).validate(req.body);
        if (error) {

            return res.status(400).json({ success: false, message: error.details[0].message, error });

        }
        const measuresType = [];
        if (req.body.measures !== undefined) {
            let mes = [];
            if (typeof req.body.measures == "string") {
                mes = [req.body.measures];
            } else {
                mes = req.body.measures;
            }
            for (var i = 0; i < mes.length; i++) {
                measuresType.push(mes[i])
            }
        }
        const ingredientType = [];
        if (req.body.ingredients !== undefined) {
            let ingredients = [];
            if (typeof req.body.ingredients == "string") {
                ingredients = [req.body.ingredients];
            } else {
                ingredients = req.body.ingredients;
            }
            for (var i = 0; i < ingredients.length; i++) {
                ingredientType.push(ingredients[i])
            }
        }
        const newAmenity = new Cocktails({
            name: req.body.name,
            category: req.body.category,
            instruction: req.body.instruction,
            ingredients: ingredientType,
            measures: measuresType

        });

        const amenity = await newAmenity.save();

        return res.status(200).json({ success: true, message: 'Cocktails  Saved successfully ' });

    } catch (error) {

        return res.status(400).json({ success: false, message: 'Cocktails posting failed', error });

    }

});


module.exports = router;