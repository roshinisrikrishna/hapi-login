const Joi = require('joi');

module.exports = {
    inputUser: Joi.object({//schema for input user details 
        id: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        birthyear: Joi.string().optional(),
        email: Joi.string().optional()
    }),
    returnUser: Joi.object({//schema for output user details
        createdAt: Joi.number().required(),
        password: Joi.string().required(),
        id: Joi.string().required(),
        name: Joi.string().required(),
        updatedAt: Joi.number().required(),
        dob: Joi.string().optional(),
        mail: Joi.string().optional()
    }),
    givenid: Joi.object({//schema for input user id
        id: Joi.string().required()
    }),
    responseSchema: Joi.object({//schema for response message
        message: Joi.string().optional()
    })
}

