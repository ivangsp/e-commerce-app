# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-slim

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY  package*.json ./

RUN npm install

# Bundle app source code
COPY  . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=8080

EXPOSE ${PORT}

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && npm run dev
