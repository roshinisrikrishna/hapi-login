const login = require('./handlers/login.js')
const Boom = require('boom');
const schema = require('./schemas/login.js')
module.exports = [
    {
        method: 'GET',
        path: '/login',
        config: {
            tags: ['api'],
            validate:
            {
                query: schema.givenid
            },
            response: {
                schema: schema.returnUser
            }
        },
        handler: function (request, handler) {//retrieving the user details for input id
            return login.getUser(request, handler).then(function (value) {
                if (value.user && !value.user.id) {
                    var error = new Error('FAILED');
                    return Boom.boomify(error, { statusCode: 400 });
                }
                return value;
            });
        }
    },
    {
        method: 'POST',
        path: '/login',
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
        path: '/login',
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
        path: '/login',
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