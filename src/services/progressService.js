import {
  getAllByUserId,
  getById,
  create,
  update,
  remove,
} from '../repositories/progressRepo.js';

import { getById as getWorkoutById } from '../repositories/workoutRepo.js';

function checkOwnership(progressEntry, userId) {
  if (progressEntry.user_id !== userId) {
    const error = new Error('Forbidden: insufficient permission');
    error.status = 403;
    throw error;
  }
}

async function verifyWorkoutExists(workoutId) {
  const workout = await getWorkoutById(workoutId);

  if (!workout) {
    const error = new Error(`Workout ${workoutId} not found`);
    error.status = 404;
    throw error;
  }
}

export async function getAllProgressEntries(userId) {
  return getAllByUserId(userId);
}

export async function getProgressEntryById(id, userId) {
  const progressEntry = await getById(id);

  if (!progressEntry) {
    const error = new Error(`Progress entry ${id} not found`);
    error.status = 404;
    throw error;
  }

  checkOwnership(progressEntry, userId);

  return progressEntry;
}

export async function createProgressEntry(progressData, userId) {
  await verifyWorkoutExists(parseInt(progressData.workout_id));

  return create({
    user_id: userId,
    workout_id: parseInt(progressData.workout_id),
    date_completed: new Date(progressData.date_completed),
    notes: progressData.notes,
  });
}

export async function updateProgressEntry(id, progressData, userId) {
  const existingEntry = await getById(id);

  if (!existingEntry) {
    const error = new Error(`Progress entry ${id} not found`);
    error.status = 404;
    throw error;
  }

  checkOwnership(existingEntry, userId);

  await verifyWorkoutExists(parseInt(progressData.workout_id));

  const updatedEntry = await update(id, {
    workout_id: parseInt(progressData.workout_id),
    date_completed: new Date(progressData.date_completed),
    notes: progressData.notes,
  });

  return updatedEntry;
}

export async function deleteProgressEntry(id, userId) {
  const existingEntry = await getById(id);

  if (!existingEntry) {
    const error = new Error(`Progress entry ${id} not found`);
    error.status = 404;
    throw error;
  }

  checkOwnership(existingEntry, userId);

  return remove(id);
}