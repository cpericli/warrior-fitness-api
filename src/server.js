import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Warrior Fitness API is running' });
});

const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.log(err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});