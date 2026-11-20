import { generateMockUsers, generateMockPets } from '../utils/mock.util.js';
import { insertManyUsers, getAllUsers } from '../services/user.service.js';
import { insertManyPets, getAllPets } from '../services/pet.service.js';

export const getMockingPets = (req, res) => {
    const pets = generateMockPets(20);
    res.status(200).json({ status: 'success', payload: pets });
};

export const getMockingUsers = (req, res) => {
    const users = generateMockUsers(50);
    res.status(200).json({ status: 'success', payload: users });
};

export const generateData = async (req, res) => {
    try {
        const { users, pets } = req.body;

        if (users === undefined || pets === undefined || isNaN(users) || isNaN(pets)) {
            return res.status(400).json({
                status: 'error',
                error: 'Debe proporcionar parámetros numéricos válidos para "users" y "pets".'
            });
        }

        const numUsers = parseInt(users, 10);
        const numPets = parseInt(pets, 10);

        const mockUsers = generateMockUsers(numUsers);
        const mockPets = generateMockPets(numPets);

        const insertedUsers = await insertManyUsers(mockUsers);
        const insertedPets = await insertManyPets(mockPets);

        res.status(201).json({
            status: 'success',
            message: 'Datos generados e insertados correctamente.',
            inserted: {
                usersCount: insertedUsers.length,
                petsCount: insertedPets.length
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// Controladores para los GET normales requeridos por la corrección
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const getPets = async (req, res) => {
    try {
        const pets = await getAllPets();
        res.status(200).json({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};