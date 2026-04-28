import prisma from '../config/db.js';

export async function getAll() {
  const workouts = await prisma.workout.findMany({
    orderBy: { id: 'asc' },
  });

  return workouts;
}

export async function getById(id) {
  const workout = await prisma.workout.findUnique({
    where: { id },
  });

  return workout;
}

export function create(workoutData) {
  const newWorkout = prisma.workout.create({
    data: workoutData,
  });

  return newWorkout;
}

export async function update(id, updatedData) {
  try {
    const updatedWorkout = await prisma.workout.update({
      where: { id },
      data: updatedData,
    });

    return updatedWorkout;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedWorkout = await prisma.workout.delete({
      where: { id },
    });

    return deletedWorkout;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}