import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { swaggerOptions } from './config/swagger.config.js';
import adoptionRouter from './routes/adoption.router.js';

const specs = swaggerJsdoc(swaggerOptions);
const app = express();
const PORT = process.env.PORT || 8080;

app.use('/api/adoptions', adoptionRouter);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coderhouse';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado exitosamente a MongoDB'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter); // Requerido para comprobar persistencia
app.use('/api/pets', petsRouter);   // Requerido para comprobar persistencia

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});