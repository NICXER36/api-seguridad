const Joi = require('joi');

exports.albumSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required()
}); 