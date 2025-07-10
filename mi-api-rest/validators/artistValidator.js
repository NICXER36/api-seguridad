const Joi = require('joi');

exports.registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(100).required(),
  country: Joi.string().max(50).required()
});

exports.loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

exports.updateSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  country: Joi.string().max(50).optional(),
  password: Joi.string().min(6).optional()
}); 