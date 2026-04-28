import express from 'express';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/authValidators.js';

const router = express.Router();

router.post('/signup', validateSignup, signUpHandler);
router.post('/login', validateSignup, logInHandler);

export default router;