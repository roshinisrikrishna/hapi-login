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
        // Item: Joi.object({
        userPassword: Joi.string().required(),
        userDOB: Joi.string().required(),
        userEmail: Joi.string().required(),
        userId: Joi.string().required(),
        updatedAt: Joi.number().required(),
        userName: Joi.string().required(),
        createdAt: Joi.number().required()
        //})
    }),
    givenid: Joi.object({//schema for input user id
        
        id: Joi.string().required()
    }),
    responseSchema: Joi.object({//schema for response message
        message: Joi.string().optional()
    })
}

