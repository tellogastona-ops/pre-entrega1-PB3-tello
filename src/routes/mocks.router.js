import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mock.util.js';
import UserModel from '../models/user.model.js';
import PetModel from '../models/pet.model.js';

const router = Router();

/**
 * 1. GET /api/mocks/mockingpets
 * Migrado desde el primer Desafío Entregable.
 */
router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets(20);
    res.status(200).json({ status: 'success', payload: pets });
});

/**
 * 2. GET /api/mocks/mockingusers
 * Genera y devuelve 50 usuarios con formato de MongoDB.
 */
router.get('/mockingusers', (req, res) => {
    const users = generateMockUsers(50);
    res.status(200).json({ status: 'success', payload: users });
});

/**
 * 3. POST /api/mocks/generateData
 * Recibe { users, pets } en el body, genera los registros y los inserta en MongoDB.
 */
router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;

        if (users === undefined || pets === undefined || isNaN(users) || isNaN(pets)) {
            return res.status(400).json({
                status: 'error',
                error: 'Debe proporcionar parámetros numéricos válidos para "users" y "pets" en el body.'
            });
        }

        const numUsers = parseInt(users, 10);
        const numPets = parseInt(pets, 10);

        // Omitimos el _id simulado para que MongoDB/Mongoose genere los ObjectIds reales al insertar
        const mockUsers = generateMockUsers(numUsers).map(({ _id, ...user }) => user);
        const mockPets = generateMockPets(numPets).map(({ _id, ...pet }) => pet);

        // Inserción en la base de datos
        const insertedUsers = await UserModel.insertMany(mockUsers);
        const insertedPets = await PetModel.insertMany(mockPets);

        res.status(201).json({
            status: 'success',
            message: 'Registros generados e insertados con éxito.',
            inserted: {
                usersCount: insertedUsers.length,
                petsCount: insertedPets.length
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

export default router;