FROM node:16-alpine

ENV NODE_ENV development

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY  package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]