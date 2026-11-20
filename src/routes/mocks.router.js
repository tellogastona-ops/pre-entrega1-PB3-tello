import { Router } from 'express';
import { 
    getMockingPets, 
    getMockingUsers, 
    generateData 
} from '../controllers/mocks.controller.js';

const router = Router();

// 1. GET /api/mocks/mockingpets
router.get('/mockingpets', getMockingPets);

// 2. GET /api/mocks/mockingusers
router.get('/mockingusers', getMockingUsers);

// 3. POST /api/mocks/generateData
router.post('/generateData', generateData);

export default router;