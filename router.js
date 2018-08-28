const login = require('./handlers/user.js')
const Boom = require('boom');
const schema = require('./schemas/user.js')
module.exports = [
    {
        method: 'GET',
        path: '/user',
        // responses: {
        //     "200": {
        //         "description": "Result of operation.",
        //         "schema": {
        //             "type": "string"
        //         }
        //     }
        // },
        config: {
            tags: ['api'],
            validate:
            {
                query: schema.givenid
            },
            response: {
          schema: schema.returnUser
          // responses: {
        //     "200": {
        //         "description": "Result of operation.",
        //         "schema": {
        //             "type": "string"
        //         }
        //     }
        // },
            }
        },
        handler: function (request, handler) {//retrieving the user details for input id
            return login.getUser(request, handler).then(function (value) {
                if (!value.Item) {
                    var error = new Error('FAILED');
                    return Boom.boomify(error, { statusCode: 400 });
                }
                 console.log('object',value.Item);
                // console.log('string',JSON.stringify(value));
                //console.log('object 1',value);

                return value.Item;
            });
        }
    },
    {
        method: 'POST',
        path: '/user',
        config: {
            tags: ['api'],
            validate:
            {
                query: schema.inputUser

            },
            response: {
                schema: schema.responseSchema
            }
        },
        handler: function (request, handler) {//creating a new user
            return login.createUser(request, handler).then(function (value) {
                if (value.message === 'FAILED') {
                    var error = new Error('FAILED');
                    return Boom.boomify(error, { statusCode: 400 });
                }
                return value;
            });
        }
    },
    {
        method: 'PUT',
        path: '/user',
        config: {
            tags: ['api'],
            validate:
            {
                query: schema.inputUser
            },
            response: {
                schema: schema.responseSchema
            }
        },
        handler: function (request, handler) {//updating user details by giving input id
            return login.updateUser(request, handler).then(function (value) {
                if (value.message === 'FAILED') {
                    var error = new Error('FAILED');
                    return Boom.boomify(error, { statusCode: 400 });
                }
                return value;
            });
        }
    },
    {
        method: 'DELETE',
        path: '/user',
        config: {
            tags: ['api'],
            validate:
            {
                query: schema.givenid
            },
            response: {
                schema: schema.responseSchema
            }
        },
        handler: function (request, handler) {//deleting user from database for given user id
            return login.deleteUser(request, handler).then(function (value) {
                if (value.message === 'FAILED') {
                    var error = new Error('FAILED');
                    return Boom.boomify(error, { statusCode: 400 });
                }
                return value;
            })
        }
    }
]
