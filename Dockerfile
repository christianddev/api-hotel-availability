FROM node:lts

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm i

COPY . /code

RUN npm run build
CMD [ "node", "./dist/src/server.js" ]
