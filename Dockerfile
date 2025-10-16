FROM node:22-bullseye

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose application port
EXPOSE 3000

# Start app
CMD ["node", "app.js"]
