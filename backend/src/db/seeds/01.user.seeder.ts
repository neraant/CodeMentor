import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '@/resource/users/entities/user.entity';
import { UserRole } from '@/common/types/user.type';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('TRUNCATE "users" RESTART IDENTITY CASCADE;');

    const repository = dataSource.getRepository(User);

    const students: Partial<User>[] = [
      {
        email: 'alex.petrov@example.com',
        passwordHash: '$2b$10$hashedpassword', // bcrypt хэш
        role: UserRole.STUDENT,
        name: 'Алексей Петров',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
      },
      {
        email: 'maria.ivanova@example.com',
        passwordHash: '$2b$10$hashedpassword',
        role: UserRole.STUDENT,
        name: 'Мария Иванова',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
      },
      {
        email: 'dmitry.smirnov@example.com',
        passwordHash: '$2b$10$hashedpassword',
        role: UserRole.STUDENT,
        name: 'Дмитрий Смирнов',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
      },
      {
        email: 'ekaterina.kuznetsova@example.com',
        passwordHash: '$2b$10$hashedpassword',
        role: UserRole.STUDENT,
        name: 'Екатерина Кузнецова',
        avatarUrl: 'https://i.pravatar.cc/150?img=4',
      },
      {
        email: 'nikita.volkov@example.com',
        passwordHash: '$2b$10$hashedpassword',
        role: UserRole.STUDENT,
        name: 'Никита Волков',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      },
    ];

    const mentors: Partial<User>[] = [
      {
        email: 'mentor.js@codementor.ru',
        passwordHash: '$2b$10$hashedpassword',
        role: UserRole.MENTOR,
        name: 'Иван Соколов',
        avatarUrl: 'https://i.pravatar.cc/150?img=6',
      },
      {
        email: 'mentor.python@codementor.ru',
        passwordHash: '$2b$10$hashedpassword',
        role: UserRole.MENTOR,
        name: 'Анна Морозова',
        avatarUrl: 'https://i.pravatar.cc/150?img=7',
      },
      {
        email: 'mentor.java@codementor.ru',
        passwordHash: '$2b$10$hashedpassword',
        role: UserRole.MENTOR,
        name: 'Михаил Козлов',
        avatarUrl: 'https://i.pravatar.cc/150?img=8',
      },
      {
        email: 'mentor.cpp@codementor.ru',
        passwordHash: '$2b$10$hashedpassword',
        role: UserRole.MENTOR,
        name: 'Ольга Федорова',
        avatarUrl: 'https://i.pravatar.cc/150?img=9',
      },
      {
        email: 'mentor.ts@codementor.ru',
        passwordHash: '$2b$10$hashedpassword',
        role: UserRole.MENTOR,
        name: 'Сергей Лебедев',
        avatarUrl: 'https://i.pravatar.cc/150?img=10',
      },
    ];

    const allUsers = [...students, ...mentors].map((userData) =>
      repository.create(userData),
    );

    await repository.save(allUsers);
  }
}
