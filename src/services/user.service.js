import UserModel from '../models/user.model.js';

export const getAllUsers = async () => {
    return await UserModel.find();
};

export const insertManyUsers = async (users) => {
    return await UserModel.insertMany(users, { ordered: false });
};