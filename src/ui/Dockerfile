# Node Alpine Docker Image
FROM node:18.6-alpine3.16

# Variable
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA
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
RUN npm install --only-production --legacy-peer-deps
RUN npm install -g typescript
RUN npm cache clean --force
COPY . .

# Execute Script
ENTRYPOINT ["/bin/init.sh"]

# Hot reloading
# CMD node server/index.ts
