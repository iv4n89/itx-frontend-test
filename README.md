# ITX Frontend Test

Este repositorio contiene la solución a la prueba técnica propuesta, cuyo enunciado puede encontrarse [aquí](./ITX-FrontEndTest1.pdf).

## Tecnologías

| Herramienta | Versión | Rol |
|---|---|---|
| React | 19 | UI |
| Vite | 8 | Bundler y dev server |
| React Router | 7 | Navegación SPA |
| TanStack Query | 5 | Fetching y caché de datos |
| Vitest | 4 | Tests unitarios |
| Testing Library | 16 | Utilidades de tests de componentes |
| pnpm | 11 | Gestor de paquetes |

## Decisiones técnicas

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

## Por qué pnpm en lugar de npm

pnpm no ejecuta scripts `preinstall` y `postinstall` de dependencias transitivas por defecto, a diferencia de npm. Tras los recientes ataques a paquetes npm que usaban estos scripts para exfiltrar credenciales o instalar código malicioso en el momento de la instalación, pnpm ofrece una superficie de ataque significativamente menor. Además, su modelo de almacenamiento con enlaces simbólicos evita el acceso accidental a paquetes no declarados como dependencias directas.

## Inicio rápido

### Configuración del entorno

Copia el fichero de variables de entorno:

```bash
cp .env.example .env
```

El único valor configurable es la URL de la API:

```
VITE_API_BASE_URL=https://itx-frontend-test.onrender.com
```

---

### En local

**Requisitos:** Node.js 22+ y pnpm 11+.

```bash
pnpm install
pnpm start
```

La aplicación estará disponible en `http://localhost:5173`.

---

### En Docker

**Con Makefile:**

```bash
# Construir imagen y levantar contenedor en http://localhost:3000
make start

# Parar y eliminar el contenedor
make stop

# Eliminar contenedor e imagen
make clean
```

**Sin Makefile:**

```bash
# Build
docker build -t itx-frontend-test .

# Run
docker run -d -p 3000:80 --name itx-frontend-test-app itx-frontend-test
```

La aplicación estará disponible en `http://localhost:3000`.

---

## Comandos disponibles

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

## Testing

Los tests cubren:

- **Core:** `fetch`, repositorio y servicio (lógica de acceso a datos y casos de uso)
- **Componentes comunes:** `Header`, `Layout`, `BreadCrumb`, `CartIcon`, `Skeleton`
- **Contexto del carrito:** `CartProvider` y `useCart`
- **Hooks compartidos:** `useDocumentTitle`
- **Componentes de producto:** `Item`, `ItemsGrid`, `ItemImage`, `Search`, `Product`, `ProductSpecs`, `DetailsLayout`
- **Hooks de producto:** `useListProducts`, `useProductDetails`, `useProductActions`
- **Vistas:** `HomePage` y `DetailsPage`

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar tests en Docker
make test
```
