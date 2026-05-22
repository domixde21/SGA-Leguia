import express from 'express';

import { getStats } from '../controllers/dashboard.controller.js';

import {
  verifyToken,
  authorizeRoles
} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get(
  '/stats',
  verifyToken,
  authorizeRoles('Director', 'Administrativo'),
  getStats
);

export default router;