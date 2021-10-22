FROM node:14-alpine

WORKDIR /app
COPY . .
RUN npm ci --production

CMD ["node", "start.js"]
