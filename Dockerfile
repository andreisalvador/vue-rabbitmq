FROM node:alpine

WORKDIR /usr/app
COPY /rabbitmq-queue-design/package*.json ./
RUN npm install && npm install -g @vue/cli
COPY /rabbitmq-queue-design .
EXPOSE 8000
CMD ["npm", "run", "serve"]