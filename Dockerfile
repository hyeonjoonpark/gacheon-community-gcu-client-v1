# Stage 1: Build Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Nginx configuration
# COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Next.js static files to Nginx
COPY --from=builder /app/.next /usr/share/nginx/html

# Expose port
EXPOSE 81

CMD ["nginx", "-g", "daemon off;"]
