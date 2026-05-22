import express from 'express';

import {
  getAllUsers,
  createNewUser,
  getUser,
  updateExistingUser,
  deleteExistingUser
} from '../controllers/users.controller.js';

import { verifyToken, authorizeRoles} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get(
  '/',
  verifyToken,
  authorizeRoles('Director', 'Administrativo'),
  getAllUsers
);

router.get(
  '/:id',
  verifyToken,
  authorizeRoles('Director', 'Administrativo'),
  getUser
);

router.post(
  '/',
  verifyToken,
  authorizeRoles('Director', 'Administrativo'),
  createNewUser
);

router.put(
  '/:id',
  verifyToken,
  authorizeRoles('Director', 'Administrativo'),
  updateExistingUser
);

router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('Director'),
  deleteExistingUser
);

export default router;