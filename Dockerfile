# base image
FROM node:latest

# set working directory
RUN mkdir -p /opt/red_tetris/client
WORKDIR /opt/red_tetris/client


# Copy app
COPY config /opt/red_tetris/config
COPY public /opt/red_tetris/public
COPY scripts /opt/red_tetris/scripts
COPY package.json /opt/red_tetris/package.json
# COPY src /opt/red_tetris/src

RUN npm install --silent

# start app
CMD ["npm", "start"]