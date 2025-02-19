FROM node:lts-alpine3.17 AS development

RUN npm i -g prisma@latest
RUN prisma version

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run prisma:generate
# To run the migration server, comment the line below
RUN npm run build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json .

COPY --from=development /app/prisma ./prisma
RUN npm run prisma:generate

COPY --from=development /app/dist ./dist
CMD ["node", "dist/index.js"]