# Endpoint: Obtener Vehículos de un Funcionario

**Ruta:** `GET /api/v1/funcionarios/{id}/vehiculos`
**Módulo:** Funcionarios (Sub-entidad)
**Descripción:** Obtiene el listado completo y detallado de todos los vehículos que posee registrados y autorizados un funcionario en particular. 

> **Nota Arquitectónica:** Esta información se desvinculó del endpoint principal de `GET /funcionarios` debido a que el JOIN necesario para traer el detalle completo de los autos agregaría peso excesivo a la tabla de vista general. Este endpoint será consumido a demanda exclusivamente cuando el usuario despliegue el Modal/Drawer del funcionario en la interfaz visual.

---

### Path Parameters
| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `integer` | Sí | ID numérico e interno del funcionario (Primary Key). |

---

### Response Exitosa (200 OK)

Este endpoint no requiere paginación, asumiendo que las políticas institucionales limitan la cantidad de autos por persona a un número razonable (ej: 1 a 3 vehículos). Retorna un arreglo directo dentro de `data`.

```json
{
  "data": [
    {
      "id": 101,
      "patente": "AB-CD-12",
      "marca": "Toyota",
      "modelo": "Yaris",
      "color": "Rojo",
      "tipo": "Automóvil"
    },
    {
      "id": 102,
      "patente": "XX-YY-99",
      "marca": "Honda",
      "modelo": "CBR500R",
      "color": "Negro",
      "tipo": "Motocicleta"
    }
  ]
}
```

---

### Posibles Errores

* **404 Not Found:** El funcionario consultado no existe.
```json
{
  "error": {
    "code": 404,
    "message": "No se encontró ningún funcionario asociado al ID enviado."
  }
}
```
* **401 Unauthorized:** Retorna cuando la petición no incluye un token JWT válido.
