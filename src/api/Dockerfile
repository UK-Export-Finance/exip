# Node Alpine Docker Image
FROM node:18.9-alpine3.16

# Variables
ARG GITHUB_SHA
ARG SESSION_SECRET
ARG GOV_NOTIFY_API_KEY
ENV GITHUB_SHA $GITHUB_SHA
ENV SESSION_SECRET $SESSION_SECRET
ENV GOV_NOTIFY_API_KEY $GOV_NOTIFY_API_KEY

# Install packages
RUN apk add bash curl
RUN rm -rf /var/cache/apk/*

# Node setup
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY .keystone keystone

RUN npm i
RUN npm cache clean --force

COPY . .
RUN npm run build

# Execute Script
CMD ["npm", "run", "start"]
