const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course Management Platform API',
      version: '1.0.0',
      description: 'API documentation for the Course Management Platform backend',
    },
    servers: [
      {
        url: 'http://localhost:5000', 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);



module.exports = swaggerSpec;
