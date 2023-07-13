FROM node:alpine

RUN npm install -g @ionic/cli 

WORKDIR /ionic 

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8100

CMD [ "ionic", "serve", "--external" ]