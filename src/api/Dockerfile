# Node Alpine Docker Image
FROM node:18.9-alpine3.16

# Variables
ARG GITHUB_SHA
ARG SESSION_SECRET
ARG GOV_NOTIFY_API_KEY
ENV GITHUB_SHA $GITHUB_SHA
ENV SESSION_SECRET $SESSION_SECRET
ENV GOV_NOTIFY_API_KEY $GOV_NOTIFY_API_KEY
ENV SSH_PORT=2222

# SSH Setup
# 1. Artifcats
ADD init.sh /bin/init.sh
ADD sshd_config /etc/ssh/
RUN chmod 755 /bin/init.sh

# 2. Install packages
RUN apk add bash openrc openssh curl \
  && echo "root:Docker!" | chpasswd \
  && rm -rf /var/cache/apk/* \
  && rc-update add sshd

#3. Expose SSH port
EXPOSE 80 ${SSH_PORT}

# Node setup
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .keystone keystone
RUN npm ci --legacy-peer-deps
RUN npm install -g typescript
RUN npm cache clean --force
COPY . .
RUN npm run build

# Execute Script
ENTRYPOINT ["/bin/init.sh"]
