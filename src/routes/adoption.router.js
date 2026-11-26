import { Router } from 'express';
import mongoose from 'mongoose';
import Adoption from '../models/adoption.model.js';
import User from '../models/user.model.js';
import Pet from '../models/pet.model.js';

const router = Router();

// Obtener todas las adopciones
router.get('/', async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate('owner pet');
    res.status(200).json({ status: 'success', payload: adoptions });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Obtener una adopción por ID
router.get('/:aid', async (req, res) => {
  try {
    const { aid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(aid)) {
      return res.status(400).json({ status: 'error', error: 'ID de adopción inválido' });
    }

    const adoption = await Adoption.findById(aid).populate('owner pet');
    if (!adoption) {
      return res.status(404).json({ status: 'error', error: 'Adopción no encontrada' });
    }

    res.status(200).json({ status: 'success', payload: adoption });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Crear una adopción
router.post('/:uid/:pid', async (req, res) => {
  try {
    const { uid, pid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(uid) || !mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ status: 'error', error: 'ID de usuario o mascota inválido' });
    }

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' });
    }

    const pet = await Pet.findById(pid);
    if (!pet) {
      return res.status(404).json({ status: 'error', error: 'Mascota no encontrada' });
    }

    if (pet.adopted) {
      return res.status(400).json({ status: 'error', error: 'La mascota ya fue adoptada' });
    }

    pet.adopted = true;
    pet.owner = user._id;
    await pet.save();

    if (Array.isArray(user.pets)) {
      user.pets.push(pet._id);
      await user.save();
    }

    const adoption = await Adoption.create({
      owner: user._id,
      pet: pet._id,
      status: 'accepted',
    });

    res.status(201).json({ status: 'success', payload: adoption });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Eliminar una adopción (útil para limpiar en tests o revertir)
router.delete('/:aid', async (req, res) => {
  try {
    const { aid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(aid)) {
      return res.status(400).json({ status: 'error', error: 'ID de adopción inválido' });
    }

    const deleted = await Adoption.findByIdAndDelete(aid);
    if (!deleted) {
      return res.status(404).json({ status: 'error', error: 'Adopción no encontrada' });
    }

    res.status(200).json({ status: 'success', payload: deleted });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;