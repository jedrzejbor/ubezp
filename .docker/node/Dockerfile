FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash git

COPY ./.docker/wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it
