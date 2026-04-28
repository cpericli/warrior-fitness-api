import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateWorkout = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('description')
    .exists({ values: 'falsy' })
    .withMessage('Description is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage('Description must be at least 5 characters'),

  body('category')
    .exists({ values: 'falsy' })
    .withMessage('Category is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Category must be a string'),

  body('difficulty')
    .exists({ values: 'falsy' })
    .withMessage('Difficulty is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Difficulty must be a string'),

  body('duration_minutes')
    .exists({ values: 'falsy' })
    .withMessage('Duration minutes is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Duration minutes must be a positive integer'),

  handleValidationErrors,
];

export const validateUpdateWorkout = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('description')
    .exists({ values: 'falsy' })
    .withMessage('Description is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage('Description must be at least 5 characters'),

  body('category')
    .exists({ values: 'falsy' })
    .withMessage('Category is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Category must be a string'),

  body('difficulty')
    .exists({ values: 'falsy' })
    .withMessage('Difficulty is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Difficulty must be a string'),

  body('duration_minutes')
    .exists({ values: 'falsy' })
    .withMessage('Duration minutes is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Duration minutes must be a positive integer'),

  handleValidationErrors,
];