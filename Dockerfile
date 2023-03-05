FROM node:latest

EXPOSE 3000

WORKDIR /

COPY package.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]