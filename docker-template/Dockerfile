# base image that you are starting from
# if you go to docker hub the vast majority of docker images are stored
# this pulls from official node js image: version (tag) that we pull from
# node running on alphine linux (small lightweight ver of linux)
# basically you will install all your apps on this lightweight linux server
FROM node:14-alpine3.12

# Create app directory
# this is the location where you will be inside the container
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers
COPY package*.json ./

# one of the longest process
# docker benefit: only needs to be rerun when package.json updates.
# every step in docker image creation is a layer and layers are cached.
# only the step after a modification need to be rebuilt b/c prev layers are cached
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# copies current working directory into containers working directory aka /user/src/app
# Bundle app source
COPY . .

# server runs on this port so you need to access the container on this port
EXPOSE 8080

# npm run start
CMD [ "npm", "run", "start" ]