# ITX Frontend Test — AI Agent Driven

Mini-aplicación SPA para comprar dispositivos móviles. Esta solución es generada íntegramente mediante agentes de IA (Claude Code).

Enunciado de la prueba: `../ITX-FrontEndTest1.pdf`

---

## Stack tecnológico

| Herramienta | Versión | Rol |
|---|---|---|
| React | 19 | UI |
| Vite | 8 | Bundler y dev server |
| React Router | 7 | Enrutado SPA client-side |
| TanStack Query | 5 | Fetching, caché y persistencia |
| Vitest | 4 | Tests unitarios |
| Testing Library | 16 | Utilidades de test de componentes |
| pnpm | 11 | Gestor de paquetes |

**Lenguaje: JavaScript ES6+. No TypeScript.**

---

## Scripts obligatorios

```json
{
  "start": "vite",
  "build": "vite build",
  "test": "vitest run",
  "lint": "eslint ."
}
```

---

## Arquitectura

Dos capas con separación estricta mediante alias de Vite:

```
src/
  core/         — lógica de dominio, sin dependencias de React
    common/     — fetch, cache
    itx-store/  — repository, service
  ui/           — presentación
    common/     — layout, header, breadcrumb, cart context
    itx-store/  — componentes, hooks, vistas
  test/
    setup.js    — jest-dom + localStorage mock
```

**Regla de capas:** `ui` puede importar de `core`. `core` nunca importa de `ui`.

Alias de path:
- `@/core` → `src/core`
- `@/ui` → `src/ui`

Ver detalles en `.claude/rules/architecture.md`.

---

## Vistas

**PLP — Product List Page** (`/`)
- Grid de productos (máx. 4 por fila, responsivo)
- Búsqueda en tiempo real por marca y modelo
- Click en producto navega a PDP

**PDP — Product Details Page** (`/product/:id`)
- Dos columnas: imagen | descripción + acciones
- Link para volver al listado
- Selector de color y almacenamiento
- Botón añadir al carrito

---

## Componentes requeridos

| Componente | Ubicación | Responsabilidad |
|---|---|---|
| Header | `ui/common` | Título (link a inicio), breadcrumb, contador carrito |
| Search | `ui/itx-store` | Input con filtrado en tiempo real |
| Item | `ui/itx-store` | Imagen, marca, modelo, precio |
| ItemImage | `ui/itx-store` | Imagen del producto en PDP |
| ProductSpecs | `ui/itx-store` | Atributos del producto |
| Actions | `ui/itx-store` | Selectores color/storage + botón añadir |
| CartIcon | `ui/common` | Contador de items en carrito |

---

## Caché y persistencia

- Caché de respuestas API con TTL de 1 hora (TanStack Query + persister)
- Contador del carrito persiste entre recargas (localStorage via CartContext)
- Ver detalles en `.claude/rules/api.md`

---

## Código

- Referencia: *Clean Code* (Robert C. Martin)
- Nombres significativos, funciones pequeñas, sin abstracciones anticipadas
- Sin comentarios salvo que el WHY sea no obvio; si se necesitan, en inglés
- Sin manejo de errores para escenarios que no pueden ocurrir
- Sin features, refactors ni dependencias más allá de lo pedido
- Ficheros `.jsx` para componentes React, `.js` para el resto

---

## Tests

- Patrón Given/When/Then con comentarios explícitos `// given`, `// when`, `// then`
- Cubrir: core (fetch, repository, service), hooks y componentes de ui
- Ver detalles en `.claude/rules/testing.md`

---

## Workflow de desarrollo

Ninguna tarea se cierra sin validación demostrable. Antes de dar por buena cualquier tarea:

1. `pnpm lint` — sin errores
2. Código correctamente formateado
3. `pnpm test` — todos los tests pasan
4. Validación funcional (automática o manual con output en la conversación)

Ver detalles en `.claude/rules/workflow.md`.

---

## Reglas adicionales

- `.claude/rules/architecture.md` — estructura, patrones, convenciones
- `.claude/rules/api.md` — endpoints, caché, carrito
- `.claude/rules/testing.md` — setup vitest, patrón GWT, estrategia de mocks
- `.claude/rules/workflow.md` — validación por tarea, lint, comentarios
