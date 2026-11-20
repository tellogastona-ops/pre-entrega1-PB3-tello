import bcrypt from 'bcrypt';

/**
 * Genera el hash de una contraseña usando bcrypt.
 * @param {string} password - Contraseña en texto plano
 * @returns {string} Hash resultante
 */
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};