# Dockerfile

# Stage 1: Build the Vue.js application
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package.json ./
# Check if package-lock.json or pnpm-lock.yaml exists and copy accordingly
# Assuming npm for now based on package.json scripts
COPY package-lock.json ./
RUN npm install
COPY . .
# Add execute permission for vite and esbuild
RUN chmod +x /app/node_modules/.bin/vite
RUN chmod +x /app/node_modules/@esbuild/linux-x64/bin/esbuild
RUN npm run build

# Stage 2: Serve the built files with Nginx
FROM nginx:stable-alpine as production-stage
# Copy the built app from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copy a custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
