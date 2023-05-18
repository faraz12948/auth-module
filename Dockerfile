ARG NODE_SERVER_ENV
ARG PORT

FROM node:18-alpine

ENV NODE_ENV ${NODE_SERVER_ENV}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json .

RUN npm install

# Bundle app source
COPY . .

COPY run-server.sh /usr/src/app/

EXPOSE ${PORT}

ENTRYPOINT [ "/usr/src/app/run-server.sh" ]