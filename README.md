
# Rest Project + Websocket Server + TypeScript

Este proyecto esta hecho para recibir una peticion HTTP mediante una API para hacer el envio de un mensaje a traves de una conexion por websockets

## Instalacion

1. Clonar .env.example y configurar las variables de entorno.
2. Ejecutar npm install para instalar las dependencias.
3. Ejecutar `npm run dev` para levantar el proyecto en modo de desarrollo.

## Produccion
1. Crear la imagen de docker `docker build -t rematelo-websocket .`
2. Correr el contenedor indicando el puerto 80 con la bandera -e `docker run -d -p 3001:80 -e PORT=80 rematelo-websocket`
