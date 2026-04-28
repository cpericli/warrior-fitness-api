import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateProgressId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateProgressEntry = [
  body('workout_id')
    .exists({ values: 'falsy' })
    .withMessage('Workout id is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Workout id must be a positive integer'),

  body('date_completed')
    .exists({ values: 'falsy' })
    .withMessage('Date completed is required')
    .bail()
    .isISO8601()
    .withMessage('Date completed must be a valid date'),

  body('notes')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Notes must be a string'),

  handleValidationErrors,
];