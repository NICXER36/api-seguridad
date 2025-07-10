const Joi = require('joi');

exports.songSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  duration: Joi.number().integer().min(1).max(3600).required(), // 1 segundo a 1 hora
  genre: Joi.string().max(50).required(),
  albumId: Joi.number().integer().required()
}); 