# ITX Frontend Test

Este repositorio contiene la solución a la prueba técnica propuesta, cuyo enunciado puede encontrarse [aquí](./ITX-FrontEndTest1.pdf).

Consiste en una mini-aplicación SPA para comprar dispositivos móviles, con listado de productos, búsqueda en tiempo real, detalle de producto y gestión de carrito persistido en cliente.

Esta solución ha sido desarrollada íntegramente mediante agentes de IA (Claude Code), siguiendo un flujo de trabajo estructurado con especificaciones en formato Gherkin, plan de hitos y roles de agente diferenciados.

## Tecnologías

| Herramienta | Versión | Rol |
|---|---|---|
| React | 19 | UI |
| Vite | 8 | Bundler y dev server |
| React Router | 7 | Enrutado SPA client-side |
| TanStack Query | 5 | Fetching, caché y persistencia |
| Vitest | 4 | Tests unitarios |
| Testing Library | 16 | Utilidades de test de componentes |
| pnpm | 11 | Gestor de paquetes |

## Inicio rápido

```bash
cp .env.example .env
pnpm install
pnpm start
```

La aplicación estará disponible en `http://localhost:5173`.

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `pnpm start` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm test` | Ejecuta los tests y sale |
| `pnpm lint` | Analiza el código con ESLint |
| `pnpm preview` | Previsualiza el build de producción |

## Testing

Los tests siguen el patrón Given/When/Then y cubren la capa core (fetch, repositorio, servicio) y la capa de presentación (hooks, componentes, vistas).

```bash
pnpm test
```

## Decisiones técnicas

**Arquitectura en capas** — `src/core/` contiene la lógica de dominio sin dependencias de React. `src/ui/` contiene la presentación. La capa `ui` puede importar de `core`, nunca al revés.

**TanStack Query con persistencia** — gestiona el estado del servidor con caché de 1 hora sobre localStorage. Las respuestas de la API no se vuelven a pedir hasta que expire la caché.

**Carrito persistido** — el contador del carrito se guarda en localStorage y sobrevive recargas de página.

**JavaScript ES6+** — sin TypeScript, tal como indica el enunciado.
