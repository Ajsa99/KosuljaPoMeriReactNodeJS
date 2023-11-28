FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

EXPOSE 5001

EXPOSE 5002

EXPOSE 5003

CMD ["node", "index.js"]