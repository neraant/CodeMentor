import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Group } from '@/resource/groups/entities/group.entity';

export default class GroupSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "groups" RESTART IDENTITY CASCADE;');

    const userRepo = dataSource.getRepository('users');
    const mentors = await userRepo.find({ where: { role: 'mentor' } });

    const repository = dataSource.getRepository(Group);

    await repository.save([
      {
        mentorId: mentors[0].id as string,
        name: 'JavaScript Fundamentals',
        description: 'Основы JavaScript: ES6+, асинхронность, работа с DOM',
        inviteCode: 'JS-FUND-2024',
      },
      {
        mentorId: mentors[0].id as string,
        name: 'React Advanced',
        description: 'Продвинутый React: хуки, контекст, оптимизация',
        inviteCode: 'REACT-ADV-2024',
      },
      {
        mentorId: mentors[1].id as string,
        name: 'Python для начинающих',
        description: 'Python с нуля: синтаксис, структуры данных, ООП',
        inviteCode: 'PY-BEGIN-2024',
      },
      {
        mentorId: mentors[1].id as string,
        name: 'Python Data Science',
        description: 'NumPy, Pandas, визуализация данных',
        inviteCode: 'PY-DS-2024',
      },
      {
        mentorId: mentors[2].id as string,
        name: 'Java Core',
        description: 'Основы Java: ООП, коллекции, многопоточность',
        inviteCode: 'JAVA-CORE-2024',
      },
      {
        mentorId: mentors[3].id as string,
        name: 'C++ Algorithms',
        description: 'Алгоритмы и структуры данных на C++',
        inviteCode: 'CPP-ALG-2024',
      },
      {
        mentorId: mentors[4].id as string,
        name: 'TypeScript Fullstack',
        description: 'TypeScript на фронте и бэке: NestJS + React',
        inviteCode: 'TS-FULL-2024',
      },
    ]);
  }
}
