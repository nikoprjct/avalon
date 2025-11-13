FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Т.к. фронт будет через dev-сервер Vite, сборка не обязательна для разработки
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
