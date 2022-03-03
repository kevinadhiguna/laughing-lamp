FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn --frozen-lockfile

COPY .dockerignore .dockerignore
COPY config/ config/
COPY models/ models/
COPY routes/ routes/
COPY server.js server.js
COPY controllers/ controllers/

EXPOSE 5000

CMD [ "yarn", "dev" ]
