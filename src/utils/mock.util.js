import { fakerES as faker } from '@faker-js/faker';
import { createHash } from './bcrypt.util.js';

export const generateMockUsers = (count = 1) => {
    const users = [];
    const passwordHash = createHash('coder123');

    for (let i = 0; i < count; i++) {
        // Añadimos un número aleatorio o timestamp para evitar duplicados de email
        const uniqueId = Date.now() + Math.floor(Math.random() * 10000);
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: `user_${uniqueId}@test.com`,
            password: passwordHash,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        });
    }

    return users;
};

export const generateMockPets = (count = 1) => {
    const pets = [];

    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.animal.petName(),
            specie: faker.animal.type(),
            adopted: false
        });
    }

    return pets;
};