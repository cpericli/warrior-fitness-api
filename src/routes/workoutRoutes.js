import express from 'express';

import {
  getAllWorkoutsHandler,
  getWorkoutByIdHandler,
  createWorkoutHandler,
  updateWorkoutHandler,
  deleteWorkoutHandler,
} from '../controllers/workoutController.js';

import {
  validateId,
  validateCreateWorkout,
  validateUpdateWorkout,
} from '../middleware/workoutValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', authenticate, getAllWorkoutsHandler);

router.get( '/:id', authenticate, validateId, getWorkoutByIdHandler,);

router.post( '/', authenticate, authorizeRoles('admin'), validateCreateWorkout, createWorkoutHandler,);

router.put( '/:id', authenticate, authorizeRoles('admin'), validateId, validateUpdateWorkout, updateWorkoutHandler,);

router.delete( '/:id', authenticate, authorizeRoles('admin'), validateId, deleteWorkoutHandler, );

export default router;