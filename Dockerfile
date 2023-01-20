# The instructions for the first stage
FROM node:14.17 as builder

# ARG NODE_ENV=development
# ENV NODE_ENV=${NODE_ENV}

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

# The instructions for second stage
FROM node:14.17

ENV APP_DIR /usr/src/app
WORKDIR "${APP_DIR}"

COPY --from=builder node_modules node_modules
COPY --from=builder dist dist

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
