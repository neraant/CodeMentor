import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { GroupMember } from '@/resource/group-members/entities/group-member.entity';

export default class GroupMembersSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query(
      'TRUNCATE "group_members" RESTART IDENTITY CASCADE;',
    );

    const userRepo = dataSource.getRepository('users');
    const groupRepo = dataSource.getRepository('groups');

    const students = await userRepo.find({ where: { role: 'student' } });
    const groups = await groupRepo.find();

    const repository = dataSource.getRepository(GroupMember);

    // Каждый студент попадает в 2-3 группы
    const memberships = [
      { groupId: groups[0].id as string, studentId: students[0].id as string }, // JS Fundamentals
      { groupId: groups[0].id as string, studentId: students[1].id as string },
      { groupId: groups[0].id as string, studentId: students[2].id as string },
      { groupId: groups[1].id as string, studentId: students[0].id as string }, // React Advanced
      { groupId: groups[1].id as string, studentId: students[3].id as string },
      { groupId: groups[2].id as string, studentId: students[1].id as string }, // Python начинающих
      { groupId: groups[2].id as string, studentId: students[4].id as string },
      { groupId: groups[3].id as string, studentId: students[2].id as string }, // Python DS
      { groupId: groups[3].id as string, studentId: students[4].id as string },
      { groupId: groups[4].id as string, studentId: students[3].id as string }, // Java Core
      { groupId: groups[4].id as string, studentId: students[0].id as string },
      { groupId: groups[5].id as string, studentId: students[2].id as string }, // C++ Algorithms
      { groupId: groups[5].id as string, studentId: students[1].id as string },
      { groupId: groups[6].id as string, studentId: students[3].id as string }, // TS Fullstack
      { groupId: groups[6].id as string, studentId: students[4].id as string },
    ];

    await repository.save(memberships);
  }
}
