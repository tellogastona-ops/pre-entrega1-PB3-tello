import bcrypt from 'bcrypt';

/**
 * Hashea una contraseña usando bcrypt.
 * @param {string} password 
 * @returns {string} Hash resultante
 */
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};