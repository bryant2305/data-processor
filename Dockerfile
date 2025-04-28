FROM node:20

# Crear el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN yarn

# Copiar el resto del proyecto
COPY . .

# Construir el proyecto (si usas TypeScript)
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["yarn", "run", "start:dev"]