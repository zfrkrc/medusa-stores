FROM node:22-alpine
WORKDIR /app
RUN apk update && apk upgrade --no-cache && apk add --no-cache git curl dos2unix
COPY . .
CMD ["sh", "-c", "if [ ! -f 'node_modules/.bin/next' ]; then yarn install --network-timeout 1000000 --production=false; fi && if [ ! -f '.next/BUILD_ID' ]; then yarn build; fi && yarn start"]
