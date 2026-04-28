import express from 'express';

import {
  getAllProgressEntriesHandler,
  getProgressEntryByIdHandler,
  createProgressEntryHandler,
  updateProgressEntryHandler,
  deleteProgressEntryHandler,
} from '../controllers/progressController.js';

import {
  validateProgressId,
  validateProgressEntry,
} from '../middleware/progressValidators.js';

import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllProgressEntriesHandler);

router.get(
  '/:id',
  authenticate,
  validateProgressId,
  getProgressEntryByIdHandler,
);

router.post(
  '/',
  authenticate,
  validateProgressEntry,
  createProgressEntryHandler,
);

router.put(
  '/:id',
  authenticate,
  validateProgressId,
  validateProgressEntry,
  updateProgressEntryHandler,
);

router.delete(
  '/:id',
  authenticate,
  validateProgressId,
  deleteProgressEntryHandler,
);

export default router;