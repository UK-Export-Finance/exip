###################
# 1. BUILD
###################

FROM node:19.8.1-alpine3.16 AS build

# Build variables
ARG GITHUB_SHA
ARG PORT
ARG NODE_ENV
ENV GITHUB_SHA=$GITHUB_SHA
ENV PORT=$PORT
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
COPY --chown=node:node ./jest.config.js .
COPY --chown=node:node ./.prettierrc.json .
COPY --chown=node:node ./.eslintrc.js .
COPY --chown=node:node ./webpack.common.config.js .
COPY --chown=node:node ./webpack.prod.config.js .

RUN npm ci --legacy-peer-deps --ignore-scripts
RUN npm cache clean --force

# Build with all dependencies
RUN npm run build
RUN ls -alh /public

# Lean NPM - Only install `dependencies`
# `devDependencies` will still be resolved inside `package-lock.json`,
# however they will not be installed inside `node_modules` directory.
RUN npm ci --legacy-peer-deps --omit=dev --ignore-scripts
RUN ls -alh /public

###################
# 2. PRODUCTION
###################

# NPM 9.5.1 Alpine linux image
FROM node:19.8.1-alpine3.16 AS production

WORKDIR /app

# Copy from `build` to `prod`
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/package-lock.json .
COPY --chown=node:node --from=build /app/tsconfig.json .
COPY --chown=node:node --from=build /app/node_modules ./node_modules
RUN ls -alh ./
COPY --from=build /app/public ./public
RUN ls -alh /public
COPY --chown=node:node --from=build /app/scripts ./scripts
COPY --chown=node:node --from=build /app/styles ./styles
COPY --chown=node:node --from=build /app/server ./server
COPY --chown=node:node --from=build /app/templates ./templates
COPY --chown=node:node --from=build /app/types ./types

# Non-root user
USER node

# Container healthcheck
HEALTHCHECK \
--interval=60s \
--timeout=30s \
CMD wget \
--no-verbose \
--tries=3 \
--spider http://localhost:${PORT} \
|| exit 1

# Execute Script
CMD ["npm", "run", "start"]
