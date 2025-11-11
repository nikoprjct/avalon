# =====================
# Stage 1: Build
# =====================
FROM node:20-alpine AS build

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Устанавливаем переменную окружения для сборки
ARG ENV=dev

# Выполняем сборку в зависимости от ENV
RUN if [ "$ENV" = "dev" ]; then npm run build:dev; \
    elif [ "$ENV" = "test" ]; then npm run build:test; \
    elif [ "$ENV" = "preprod" ]; then npm run build:preprod; \
    else echo "Unknown ENV: $ENV"; exit 1; fi

# =====================
# Stage 2: Serve
# =====================
FROM nginx:alpine

# Копируем собранные файлы из Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Настройка Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
