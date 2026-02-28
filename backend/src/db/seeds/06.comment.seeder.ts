import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Comment } from '@/resource/comments/entities/comment.entity';

export default class CommentSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "comments" RESTART IDENTITY CASCADE;');

    const userRepo = dataSource.getRepository('users');
    const submissionRepo = dataSource.getRepository('submissions');

    const mentors = (await userRepo.find({ where: { role: 'mentor' } })) as {
      id: string;
      name: string;
    }[];
    const submissions = (await submissionRepo.find()) as { id: string }[];

    const repository = dataSource.getRepository(Comment);

    const comments: Partial<Comment>[] = [
      // submission[0] — counter.js v1 (changes_requested)
      {
        submissionId: submissions[0].id,
        authorId: mentors[0].id,
        lineNumber: 3,
        content:
          'Хорошее начало, но не хватает значения по умолчанию для `initial`. Что если вызвать `makeCounter()` без аргументов?',
        codeSnippet: 'function makeCounter(initial) {',
      },
      {
        submissionId: submissions[0].id,
        authorId: mentors[0].id,
        lineNumber: 5,
        content:
          'Счётчик может уйти в отрицательные значения — по условию задачи этого нельзя допускать. Добавь проверку.',
        codeSnippet: 'decrement() { count--; },',
      },
      {
        submissionId: submissions[0].id,
        authorId: mentors[0].id,
        lineNumber: undefined,
        content:
          'В целом логика замыкания понята верно. Исправь два момента выше и можно сдавать.',
        codeSnippet: undefined,
      },
      // submission[2] — counter.js v1 student[1]
      {
        submissionId: submissions[2].id,
        authorId: mentors[0].id,
        lineNumber: 2,
        content: 'Избегай `var` в современном JS. Используй `let` или `const`.',
        codeSnippet: 'var count = initial || 0;',
      },
      {
        submissionId: submissions[2].id,
        authorId: mentors[0].id,
        lineNumber: 2,
        content:
          'Также `initial || 0` неверно работает если передать `initial = 0` явно. Используй `initial ?? 0` или параметр по умолчанию.',
        codeSnippet: 'var count = initial || 0;',
      },
      // submission[4] — fetchUser.js
      {
        submissionId: submissions[4].id,
        authorId: mentors[0].id,
        lineNumber: 8,
        content:
          'Если пользователь не найден — функция возвращает `undefined` вместо ошибки. По условию нужно выбросить исключение с понятным сообщением.',
        codeSnippet: 'return user;',
      },
      {
        submissionId: submissions[4].id,
        authorId: mentors[0].id,
        lineNumber: undefined,
        content:
          'Не хватает обработки ошибок через `try/catch`. Что если `setTimeout` упадёт? Оберни логику.',
        codeSnippet: undefined,
      },
      // submission[6] — zoo.py v1
      {
        submissionId: submissions[6].id,
        authorId: mentors[1].id,
        lineNumber: 6,
        content:
          'Используй `return` вместо `print` — так метод будет более переиспользуемым и тестируемым.',
        codeSnippet: "        print(f'{self.name} говорит: {self.sound}')",
      },
      {
        submissionId: submissions[6].id,
        authorId: mentors[1].id,
        lineNumber: undefined,
        content:
          'Не хватает `__str__` метода — по условию он обязателен. Также добавь аннотации типов.',
        codeSnippet: undefined,
      },
      // submission[8] — Stack.java
      {
        submissionId: submissions[8].id,
        authorId: mentors[2].id,
        lineNumber: 4,
        content:
          'Хорошо что используешь `ArrayList`, но лучше объявить как `List<T>` для гибкости.',
        codeSnippet: '    private final ArrayList<T> data = new ArrayList<>();',
      },
      {
        submissionId: submissions[8].id,
        authorId: mentors[2].id,
        lineNumber: 21,
        content:
          'Итератор работает корректно. Хороший подход через анонимный класс.',
        codeSnippet: '    public Iterator<T> iterator() {',
      },
      {
        submissionId: submissions[8].id,
        authorId: mentors[2].id,
        lineNumber: undefined,
        content:
          'Отличная работа в целом! Generics использованы правильно, исключения обработаны. Небольшое замечание по типу поля выше.',
        codeSnippet: undefined,
      },
    ];

    await repository.save(comments);
  }
}
