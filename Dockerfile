FROM node:23-alpine

WORKDIR /usr/src/app

# Install system dependencies required for Prisma
# RUN apk add --no-cache openssl

COPY package*.json ./
# COPY prisma ./prisma/

RUN npm install

COPY .env .

# RUN npx prisma generate

COPY . .

RUN npm run build

# RUN npx prisma migrate deploy

EXPOSE 3000

CMD [ "node", "dist/server.js" ]