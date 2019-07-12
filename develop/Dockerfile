# Create image based on the official Node image from the dockerhub
FROM node:latest AS client_builder

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY ./client/ /usr/src/app/

# Install dependecies
RUN yarn install

# Build the client
# Create a directory where the client code will be compiled
RUN yarn build

# # # # #
FROM node:latest

# Create a directory where our app will be placed
RUN mkdir /app

# Copies client /dist
COPY --from=client_builder /usr/src/app/dist/ /app/client/

# Get all the in this repository
COPY ./api /app

# Change to the app directory
# Installs dependencies for the app
WORKDIR /app
RUN yarn install

# TODO - remove this
# TODO - remove this
# TODO - remove this
# CAN PROB SWITCH TO NODE ALPINE AFTER REMOVE
RUN yarn add https://github.com/codotype/codotype-hackathon-starter.git

# # # # #
# TODO - this is where the user extends this container

# Serve the app
CMD ["node", "www.js"]