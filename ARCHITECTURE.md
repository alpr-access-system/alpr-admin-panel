# Arquitectura del Sistema - Nodo Central

Este documento define la estructura y las reglas arquitectónicas para el panel de administración central y la API del sistema ALPR.

## Enfoque Arquitectónico
El proyecto utiliza un **Monorepo por Capas Lógicas**, separando estrictamente el Frontend (React/TypeScript) del Backend (FastAPI/Python). 

Dentro de cada capa, se aplica el patrón de **Vertical Slicing (Diseño Orientado a Dominios/Features)**, agrupando el código por su funcionalidad de negocio en lugar de por su tipo técnico (controladores, modelos, etc.).

## 1. Estructura del Frontend (React + Vite)
El frontend se organiza en "Módulos" o "Features", donde cada uno contiene sus propias vistas, componentes específicos y contratos de datos.

```text
frontend/
├── src/
│   ├── app/                # Punto de entrada, Providers globales, Router principal
│   ├── shared/             # Componentes reutilizables UI (Botones, Modales, Layouts), utilidades
│   └── features/           # Módulos de negocio (Vertical Slicing)
│       ├── auth/           # Dominio de autenticación
│       │   ├── views/      # Páginas enrutables (ej. LoginPage)
│       │   ├── components/ # Componentes exclusivos de auth (ej. LoginForm)
│       │   ├── api/        # Llamadas fetch/axios aisladas
│       │   └── types/      # Interfaces de TypeScript
│       ├── vehicles/       # Dominio de vehículos de funcionarios
│       │   ├── views/
│       │   ├── components/
│       │   ├── api/
│       │   └── types/
│       └── access_logs/    # Dominio de historial de accesos
│           └── ...
```

## 2. Estructura del Backend (FastAPI)
Siguiendo la misma filosofía, la API agrupa rutas, esquemas de validación y lógica de base de datos por dominio.

```text
backend/
├── app/
│   ├── core/               # Configuración, seguridad, conexión a BD
│   ├── api/                # Router principal y dependencias
│   └── modules/            # Módulos de negocio (Vertical Slicing)
│       ├── vehicles/
│       │   ├── router.py   # Endpoints (GET, POST, etc.)
│       │   ├── schemas.py  # Modelos Pydantic (Validación)
│       │   ├── models.py   # Modelos SQLAlchemy (Base de datos)
│       │   └── service.py  # Lógica de negocio (Consultas)
│       └── access_logs/
│           └── ...
```

## Reglas Técnicas Innegociables
1. **Frontend-First con Mocks Estrictos:** El desarrollo iniciará en el frontend usando datos simulados.
2. **Tipado Fuerte (TypeScript):** Está estrictamente prohibido el uso de la variable `any`. Toda la información debe estar definida mediante `interfaces`.
3. **Separación de Responsabilidades (UI vs Lógica):** Las Vistas (`views/`) solo estructuran la página. Los componentes (`components/`) solo pintan datos. La obtención de datos se delega a Custom Hooks y la capa `api/`.
