import { Router } from 'express';
import { getUsers } from '../controllers/mocks.controller.js';

const router = Router();
router.get('/', getUsers);

export default router;