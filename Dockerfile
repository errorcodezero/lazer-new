FROM node:latest

RUN mkdir -p /usr/src/bot

WORKDIR /usr/src/bot

COPY package.json /usr/src/bot

COPY yarn.lock /usr/src/bot/

RUN yarn

COPY . /usr/src/bot

CMD ["node", "index.js"]