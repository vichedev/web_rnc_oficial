# Etapa de build
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Dar permisos de ejecución al binario de esbuild
RUN chmod +x node_modules/@esbuild/linux-x64/bin/esbuild
RUN chmod +x ./node_modules/.bin/vite

# Compilar con Vite
RUN npx vite build

# Etapa de producción
FROM nginx:alpine

# Crear usuario no-root (cambiado a minúsculas)
RUN addgroup -g 1001 web-rnc-oficial && \
    adduser -D -u 1001 -G web-rnc-oficial -s /bin/sh -h /home/web-rnc-oficial web-rnc-oficial

# Crear carpetas necesarias y asignar permisos
RUN mkdir -p /var/cache/nginx/client_temp && \
    mkdir -p /run && \
    touch /run/nginx.pid && \
    chown -R web-rnc-oficial:web-rnc-oficial /var/cache/nginx /run /usr/share/nginx/html

# Copiar configuraciones
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copiar build del frontend
COPY --from=build /app/dist /usr/share/nginx/html

USER web-rnc-oficial
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]