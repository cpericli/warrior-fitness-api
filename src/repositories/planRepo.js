import prisma from '../config/db.js';

const includeWorkouts = {
  planWorkouts: {
    include: {
      workout: true,
    },
    orderBy: {
      day_number: 'asc',
    },
  },
};

export async function getAllByUserId(userId) {
  return prisma.workoutPlan.findMany({
    where: { user_id: userId },
    include: includeWorkouts,
    orderBy: { id: 'asc' },
  });
}

export async function getById(id) {
  return prisma.workoutPlan.findUnique({
    where: { id },
    include: includeWorkouts,
  });
}

export async function create(planData, workouts) {
  return prisma.workoutPlan.create({
    data: {
      title: planData.title,
      goal: planData.goal,
      duration_weeks: planData.duration_weeks,
      user_id: planData.user_id,
      planWorkouts: {
        create: workouts.map((workout) => ({
          workout_id: workout.workout_id,
          day_number: workout.day_number,
        })),
      },
    },
    include: includeWorkouts,
  });
}

export async function update(id, planData, workouts) {
  try {
    return await prisma.$transaction(async (tx) => {
      await tx.planWorkout.deleteMany({
        where: { plan_id: id },
      });

      await tx.workoutPlan.update({
        where: { id },
        data: {
          title: planData.title,
          goal: planData.goal,
          duration_weeks: planData.duration_weeks,
        },
      });

      return tx.workoutPlan.update({
        where: { id },
        data: {
          planWorkouts: {
            create: workouts.map((workout) => ({
              workout_id: workout.workout_id,
              day_number: workout.day_number,
            })),
          },
        },
        include: includeWorkouts,
      });
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.workoutPlan.delete({
      where: { id },
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}