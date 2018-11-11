FROM node:8-slim

COPY . /app

WORKDIR /app

RUN npm install --production

CMD ["node", "src/server"]
