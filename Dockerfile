FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY . .
# The above command should be refactored to :
# COPY server.js .
# COPY config/ .
# COPY controllers/ .
# COPY models/ .
# COPY routes/ .

EXPOSE 5000

CMD ["yarn", "start"]
