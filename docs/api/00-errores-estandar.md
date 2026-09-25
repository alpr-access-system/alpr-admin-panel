# Estándar Global de Errores de API

Para mantener una consistencia absoluta en el manejo de excepciones y darle la capacidad al Frontend (React) de interceptar errores globalmente (ej: usando Axios Interceptors para mostrar Notificaciones "Toast"), **todos** los endpoints de esta API, sin importar el dominio, deberán retornar los errores siguiendo la siguiente estructura unificada.

> **Estrategia:** La respuesta de error nunca debe venir envuelta en `"data"`, sino que debe utilizar el nivel raíz `"error"`.

---

## 1. Estructura Base de un Error (4xx / 5xx)

Todo error debe retornar un objeto JSON con la clave `"error"` que contiene `code` (código HTTP repetido para fácil parseo) y `message` (el mensaje legible para el usuario final).

```json
{
  "error": {
    "code": 404,
    "message": "El funcionario con ID 999 no existe en el sistema."
  }
}
```

## 2. Errores de Validación de Datos (HTTP 422 Unprocessable Entity)

En casos donde el usuario envíe un payload malformado o falten campos requeridos en un POST/PUT (manejado automáticamente por Pydantic en FastAPI), la API deberá adjuntar la propiedad opcional `"details"` que debe contener un arreglo estandarizado de los campos exactos que fallaron.

```json
{
  "error": {
    "code": 422,
    "message": "Existen errores de validación en el formulario enviado.",
    "details": [
      {
        "field": "rut",
        "message": "El RUT ingresado no tiene un formato válido."
      },
      {
        "field": "departamento",
        "message": "Este campo es obligatorio."
      }
    ]
  }
}
```

## 3. Errores de Autenticación / Permisos (HTTP 401 / 403)

Para endpoints protegidos por JWT, se debe retornar un mensaje genérico para no filtrar información sensible (ej: evitar decir "El usuario existe pero la contraseña es mala").

**Falta de Token (401 Unauthorized)**
```json
{
  "error": {
    "code": 401,
    "message": "Autenticación requerida para acceder a este recurso."
  }
}
```

**Falta de Permisos (403 Forbidden)**
```json
{
  "error": {
    "code": 403,
    "message": "Tu rol no tiene los permisos suficientes para ejecutar esta acción."
  }
}
```

---

### Regla para el Frontend
El frontend **NUNCA** procesará los errores mediante condicionales esparcidos por todos los componentes. Se construirá un `errorHandler` centralizado que leerá `response.error.message` e inyectará una notificación roja global. Solo si existe `response.error.details`, se mapeará el error directamente debajo del `<Input>` correspondiente en el formulario.
