# base image
FROM node:latest

# set working directory
RUN mkdir -p /opt/red_tetris/server
WORKDIR /opt/red_tetris/server

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /opt/red_tetris/server/package.json
COPY main.js /opt/red_tetris/server/main.js
COPY Game.js /opt/red_tetris/server/Game.js
COPY Player.js /opt/red_tetris/server/Player.js
COPY Piece.js /opt/red_tetris/server/main.js

RUN npm install --silent

# start app
CMD ["npm", "start"]