# 📦 Dynamic File Processor - NestJS + PostgreSQL + BullMQ

Este proyecto permite procesar archivos CSV (o cualquier estructura tabular) de manera **dinámica** en **NestJS**, **almacenándolos en PostgreSQL** usando **TypeORM**, y **procesándolos en background** usando **BullMQ**.

> ✅ Adaptable a archivos de estructura flexible  
> ✅ Arquitectura limpia y extensible  
> ✅ Compatible con múltiples formatos en el futuro

---

## 🚀 Tecnologías

- [NestJS](https://nestjs.com/) - Framework backend
- [TypeORM](https://typeorm.io/) - ORM para PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) - Base de datos
- [BullMQ](https://docs.bullmq.io/) - Job Queue Manager
- [Docker](https://www.docker.com/) - Contenedores para la app y la base de datos

---

## ⚙️ Instalación rápida

1. **Clona el repositorio**

```bash
git clone https://github.com/tu_usuario/dynamic-file-processor.git
cd dynamic-file-processor
```

### Instala dependencias

yarn

### Configura las variables de entorno

### Copia el archivo .env.example y renómbralo a .env:

cp .env.example .env

### Configura los datos de conexión a PostgreSQL:

PORT=3000

# Database configuration

DB_HOST=db
DB_PORT=5432
DB_USERNAME=tuuser
DB_PASSWORD=tupass
DB_DATABASE=postgres
REDIS_HOST=redis

# Correr contenedor
docker-compose up --build

# Probar websoket

Abre el archivo "test.html" en tu navegador para probar la conexión WebSocket. El evento será enviado al navegador cuando se active , puedes abrirlo dando click derecho y abrir en live server.

# Probar endpoint

curl --location 'http://localhost:3000/upload' \
--form 'file=@"/Users/bryantperez/Downloads/reporteprueba.xlsx"'

y en el apartado de body ponen el file.