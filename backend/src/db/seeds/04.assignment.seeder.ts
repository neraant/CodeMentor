import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Assignment } from '@/resource/assignments/entities/assignment.entity';
import { ProgrammingLanguage } from '@/common/types/assignment.type';

export default class AssignmentSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "assignments" RESTART IDENTITY CASCADE;');

    const userRepo = dataSource.getRepository('users');
    const groupRepo = dataSource.getRepository('groups');

    const mentors = await userRepo.find({ where: { role: 'mentor' } });
    const groups = await groupRepo.find();

    const repository = dataSource.getRepository(Assignment);

    const now = new Date();
    const future = (days: number) =>
      new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    await repository.save([
      // JS Fundamentals (group[0], mentor[0])
      {
        groupId: groups[0].id as string,
        mentorId: mentors[0].id as string,
        title: 'Замыкания и область видимости',
        description: `## Задача\n\nРеализуй функцию \`makeCounter\`, которая возвращает объект с методами \`increment\`, \`decrement\` и \`getCount\`.\n\n### Требования\n- Используй замыкание для хранения состояния\n- Начальное значение передаётся как аргумент\n- Счётчик не должен уходить в отрицательные значения\n\n### Пример\n\`\`\`js\nconst counter = makeCounter(10);\ncounter.increment(); // 11\ncounter.decrement(); // 10\ncounter.getCount();  // 10\n\`\`\``,
        language: ProgrammingLanguage.JAVASCRIPT,
        deadline: future(7),
      },
      {
        groupId: groups[0].id as string,
        mentorId: mentors[0].id as string,
        title: 'Promise и async/await',
        description: `## Задача\n\nНапиши функцию \`fetchUserData\`, которая получает данные пользователя по id с задержкой (имитация API).\n\n### Требования\n- Используй \`async/await\`\n- Обработай ошибки через \`try/catch\`\n- Если id не найден — выбрось ошибку с понятным сообщением\n\n### Пример\n\`\`\`js\nconst user = await fetchUserData(1);\nconsole.log(user.name); // 'Alice'\n\`\`\``,
        language: ProgrammingLanguage.JAVASCRIPT,
        deadline: future(10),
      },
      {
        groupId: groups[0].id as string,
        mentorId: mentors[0].id as string,
        title: 'Работа с массивами: map, filter, reduce',
        description: `## Задача\n\nДан массив заказов. Используй \`map\`, \`filter\`, \`reduce\` чтобы:\n1. Отфильтровать заказы дороже 1000 руб\n2. Применить скидку 10%\n3. Посчитать итоговую сумму\n\n### Требования\n- Только функциональный стиль (без циклов)\n- Цепочка методов в одном выражении`,
        language: ProgrammingLanguage.JAVASCRIPT,
        deadline: future(5),
      },

      // React Advanced (group[1], mentor[0])
      {
        groupId: groups[1].id as string,
        mentorId: mentors[0].id as string,
        title: 'Кастомный хук useDebounce',
        description: `## Задача\n\nСоздай кастомный хук \`useDebounce\` для задержки обновления значения.\n\n### Требования\n- TypeScript generic типизация\n- Задержка настраивается через параметр\n- Используй \`useEffect\` и \`useState\`\n\n### Пример использования\n\`\`\`tsx\nconst debouncedSearch = useDebounce(searchQuery, 300);\n\`\`\``,
        language: ProgrammingLanguage.TYPESCRIPT,
        deadline: future(14),
      },
      {
        groupId: groups[1].id as string,
        mentorId: mentors[0].id as string,
        title: 'Context API + useReducer',
        description: `## Задача\n\nРеализуй корзину товаров с использованием Context API и useReducer.\n\n### Требования\n- Actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART\n- Персистентность в localStorage\n- TypeScript типизация для state и actions`,
        language: ProgrammingLanguage.TYPESCRIPT,
        deadline: future(12),
      },

      // Python начинающих (group[2], mentor[1])
      {
        groupId: groups[2].id as string,
        mentorId: mentors[1].id as string,
        title: 'Классы и наследование',
        description: `## Задача\n\nСоздай иерархию классов для зоопарка.\n\n### Требования\n- Базовый класс \`Animal\` с полями name, age, sound\n- Дочерние классы: \`Dog\`, \`Cat\`, \`Bird\`\n- Метод \`speak()\` с полиморфизмом\n- Метод \`__str__\` для красивого вывода\n\n### Пример\n\`\`\`python\ndog = Dog('Rex', 3)\ndog.speak()  # 'Rex говорит: Гав!'\n\`\`\``,
        language: ProgrammingLanguage.PYTHON,
        deadline: future(7),
      },
      {
        groupId: groups[2].id as string,
        mentorId: mentors[1].id as string,
        title: 'Декораторы Python',
        description: `## Задача\n\nНапиши три декоратора:\n1. \`@timer\` — измеряет время выполнения функции\n2. \`@retry(n)\` — повторяет вызов при исключении n раз\n3. \`@cache\` — кэширует результат по аргументам\n\n### Требования\n- Используй \`functools.wraps\`\n- Декораторы должны корректно работать друг с другом`,
        language: ProgrammingLanguage.PYTHON,
        deadline: future(10),
      },

      // Python DS (group[3], mentor[1])
      {
        groupId: groups[3].id as string,
        mentorId: mentors[1].id as string,
        title: 'Анализ данных с Pandas',
        description: `## Задача\n\nПроанализируй датасет продаж (CSV файл прилагается).\n\n### Требования\n1. Загрузи данные, обработай пропуски\n2. Найди топ-5 товаров по выручке\n3. Построй помесячную динамику продаж\n4. Выяви корреляцию между ценой и количеством продаж\n\n### Формат сдачи\nJupyter Notebook с комментариями к каждому шагу`,
        language: ProgrammingLanguage.PYTHON,
        deadline: future(14),
      },

      // Java Core (group[4], mentor[2])
      {
        groupId: groups[4].id as string,
        mentorId: mentors[2].id as string,
        title: 'Коллекции и обобщения',
        description: `## Задача\n\nРеализуй обобщённый класс \`Stack<T>\`.\n\n### Требования\n- Методы: push, pop, peek, isEmpty, size\n- Итератор (implements Iterable<T>)\n- Обработка исключений при pop/peek на пустом стеке\n- Не использовать java.util.Stack\n\n### Оценивается\n- Корректность generics\n- Обработка edge cases\n- Чистота кода`,
        language: ProgrammingLanguage.JAVA,
        deadline: future(10),
      },
      {
        groupId: groups[4].id as string,
        mentorId: mentors[2].id as string,
        title: 'Многопоточность: Producer-Consumer',
        description: `## Задача\n\nРеализуй паттерн Producer-Consumer с использованием BlockingQueue.\n\n### Требования\n- 2 Producer потока, 3 Consumer потока\n- Корректное завершение работы\n- Логирование операций\n- Обработка InterruptedException`,
        language: ProgrammingLanguage.JAVA,
        deadline: future(14),
      },

      // C++ Algorithms (group[5], mentor[3])
      {
        groupId: groups[5].id as string,
        mentorId: mentors[3].id as string,
        title: 'Сортировка слиянием',
        description: `## Задача\n\nРеализуй сортировку слиянием для вектора целых чисел.\n\n### Требования\n- Рекурсивная реализация\n- Сложность O(n log n)\n- Дополнительно: итеративная версия\n- Benchmark сравнение с std::sort\n\n### Оценивается\n- Корректность\n- Работа с памятью (без утечек)\n- Читаемость кода`,
        language: ProgrammingLanguage.CPP,
        deadline: future(7),
      },

      // TS Fullstack (group[6], mentor[4])
      {
        groupId: groups[6].id as string,
        mentorId: mentors[4].id as string,
        title: 'REST API с NestJS',
        description: `## Задача\n\nСоздай CRUD API для управления задачами (Todo).\n\n### Требования\n- NestJS + TypeORM + PostgreSQL\n- DTO с валидацией (class-validator)\n- Swagger документация\n- Фильтрация по статусу и дедлайну\n- Пагинация результатов\n\n### Endpoints\n- GET /tasks\n- POST /tasks\n- PATCH /tasks/:id\n- DELETE /tasks/:id`,
        language: ProgrammingLanguage.TYPESCRIPT,
        deadline: future(21),
      },
    ]);
  }
}
