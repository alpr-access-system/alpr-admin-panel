# Panel de Administración ALPR - UTEM Campus Ñuñoa

Este repositorio contiene el sistema de control de acceso vehicular (Nodo Central) desarrollado bajo un enfoque de **Monorepo**.

## Requisitos Previos
* **Docker Desktop** (o Docker Engine + Docker Compose) instalado y ejecutándose en tu máquina.

## ¿Cómo levantar el proyecto localmente?

Toda la configuración del entorno de desarrollo (versiones de Node.js, dependencias, variables de entorno) está encapsulada en Docker.

1. Clona este repositorio y abre una terminal en la raíz del proyecto.
2. Ejecuta el siguiente comando para construir e iniciar el contenedor:
   ```bash
   docker compose up
   ```
   *(Nota: La primera vez tomará unos minutos mientras descarga la imagen base de Node y compila las dependencias).*

3. Una vez que la terminal indique que el servidor está listo, abre tu navegador web e ingresa a:
   👉 **http://localhost:5173**

### Detener el servidor
Para apagar el entorno, simplemente presiona `Ctrl + C` en la terminal donde se está ejecutando, o bien, si lo corriste en segundo plano (`-d`), ejecuta:
```bash
docker compose down
```

---
*Cualquier cambio que realices en el código fuente de la carpeta `frontend/` se reflejará automáticamente en el navegador gracias a la configuración de Hot Reload en los volúmenes de Docker.*