FROM node:16-alpine as builder

WORKDIR /usr/app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]