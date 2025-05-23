const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Entertainment API',
        description: 'API for managing books and movies',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    }

const outputFile = './swagger_output.json';
const routes = ['./routes/index.js'];


swaggerAutogen(outputFile, routes, doc);
