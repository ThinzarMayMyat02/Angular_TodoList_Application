# FIRST ROOM: Where we build the castle
FROM node:22.12.0-alpine AS build-room

# Go to the working dir
WORKDIR /app

# Copy the list (package files)
COPY package*.json ./

# install what we need
RUN npm install

# Copy all file except .dockerignore
COPY . .

# Build the project
RUN npm run build

# SECOND ROOM: Where we show the castle to friends
FROM nginx:alpine AS show-room

# Move the built one to the display area
COPY --from=build-room /app/dist/angular-project/browser /usr/share/nginx/html

# Copy custom nginx config (if needed) > overwrite the default one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Open gate (port 4200)
EXPOSE 4200

# to start working
CMD ["nginx", "-g", "daemon off;"]
