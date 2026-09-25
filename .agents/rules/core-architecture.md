# Reglas Globales de Arquitectura y Desarrollo

Como Agente de IA trabajando en este proyecto, DEBES seguir estas directrices estructurales para evitar la degradación de la arquitectura a lo largo del tiempo.

## 1. Documentación Core (Tu fuente de verdad)
No asumas patrones ni inventes convenciones. Antes de tomar decisiones de diseño o programar lógica nueva (especialmente en la API o en la manipulación de datos del Frontend), **DEBES** revisar el siguiente archivo:
- `docs/ARCHITECTURE.md` -> Contiene las reglas innegociables del monorepo, los principios ZeroTrust para el Frontend, y las reglas de optimización de bases de datos.

## 2. Contratos de API (API-First)
Antes de construir o consumir cualquier endpoint, revisa su contrato correspondiente en la carpeta `docs/api/`. 
- **Manejo de Errores:** Lee `docs/api/00-errores-estandar.md` una sola vez para entender la estructura global de excepciones. Todo código que escribas en el Backend o Frontend DEBE respetar ese formato exacto.

*(Nota interna para el agente: No es necesario que leas todos los endpoints de la API al iniciar una sesión, solo lee `ARCHITECTURE.md` y `00-errores-estandar.md` como contexto base, y luego lee únicamente los contratos específicos del dominio en el que el usuario te pida trabajar).*
