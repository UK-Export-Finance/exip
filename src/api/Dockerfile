###################
# 1. BUILD
###################

FROM node:20.8.0-alpine3.17 AS build

# Build variables
ARG GITHUB_SHA
ARG SESSION_SECRET
ARG GOV_NOTIFY_API_KEY
ARG PORT
ARG NODE_ENV
ENV GITHUB_SHA=$GITHUB_SHA
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV SESSION_SECRET=$SESSION_SECRET
ENV GOV_NOTIFY_API_KEY=$GOV_NOTIFY_API_KEY


WORKDIR /app

# NPM
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
RUN npm ci --legacy-peer-deps

# Copy API
COPY --chown=node:node ./keystone.ts .
COPY --chown=node:node ./schema.ts .
COPY --chown=node:node ./types ./types
COPY --chown=node:node ./schema.graphql .
COPY --chown=node:node ./schema.prisma .
COPY --chown=node:node ./auth.ts .
COPY --chown=node:node ./.keystone ./.keystone
COPY --chown=node:node ./apollo-plugins ./apollo-plugins
COPY --chown=node:node ./constants ./constants
COPY --chown=node:node ./custom-resolvers ./custom-resolvers
COPY --chown=node:node ./custom-schema ./custom-schema
COPY --chown=node:node ./content-strings ./content-strings
COPY --chown=node:node ./emails ./emails
COPY --chown=node:node ./file-system ./file-system
COPY --chown=node:node ./generate-xlsx ./generate-xlsx
COPY --chown=node:node ./helpers ./helpers
COPY --chown=node:node ./integrations ./integrations
COPY --chown=node:node ./middleware ./middleware
COPY --chown=node:node ./nullable-checkbox ./nullable-checkbox
COPY --chown=node:node ./XLSX ./XLSX


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

FROM node:20.8.0-alpine3.17 AS production

WORKDIR /app

# Copy from `build` to `prod`
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/package-lock.json .
COPY --chown=node:node --from=build /app/keystone.ts .
COPY --chown=node:node --from=build /app/schema.ts .
COPY --chown=node:node --from=build /app/types ./types
COPY --chown=node:node --from=build /app/schema.graphql .
COPY --chown=node:node --from=build /app/schema.prisma .
COPY --chown=node:node --from=build /app/auth.ts .
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/.keystone ./.keystone
COPY --chown=node:node --from=build /app/apollo-plugins ./apollo-plugins
COPY --chown=node:node --from=build /app/constants ./constants
COPY --chown=node:node --from=build /app/custom-resolvers ./custom-resolvers
COPY --chown=node:node --from=build /app/custom-schema ./custom-schema
COPY --chown=node:node --from=build /app/content-strings ./content-strings
COPY --chown=node:node --from=build /app/emails ./emails
COPY --chown=node:node --from=build /app/file-system ./file-system
COPY --chown=node:node --from=build /app/generate-xlsx ./generate-xlsx
COPY --chown=node:node --from=build /app/helpers ./helpers
COPY --chown=node:node --from=build /app/integrations ./integrations
COPY --chown=node:node --from=build /app/middleware ./middleware
COPY --chown=node:node --from=build /app/nullable-checkbox ./nullable-checkbox
COPY --chown=node:node --from=build /app/XLSX ./XLSX

# Expose listening port
EXPOSE ${PORT}

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

# Non-root user
# USER node
