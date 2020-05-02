# Stage 1: node build
FROM node:12.16-alpine AS node-build
WORKDIR /app
COPY package.json ./
RUN npm install -g @aws-amplify/cli
RUN npm install
COPY . .
RUN amplify --version
# configure to aws account
# amplfify env pull <stage>
RUN npm run build

# Stage 2: build docker image
FROM nginx:1.17.1-alpine AS image-build
COPY --from=node-build /app/dist/plan-ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

