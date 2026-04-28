import { signUp, logIn } from '../services/authService.js';

export async function signUpHandler(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const newUser = await signUp(name, email, password);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export async function logInHandler(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await logIn(email, password);

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    next(error);
  }
}