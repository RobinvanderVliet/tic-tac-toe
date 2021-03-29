FROM node:15

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install
RUN chmod 777 node_modules

EXPOSE 3000

CMD ["npm", "start"]
