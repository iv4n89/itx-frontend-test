# Workflow de desarrollo

## Validación obligatoria por tarea

Ninguna tarea se da por finalizada sin validación demostrable. La validación puede ser:

- **Automática**: tests unitarios que cubran los casos relevantes de la tarea (`pnpm test` pasa sin errores).
- **Manual**: salida de comandos curl/playwright/browser que demuestren el comportamiento esperado, incluida en el output de la conversación.

Si una tarea no puede validarse de ninguna de las dos formas, se debe indicar explícitamente el motivo antes de cerrarla.

## Checklist de validación por tarea

Antes de dar por buena cualquier tarea, ejecutar en este orden:

1. `pnpm lint` — sin errores ni warnings
2. Formateo correcto del código (indentación consistente, sin líneas en blanco innecesarias)
3. `pnpm test` — todos los tests pasan (si hay tests para la tarea)
4. Validación funcional: manual o automática según la naturaleza de la tarea

Si el lint falla, corregir antes de continuar. No entregar código con errores de lint.

## Comentarios en el código

El código debe ser autoexplicativo. No añadir comentarios que describan qué hace el código.

Si un comentario es estrictamente necesario (razón no obvia, invariante sutil, workaround específico), escribirlo en **inglés**.

Están prohibidos:
- Comentarios que repiten lo que hace el código (`// fetch products`, `// return true`)
- Comentarios de sección (`// components`, `// helpers`)
- JSDoc en funciones con nombres ya descriptivos
- Comentarios en español

Están permitidos:
- `// TTL expires after 1 hour per spec requirement` — razón de negocio no obvia
- `// Node 22 experimental localStorage conflicts with jsdom` — workaround con causa concreta
