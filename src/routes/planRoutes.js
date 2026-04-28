import express from 'express';

import {
  getAllPlansHandler,
  getPlanByIdHandler,
  createPlanHandler,
  updatePlanHandler,
  deletePlanHandler,
} from '../controllers/planController.js';

import { authenticate } from '../middleware/authenticate.js';

import {
  validatePlanId,
  validatePlan,
} from '../middleware/planValidators.js';

const router = express.Router();

router.get('/', authenticate, getAllPlansHandler);

router.get(
  '/:id',
  authenticate,
  validatePlanId,
  getPlanByIdHandler,
);

router.post(
  '/',
  authenticate,
  validatePlan,
  createPlanHandler,
);

router.put(
  '/:id',
  authenticate,
  validatePlanId,
  validatePlan,
  updatePlanHandler,
);

router.delete(
  '/:id',
  authenticate,
  validatePlanId,
  deletePlanHandler,
);

export default router;