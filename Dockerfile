## Nodejs
FROM node:16.20.2-bullseye-slim as node

WORKDIR /app
## traerme el package.js
COPY ./package.json .

COPY . .

## Instaling packages
RUN npm install

## Building app
RUN npm run build --prod

## Initiation node main
CMD [ "npm", "run", "start:prod" ]
