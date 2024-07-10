# Etapa 1: Construir la aplicación Angular
FROM node:16 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install -f

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build --prod

# Etapa 2: Servir la aplicación utilizando Nginx
FROM nginx:alpine

# Copiar los archivos de construcción de la etapa anterior a Nginx
COPY --from=build /app/dist/app-pokemon /usr/share/nginx/html

# Copiar archivo de configuración personalizado de Nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
