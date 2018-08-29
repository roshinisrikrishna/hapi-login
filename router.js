const login = require('./handlers/user.js')
const Boom = require('boom');
const hapi_swagger = require('hapi-swagger');
const schema = require('./schemas/user.js')
module.exports = [
    {
        method: 'GET',
        path: '/user',

        config: {
            tags: ['api'],
            description: 'Retrieve data',
            notes: ['retrieve user details based on user id'],
            plugins:{
'hapi-swagger':{
    responses: {
        
        '400': {'description': 'Bad Request'},
        '401': {'description': 'Unauthorized'},
        '200': {'description': 'Success'}
    }
}
            },
            
            validate:
            {
                query: schema.givenid.description('user id')
            },
            response: {
                schema: schema.returnUser
            }
        },
        handler: function (request, handler) {//retrieving the user details for input id
            return login.getUser(request, handler).then(function (value) {
                if (!value.Item) {
                    var error = new Error('FAILED');
                    return Boom.boomify(error, { statusCode: 400 });
                }
                console.log('object', value.Item);
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
