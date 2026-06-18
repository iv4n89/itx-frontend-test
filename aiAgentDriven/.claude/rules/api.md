# API y persistencia

## Base URL

```
https://itx-frontend-test.onrender.com
```

Guardarlo en `.env` como `VITE_API_BASE_URL`.

## Endpoints

### GET /api/product

Lista todos los productos.

```js
// Response: array de productos
[{ id, brand, model, price, imgUrl, ... }]
```

### GET /api/product/:id

Detalle de un producto.

```js
// Response
{
  id, brand, model, price, imgUrl,
  cpu, ram, os, displayResolution, battery,
  primaryCamera, secondaryCmera, dimentions, weight,
  options: {
    colors: [{ code, name }],
    storages: [{ code, name }]
  }
}
```

### POST /api/cart

Añadir producto al carrito.

```js
// Body
{ id, colorCode, storageCode }

// Response
{ count: 1 }
```

El `count` devuelto es el total de items en el carrito. Se debe persistir en `CartContext` y mostrarlo en el `Header`.

## Caché

Usar **TanStack Query** con `@tanstack/react-query-persist-client` y `@tanstack/query-async-storage-persister`.

Configuración:
- `staleTime`: 1 hora (`1000 * 60 * 60`)
- `gcTime`: 1 hora
- Persister: `createAsyncStoragePersister` sobre `localStorage`

Cuando los datos están en caché y son frescos (< 1h), no se hace petición a la API.

```js
// Ejemplo de configuración del QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60,
    },
  },
});
```

## Carrito

El `count` del carrito se persiste en `localStorage` (clave `cart-count`) para que sobreviva recargas.

`CartProvider` lee el valor al montar y lo expone mediante `useCart`:

```js
// useCart devuelve
{ cartCount, addToCart }
// addToCart(id, colorCode, storageCode) llama a POST /api/cart y actualiza cartCount
```

## Selección automática en PDP

Si un producto tiene solo un color o solo un tamaño de almacenamiento, ese valor debe quedar seleccionado por defecto al cargar la página de detalle. `useProductActions` gestiona este comportamiento.

## Filtrado (PLP)

El filtrado es client-side sobre los datos ya cacheados. `itx-store-service.js` expone una función que filtra por `brand` y `model` (case-insensitive). No se hace ninguna petición adicional al API para filtrar.
