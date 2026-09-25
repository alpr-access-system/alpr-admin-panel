# Contratos de API: Gestión de Funcionarios

Esta especificación define los contratos (Request/Response) que el Backend (FastAPI) deberá exponer y que el Frontend (React) consumirá para la vista de "Gestión de Funcionarios".

> **Estrategia:** API-First Design. El frontend utilizará estrictamente esta estructura para sus Mocks y tipos. 

---

## 1. Listar Funcionarios (Paginado y Filtrado)

**Endpoint:** `GET /api/v1/funcionarios`
**Descripción:** Obtiene la lista de funcionarios. Delega toda la lógica de paginación y búsqueda al servidor.

### Query Parameters (Filtros)
| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `page` | `integer` | No (Default: 1) | Número de página actual. |
| `limit` | `integer` | No (Default: 10) | Cantidad de registros por página. |
| `search` | `string` | No | Término de búsqueda (RUT o Nombre). |
| `departamento` | `string` | No | Filtrar por unidad (Ej: "Ingeniería"). |
| `estado` | `boolean` | No | Filtrar por Activo (true) o Inactivo (false). |
| `sort_by` | `string` | No (Default: "id") | Campo por el cual ordenar (ej: "nombre", "departamento"). |
| `sort_order`| `string` | No (Default: "asc")| Dirección del orden: "asc" (ascendente) o "desc" (descendente). |

### Response (200 OK)
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

## 2. Obtener Vehículos de un Funcionario

**Endpoint:** `GET /api/v1/funcionarios/{id}/vehiculos`
**Descripción:** Obtiene el listado completo de vehículos asociados a un funcionario específico. Se usará para pintar el Modal/Drawer en el frontend.

### Path Parameters
| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `integer` | Sí | ID interno del funcionario. |

### Response (200 OK)
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
    }
  ]
}
```

---

## Notas Arquitectónicas
- El frontend **nunca** procesará filtrado masivo en memoria. Siempre mutará la URL (ej: `?page=2&search=Juan`) y disparará una nueva petición a `GET /api/v1/funcionarios`.
- La propiedad `vehiculos_registrados` en el listado principal es calculada por el backend (probablemente mediante un `COUNT` o un campo virtual en SQL) para no enviar toda la data anidada y aligerar la carga de red. Solo se pide el detalle de vehículos al abrir el Modal (Endpoint 2).
