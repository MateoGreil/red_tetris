# base image
FROM node:latest

# set working directory
RUN mkdir -p /opt/red_tetris/client
WORKDIR /opt/red_tetris/client


# Copy app
COPY package.json /opt/red_tetris/client/package.json
COPY public /opt/red_tetris/client/public
COPY src /opt/red_tetris/client/src

RUN npm install --silent

# start app
CMD ["npm", "start"]