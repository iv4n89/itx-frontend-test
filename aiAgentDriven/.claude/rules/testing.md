# Testing

## Stack

- **Vitest 4** — runner
- **jsdom** — entorno de DOM para tests de componentes
- **@testing-library/react 16** — utilidades de render y queries
- **@testing-library/jest-dom** — matchers adicionales (`toBeInTheDocument`, etc.)
- **@testing-library/user-event 14** — simulación de interacciones de usuario

## Setup (`src/test/setup.js`)

```js
import "@testing-library/jest-dom";

class LocalStorageMock {
  #store = {};
  getItem(key) { return this.#store[key] ?? null; }
  setItem(key, value) { this.#store[key] = String(value); }
  removeItem(key) { delete this.#store[key]; }
  clear() { this.#store = {}; }
  get length() { return Object.keys(this.#store).length; }
  key(index) { return Object.keys(this.#store)[index] ?? null; }
}

globalThis.localStorage = new LocalStorageMock();
```

El mock de `localStorage` es necesario porque Node 22 incluye un `localStorage` experimental que entra en conflicto con el de jsdom.

## Patrón Given/When/Then

Todos los tests siguen GWT con comentarios explícitos:

```js
it("filtra productos por marca", () => {
  // given
  const products = [
    { brand: "Apple", model: "iPhone 14", price: "999" },
    { brand: "Samsung", model: "Galaxy S22", price: "799" },
  ];

  // when
  const result = filterProducts(products, "apple");

  // then
  expect(result).toHaveLength(1);
  expect(result[0].brand).toBe("Apple");
});
```

No añadir más comentarios que `// given`, `// when`, `// then`. Los tests deben ser autoexplicativos.

## Qué testear

| Capa | Qué | Cómo |
|---|---|---|
| `core/common/fetch` | fetch exitoso, fetch fallido, headers | vi.stubGlobal("fetch", ...) |
| `core/itx-store/repository` | llamadas a los endpoints correctos | mock de fetch |
| `core/itx-store/service` | filtrado por marca/modelo, casos borde | datos de prueba |
| `ui/common/components` | renderizado, interacciones | render + screen + userEvent |
| `ui/common/context/cart` | estado inicial, addToCart, persistencia | renderHook + act |
| `ui/itx-store/hooks` | estado inicial, selección automática, envío | renderHook + vi.mock |
| `ui/itx-store/components` | renderizado con props, interacciones | render + screen |
| Vistas (home, details) | integración de componentes y hooks | render con wrappers |

## Mocks

```js
// Mock de módulo completo
vi.mock("@/core/itx-store/itx-store-service");

// Mock de fetch global
vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ data: "value" }),
}));
```

## Wrappers necesarios

Componentes que usan `useCart` necesitan `CartProvider`. Componentes con `Link` o `useLocation` necesitan `MemoryRouter`. Componentes con `Outlet` necesitan `createMemoryRouter` + `RouterProvider`.

```js
// Wrapper para componentes que usan CartProvider + Router
const wrapper = ({ children }) => (
  <CartProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </CartProvider>
);
```

## Inputs controlados

Para inputs con `value` controlado, usar `fireEvent.change` en lugar de `userEvent.type`:

```js
fireEvent.change(input, { target: { value: "samsung" } });
```

## Script de test

```bash
pnpm test   # ejecuta y sale (vitest run)
```

No usar `vitest` sin `run` como script por defecto: se queda en modo watch.
