import PetModel from '../models/pet.model.js';

export const getAllPets = async () => {
    return await PetModel.find();
};

export const insertManyPets = async (pets) => {
    return await PetModel.insertMany(pets);
};