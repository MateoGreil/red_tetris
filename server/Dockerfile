# base image
FROM node:latest

# set working directory
RUN mkdir -p /opt/red_tetris/server
WORKDIR /opt/red_tetris/server

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /opt/red_tetris/server/package.json
COPY src /opt/red_tetris/server/src

RUN npm install --silent

# start app
CMD ["npm", "start"]