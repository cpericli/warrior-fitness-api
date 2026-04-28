import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validatePlanId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validatePlan = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('goal')
    .exists({ values: 'falsy' })
    .withMessage('Goal is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Goal must be at least 3 characters'),

  body('duration_weeks')
    .exists({ values: 'falsy' })
    .withMessage('Duration weeks is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Duration weeks must be a positive integer'),

  body('workouts')
    .isArray({ min: 1 })
    .withMessage('At least one workout is required'),

  body('workouts.*.workout_id')
    .isInt({ min: 1 })
    .withMessage('Workout id must be a positive integer'),

  body('workouts.*.day_number')
    .isInt({ min: 1 })
    .withMessage('Day number must be a positive integer'),

  handleValidationErrors,
];