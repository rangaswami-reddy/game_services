FROM node:16.14.0 AS builder
ENV APP_HOME /app
RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}
RUN npm install -g npm
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
FROM node:16.14.0
ENV APP_HOME /app
WORKDIR ${APP_HOME}
COPY --from=builder ${APP_HOME} ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
