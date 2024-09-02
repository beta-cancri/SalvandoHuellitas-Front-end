# Usa una imagen base que ya tenga Node.js preinstalado
FROM node:18 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json si existe
COPY package*.json ./

# Actualiza NPM a una versión específica (por ejemplo, 8.x)
RUN npm install -g npm@8

# Instala las dependencias del proyecto
RUN npm ci

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Utiliza una imagen base ligera para el entorno de producción
FROM nginx:alpine AS production

# Copia los archivos de la build desde la fase anterior
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto en el que el contenedor estará escuchando
EXPOSE 80

# Comando para correr el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
