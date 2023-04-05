###################
# 1. BUILD
###################

# NPM 8.19.1 Alpine linux image
FROM node:18.15-alpine3.16 AS build

# Build variables
ARG GITHUB_SHA
ARG SESSION_SECRET
ARG GOV_NOTIFY_API_KEY
ARG PORT
ENV GITHUB_SHA=$GITHUB_SHA
ENV SESSION_SECRET=$SESSION_SECRET
ENV GOV_NOTIFY_API_KEY=$GOV_NOTIFY_API_KEY
ENV PORT=$PORT


WORKDIR /app

# NPM
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
RUN npm ci --legacy-peer-deps
RUN npm cache clean --force

# Copy API
COPY --chown=node:node . .

# Build with all dependencies
RUN npm run build

# Lean NPM - Only install `dependencies`
# `devDependencies` will still be resolved inside `package-lock.json`,
# however they will not be installed inside `node_modules` directory.
RUN npm ci --legacy-peer-deps --omit=dev

# Non-root user
USER node

###################
# 2. PRODUCTION
###################

# NPM 9.5.1 Alpine linux image
FROM node:19.8-alpine3.16 AS production

WORKDIR /app

# Copy from `build` to `prod`
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/package-lock.json .
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/.keystone ./.keystone
COPY --chown=node:node --from=build /app/integrations ./integrations
COPY --chown=node:node --from=build /app/helpers ./helpers
COPY --chown=node:node --from=build /app/emails ./emails
COPY --chown=node:node --from=build /app/custom-resolvers ./custom-resolvers
COPY --chown=node:node --from=build /app/test-mocks ./test-mocks

# Non-root user
USER node

# Container healthcheck
HEALTHCHECK \
--interval=10s \
--timeout=7s \
CMD wget \
--no-verbose \
--tries=3 \
--spider http://localhost:${PORT} \
|| exit 1

# Execute Script
CMD ["npm", "run", "start"]
