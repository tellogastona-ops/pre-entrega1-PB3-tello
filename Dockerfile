# Usamos una versión oficial y ligera de Node.js
FROM node:20-alpine

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias en el contenedor
RUN npm ci

# Copiamos el resto del código fuente del proyecto
COPY . .

# Exponemos el puerto en el que corre la aplicación (ej. 8080)
EXPOSE 8080

# Comando para ejecutar la aplicación al iniciar el contenedor
CMD ["npm", "start"]