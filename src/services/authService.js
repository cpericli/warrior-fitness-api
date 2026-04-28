import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/userRepo.js';

export async function signUp(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return createUser({
    name,
    email,
    password_hash: hashedPassword,
    role: 'cadet',
  });
}

export async function logIn(email, password) {
  const error = new Error('Invalid credentials');
  error.status = 401;

  const user = await findUserByEmail(email);
  if (!user) throw error;

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw error;

  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
}