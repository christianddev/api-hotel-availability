FROM node:lts

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /code

# default to port 80 for node, and 9229 and 9230 (tests) for debug
#ARG PORT=80
#ENV PORT $PORT
#EXPOSE $PORT 9229 9230

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm i

COPY . /code

RUN npm run build
CMD [ "node", "./dist/src/server.js" ]
