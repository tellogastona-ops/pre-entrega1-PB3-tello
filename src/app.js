import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routes/mocks.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB (Reemplaza con tu cadena de conexión si usas Atlas o local)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coderhouse';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Montaje del router de mocks bajo la ruta base /api/mocks
app.use('/api/mocks', mocksRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});