# Arquitectura del Sistema - Nodo Central

Este documento define la estructura y las reglas arquitectónicas para el panel de administración central y la API del sistema ALPR.

## Principios Arquitectónicos Transversales

1. **ZeroTrust Frontend (Frontend "Tonto"):** El frontend **NUNCA** debe procesar filtrado, ordenamiento o paginación masiva en la memoria del navegador. Toda acción de filtrado debe mutar la URL (ej: `?page=2&search=Juan`) y delegar la carga de cómputo a la base de datos a través de la API.
2. **Optimización de Payloads (Thin vs Fat):** Los endpoints de listado general (tablas principales) deben evitar los `JOINs` pesados. Si una entidad tiene sub-elementos complejos (ej: un Funcionario y sus Vehículos), la tabla principal solo debe retornar conteos calculados (ej: `vehiculos_registrados`). El detalle anidado se debe obtener a través de un segundo endpoint dedicado, activado bajo demanda (ej: al abrir un Modal).

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

## 3. Documentación y Contratos de API (API-First)
El proyecto se rige por un diseño **Contract-First**. Antes de codificar la lógica del backend o conectar el frontend, se debe definir el contrato JSON estricto en la carpeta `docs/api/`.

### Estructura de Documentación de Endpoints
Para mantener el orden frente a una API que crecerá rápidamente, la documentación se separa por dominio y endpoint específico:
```text
docs/api/
├── 00-errores-estandar.md       # Definición de la estructura global de errores HTTP
├── funcionarios/                # Dominio de negocio
│   ├── GET-listar.md
│   ├── GET-vehiculos.md
│   └── POST-crear.md
└── vehiculos/
    └── ...
```

## Reglas Técnicas Innegociables
1. **Frontend-First con Mocks Estrictos:** El desarrollo iniciará en el frontend usando datos simulados que cumplan al 100% con los contratos de `docs/api/`.
2. **Tipado Fuerte (TypeScript):** Está estrictamente prohibido el uso de la variable `any`. Toda la información debe estar definida mediante `interfaces`.
3. **Separación de Responsabilidades (UI vs Lógica):** Las Vistas (`views/`) solo estructuran la página. Los componentes (`components/`) solo pintan datos. La obtención de datos se delega a Custom Hooks y la capa `api/`.
4. **Respuestas de API Estructuradas:** Todos los endpoints exitosos deben retornar los datos envueltos en la llave `"data"` y metadatos en `"meta"`. Los errores deben seguir estrictamente el estándar documentado en `00-errores-estandar.md`.
