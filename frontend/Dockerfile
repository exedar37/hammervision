# Stage 1: Build the React application
FROM node:latest as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application from Nginx
FROM nginx:alpine
# Copy built static files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Overwrite the default Nginx configuration file with your custom file
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

