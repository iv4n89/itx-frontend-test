# Plan de implementación — ITX Frontend Test (AI Agent Driven)

## Lectura obligatoria antes de ejecutar

- `CLAUDE.md` — stack, arquitectura, scripts, restricciones
- `agents.md` — roles, responsabilidades, pipeline
- `.claude/rules/architecture.md` — estructura de carpetas, patrones, convenciones
- `.claude/rules/api.md` — endpoints, caché, persistencia carrito
- `.claude/rules/testing.md` — setup vitest, patrón GWT, mocks
- `.claude/rules/workflow.md` — validación obligatoria por tarea, lint, comentarios

## Principios del plan

- Cada hito es un commit independiente y funcional.
- Los tests se escriben en el mismo hito que la implementación, no al final.
- Ningún hito cierra sin pasar el checklist completo: `pnpm lint` → `pnpm test` → validación funcional.
- Los agentes siguen el pipeline: **Developer → Designer → Tester → Auditor → Validator**.
- El Architect interviene solo cuando hay una decisión de diseño no cubierta en `CLAUDE.md`.

---

## Hito 1 — Scaffolding y configuración

**Commit**: `feat: initial project setup`

**Agentes**: Architect + Developer + Auditor + Validator

### Tareas

**1.1 — Inicializar el proyecto**

Crear el proyecto con Vite usando la plantilla React:

```bash
pnpm create vite . --template react
```

**1.2 — Instalar dependencias**

```bash
pnpm add react-router @tanstack/react-query @tanstack/react-query-persist-client @tanstack/query-async-storage-persister
pnpm add -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**1.3 — Configurar `package.json`**

Scripts obligatorios exactos:

```json
{
  "start": "vite",
  "build": "vite build",
  "test": "vitest run",
  "lint": "eslint ."
}
```

**1.4 — Configurar `vite.config.js`**

Alias de path `@/core` y `@/ui`. Entorno de test `jsdom` con `url: "http://localhost"`. `setupFiles: "./src/test/setup.js"`. Alias replicados en la sección `test`.

**1.5 — Configurar `eslint.config.js`**

Usar `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`. Solo ficheros `.js` y `.jsx`. Sin TypeScript.

**1.6 — Crear `.env.example`**

```
VITE_API_BASE_URL=https://itx-frontend-test.onrender.com
```

**1.7 — Crear la estructura de carpetas vacía**

```
src/
  core/
    common/
    itx-store/
  ui/
    common/
      components/
      context/
      hooks/
    itx-store/
      components/
      hooks/
      views/
  test/
    setup.js
```

**1.8 — Crear `src/test/setup.js`**

Importar `@testing-library/jest-dom`. Añadir `LocalStorageMock` como `globalThis.localStorage` (workaround necesario: Node 22 experimental localStorage conflicts with jsdom).

**1.9 — `main.jsx` y `App.jsx` mínimos**

`main.jsx` monta `<App />`. `App.jsx` solo devuelve `null` o un placeholder. Se completará en Hito 3.

**1.10 — README.md inicial**

Incluir: descripción del proyecto (link al enunciado PDF), tecnologías, cómo ejecutar (start, build, test, lint), variable de entorno necesaria.

### Validación del Hito 1

| Check | Comando / acción | Resultado esperado |
|---|---|---|
| Lint | `pnpm lint` | Sin errores |
| Arranque | `pnpm start` | App vacía en `localhost:5173` sin errores de consola |
| Build | `pnpm build` | Sin errores, carpeta `dist/` generada |
| Tests | `pnpm test` | 0 tests, 0 errores |

---

## Hito 2 — Capa core: acceso a datos

**Commit**: `feat: core data layer`

**Agentes**: Developer + Tester + Auditor + Validator

### Tareas

**2.1 — `src/core/common/fetch.js`**

Función `apiFetch(path)` que construye la URL completa usando `import.meta.env.VITE_API_BASE_URL`, llama a `fetch` nativo y devuelve el JSON. Sin manejo de errores para casos que no pueden ocurrir.

**2.2 — `src/core/itx-store/itx-store-repository.js`**

Tres funciones que usan `apiFetch`:

- `fetchProducts()` → `GET /api/product`
- `fetchProduct(id)` → `GET /api/product/:id`
- `addToCart({ id, colorCode, storageCode })` → `POST /api/cart` con body JSON

**2.3 — `src/core/itx-store/itx-store-service.js`**

Una función:

- `filterProducts(products, query)` → filtra el array por `brand` y `model` (case-insensitive). Si `query` está vacío devuelve todos.

### Tests del Hito 2

**`src/core/common/fetch.test.js`**

- Construye la URL correcta con la base URL del env
- Devuelve el JSON parseado en una respuesta exitosa
- Propaga el error si `fetch` falla

**`src/core/itx-store/itx-store-repository.test.js`**

- `fetchProducts` llama a `GET /api/product`
- `fetchProduct` llama a `GET /api/product/:id` con el id correcto
- `addToCart` llama a `POST /api/cart` con el body `{ id, colorCode, storageCode }`

**`src/core/itx-store/itx-store-service.test.js`**

- Devuelve todos los productos cuando `query` está vacío
- Filtra por `brand` (case-insensitive)
- Filtra por `model` (case-insensitive)
- Devuelve array vacío cuando ningún producto coincide
- No modifica el array original

Todos los tests usan patrón GWT con `// given`, `// when`, `// then`. Fetch se mockea con `vi.stubGlobal`.

### Validación del Hito 2

| Check | Resultado esperado |
|---|---|
| `pnpm lint` | Sin errores |
| `pnpm test` | Todos los tests del core en verde |
| Manual | `curl https://itx-frontend-test.onrender.com/api/product` devuelve array de productos |

---

## Hito 3 — Shell de la aplicación

**Commit**: `feat: app shell`

**Agentes**: Developer + Designer + Tester + Auditor + Validator

### Tareas

**3.1 — Configurar TanStack Query en `main.jsx`**

Crear `QueryClient` con `staleTime` y `gcTime` de 1 hora. Envolver la app con `PersistQueryClientProvider` usando `createAsyncStoragePersister` sobre `localStorage`. Envolver también con `CartProvider`.

**3.2 — `src/ui/common/context/cart-context/`**

Ficheros: `cart-context.js`, `cart-context-provider.jsx`, `use-cart.js`.

- `CartContext` con valor `{ cartCount, setCartCount }`
- `CartProvider` lee `cart-count` de `localStorage` al montar. Persiste `cartCount` en `localStorage` en cada cambio.
- `useCart` devuelve `{ cartCount, addToCart }`. `addToCart(id, colorCode, storageCode)` llama a `addToCart` del repositorio, recibe `{ count }` y actualiza `cartCount`.

**3.3 — Enrutado en `App.jsx`**

`createBrowserRouter` con dos rutas:
- `/` → `HomeView` (componente vacío de momento, se completará en Hito 4)
- `/product/:id` → `DetailsView` (componente vacío de momento, se completará en Hito 5)

Ambas rutas dentro de `Layout`.

**3.4 — `src/ui/common/components/layout/layout.jsx`**

Renderiza `<Header />` y `<Outlet />`. Sin lógica.

**3.5 — `src/ui/common/components/breadcrumb/breadcrumb.jsx`**

Recibe `items: [{ label, to }]`. Renderiza cada item como `<Link>` separado por `>`. El último item no es link (página actual).

**3.6 — `src/ui/common/components/cart-icon/cart-icon.jsx`**

Recibe `count` como prop. Renderiza el número de items del carrito. Si `count` es 0, puede no mostrarse o mostrar `0`.

**3.7 — `src/ui/common/components/header/header.jsx`**

- Título/icono como `<Link to="/">` (enlace a inicio)
- `<BreadCrumb>` con los items de la ruta actual (usando `useLocation` para inferirlos)
- `<CartIcon count={cartCount} />` usando `useCart`

**3.8 — `src/ui/common/hooks/use-document-title/use-document-title.js`**

Hook que actualiza `document.title` cuando recibe un nuevo título.

**3.9 — `src/ui/common/components/skeleton/skeleton.jsx`**

Componente de placeholder de carga. Acepta `className` para personalizar dimensiones.

**3.10 — Estilos base (Designer)**

- `src/index.css`: reset, variables CSS (colores, tipografía, espaciados)
- `header.css`: layout horizontal, posición del breadcrumb y cart icon
- `layout.css`: estructura principal de página

### Tests del Hito 3

**`cart-context-provider.test.jsx`**: CartProvider inicializa cartCount desde localStorage; persiste el valor al cambiar.

**`use-cart-context.test.jsx`**: `useCart` devuelve `{ cartCount, addToCart }`; `addToCart` llama al repositorio y actualiza el count.

**`header.test.jsx`**: renderiza el título como link a `/`; renderiza CartIcon con el count actual; necesita `CartProvider` + `MemoryRouter`.

**`layout.test.jsx`**: renderiza Header y el contenido del Outlet; necesita `CartProvider` + `createMemoryRouter`.

**`breadcrumb.test.jsx`**: renderiza todos los items; el último no es link; muestra separadores.

**`cart-icon.test.jsx`**: muestra el count recibido por prop.

**`skeleton.test.jsx`**: renderiza con la clase `skeleton`; acepta `className` adicional.

**`use-document-title.test.js`**: actualiza `document.title` al llamar al hook.

### Validación del Hito 3

| Check | Resultado esperado |
|---|---|
| `pnpm lint` | Sin errores |
| `pnpm test` | Todos los tests del hito en verde |
| Manual | `pnpm start` → app con header visible, breadcrumb y carrito en `0` |

---

## Hito 4 — PLP: Product List Page

**Commit**: `feat: product list page`

**Agentes**: Developer + Designer + Tester + Auditor + Validator

### Tareas

**4.1 — `src/ui/itx-store/hooks/use-list-products/use-list-products.js`**

Usa `useQuery` con `queryKey: ["products"]` y `queryFn: fetchProducts`. Devuelve `{ products, isLoading, isError }`.

**4.2 — `src/ui/itx-store/hooks/use-search/use-search.js`**

Estado local `query`. Devuelve `{ query, setQuery, filteredProducts }`. Llama a `filterProducts(products, query)` del servicio.

**4.3 — `src/ui/itx-store/components/search/search.jsx`**

Input controlado. Llama a `onSearch(value)` en cada cambio (`onChange`). No tiene estado propio: recibe `value` y `onSearch` por props.

**4.4 — `src/ui/itx-store/components/item/item.jsx`**

Recibe `{ id, brand, model, price, imgUrl }`. Renderiza imagen, marca, modelo y precio. Al hacer click navega a `/product/:id` usando `<Link>` o `useNavigate`.

**4.5 — `src/ui/itx-store/components/items-grid/items-grid.jsx`**

Recibe `products` array. Renderiza un `<Item>` por cada producto. Si `isLoading`, renderiza skeletons.

**4.6 — `src/ui/itx-store/views/home.jsx`**

Orquesta la vista: usa `useListProducts` y `useSearch`. Actualiza `document.title` con `useDocumentTitle`. Renderiza `<Search>` e `<ItemsGrid>`.

**4.7 — Estilos de la PLP (Designer)**

- Grid CSS: `display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))` con máx. 4 columnas. Se adapta a resoluciones menores reduciendo columnas.
- Item card: imagen a full width, marca/modelo/precio debajo, cursor pointer, hover sutil.
- Search input: full width o alineado a la derecha de la fila, con borde y padding.
- Skeleton: fondo gris animado con `@keyframes` pulse.

### Tests del Hito 4

**`use-list-products.test.jsx`**: devuelve productos cuando la query tiene éxito; devuelve `isLoading: true` al inicio; mockea `useQuery`.

**`use-search.test.js`**: `filteredProducts` devuelve todos con query vacío; filtra correctamente; `setQuery` actualiza el filtro.

**`search.test.jsx`**: renderiza el input; llama a `onSearch` al cambiar el valor; usa `fireEvent.change`.

**`item.test.jsx`**: renderiza imagen, marca, modelo, precio; el link apunta a `/product/:id`.

**`items-grid.test.jsx`**: renderiza un Item por producto; renderiza skeletons cuando `isLoading`.

**`home.test.jsx`**: renderiza el Search y el ItemsGrid; el filtrado en tiempo real actualiza los items visibles.

### Validación del Hito 4

| Check | Resultado esperado |
|---|---|
| `pnpm lint` | Sin errores |
| `pnpm test` | Todos los tests del hito en verde |
| Manual | PLP carga los productos desde la API; escribir en el search filtra en tiempo real; la segunda carga dentro de 1h no hace petición de red (verificar en DevTools → Network) |

---

## Hito 5 — PDP: Product Details Page

**Commit**: `feat: product details page`

**Agentes**: Developer + Designer + Tester + Auditor + Validator

### Tareas

**5.1 — `src/ui/itx-store/hooks/use-product-details/use-product-details.js`**

Usa `useQuery` con `queryKey: ["product", id]` y `queryFn: () => fetchProduct(id)`. Devuelve `{ product, isLoading, isError }`.

**5.2 — `src/ui/itx-store/hooks/use-product-actions/use-product-actions.js`**

Recibe `product`. Gestiona:
- `selectedColor`: inicializado al `code` del primer color si solo hay uno, `null` si hay varios.
- `selectedStorage`: inicializado al `code` del primer storage si solo hay uno, `null` si hay varios.
- `handleColorSelect(code)` y `handleStorageSelect(code)`: actualizan la selección.
- `handleAddToCart()`: llama a `addToCart` del `useCart` con `{ id: product.id, colorCode: selectedColor, storageCode: selectedStorage }`.

**5.3 — `src/ui/itx-store/components/item-image/item-image.jsx`**

Recibe `imgUrl` y `alt`. Renderiza la imagen del producto.

**5.4 — `src/ui/itx-store/components/product-specs/product-specs.jsx`**

Recibe `data` (objeto con los campos del producto). Renderiza una lista de los atributos presentes. Campos mínimos obligatorios según el enunciado: `brand`, `model`, `price`, `cpu`, `ram`, `os`, `displayResolution`, `battery`, `primaryCamera`, `secondaryCmera`, `dimentions`, `weight`. Los campos ausentes no se renderizan. Peso muestra sufijo `g`.

**5.5 — `src/ui/itx-store/components/actions/actions.jsx`**

Recibe `colors`, `storages`, `selectedColor`, `selectedStorage`, `onColorSelect`, `onStorageSelect`, `onAddToCart`.

- Renderiza botones para cada color (mostrando el nombre, misma apariencia que storage).
- Renderiza botones para cada storage (mostrando el nombre).
- El botón seleccionado tiene clase `selected` o similar.
- Botón "Añadir al carrito" llama a `onAddToCart`.

**5.6 — `src/ui/itx-store/components/product/product.jsx`**

Compone `<ProductSpecs>` y `<Actions>`, pasando los datos y handlers recibidos por props. Sin lógica propia.

**5.7 — `src/ui/itx-store/components/details-layout/details-layout.jsx`**

Layout dos columnas: columna izquierda para `<ItemImage>`, columna derecha para `<Product>` (specs + actions). Incluye el link "Volver al listado" (`<Link to="/">`).

**5.8 — `src/ui/itx-store/views/details.jsx`**

Orquesta la vista: lee `id` de `useParams`. Usa `useProductDetails(id)` y `useProductActions(product)`. Actualiza `document.title`. Renderiza `<DetailsLayout>`.

**5.9 — Estilos de la PDP (Designer)**

- Layout dos columnas: `display: grid; grid-template-columns: 1fr 1fr`. En móvil, una columna.
- Imagen centrada en su columna.
- Spec list: lista limpia, sin bullets excesivos, label + valor.
- Botones de selección: estilo consistente para color y storage. Estado `selected` marcado visualmente.
- Botón "Añadir al carrito": destacado, full width o anchura razonable.
- Link "Volver": visible, con flecha o indicador de navegación.

### Tests del Hito 5

**`use-product-details.test.jsx`**: devuelve el producto cuando la query tiene éxito; devuelve `isLoading: true` al inicio.

**`use-product-actions.test.jsx`**:
- Auto-selecciona color si solo hay uno.
- Auto-selecciona storage si solo hay uno.
- No auto-selecciona si hay varios.
- `handleColorSelect` actualiza `selectedColor`.
- `handleStorageSelect` actualiza `selectedStorage`.
- `handleAddToCart` llama a `addToCart` con `{ id, colorCode, storageCode }`.

**`item-image.test.jsx`**: renderiza la imagen con el `src` y `alt` correctos.

**`product-specs.test.jsx`**: renderiza los atributos presentes; no renderiza los ausentes; muestra sufijo `g` en peso.

**`actions.test.jsx`**: renderiza botones de color y storage; el botón seleccionado tiene clase `selected`; el botón de añadir llama a `onAddToCart`.

**`product.test.jsx`**: renderiza `ProductSpecs` y `Actions` con las props correctas.

**`details-layout.test.jsx`**: renderiza imagen y producto; renderiza el link de vuelta a `/`.

**`details.test.jsx`**: renderiza el layout completo con datos mockeados; el título del documento se actualiza.

### Validación del Hito 5

| Check | Resultado esperado |
|---|---|
| `pnpm lint` | Sin errores |
| `pnpm test` | Todos los tests del hito en verde |
| Manual: navegación | Hacer click en un producto de la PLP navega a la PDP correcta |
| Manual: auto-select | Si el producto tiene un solo color/storage, aparece preseleccionado |
| Manual: carrito | Seleccionar color + storage y hacer click en "Añadir" actualiza el contador del Header |
| Manual: persistencia carrito | Recargar la página mantiene el contador del carrito |
| Manual: caché | Navegar a una PDP ya visitada dentro de 1h no lanza petición al API (DevTools → Network) |
| Manual: volver | El link "Volver al listado" navega a `/` |

---

## Hito 6 — Auditoría final y cierre

**Commit**: `feat: final audit and polish`

**Agentes**: Auditor + Validator (+ Developer si se detectan issues)

### Tareas

**6.1 — Auditoría completa (Auditor)**

- `pnpm lint` sobre todo el proyecto. Corregir cualquier error o warning.
- Revisar todos los ficheros en busca de:
  - Comentarios que describen qué hace el código → eliminar
  - Comentarios en español → traducir al inglés o eliminar
  - Nombres de variables o funciones poco descriptivos → renombrar
  - Funciones con más de una responsabilidad → refactorizar solo si es obvio
  - Imports de `ui/` dentro de `core/` → corregir
  - Código muerto (variables no usadas, imports no usados) → eliminar
- Verificar que los cuatro scripts (`start`, `build`, `test`, `lint`) están presentes en `package.json`.

**6.2 — Validación funcional completa (Validator)**

Ejecutar `pnpm start` y validar manualmente:

| Escenario | Resultado esperado |
|---|---|
| Cargar `/` | PLP con todos los productos en grid de hasta 4 columnas |
| Escribir en Search | Productos filtrados en tiempo real por marca o modelo |
| Borrar el Search | Todos los productos vuelven a aparecer |
| Click en un producto | Navega a `/product/:id` |
| PDP cargada | Dos columnas: imagen a la izquierda, specs + acciones a la derecha |
| Un solo color/storage | Aparece preseleccionado |
| Varios colores/storages | Ninguno preseleccionado; seleccionar uno lo marca |
| Click "Añadir al carrito" | El contador del Header se incrementa |
| Recargar la página | El contador del carrito sigue con el valor anterior |
| Segunda visita a PDP en < 1h | Sin petición de red (cache hit) |
| Reducir la ventana a móvil | PLP pasa a 1-2 columnas; PDP pasa a una columna |
| Título del Header | Actúa como link a `/` |
| Breadcrumb | Muestra la ruta actual y permite navegar |

**6.3 — `pnpm build` limpio**

`pnpm build` termina sin errores. La carpeta `dist/` se genera correctamente.

**6.4 — README.md final**

Verificar que el README contiene:
- Descripción + link al enunciado PDF
- Tabla de tecnologías
- Instrucciones para ejecutar: `pnpm install`, `cp .env.example .env`, `pnpm start`
- Los cuatro scripts y su uso
- Sección de testing con `pnpm test`
- Decisiones técnicas relevantes

### Criterio de cierre del Hito 6

El proyecto está listo cuando:

- [ ] `pnpm lint` pasa sin errores ni warnings
- [ ] `pnpm test` pasa con todos los tests en verde
- [ ] `pnpm build` termina sin errores
- [ ] Todos los escenarios de la tabla de validación funcional se cumplen
- [ ] El README está completo y permite arrancar el proyecto desde cero

---

## Resumen de hitos y commits

| Hito | Commit | Contenido principal |
|---|---|---|
| 1 | `feat: initial project setup` | Scaffolding, config, README |
| 2 | `feat: core data layer` | fetch, repository, service + tests |
| 3 | `feat: app shell` | Router, Layout, Header, CartContext, cache config + tests |
| 4 | `feat: product list page` | PLP completa: grid, search, item + tests + estilos |
| 5 | `feat: product details page` | PDP completa: specs, actions, carrito + tests + estilos |
| 6 | `feat: final audit and polish` | Auditoría lint, validación funcional, README final |

---

## Dependencias entre hitos

```
Hito 1 (scaffolding)
    │
    ▼
Hito 2 (core)
    │
    ▼
Hito 3 (shell)       ← necesita CartContext antes de PLP y PDP
    │
    ├──▶ Hito 4 (PLP)
    │
    └──▶ Hito 5 (PDP)   ← puede desarrollarse en paralelo con Hito 4
              │
              ▼
         Hito 6 (auditoría final)
```

Hitos 4 y 5 pueden desarrollarse en paralelo una vez el Hito 3 está cerrado.
