FROM registry.cto.ai/official_images/node:2-12.13.1-stretch-slim

WORKDIR /ops

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN npm ci --only=production

ENV NODE_ENV=production

RUN npm run build


FROM base as test

ADD . .

EXPOSE 8080
CMD ["node", "index.js"]
