import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {
  Notification,
  NotificationType,
} from '@/resource/notifications/entities/notification.entity';

export default class NotificationSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query(
      'TRUNCATE "notifications" RESTART IDENTITY CASCADE;',
    );

    const userRepo = dataSource.getRepository('users');
    const submissionRepo = dataSource.getRepository('submissions');

    const students = await userRepo.find({ where: { role: 'student' } });
    const mentors = await userRepo.find({ where: { role: 'mentor' } });
    const submissions = await submissionRepo.find();

    const repository = dataSource.getRepository(Notification);

    await repository.save([
      // Студент получает уведомление о комментариях
      {
        userId: students[0].id as string,
        type: NotificationType.NEW_COMMENT,
        isRead: true,
        payload: {
          submissionId: submissions[0].id as string,
          message: 'Ментор оставил комментарий к вашему решению',
          authorName: mentors[0].name as string,
        },
      },
      {
        userId: students[0].id as string,
        type: NotificationType.STATUS_CHANGED,
        isRead: true,
        payload: {
          submissionId: submissions[0].id as string,
          status: 'changes_requested',
          message: 'Ментор запросил изменения в вашем решении',
        },
      },
      {
        userId: students[0].id as string,
        type: NotificationType.STATUS_CHANGED,
        isRead: false,
        payload: {
          submissionId: submissions[1].id as string,
          status: 'approved',
          message: 'Ваше решение одобрено!',
        },
      },
      {
        userId: students[0].id as string,
        type: NotificationType.NEW_COMMENT,
        isRead: false,
        payload: {
          submissionId: submissions[4].id as string,
          message: 'Ментор оставил комментарий к вашему решению',
          authorName: mentors[0].name as string,
        },
      },

      // student[1]
      {
        userId: students[1].id as string,
        type: NotificationType.NEW_COMMENT,
        isRead: false,
        payload: {
          submissionId: submissions[2].id as string,
          message: 'Ментор оставил комментарий к вашему решению',
          authorName: mentors[0].name as string,
        },
      },
      {
        userId: students[1].id as string,
        type: NotificationType.STATUS_CHANGED,
        isRead: false,
        payload: {
          submissionId: submissions[6].id as string,
          status: 'changes_requested',
          message: 'Ментор запросил изменения в вашем решении',
        },
      },
      {
        userId: students[1].id as string,
        type: NotificationType.STATUS_CHANGED,
        isRead: true,
        payload: {
          submissionId: submissions[7].id as string,
          status: 'approved',
          message: 'Ваше решение одобрено!',
        },
      },

      // Ментор получает уведомления о новых решениях
      {
        userId: mentors[0].id as string,
        type: NotificationType.NEW_SUBMISSION,
        isRead: false,
        payload: {
          submissionId: submissions[2].id as string,
          message: 'Новое решение от студента',
          studentName: students[1].name as string,
        },
      },
      {
        userId: mentors[0].id as string,
        type: NotificationType.NEW_SUBMISSION,
        isRead: false,
        payload: {
          submissionId: submissions[3].id as string,
          message: 'Новое решение от студента',
          studentName: students[2].name as string,
        },
      },
      {
        userId: mentors[0].id as string,
        type: NotificationType.NEW_SUBMISSION,
        isRead: true,
        payload: {
          submissionId: submissions[0].id as string,
          message: 'Новое решение от студента',
          studentName: students[0].name as string,
        },
      },
      {
        userId: mentors[1].id as string,
        type: NotificationType.NEW_SUBMISSION,
        isRead: false,
        payload: {
          submissionId: submissions[6].id as string,
          message: 'Новое решение от студента',
          studentName: students[1].name as string,
        },
      },
      {
        userId: mentors[2].id as string,
        type: NotificationType.NEW_SUBMISSION,
        isRead: false,
        payload: {
          submissionId: submissions[8].id as string,
          message: 'Новое решение от студента',
          studentName: students[3].name as string,
        },
      },
    ]);
  }
}
