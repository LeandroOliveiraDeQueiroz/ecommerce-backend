FROM node:23-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY .env .

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/server.js" ]