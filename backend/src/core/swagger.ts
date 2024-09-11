// src/core/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Hello Ada Demo',
      version: '1.0.0',
      description: 'API documentation for Hello Ada project',
    },
    // Add the security section for Bearer Token (JWT)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [`${__dirname}/../routes/*/*.{ts,js}`, `${__dirname}/../swagger/schemas/*.yaml`], // Specify the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
};
