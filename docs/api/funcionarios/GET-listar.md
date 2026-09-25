# Endpoint: Listar Funcionarios

**Ruta:** `GET /api/v1/funcionarios`
**Módulo:** Funcionarios
**Descripción:** Obtiene el listado completo del directorio de funcionarios institucionales. Delega toda la lógica de ordenamiento, filtros combinados y paginación a la base de datos para no saturar la red ni la RAM del cliente.

---

### Query Parameters (Filtros)
| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `page` | `integer` | No (Default: 1) | Número de página actual. |
| `limit` | `integer` | No (Default: 10) | Cantidad de registros por página. |
| `search` | `string` | No | Término de búsqueda parcial (RUT o Nombre Completo). |
| `departamento` | `string` | No | Filtrar por unidad (Ej: "Ingeniería"). Si es nulo, no filtra. |
| `estado` | `boolean` | No | Filtrar por Activo (`true`) o Inactivo (`false`). |
| `sort_by` | `string` | No (Default: "id") | Campo base de ordenamiento (ej: "nombre", "departamento", "rut"). |
| `sort_order`| `string` | No (Default: "asc")| Dirección del ordenamiento: `"asc"` (ascendente) o `"desc"` (descendente). |

---

### Response Exitosa (200 OK)

**Payload Estándar (Data + Meta):**
```json
{
  "data": [
    {
      "id": 1,
      "rut": "11.111.111-1",
      "nombre": "Juan Pérez",
      "departamento": "Ingeniería",
      "telefono": "+56912345678",
      "correo": "juan.perez@utem.cl",
      "vehiculos_registrados": 2,
      "activo": true
    }
  ],
  "meta": {
    "total_records": 150,
    "current_page": 1,
    "total_pages": 15,
    "has_next": true,
    "has_prev": false
  }
}
```

---

### Posibles Errores

* **401 Unauthorized:** Retorna cuando la petición no incluye un token JWT válido (Ver `00-errores-estandar.md`).
* **422 Unprocessable Entity:** Si el cliente envía tipos de datos inválidos en la paginación (ej: `?page=texto`). Manejado nativamente por FastAPI.

