# Base image with Node.js
FROM node:latest as base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies (including dev dependencies)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Testing stage
FROM base as test
CMD ["npm", "test"]

# Production build stage
FROM base as production

# Set NODE_ENV to production to exclude dev dependencies
ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --only=production

EXPOSE 3001
CMD [ "node", "server.js" ]
