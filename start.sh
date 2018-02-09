#!/bin/bash

echo "Armando el archivo de configuración de ngnix"

echo "
http {
    server {
        listen 80;
        server_name _;
        index index.html;
        root /data/www;
        location / {
	    	try_files \$uri /index.html;
        }
        location ~ \.css {
           add_header  Content-Type    text/css;
        }
        location ~ \.js {
           add_header  Content-Type    application/x-javascript;
        }
        location /config {
            proxy_pass ${URL_CONFIGURACION};
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header content-type "application/json";
        }
        location /back {
        rewrite ^/back(.*) /\$1 break;
            proxy_pass ${URL_BACKEND};
        }
    }
}
events {
    worker_connections  1024;
}

#events {
#    worker_connections  1024;
#}
#http {
#	server {
#		listen 80; 
#		location / {
#			root /data/www;
#		}
#		location /images/ {
#			root /data;
#		}
#	}
#	include /etc/nginx/conf.d/*.conf;
#}
" > /etc/nginx/nginx.conf

cat /etc/nginx/nginx.conf

echo "CONFIG generada"
