###################
# 1. BUILD
###################

FROM node:20.0-alpine3.16 AS build

# Build variables
ARG GITHUB_SHA
ARG UI_PORT
ARG NODE_ENV
ENV GITHUB_SHA=$GITHUB_SHA
ENV UI_PORT=$UI_PORT
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

# Copy UI
COPY --chown=node:node ./scripts ./scripts
COPY --chown=node:node ./server ./server
COPY --chown=node:node ./styles ./styles
COPY --chown=node:node ./templates ./templates
COPY --chown=node:node ./types ./types
COPY --chown=node:node ./package.json .
COPY --chown=node:node ./package-lock.json .
COPY --chown=node:node ./tsconfig.json .
COPY --chown=node:node ./.prettierrc.json .
COPY ./jest.config.js .
COPY ./.eslintrc.js .
COPY ./webpack.common.config.js .
COPY ./webpack.prod.config.js .

RUN npm ci --legacy-peer-deps --ignore-scripts

# Build with all dependencies
RUN npm run build

# Lean NPM - Only install `dependencies`
# `devDependencies` will still be resolved inside `package-lock.json`,
# however they will not be installed inside `node_modules` directory.
RUN npm ci --legacy-peer-deps --omit=dev --ignore-scripts

###################
# 2. PRODUCTION
###################

FROM node:20.0-alpine3.16 AS production

WORKDIR /app

# Copy from `build` to `prod`
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/package-lock.json .
COPY --chown=node:node --from=build /app/tsconfig.json .
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/public ./public
COPY --chown=node:node --from=build /app/server ./server
COPY --chown=node:node --from=build /app/templates ./templates
COPY --chown=node:node --from=build /app/types ./types

# Container healthcheck
HEALTHCHECK \
--interval=60s \
--timeout=30s \
CMD wget \
--no-verbose \
--tries=3 \
--spider https://localhost:${UI_PORT} \
|| exit 1

# Execute Script
CMD ["npm", "run", "start"]

# Non-root user
USER node
