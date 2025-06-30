# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install && npm audit fix --force
COPY . .

EXPOSE 8082

CMD ["npm", "run", "dev"]