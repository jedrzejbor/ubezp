FROM nginx:1-alpine
WORKDIR /app

COPY ./.docker/wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

ARG NGINX_CONF=nginx.conf
COPY ./.docker/nginx/${NGINX_CONF} /etc/nginx/conf.d/default.conf
