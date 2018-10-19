FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
