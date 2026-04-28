import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

async function main() {
  // clear existing data 
  await prisma.progressEntry.deleteMany();
  await prisma.planWorkout.deleteMany();
  await prisma.workoutPlan.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // create an admin
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password_hash: hashedPassword,
      role: 'admin',
    },
  });

  // create cadet
  const cadet = await prisma.user.create({
    data: {
      name: 'Cadet User',
      email: 'cadet@example.com',
      password_hash: hashedPassword,
      role: 'cadet',
    },
  });

  // create sample workouts
  await prisma.workout.createMany({
    data: [
      {
        title: 'Interval Run',
        description: 'Alternate sprinting and jogging',
        category: 'Cardio',
        difficulty: 'Intermediate',
        duration_minutes: 30,
      },
      {
        title: 'Push-Up Circuit',
        description: 'Timed push-up sets',
        category: 'Strength',
        difficulty: 'Beginner',
        duration_minutes: 20,
      },
    ],
  });

  console.log('Database seeded');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });