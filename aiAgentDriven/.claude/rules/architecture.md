# Arquitectura

## Estructura de carpetas

```
src/
  core/
    common/
      fetch.js                  — cliente HTTP base (wrapper de fetch nativo)
      cache.js                  — lógica de caché con TTL
    itx-store/
      itx-store-repository.js   — acceso a la API (sin lógica de negocio)
      itx-store-service.js      — casos de uso (filtrando, transformando)
  ui/
    common/
      components/
        header/
        breadcrumb/
        cart-icon/
        layout/
        skeleton/
      context/
        cart-context/            — CartProvider + useCart
      hooks/
        use-document-title/
    itx-store/
      components/
        item/
        items-grid/
        item-image/
        search/
        product/
        product-specs/
        actions/
        details-layout/
      hooks/
        use-list-products/
        use-product-details/
        use-product-actions/
        use-search/
      views/
        home.jsx                 — PLP
        details.jsx              — PDP
  test/
    setup.js
  main.jsx
  App.jsx
```

## Convenciones de nombrado

- Carpetas y ficheros: kebab-case (`product-specs/`, `use-cart.js`)
- Componentes: PascalCase en el JSX, kebab-case en el fichero (`ProductSpecs` en `product-specs.jsx`)
- Hooks: `use-` prefix, camelCase en el nombre de la función (`useProductDetails`)
- Exportaciones nombradas, no default (salvo `App` y `main`)

## Patrones de diseño

**Repository pattern**: el repositorio solo hace fetch y devuelve los datos crudos. El servicio transforma y filtra. Los hooks de React consumen el servicio.

**Container/Presenter**: los hooks contienen la lógica, los componentes solo renderizan.

**Provider pattern**: `CartProvider` envuelve la app, expone `useCart`. No usar prop drilling para el carrito.

**Separación de capas**:
- `core/` no importa nada de `ui/`, React ni del DOM
- `ui/` usa los alias `@/core` y `@/ui` para importar entre capas
- Los componentes no llaman directamente a la API; lo hacen a través de hooks que usan el servicio

## vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/core": path.resolve(__dirname, "src/core"),
      "@/ui": path.resolve(__dirname, "src/ui"),
    },
  },
  test: {
    environment: "jsdom",
    environmentOptions: { jsdom: { url: "http://localhost" } },
    globals: true,
    setupFiles: "./src/test/setup.js",
    alias: {
      "@/core": path.resolve(__dirname, "src/core"),
      "@/ui": path.resolve(__dirname, "src/ui"),
    },
  },
});
```

## Enrutado

React Router 7 con `createBrowserRouter`. Dos rutas:

```js
// /        → HomeView (PLP)
// /product/:id → DetailsView (PDP)
```

El `Layout` actúa como shell (Header + `<Outlet />`).

## Estado global

- **Carrito**: `CartContext` con `CartProvider`. Persiste el `count` en `localStorage`.
- **Estado del servidor**: TanStack Query. No usar useState/useEffect para fetching.
