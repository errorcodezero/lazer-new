FROM node:17-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "npm-shrinkwrap.json*", "./"]

RUN yarn

COPY . .

RUN chown -R node /usr/src/app

USER node

CMD ["yarn install", "start"]
