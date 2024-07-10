# Proyecto Angular: Entrenador Pokémon

Este es un proyecto Angular para gestionar el perfil, equipo y página de inicio de un entrenador Pokémon.

## Requisitos

- Node.js (v16 o superior)
- Angular CLI (v16 o superior)
- Docker (opcional, para despliegue en contenedores)

## Instalación de dependencias

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:

```sh
npm install -f
```

## Levantar proyecto

```sh
ng serve
```

```sh
docker build -t app-pokemon .
docker run -p 8080:4200 app-pokemon

```
