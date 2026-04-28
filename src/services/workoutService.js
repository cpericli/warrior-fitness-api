import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/workoutRepo.js';

export async function getAllWorkouts() {
  return getAll();
}

export async function getWorkoutById(id) {
  const workout = await getById(id);

  if (workout) return workout;

  const error = new Error(`Workout ${id} not found`);
  error.status = 404;
  throw error;
}

export async function createWorkout(workoutData) {
  return create(workoutData);
}

export async function updateWorkout(id, updatedData) {
  const updatedWorkout = await update(id, updatedData);

  if (updatedWorkout) return updatedWorkout;

  const error = new Error(`Workout ${id} not found`);
  error.status = 404;
  throw error;
}

export async function deleteWorkout(id) {
  const deletedWorkout = await remove(id);

  if (deletedWorkout) return deletedWorkout;

  const error = new Error(`Workout ${id} not found`);
  error.status = 404;
  throw error;
}