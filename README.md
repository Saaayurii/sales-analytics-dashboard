# Sales Analytics Dashboard

Интерактивный дашборд для анализа продаж с использованием Next.js, PostgreSQL и Redis.

## 📋 Описание проекта

Система аналитики продаж компании "Ракета-кофе" с функционалом:

- **ETL-процедура** — импорт и обработка данных из CSV файлов
- **Интерактивный дашборд** — визуализация ключевых метрик
- **Фильтрация данных** — по менеджерам, периодам, товарам
- **Графики и диаграммы** — динамика продаж, топ-менеджеры, структура по категориям
- **Детализированные отчеты** — таблицы с полной информацией

## 🛠 Технологический стек

### Frontend
- **Next.js 15** — React фреймворк с App Router, Server Components, PPR (Partial Prerendering)
- **TypeScript** — строгая типизация
- **Tailwind CSS** — утилитарная стилизация
- **shadcn/ui** — переиспользуемые UI компоненты на базе Radix UI
- **Recharts** — библиотека для графиков и диаграмм
- **Sonner** — toast уведомления

### Backend
- **Next.js Server Actions** — серверная логика без API routes
- **PostgreSQL 16** — основная реляционная база данных
- **Redis 7** — кеширование и оптимизация запросов
- **PapaParse** — парсинг CSV файлов
- **Zod** — валидация данных
- **date-fns** — работа с датами

### DevOps
- **Docker & Docker Compose** — контейнеризация
- **ESLint** — линтинг кода

## 📁 Структура проекта

```
sales-analytics-dashboard/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React компоненты
│   ├── actions/          # Server Actions
│   ├── lib/              # Утилиты и клиенты БД
│   └── types/            # TypeScript типы
├── docker/               # Docker конфигурация
├── public/data/          # CSV файлы
└── README.md
```

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+ 
- Docker и Docker Compose
- npm или yarn

### 1. Клонирование репозитория

```bash
git clone 
cd sales-analytics-dashboard
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка переменных окружения

Создайте файл `.env.local`:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/sales_analytics
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=sales_analytics

# Redis
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Запуск Docker контейнеров

```bash
docker-compose -f docker/docker-compose.yml up -d
```

Это запустит:
- PostgreSQL (порт 5432)
- Redis (порт 6379)

### 5. Инициализация базы данных

```bash
npm run db:setup
```

### 6. Запуск приложения в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## 📊 Использование

### Импорт данных

1. Перейдите на главную страницу дашборда
2. Нажмите кнопку **"Загрузить данные"**
3. Система автоматически импортирует CSV файлы из `/public/data/`:
   - `База_Аналитика_продаж.csv`
   - `Менеджеры.csv`
   - `Цена_справочник.csv`

### Основные функции дашборда

#### A. Ключевые показатели (KPI)
- **A1.** Общая сумма продаж
- **A2.** Общее количество проданных единиц товара
- **A3.** Средний чек
- **A4.** Количество активных менеджеров

#### B. Диаграммы и таблицы
- **B1.** График динамики продаж по месяцам
- **B2.** Круговая диаграмма структуры продаж по категориям товаров
- **B3.** Горизонтальная столбчатая диаграмма топ-3 менеджеров
- **B4.** Детализированная таблица продаж

#### C. Интерактивные элементы управления
- **C1.** Выпадающий список фильтрации по менеджерам
- **C2.** Выпадающий список фильтрации по периодам (месяц)
- **C3.** Взаимодействие с графиками и таблицами

#### D. Дополнительно (опционально)
- **D1.** Анализ продаж по дням недели
- **D2.** Дополнительная фильтрация по категории товара

## 🗄 База данных

### Схема PostgreSQL

**Таблица: sales**
```sql
- id (serial, primary key)
- order_id (varchar)
- date (date)
- product (varchar)
- quantity (integer)
- payment_method (varchar)
- manager_id (integer, foreign key)
- city (varchar)
```

**Таблица: managers**
```sql
- id (serial, primary key)
- name (varchar)
- city (varchar)
```

**Таблица: prices**
```sql
- id (serial, primary key)
- product (varchar, unique)
- price (decimal)
```

### Индексы для оптимизации
- `idx_sales_date` на поле `date`
- `idx_sales_manager` на поле `manager_id`
- `idx_sales_product` на поле `product`

## 🔄 ETL Процесс

### Этап 1: Extract (Извлечение)
- Чтение CSV файлов с использованием `papaparse`
- Обработка кодировки и разделителей

### Этап 2: Transform (Преобразование)
1. **Валидация данных:**
   - Проверка формата дат (DD.MM.YYYY)
   - Проверка числовых значений
   - Очистка от лишних символов

2. **Нормализация:**
   - Приведение дат к формату `DD.MM.YYYY`
   - Очистка числовых полей
   - Приведение текста к единому виду (Фамилия И.)

3. **Объединение данных:**
   - Связывание продаж со справочниками товаров и менеджеров

### Этап 3: Load (Загрузка)
- Транзакционная загрузка в PostgreSQL
- Обработка дубликатов
- Валидация целостности данных

## 🚦 Server Actions

### Основные действия

```typescript
// Импорт данных
importCSVData(files: File[]) => Promise

// Получение аналитики
getAnalytics(filters: FilterParams) => Promise

// Получение продаж
getSalesData(filters: FilterParams) => Promise

// Фильтрация
filterData(params: FilterParams) => Promise
```

## ⚡ Оптимизация производительности

### Кеширование (Redis)
- Кеширование агрегированных данных (TTL: 5 минут)
- Кеширование списков менеджеров и товаров (TTL: 1 час)
- Инвалидация кеша при импорте новых данных

### Partial Prerendering (PPR)
```typescript
// Статические части страницы генерируются при билде
// Динамические части загружаются асинхронно
export const experimental_ppr = true
```

### Database Connection Pooling
- Пул соединений PostgreSQL (max: 20)
- Переиспользование соединений

## 📦 Docker

### Запуск всего стека

```bash
cd docker
docker-compose up -d
```

### Остановка контейнеров

```bash
docker-compose down
```

### Просмотр логов

```bash
docker-compose logs -f
```

## 🧪 Тестирование

### Запуск тестов

```bash
npm run test
```

### Проверка типов

```bash
npm run type-check
```

### Линтинг

```bash
npm run lint
```

## 📝 Скрипты

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit",
  "db:setup": "node scripts/setup-db.js",
  "db:seed": "node scripts/seed-db.js"
}
```

## 🔐 Безопасность

- Валидация всех входных данных через Zod
- Параметризованные SQL запросы (защита от SQL injection)
- CORS настройки
- Rate limiting для API endpoints

## 📈 Мониторинг

- Логирование ошибок импорта
- Метрики производительности запросов
- Отслеживание использования кеша

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменений (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Критерии оценки

| Критерий | Вес | Описание |
|----------|-----|----------|
| **Корректность ETL** | 30% | Полнота и правильность очистки, преобразования и объединения данных |
| **Функциональность Дашборда** | 30% | Полнота реализации всех требований и интерактивных элементов |
| **Интерактивность и Фильтрация** | 20% | Корректная работа выпадающих списков и кросс-фильтрации |
| **Качество и Чистота Кода** | 10% | Структура, читаемость, наличие комментариев |
| **Удобство Интерфейса** | 5% | Понятность и логичность пользовательского интерфейса |
| **Реализация Усложнений** | 5% | Бонусные баллы за реализацию опциональных задач |

## 📚 Документация

### Полезные ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Recharts Documentation](https://recharts.org/en-US/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🐛 Известные проблемы

- При больших объемах данных (>100k записей) рекомендуется пагинация
- Импорт файлов >50MB может занять продолжительное время

## 🗓 Roadmap

- [ ] Экспорт отчетов в PDF/Excel
- [ ] Прогнозирование продаж с использованием ML
- [ ] Система уведомлений
- [ ] Мультиязычность
- [ ] Темная тема

## 📞 Контакты

При возникновении вопросов обращайтесь к куратору P7.

## 📜 Лицензия

Проект создан в образовательных целях для полуфинала соревнований.

---

**Дата создания:** Октябрь 2025  
**Версия:** 1.0.0  
**Куратор:** P7