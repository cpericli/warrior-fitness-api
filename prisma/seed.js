import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

async function main() {
  // clear existing data 
  await prisma.$queryRaw`TRUNCATE progressEntry, planWorkout, workoutPlan, workout, user RESTART IDENTITY CASCADE;

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
  const workouts = await prisma.workout.createMany({
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
      {
        title: 'Long Distance Run',
        description: 'Steady pace endurance run',
        category: 'Cardio',
        difficulty: 'Advanced',
        duration_minutes: 45,
      },
    ],
  });

  // fetch workouts so we can use IDs
  const allWorkouts = await prisma.workout.findMany();

  // create cadet plan
  await prisma.workoutPlan.create({
    data: {
      title: 'Cadet Beginner Plan',
      goal: 'Improve baseline fitness',
      duration_weeks: 4,
      user_id: cadet.id,
      planWorkouts: {
        create: [
          {
            workout_id: allWorkouts[0].id,
            day_number: 1,
          },
          {
            workout_id: allWorkouts[1].id,
            day_number: 2,
          },
        ],
      },
    },
  });

  // create admin plan (for ownership testing)
  await prisma.workoutPlan.create({
    data: {
      title: 'Admin Plan',
      goal: 'Maintain high fitness',
      duration_weeks: 6,
      user_id: admin.id,
      planWorkouts: {
        create: [
          {
            workout_id: allWorkouts[1].id,
            day_number: 1,
          },
          {
            workout_id: allWorkouts[2].id,
            day_number: 2,
          },
        ],
      },
    },
  });


  // create cadet progress entry
  await prisma.progressEntry.create({
    data: {
      user_id: cadet.id,
      workout_id: allWorkouts[0].id,
      date_completed: new Date('2026-03-31'),
      notes: 'Felt stronger than last week',
    },
  });

  // create admin progress entry 
  await prisma.progressEntry.create({
    data: {
      user_id: admin.id,
      workout_id: allWorkouts[1].id,
      date_completed: new Date('2026-04-01'),
      notes: 'Completed workout with good form',
    },
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