#simple a nginx server in a docker

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf