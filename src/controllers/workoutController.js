import {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from '../services/workoutService.js';

export async function getAllWorkoutsHandler(req, res) {
  const workouts = await getAllWorkouts();
  res.status(200).json(workouts);
}

export async function getWorkoutByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const workout = await getWorkoutById(id);
  res.status(200).json(workout);
}

export async function createWorkoutHandler(req, res) {
  const {
    title,
    description,
    category,
    difficulty,
    duration_minutes,
  } = req.body;

  const newWorkout = await createWorkout({
    title,
    description,
    category,
    difficulty,
    duration_minutes: parseInt(duration_minutes),
  });

  res.status(201).json(newWorkout);
}

export async function updateWorkoutHandler(req, res) {
  const id = parseInt(req.params.id);

  const {
    title,
    description,
    category,
    difficulty,
    duration_minutes,
  } = req.body;

  const updatedWorkout = await updateWorkout(id, {
    title,
    description,
    category,
    difficulty,
    duration_minutes: parseInt(duration_minutes),
  });

  res.status(200).json(updatedWorkout);
}

export async function deleteWorkoutHandler(req, res) {
  const id = parseInt(req.params.id);
  const deletedWorkout = await deleteWorkout(id);
  res.status(200).json(deletedWorkout);
}