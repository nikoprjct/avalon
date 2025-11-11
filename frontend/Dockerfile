# =====================
# Stage 1: Build
# =====================
FROM node:20-alpine AS build

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники
COPY . .

# ARG для окружения (dev/test/preprod)
ARG ENV=dev
ENV NODE_ENV=$ENV

# Собираем фронтенд под выбранное окружение
RUN npm run build:$ENV

# =====================
# Stage 2: Serve
# =====================
FROM nginx:alpine

# Копируем собранный билд
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
