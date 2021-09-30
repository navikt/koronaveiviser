FROM node:16-alpine
# RUN apk add --no-cache bash
ENV NODE_ENV production

WORKDIR usr/src/app
COPY server server/
COPY build build/
COPY .env server/

WORKDIR server
RUN npm install

CMD ["node", "./server.js"]

EXPOSE 8080
