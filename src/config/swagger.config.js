export const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentación de la API de Usuarios (Adopme)',
      version: '1.0.0',
      description: 'API correspondiente al módulo de usuarios del sistema de adopción de mascotas.',
    },
  },
  apis: ['./src/doc/**/*.yaml'],
};