# Especificación Funcional del Recurso (EFR) - Frontend Nodo Central

Se define la estructura de pantallas para el **Frontend del Nodo Central** (SPA en React con TypeScript, conectada a la API REST en FastAPI y PostgreSQL). Se incorpora la administración de vehículos integrada directamente en el perfil del funcionario, respetando el modelo Entidad-Relación de **1 Funcionario a N Vehículos**.

---

### **Pantalla 1: Vista de Inicio de Sesión (Login)**
* **Tiene:**
  * Formulario de autenticación con campos para usuario/correo institucional y contraseña.
  * Indicador de estado y mensajes de validación/error.
  * Botón de **"Iniciar Sesión"** que invoca el endpoint de autenticación JWT (`/auth/login`).
* **Comentarios:** 
  Punto de entrada protegido que valida credenciales y gestiona la sesión (token JWT) para los usuarios administrativos y personal de conserjería.

---

### **Pantalla 2: Vista de Dashboard Principal (Panel Estadístico)**
* **Tiene:**
  * **Tarjetas KPI (Resumen del Día)**: Total de accesos validados hoy, total de funcionarios registrados, total de vehículos activos en la lista blanca e indicador de salud de conexión del nodo de borde (En línea / Offline).
  * **Gráficos de tráfico vehicular**: Gráfico de barras de flujo de ingresos por hora (identificación de horas pico) y gráfico de distribución por departamento/unidad.
  * **Tabla rápida en vivo**: Listado con los últimos 5 eventos de acceso registrados en tiempo real.
  * **Botones de acción directa**: Accesos rápidos a **"+ Nuevo Funcionario"** y **"Ver Logs Completos"**.
* **Comentarios:** 
  Ofrece una vista ejecutiva e inmediata del estado del control de acceso en el Campus Ñuñoa sin necesidad de navegar a través de submódulos.

---

### **Pantalla 3: Vista de Gestión de Funcionarios (Vista Principal de Operación)**
* **Tiene:**
  * **Buscador y filtros**: Filtro por RUT, Nombre completo o Departamento/Unidad institucional.
  * **Tabla de Funcionarios**: Muestra RUT, Nombre Completo, Unidad/Departamento, Cantidad de vehículos asociados (badges/etiquetas con las patentes) y Estado (Activo/Inactivo).
  * **Acciones por fila**: Botones para "Editar Perfil", "Ver/Gestionar Vehículos" y "Cambiar Estado".
  * **Drawer / Modal de Ficha del Funcionario**: 
    * Datos personales e institucionales.
    * **Sección "Vehículos Asignados"**: Lista de sus patentes con opción de activar/desactivar o eliminar.
    * **Botón "+ Agregar Vehículo"**: Abre un subformulario rápido para ingresar Patente, Marca/Modelo y Tipo de vehículo (asociando automáticamente el `funcionario_id`).
* **Comentarios:** 
  Es la pantalla central de gestión administrativa. Resuelve el problema de carga cognitiva al permitir empadronar al funcionario y matricular sus vehículos en un solo flujo continuo.

---

### **Pantalla 4: Vista de Gestión de Vehículos y Lista Blanca (Consulta Global)**
* **Tiene:**
  * **Tabla global de vehículos autorizados**: Columnas con Placa Patente (soporta formato clásico, estándar y patente verde), Marca/Modelo, Tipo de Vehículo, **Funcionario Titular (RUT/Nombre como enlace)** y Estado de Vigencia.
  * **Buscador global de patentes**: Búsqueda rápida por placa patente completa o parcial.
  * **Acciones**:
    * Clic en el nombre del funcionario: Abre un modal rápido con la información de contacto del titular.
    * Botón de **"Forzar Sincronización Manual"**: Gatilla la descarga inmediata de la lista blanca hacia la base SQLite del nodo de borde.
* **Comentarios:** 
  Funciona como un directorio global enfocado en las placas vehiculares. Es ideal para auditorías de conserjería cuando se busca directamente una patente sin conocer al dueño.

---

### **Pantalla 5: Vista de Historial de Accesos y Logs (Trazabilidad)**
* **Tiene:**
  * **Tabla inmutable de eventos**: ID del evento, Patente detectada, Fecha y hora exacta (timestamp), Funcionario asociado (si aplica) y Estado de la validación.
  * **Filtros avanzados**: Buscador por rango de fechas/horas, por patente específica o por departamento.
  * **Botón de exportación**: Opción para descargar la tabla filtrada en formato CSV/Excel.
* **Comentarios:** 
  Despliega la trazabilidad histórica enviada asíncronamente desde el nodo de borde (SQLite -> PostgreSQL). Sirve para auditar eventos y analizar el uso del estacionamiento.

---

### **Pantalla 6: Vista de Monitoreo del Sistema y Nodos (Ajustes)**
* **Tiene:**
  * **Estado de los Nodos**: Indicador visual de la conexión con el nodo de borde (Portería Campus Ñuñoa).
  * **Métricas de Sincronización**: Fecha/hora de la última sincronización descendente (lista blanca) y ascendente (logs de acceso).
  * **Gestión de Cuentas del Panel**: Administración de usuarios con acceso al panel web (Conserjes / Administradores).
* **Comentarios:** 
  Permite al administrador revisar la salud de la topología distribuida y verificar que los datos en la nube y en el borde estén alineados.
