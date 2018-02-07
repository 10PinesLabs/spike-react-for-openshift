FROM nginx

COPY start.sh /tmp/

ENV URL_CONFIGURACION http://127.0.0.1:8081/spikereact/development
ENV URL_BACKEND http://127.0.0.1:8080

RUN chmod +x /tmp/start.sh && /tmp/start.sh