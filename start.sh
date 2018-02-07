#!/bin/bash

echo "Armando el archivo de configuración de ngnix"

echo "server {
	listen 80; 
	server_name _; 
	root /home/gi/dev/git-claro/spike-react-for-openshift/build; 
	index index.html; 
	location / { 
		try_files $uri /index.html; 
    }
    location /config {
        proxy_pass ${URL_CONFIGURACION};
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
    	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header content-type "application/json";
    }
    location /back {
	rewrite ^/back(.*) /$1 break;
        proxy_pass ${URL_BACKEND};
    }
}" > /etc/nginx/ngnix.conf

cat /etc/nginx/ngnix.conf

echo "CONFIG generada"
