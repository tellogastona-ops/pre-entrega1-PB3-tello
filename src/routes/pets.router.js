import { Router } from 'express';
import { getPets } from '../controllers/mocks.controller.js';

const router = Router();
router.get('/', getPets);

export default router;