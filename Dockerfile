# Build
FROM node:13-alpine as builder
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . /app
RUN yarn build

# Final
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
