# build stage docker for post-frontend
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install --legacy-peer-deps
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build


# server stage docker 
FROM nginx:alpine
# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose the port the app runs on
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]