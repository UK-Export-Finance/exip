###################
# 1. BUILD
###################

FROM node:20.3.1-alpine3.17

# Variables
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA

# Node setup
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev --legacy-peer-deps
RUN npm install -g typescript
RUN npm cache clean --force
COPY . .

# Execute Script
CMD ["npx", "nodemon", "server/index.ts"]
