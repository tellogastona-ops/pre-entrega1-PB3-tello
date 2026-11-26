# Proyecto Final Backend - Coderhouse

## 🚀 Instalación y Ejecución Local
1. Clonar el repositorio.
2. Instalar dependencias:

```bash
npm ci
```

## 🐳 Imagen en DockerHub

Repositorio público en DockerHub:
https://hub.docker.com/r/gastooncoder/pre-entrega1-pb3-tello

### Descargar y ejecutar la imagen

```bash
docker pull gastooncoder/pre-entrega1-pb3-tello:1.0.0
docker run -p 8080:8080 gastooncoder/pre-entrega1-pb3-tello:1.0.0
```

## ⚙️ Variables de entorno
Creá un archivo `.env` en la raíz del proyecto (o pasalas por entorno):
- `PORT`: puerto del servidor (por defecto `8080`).
- `MONGO_URI`: cadena de conexión a MongoDB (por defecto `mongodb://127.0.0.1:27017/coderhouse`).

## 🧪 Ejecutar tests funcionales
Con la base de datos y el servidor levantados en el puerto `8080`:

```bash
npm test
```

## 📚 Documentación Swagger
Una vez iniciada la aplicación, accedé a la documentación interactiva en:
`http://localhost:8080/api/docs`

## 🐳 Build y ejecución local con Docker

```bash
docker build -t gastooncoder/pre-entrega1-pb3-tello:1.0.0 .
docker run -p 8080:8080 gastooncoder/pre-entrega1-pb3-tello:1.0.0
```
````[cite: 2, 16]