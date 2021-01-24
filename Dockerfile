FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

EXPOSE 2000

CMD [ "npm", "start" ]