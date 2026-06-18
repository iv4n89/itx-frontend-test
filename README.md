# ITX Frontend Test

Este repositorio contiene dos soluciones independientes a la prueba técnica propuesta, cuyo enunciado puede encontrarse [aquí](./ITX-FrontEndTest1.pdf).

---

## Solución 1 — Desarrollo manual

Carpeta raíz del repositorio. SPA desarrollada íntegramente por el candidato siguiendo los requerimientos del enunciado.

**Stack:** React 19 · Vite 8 · React Router 7 · TanStack Query 5 · Vitest 4 · Testing Library 16 · pnpm 11

### Decisiones técnicas

**Arquitectura en capas**

El código se divide en dos capas con separación explícita mediante alias de Vite (`@/core`, `@/ui`):

- `src/core/` — lógica de dominio sin dependencias de React: repositorio, servicio y cliente HTTP.
- `src/ui/` — capa de presentación: componentes, hooks, contextos y vistas.

La capa `ui` puede importar de `core`, nunca al revés.

**Repository pattern**

`itx-store-repository.js` centraliza el acceso a la API. El servicio no conoce el origen de los datos, lo que facilita el testing mediante mocks sin tocar los componentes.

**TanStack Query para estado del servidor**

Separa el estado del servidor (productos, detalle) del estado local (carrito, selección de color/storage). Gestiona caché, re-fetching y estados de carga sin boilerplate.

**Carrito con Context API**

Estado global simple con `CartProvider`. Persiste en `localStorage` para sobrevivir recargas.

**Tests unitarios con patrón Given/When/Then**

Todos los tests siguen el patrón GWT con comentarios explícitos. Se testean hooks, lógica de negocio, componentes y vistas con mocks de las dependencias externas.

### Por qué pnpm en lugar de npm

pnpm no ejecuta scripts `preinstall` y `postinstall` de dependencias transitivas por defecto, a diferencia de npm. Tras los recientes ataques a paquetes npm que usaban estos scripts para exfiltrar credenciales o instalar código malicioso en el momento de la instalación, pnpm ofrece una superficie de ataque significativamente menor. Además, su modelo de almacenamiento con enlaces simbólicos evita el acceso accidental a paquetes no declarados como dependencias directas.

### Inicio rápido

**Configuración del entorno:**

```bash
cp .env.example .env
```

```
VITE_API_BASE_URL=https://itx-frontend-test.onrender.com
```

**En local** (Node.js 22+ y pnpm 11+):

```bash
pnpm install
pnpm start        # http://localhost:5173
```

**En Docker:**

```bash
make start        # http://localhost:3000
make stop
make clean
```

### Comandos disponibles

| Comando | Descripción |
|---|---|
| `pnpm start` | Inicia el servidor de desarrollo |
| `pnpm build` | Genera la build de producción |
| `pnpm preview` | Previsualiza la build de producción |
| `pnpm test` | Ejecuta los tests y sale |
| `pnpm lint` | Analiza el código con ESLint |
| `make start` | Construye la imagen Docker y levanta el contenedor |
| `make test` | Ejecuta los tests dentro de Docker |
| `make stop` | Para y elimina el contenedor |
| `make clean` | Elimina contenedor e imagen |

### Testing

Los tests cubren:

- **Core:** `fetch`, repositorio y servicio (lógica de acceso a datos y casos de uso)
- **Componentes comunes:** `Header`, `Layout`, `BreadCrumb`, `CartIcon`, `Skeleton`
- **Contexto del carrito:** `CartProvider` y `useCart`
- **Hooks compartidos:** `useDocumentTitle`
- **Componentes de producto:** `Item`, `ItemsGrid`, `ItemImage`, `Search`, `Product`, `ProductSpecs`, `DetailsLayout`
- **Hooks de producto:** `useListProducts`, `useProductDetails`, `useProductActions`
- **Vistas:** `HomePage` y `DetailsPage`

```bash
pnpm test
make test   # dentro de Docker
```

---

## Solución 2 — AI Agent Driven

Carpeta [`aiAgentDriven/`](./aiAgentDriven/). La misma SPA, desarrollada íntegramente mediante una cuadrilla de agentes de IA orquestados por Claude Code.

### Motivación

El objetivo de esta segunda solución no es repetir el ejercicio, sino demostrar un flujo de trabajo agentic controlado y auditable: cómo delegar la implementación a agentes especializados manteniendo trazabilidad, calidad y criterio técnico.

### Cómo funciona

El proceso se gobierna con tres tipos de artefactos que viven en el repositorio:

**Ficheros de memoria** (`.claude/rules/`, `CLAUDE.md`): definen el stack, la arquitectura, las convenciones de código, la estrategia de testing y el workflow de validación. Los agentes los leen al inicio de cada tarea para alinearse con las decisiones ya tomadas.

**Especificaciones Gherkin** (`.claude/specs/*.feature`): cada hito tiene su propio fichero de escenarios en lenguaje natural. Actúan como contrato entre lo que se pide y lo que se implementa, sin necesidad de ejecutarlos como tests automatizados.

**Plan de implementación** (`plan.md`): divide el desarrollo en 6 hitos secuenciales con tareas, agentes responsables y checklist de validación. Ningún hito avanza sin pasar lint y tests.

### Cuadrilla de agentes

| Agente | Rol |
|---|---|
| Architect | Define estructura, patrones y decisiones técnicas |
| Frontend Developer | Implementa core y componentes |
| Designer | Aplica estilos y maquetación |
| Tester | Escribe y ejecuta tests unitarios |
| Auditor | Revisa calidad, lint y cobertura |
| Validator | Valida el resultado funcional antes de cerrar el hito |

### Inicio rápido

```bash
cd aiAgentDriven
cp .env.example .env   # VITE_API_BASE_URL=https://itx-frontend-test.onrender.com
pnpm install
pnpm start             # http://localhost:5173
pnpm test
pnpm lint
```
