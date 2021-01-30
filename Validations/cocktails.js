const Validator = require('validator');
const Joi = require('@hapi/joi');
const isEmpty = require('./is-Empty');

cmdSchema = {
    name: Joi.string().required(),
    instruction: Joi.array().items(Joi.string()),
    category: Joi.array().items(Joi.string()),
    measures: Joi.array(),
    ingredients: Joi.array(),

};

module.exports = cmdSchema;