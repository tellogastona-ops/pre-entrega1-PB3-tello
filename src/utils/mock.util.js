import { fakerES as faker } from '@faker-js/faker';
import { createHash } from './bcrypt.util.js';

/**
 * Genera una lista de usuarios mock según el parámetro numérico.
 * @param {number} count Cantidad de usuarios
 */
export const generateMockUsers = (count = 1) => {
    const users = [];
    const passwordHash = createHash('coder123'); // Requisito: contraseña "coder123" encriptada

    for (let i = 0; i < count; i++) {
        users.push({
            _id: faker.database.mongodbObjectId(), // Simula ID de Mongo
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: passwordHash,
            role: faker.helpers.arrayElement(['user', 'admin']), // Requisito: varía entre user y admin
            pets: [] // Requisito: array vacío
        });
    }

    return users;
};

/**
 * Genera una lista de mascotas mock.
 * @param {number} count Cantidad de mascotas
 */
export const generateMockPets = (count = 1) => {
    const pets = [];

    for (let i = 0; i < count; i++) {
        pets.push({
            _id: faker.database.mongodbObjectId(),
            name: faker.animal.petName(),
            specie: faker.animal.type(),
            adopted: false
        });
    }

    return pets;
};