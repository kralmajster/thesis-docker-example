FROM node:10.12.0-alpine

RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
COPY ormconfig.json /usr/src/app
COPY ./dist /usr/src/app
WORKDIR /usr/src/app

EXPOSE 8080
RUN yarn install
CMD [ "node", "api/index.js" ]