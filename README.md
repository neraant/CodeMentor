# CodeMentor

Платформа для образовательного code review. Студенты загружают решения задач, менторы делают построчное рецензирование.

## Stack

- **Backend:** NestJS, TypeORM, PostgreSQL, Redis
- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui
- **Real-time:** Socket.io
- **Infra:** Docker, Nginx

## Быстрый старт

```bash
git clone https://github.com/your-username/codementor.git
cd codementor
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker-compose up -d
```

## Структура

```
codementor/
├── backend/        # NestJS API
├── frontend/       # React SPA
├── nginx/          # Nginx конфиг
└── docker-compose.yml
```

---

## Правила коммитов

Формат: `<type>(<scope>): <описание>`

### Типы (type)

| Тип        | Когда использовать                        |
| ---------- | ----------------------------------------- |
| `feat`     | Новая функциональность                    |
| `fix`      | Исправление бага                          |
| `refactor` | Рефакторинг без изменения поведения       |
| `style`    | Форматирование, CSS (не логика)           |
| `test`     | Добавление/изменение тестов               |
| `docs`     | Документация                              |
| `chore`    | Настройка окружения, зависимости, конфиги |
| `perf`     | Улучшение производительности              |

### Scope (область)

`auth` · `users` · `groups` · `assignments` · `submissions` · `comments` · `notifications` · `ws` · `ui` · `docker` · `nginx` · `db`

### Примеры

```
feat(auth): add JWT refresh token rotation
fix(submissions): correct version auto-increment logic
chore(docker): add redis service to docker-compose
feat(ui): implement Monaco Editor with inline comments
refactor(groups): extract invite code generation to service
docs: update README with commit conventions
```

### Правила

- Описание на **английском**, строчными буквами
- Длина заголовка — не более **72 символов**
- Настоящее время: `add`, не `added`
- Если коммит закрывает задачу: добавь `closes #12` в тело коммита
- Один коммит = одна логическая единица изменений

---

## Ветки

```
main          # стабильный прод
develop       # основная ветка разработки
feat/*        # новые функции
fix/*         # исправления
```
