const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Clothing item body
const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
  }),
});

// User signup
const validateUserSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().email().required().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// User login
const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// ID in params
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

// User update
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional().messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().optional().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
  }),
});

const validateId = (paramName) =>
  celebrate({
    params: Joi.object().keys({
      [paramName]: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
          "string.length": `The "${paramName}" must be a 24-character hexadecimal string`,
          "string.hex": `The "${paramName}" must be a valid hex string`,
          "any.required": `The "${paramName}" parameter is required`,
        }),
    }),
  });

module.exports = {
  validateClothingItem,
  validateUserSignup,
  validateUserLogin,
  validateUserUpdate,
  validateUserId,
  validateId,
};
