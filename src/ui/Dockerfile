# Node Alpine Docker Image
FROM node:18.9-alpine3.16

# Variables
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA

# Install packages
RUN apk add bash openrc openssh curl
RUN rm -rf /var/cache/apk/*

# Node setup
WORKDIR /app

COPY package.json .
RUN npm i --omit=dev --legacy-peer-deps
RUN npm cache clean --force

COPY . .

# Execute Script
CMD ["npx", "nodemon", "server/index.ts"]
