# 📊 Sales Analytics Dashboard

> Интерактивный дашборд для анализа продаж с использованием Next.js 15, PostgreSQL и Redis

![Dashboard](./public/images/dashboard.png)

## 🎯 О проекте

Sales Analytics Dashboard — это современное веб-приложение для комплексного анализа продаж компании "Ракета-кофе". Система предоставляет визуализацию ключевых метрик, автоматическую обработку данных и интерактивные инструменты для принятия бизнес-решений.

### ✨ Ключевые возможности

- 📁 **ETL-процедура** — автоматический импорт и обработка данных из CSV файлов
- 📈 **Интерактивный дашборд** — визуализация ключевых метрик в реальном времени
- 🔍 **Умная фильтрация** — по менеджерам, периодам и категориям товаров
- 📊 **Графики и диаграммы** — динамика продаж, рейтинг менеджеров, структура по категориям
- 📋 **Детализированные отчеты** — таблицы с полной информацией о продажах
- ⚡ **Кеширование** — быстрая работа благодаря Redis
- 🌐 **Полная русификация** — весь интерфейс на русском языке

## 📸 Скриншоты

### Главная страница
![Home Page](./public/images/home.png)

### Модальное окно импорта
![Import Modal](./public/images/modal-window.png)

### Дашборд аналитики
![Analytics Dashboard](./public/images/dashboard.png)

## 🛠 Технологический стек

### Frontend
- **Next.js 15** — React фреймворк с App Router и Server Components
- **TypeScript** — строгая типизация для надежности кода
- **Tailwind CSS** — современная утилитарная стилизация
- **shadcn/ui** — переиспользуемые UI компоненты на базе Radix UI
- **Recharts** — мощная библиотека для интерактивных графиков
- **Sonner** — элегантные toast-уведомления
- **Lucide React** — иконки

### Backend
- **Next.js Server Actions** — серверная логика без создания API routes
- **PostgreSQL 16** — надежная реляционная база данных
- **Redis 7** — кеширование для оптимизации производительности
- **PapaParse** — парсинг CSV файлов
- **Zod** — валидация данных на стороне сервера
- **date-fns** — работа с датами и временем

### DevOps
- **Docker & Docker Compose** — контейнеризация всех сервисов
- **Multi-stage Dockerfile** — оптимизированная сборка
- **ESLint** — линтинг кода
- **Git** — контроль версий

## 📁 Структура проекта

```
sales-analytics-dashboard/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Главная страница
│   │   └── dashboard/            # Страница дашборда
│   │       └── page.tsx
│   │
│   ├── components/               # React компоненты
│   │   ├── ui/                   # shadcn/ui компоненты
│   │   ├── charts/               # Компоненты графиков
│   │   │   ├── SalesChart.tsx    # График динамики продаж
│   │   │   ├── CategoryChart.tsx # График по категориям
│   │   │   ├── ManagersChart.tsx # Топ менеджеров
│   │   │   └── DetailedTable.tsx # Таблица продаж
│   │   ├── dashboard/            # Компоненты дашборда
│   │   │   ├── Dashboard.tsx     # Главный компонент
│   │   │   ├── KPICards.tsx      # KPI карточки
│   │   │   └── FilterPanel.tsx   # Панель фильтров
│   │   └── import/               # Компоненты импорта
│   │       └── ImportButton.tsx  # Кнопка импорта CSV
│   │
│   ├── actions/                  # Server Actions
│   │   ├── import-data.ts        # Импорт CSV
│   │   ├── get-analytics.ts      # Получение аналитики
│   │   └── get-sales-data.ts     # Получение данных продаж
│   │
│   ├── lib/                      # Утилиты и клиенты
│   │   ├── db/                   # База данных
│   │   │   ├── postgres.ts       # PostgreSQL клиент
│   │   │   ├── queries.ts        # SQL запросы
│   │   │   └── schema.sql        # SQL схема
│   │   ├── redis/                # Redis
│   │   │   ├── client.ts         # Redis клиент
│   │   │   └── cache.ts          # Кеширование
│   │   ├── csv/                  # CSV обработка
│   │   │   ├── parser.ts         # Парсинг CSV
│   │   │   ├── validator.ts      # Валидация данных
│   │   │   └── normalizer.ts     # Нормализация данных
│   │   └── utils/                # Вспомогательные функции
│   │
│   ├── types/                    # TypeScript типы
│   │   └── index.ts              # Все типы проекта
│   │
│   └── styles/
│       └── globals.css           # Глобальные стили
│
├── public/
│   ├── data/                     # CSV файлы для импорта
│   │   ├── База_Аналитика_продаж.csv
│   │   ├── Менеджеры.csv
│   │   └── Цена_справочник.csv
│   └── images/                   # Скриншоты приложения
│
├── docker/
│   ├── Dockerfile                # Dockerfile для Next.js
│   ├── docker-compose.yml        # Docker Compose
│   └── postgres/
│       └── init.sql              # Инициализация БД
│
├── .env.local                    # Переменные окружения
├── .env.example                  # Пример переменных
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🚀 Быстрый старт

### Предварительные требования

- **Node.js** 20+
- **Docker** и **Docker Compose**
- **npm** или **yarn**
- **Git**

### 1. Клонирование репозитория

```bash
git clone https://github.com/Saaayurii/sales-analytics-dashboard.git
cd sales-analytics-dashboard
```

### 2. Настройка переменных окружения

Создайте файл `.env.local` на основе `.env.example`:

```env
# Database
DATABASE_URL=postgresql://postgres:password@postgres:5432/sales_analytics
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=sales_analytics

# Redis
REDIS_URL=redis://redis:6379
REDIS_PASSWORD=

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=production
```

### 3. Запуск через Docker (рекомендуется)

```bash
# Запуск всех сервисов (Next.js, PostgreSQL, Redis)
sudo docker-compose -f docker/docker-compose.yml up -d --build

# Приложение будет доступно на http://localhost:3000
```

### 4. Запуск в режиме разработки (локально)

```bash
# Установка зависимостей
npm install

# Запуск PostgreSQL и Redis через Docker
sudo docker-compose -f docker/docker-compose.yml up -d postgres redis

# Запуск Next.js в dev режиме
npm run dev
```

Приложение будет доступно по адресу: **http://localhost:3000**

## 📊 Использование

### Импорт данных

1. Откройте приложение в браузере
2. На главной странице нажмите кнопку **"Импорт CSV данных"**
3. Загрузите три CSV файла:
   - **CSV продаж** (`База_Аналитика_продаж.csv`)
   - **CSV менеджеров** (`Менеджеры.csv`)
   - **CSV цен** (`Цена_справочник.csv`)
4. Нажмите **"Импорт"**
5. После успешного импорта перейдите в дашборд

### Основные функции дашборда

#### 📌 Ключевые показатели (KPI)

Четыре карточки с основными метриками:
- **Общая выручка** — суммарная выручка от всех продаж
- **Количество продаж** — общее количество проданных единиц товара
- **Средний чек** — средняя сумма одной покупки
- **Активных менеджеров** — количество менеджеров, совершивших продажи

#### 📈 Графики и диаграммы

1. **Динамика продаж по месяцам** — линейный график показывающий тренд выручки
2. **Продажи по категориям** — круговая диаграмма структуры продаж
3. **Топ менеджеров по продажам** — горизонтальная столбчатая диаграмма лучших продавцов
4. **Детализированные продажи** — таблица с полной информацией о каждой продаже

#### 🔍 Интерактивные фильтры

- **Менеджер** — фильтрация по конкретному менеджеру или всем
- **Период** — выбор месяца или просмотр данных за всё время
- Все графики и таблицы обновляются автоматически при изменении фильтров

## 🗄 База данных

### Схема PostgreSQL

**Таблица `sales` (продажи)**
```sql
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  product VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  purchase_type VARCHAR(50),
  payment_method VARCHAR(50),
  manager_id INTEGER REFERENCES managers(id),
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Таблица `managers` (менеджеры)**
```sql
CREATE TABLE managers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Таблица `prices` (цены)**
```sql
CREATE TABLE prices (
  id SERIAL PRIMARY KEY,
  product VARCHAR(255) UNIQUE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Индексы для оптимизации

```sql
CREATE INDEX idx_sales_date ON sales(date);
CREATE INDEX idx_sales_manager ON sales(manager_id);
CREATE INDEX idx_sales_product ON sales(product);
CREATE INDEX idx_managers_name ON managers(name);
```

## 🔄 ETL Процесс

### Этап 1: Extract (Извлечение)

- Чтение CSV файлов с использованием **PapaParse**
- Автоматическое определение кодировки (UTF-8)
- Обработка различных разделителей

### Этап 2: Transform (Преобразование)

**Валидация данных:**
- Проверка формата дат через Zod схемы
- Валидация числовых значений
- Проверка обязательных полей

**Нормализация:**
- Приведение дат к формату `DD.MM.YYYY`
- Очистка числовых полей от нечисловых символов
- Стандартизация текстовых данных (формат "Фамилия И.")
- Удаление лишних пробелов

**Обработка ошибок:**
- Некорректный формат дат → преобразование в стандартный
- Числовые значения со строками → извлечение чисел
- Разный регистр и форматирование → унификация

### Этап 3: Load (Загрузка)

- Транзакционная загрузка в PostgreSQL
- Обработка дубликатов (upsert)
- Связывание таблиц через foreign keys
- Валидация целостности данных
- Инвалидация кеша Redis

## ⚡ Оптимизация производительности

### Кеширование (Redis)

```typescript
// Кеширование агрегированных данных
const CACHE_TTL = {
  ANALYTICS: 300,      // 5 минут
  MANAGERS: 3600,      // 1 час
  PRODUCTS: 3600       // 1 час
};

// Инвалидация кеша при импорте
invalidateAnalyticsCache();
```

### Database Connection Pooling

```typescript
const pool = new Pool({
  max: 20,                    // Максимум соединений
  idleTimeoutMillis: 30000,   // Таймаут простоя
  connectionTimeoutMillis: 2000
});
```

### Next.js Оптимизации

- **Server Components** — рендеринг на сервере
- **Dynamic rendering** — для страниц с фильтрами
- **Image Optimization** — автоматическая оптимизация изображений
- **Code Splitting** — автоматическое разделение кода

## 🐳 Docker

### Сервисы

**app** — Next.js приложение (порт 3000)
```yaml
build:
  context: .
  dockerfile: docker/Dockerfile
ports:
  - "3000:3000"
depends_on:
  - postgres
  - redis
```

**postgres** — PostgreSQL 16 (порт 5433)
```yaml
image: postgres:16-alpine
ports:
  - "5433:5432"  # Внешний:Внутренний
volumes:
  - postgres_data:/var/lib/postgresql/data
```

**redis** — Redis 7 (порт 6380)
```yaml
image: redis:7-alpine
ports:
  - "6380:6379"  # Внешний:Внутренний
command: redis-server --appendonly yes
```

### Управление контейнерами

```bash
# Запуск всех сервисов
sudo docker-compose -f docker/docker-compose.yml up -d

# Остановка
sudo docker-compose -f docker/docker-compose.yml down

# Просмотр логов
sudo docker-compose -f docker/docker-compose.yml logs -f

# Пересборка
sudo docker-compose -f docker/docker-compose.yml up -d --build

# Просмотр статуса
sudo docker-compose -f docker/docker-compose.yml ps
```

## 📦 Скрипты

```json
{
  "dev": "next dev --turbopack",           // Разработка с Turbopack
  "build": "next build --turbopack",       // Production сборка
  "start": "next start",                    // Запуск production
  "lint": "eslint"                          // Линтинг кода
}
```

## 🔐 Безопасность

- ✅ Валидация всех входных данных через **Zod**
- ✅ Параметризованные SQL запросы (защита от SQL injection)
- ✅ Server Actions вместо публичных API endpoints
- ✅ Environment variables для конфиденциальных данных
- ✅ CORS настройки
- ✅ Sanitization пользовательского ввода

## 🎨 Стандарты кода

### TypeScript

- Строгая типизация всех переменных и функций
- Использование интерфейсов для структур данных
- Отсутствие `any` типов

### Стиль кода

- **Только Promise** вместо async/await (согласно требованиям)
- **Стрелочные функции** для всех компонентов
- **Тернарные операторы** вместо if/else где возможно
- **Максимум 300 строк** на компонент

### Пример

```typescript
// ✅ Правильно: Promise-based подход
export const getAnalyticsData = async (filters: DashboardFilters): Promise<AnalyticsData> => {
  return getCachedAnalytics(filters)
    .then((cached) =>
      cached
        ? Promise.resolve(cached)
        : fetchFromDatabase(filters)
    )
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
};

// ✅ Правильно: Тернарный оператор
const status = isActive ? 'active' : 'inactive';

// ✅ Правильно: Стрелочная функция
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB"
  }).format(value);
};
```

## 📈 Мониторинг и логирование

- Логирование ошибок импорта в консоль
- Метрики производительности запросов к БД
- Отслеживание hit rate кеша Redis
- Console.error для критических ошибок

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit изменений
   ```bash
   git commit -m 'feat: добавлена новая функция'
   ```
4. Push в branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Откройте Pull Request

## 🐛 Решение проблем

### Порты уже заняты

Если порты 5432 или 6379 заняты, измените их в `docker-compose.yml`:

```yaml
ports:
  - "5433:5432"  # PostgreSQL
  - "6380:6379"  # Redis
```

### Ошибка подключения к БД

Убедитесь, что:
1. Docker контейнеры запущены: `docker ps`
2. DATABASE_URL корректный в `.env.local`
3. PostgreSQL здоров: `docker logs sales-postgres`

### Приложение не собирается

```bash
# Очистка и пересборка
sudo docker-compose -f docker/docker-compose.yml down -v
sudo docker-compose -f docker/docker-compose.yml up -d --build
```

## 📚 Полезные ссылки

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Recharts Documentation](https://recharts.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🗺 Roadmap

- [ ] Экспорт отчетов в PDF/Excel
- [ ] Темная тема оформления
- [ ] Прогнозирование продаж с ML
- [ ] Система уведомлений о важных событиях
- [ ] Мобильная версия приложения
- [ ] Расширенная аналитика по категориям
- [ ] API для интеграции с другими системами

## 📞 Поддержка

При возникновении вопросов или проблем:

1. Проверьте раздел **"Решение проблем"**
2. Создайте [Issue](https://github.com/Saaayurii/sales-analytics-dashboard/issues)
3. Обратитесь к документации технологий

## 📄 Лицензия

Проект создан в образовательных целях.

---

**Версия:** 1.0.0
**Дата создания:** Октябрь 2025
**Автор:** Sales Analytics Team

---

<div align="center">
  <p>Сделано с ❤️ используя Next.js 15</p>
  <p>
    <a href="https://nextjs.org">Next.js</a> •
    <a href="https://www.postgresql.org/">PostgreSQL</a> •
    <a href="https://redis.io/">Redis</a> •
    <a href="https://www.typescriptlang.org/">TypeScript</a>
  </p>
</div>
