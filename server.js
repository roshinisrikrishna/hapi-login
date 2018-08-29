'use strict'
const hapi = require('hapi');
const routes = require('./router.js');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
(async () => {
    const server = hapi.server({
        port: 3000,
        host: 'localhost'
    });
    const init = async () => {
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    };
    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });
    const swaggerOptions = {
        info: {
            title: 'Login API Documentation',
            version: '1.0.0',
        },
    };
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    server.route(routes);
    init();
})();
