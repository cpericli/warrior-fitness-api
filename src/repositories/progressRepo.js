import prisma from '../config/db.js';

export async function getAllByUserId(userId) {
  return prisma.progressEntry.findMany({
    where: { user_id: userId },
    include: {
      workout: true,
    },
    orderBy: { id: 'asc' },
  });
}

export async function getById(id) {
  return prisma.progressEntry.findUnique({
    where: { id },
    include: {
      workout: true,
    },
  });
}

export function create(progressData) {
  return prisma.progressEntry.create({
    data: progressData,
    include: {
      workout: true,
    },
  });
}

export async function update(id, updatedData) {
  try {
    return await prisma.progressEntry.update({
      where: { id },
      data: updatedData,
      include: {
        workout: true,
      },
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.progressEntry.delete({
      where: { id },
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}