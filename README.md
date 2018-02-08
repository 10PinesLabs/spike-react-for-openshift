Este proyecto es una prueba de concepto para tener una aplicación básica que consuma un backend y muestre un par de valores.


Si se configura un load balancer como ngnix y se tiene el server de configuraciones levantado en el puerto 8081
Podemos configurar que la app se sirva de /front y que vaya a buscar las configuraciones de /config.


Dejo archivo de configuracion de ngnix de ejemplo:

```
server {
	listen 80	default_server;
	listen [::]:80 default_server;
	server_name _;
	location / {
		proxy_pass http://127.0.0.1:3000;
	}

    location /front {
	rewrite ^/front(.*) /$1 break;
        proxy_pass http://127.0.0.1:3000;
    }

    location /config {
        proxy_pass http://127.0.0.1:8081/spikereact/development;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
    	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header content-type "application/json";
    }

    location /back {
	rewrite ^/back(.*) /$1 break;
        proxy_pass http://127.0.0.1:8080;
    }
}```

## Buildear la docker image

`docker build . -t nginx-10p`

## Levantar un container de la imagen generada

`docker-compose up`

### ssh en el docker container

ver el nombre que le pone docker compose al container, por ejemplo
```
docker-compose up
Recreating spikereactforopenshift_nginx_1 ... done
```
luego, en otra terminal:
`docker exec -i -t spikereactforopenshift_nginx_1 /bin/bash`