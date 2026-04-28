import {
  getAllByUserId,
  getById,
  create,
  update,
  remove,
} from '../repositories/planRepo.js';

import { getById as getWorkoutById } from '../repositories/workoutRepo.js';

async function verifyWorkoutsExist(workouts) {
  for (const workout of workouts) {
    const existingWorkout = await getWorkoutById(workout.workout_id);

    if (!existingWorkout) {
      const error = new Error(`Workout ${workout.workout_id} not found`);
      error.status = 404;
      throw error;
    }
  }
}

function checkOwnership(plan, userId) {
  if (plan.user_id !== userId) {
    const error = new Error('Forbidden: insufficient permission');
    error.status = 403;
    throw error;
  }
}

export async function getAllPlans(userId) {
  return getAllByUserId(userId);
}

export async function getPlanById(id, userId) {
  const plan = await getById(id);

  if (!plan) {
    const error = new Error(`Plan ${id} not found`);
    error.status = 404;
    throw error;
  }

  checkOwnership(plan, userId);

  return plan;
}

export async function createPlan(planData, userId) {
  await verifyWorkoutsExist(planData.workouts);

  return create(
    {
      title: planData.title,
      goal: planData.goal,
      duration_weeks: parseInt(planData.duration_weeks),
      user_id: userId,
    },
    planData.workouts,
  );
}

export async function updatePlan(id, planData, userId) {
  const existingPlan = await getById(id);

  if (!existingPlan) {
    const error = new Error(`Plan ${id} not found`);
    error.status = 404;
    throw error;
  }

  checkOwnership(existingPlan, userId);

  await verifyWorkoutsExist(planData.workouts);

  const updatedPlan = await update(
    id,
    {
      title: planData.title,
      goal: planData.goal,
      duration_weeks: parseInt(planData.duration_weeks),
    },
    planData.workouts,
  );

  return updatedPlan;
}

export async function deletePlan(id, userId) {
  const existingPlan = await getById(id);

  if (!existingPlan) {
    const error = new Error(`Plan ${id} not found`);
    error.status = 404;
    throw error;
  }

  checkOwnership(existingPlan, userId);

  return remove(id);
}