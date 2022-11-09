const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: '1.0.0',
        title: 'My API',
        description: 'Description',
    },
    host: 'localhost:1337',
    basePath: '/',
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },
    tags: [ 
        {
            name: 'User API', // Tag name
            description: '', // Tag description
        }, 
        {
            name: 'Item API', // Tag name
            description: '', // Tag description
        }, 
        {
            name: 'Purchasing API', // Tag name
            description: '', // Tag description
        },
    ],  
    components: {
        '@schemas': {
            Users: {
                type: 'object',
                required: [
                    'username',
                    'password'
                ],
                properties: {
                    id: {
                        type: 'string',
                        description: 'auto generate from db'
                    },
                    username: {
                        type: 'string',
                    },
                    password: {
                        type: 'string',
                    }
                }
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./component/item/routes.js', './component/users/routes.js', './component/purchasing/routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
