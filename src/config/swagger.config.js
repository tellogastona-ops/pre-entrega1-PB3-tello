import __dirname from '../utils.js'; // O ajusta la ruta de tu dirname según tu estructura
import path from 'path';

export const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de la API de Usuarios (Adopme)',
            version: '1.0.0',
            description: 'API correspondiente al módulo de usuarios del sistema de adopción de mascotas.'
        },
    },
    apis: [`./src/docs/**/*.yaml`] // Aquí leerá los archivos de documentación YAML
};