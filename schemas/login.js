const Joi = require('joi');
const inputUser = Joi.object({//schema for input user details 
    id: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    birthyear: Joi.string().optional(),
    email: Joi.string().optional()
})
const returnUser = Joi.object({//schema for output user details
    user: Joi.object({
        id: Joi.string().optional(),
        name: Joi.string().optional(),
        password: Joi.string().optional(),
        birthyear: Joi.string().optional(),
        email: Joi.string().optional()
    })
})
const givenid = Joi.object({//schema for input user id
    id: Joi.string().required()
})
const responseSchema = Joi.object({//schema for response message
    message: Joi.string().optional()
})