# wallet-backend

## Tecnología
Backend hecho  en `node.js` con el framework `Express.js` y para sockets `Socket.io`

## Documentacion

Esta documentacion esta en la carpeta `docs`.

## Requerimientos

 Primero: Necesitas instalar estos paquetes :
 - [Mysql](https://www.mysql.com/downloads/): Elige la opción para tu sistema, descargar e instalar.
 - [Node.js](https://nodejs.org) 
 - [Postman](https://www.getpostman.com/apps) o algun rest client para testear esta api.

## Instalación

* `npm install` Para instalar las dependencias.
* `npm run config:db` para crear la base de datos y las tablas del archivo .sql en `app/db/schemaDb.sql`, cuando inicias este comando requiere un password y usuario root para crear bases en tu mysql.
* `npm run docs` este comando genera o reescribe `docs` con una documentación mejor legible.

## Config Database

El archivo config esta en la carpeta `app/db/db.js` agrega tus datos de usuario, password, host y puerto de la base de datos.

## Correr

* `npm start` y `rs` para refrescar la consola cuando corra. este backend corre en localhost con el puerto 8080  `http://localhost:8080`

## installar todo

**Run** : `npm run full:install`
