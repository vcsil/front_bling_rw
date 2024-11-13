FROM node:20.11.1-alpine3.19

RUN apk add git nano

WORKDIR /usr/src/front

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]