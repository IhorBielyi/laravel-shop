# 🚀 Laravel + Docker — Інструкція з запуску

Проєкт розгортається за допомогою **Docker (nginx + PHP-FPM + MySQL + Redis)**.  
Нижче описані кроки для локального запуску.

---

## 📦 Вимоги
- Docker
- Docker Compose

---

## ⚙️ Встановлення та запуск

### 1️⃣ Клонувати репозиторій
```bash
git clone https://github.com/IhorBielyi/laravel-shop
cd <PROJECT_ROOT>
```

---

### 2️⃣ Підняти контейнери
```bash
docker compose up -d --build
```

📌 Після цього будуть запущені:
- nginx
- php-fpm
- mysql
- redis

---

### 3️⃣ Увійти в PHP-контейнер
```bash
docker compose exec php sh
```

---

### 4️⃣ Встановити залежності
```bash
composer install
```

---

### 5️⃣ Створити `.env` та згенерувати ключ додатку
```bash
cp .env.example .env
php artisan key:generate
```

---

### 6️⃣ Налаштувати `.env`

#### 🗄️ База даних (MySQL)
```env
DB_CONNECTION=mysql
DB_HOST=database
DB_PORT=3306
DB_DATABASE=db_shop
DB_USERNAME=user
DB_PASSWORD=shop
```

#### 🔴 Redis
```env
REDIS_CLIENT=phpredis
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379
```

#### 📦 Черги / Сесії / Кеш
```env
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
CACHE_STORE=redis
```

#### 🔐 Авторизація
```env
AUTH_GUARD=api
```

---

### 7️⃣ Запустити міграції та сіди
```bash
php artisan migrate --seed
```

---

### 8️⃣ JWT ( використовується `tymon/jwt-auth`)
```bash
php artisan jwt:secret
```

---

## 🌐 Доступ до проєкту
Відкрити в браузері:
```
http://localhost:8080
```

---

## 🧠 Підключення до БД (PhpStorm)

- **DB_Connection:** `mysql`
- **Host:** `database`
- **Port:** `3306`
- **Database:** `db_shop`
- **User:** `user`
- **Password:** `shop`


Натиснути **Test Connection → Apply → OK**

