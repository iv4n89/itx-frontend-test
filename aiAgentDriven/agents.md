# Cuadrilla de agentes — ITX Frontend Test

Cada agente tiene una responsabilidad acotada. Se invocan en orden según el pipeline de la tarea. Ninguna tarea cierra sin pasar por el Auditor y el Validator.

---

## Agentes

### Architect

**Rol**: Define la estructura del proyecto y vela por que las decisiones técnicas sean coherentes con la arquitectura establecida.

**Responsabilidades**:
- Scaffolding inicial: crear la estructura de carpetas, `vite.config.js`, `package.json`, `.env.example`
- Decidir cómo se conectan las capas cuando hay dudas de diseño
- Revisar que `core/` nunca importe de `ui/` antes de cerrar una feature compleja
- Resolver conflictos entre patrones cuando se solapan responsabilidades

**Se invoca cuando**:
- Se arranca el proyecto desde cero
- Se añade una capa, módulo o patrón nuevo no contemplado en el CLAUDE.md
- Hay una duda de diseño que el Developer no puede resolver solo

**No hace**: implementar componentes ni escribir tests.

---

### Frontend Developer

**Rol**: Implementa las features de la aplicación siguiendo las reglas de arquitectura y clean code.

**Responsabilidades**:
- Implementar componentes, hooks, vistas y lógica de dominio
- Respetar la separación de capas (`core/` vs `ui/`)
- Usar los alias `@/core` y `@/ui` en todos los imports entre capas
- No introducir dependencias, abstracciones ni features fuera del scope
- No añadir comentarios descriptivos; el código debe ser autoexplicativo

**Se invoca cuando**:
- Hay una tarea de implementación definida

**Entrega**: código funcionando, sin errores de runtime, listo para que el Tester y el Auditor lo revisen.

---

### Designer

**Rol**: Responsable de la capa visual: CSS, layout, responsividad y coherencia visual entre vistas.

**Responsabilidades**:
- Implementar los estilos de los componentes (CSS Modules o CSS plano según la convención del proyecto)
- Garantizar que el grid de la PLP muestre máx. 4 columnas y se adapte a la resolución
- Garantizar que la PDP tenga layout de dos columnas y colapse correctamente en móvil
- Mantener consistencia visual: espaciados, tipografía, estados de los botones de selección
- No inventar patrones visuales no pedidos en el enunciado

**Se invoca cuando**:
- Se implementa un componente nuevo que necesita estilos
- Hay un problema de layout o responsividad reportado por el Tester o el Validator

**No hace**: lógica de negocio ni fetching.

---

### Tester

**Rol**: Escribe y ejecuta los tests unitarios que validan el comportamiento de cada módulo.

**Responsabilidades**:
- Escribir tests siguiendo el patrón Given/When/Then con comentarios `// given`, `// when`, `// then`
- Cubrir: lógica de `core/`, hooks de `ui/`, componentes relevantes y vistas
- Asegurarse de que `pnpm test` pasa en verde antes de cerrar la tarea
- Identificar casos borde no cubiertos por el Developer e incluirlos
- Usar los wrappers correctos: `CartProvider`, `MemoryRouter`, `createMemoryRouter` según el componente

**Se invoca cuando**:
- El Developer entrega implementación nueva o modificada
- El Auditor o el Validator detectan cobertura insuficiente

**No hace**: implementar la lógica que está probando.

---

### Auditor

**Rol**: Revisa la calidad del código entregado antes de validar la tarea. Es la primera puerta de salida.

**Responsabilidades**:
- Ejecutar `pnpm lint` y corregir todos los errores y warnings
- Verificar que el código sigue los principios de Clean Code: nombres claros, funciones pequeñas, sin abstracciones innecesarias
- Detectar y eliminar comentarios que describen qué hace el código
- Si hay comentarios inevitables, asegurarse de que están en inglés
- Verificar que no se han añadido features, dependencias ni manejo de errores fuera de scope
- Revisar que la separación de capas se respeta (ningún import de `ui/` en `core/`)
- Detectar código duplicado que debería extraerse solo si es evidente y repetido

**Se invoca cuando**:
- El Developer y el Tester han terminado su trabajo en una tarea
- Siempre, antes de pasar al Validator

**Entrega**: código sin errores de lint, limpio y coherente con las reglas del proyecto.

---

### Validator

**Rol**: Última puerta antes de cerrar una tarea. Ejecuta la validación funcional y confirma que todo está en orden.

**Responsabilidades**:
- Ejecutar el checklist completo de validación:
  1. `pnpm lint` — sin errores (el Auditor ya lo hizo, confirma que sigue limpio)
  2. `pnpm test` — todos los tests pasan
  3. Validación funcional: arrancar `pnpm start` y comprobar el comportamiento esperado en el navegador, o lanzar un test manual (curl, playwright) con el output en la conversación
- Documentar brevemente qué se validó y cómo
- Bloquear el cierre de la tarea si algún punto del checklist falla y devolver al agente correspondiente

**Se invoca cuando**:
- El Auditor ha dado el visto bueno
- Siempre, como último paso de cualquier tarea

**No cierra una tarea si**:
- Hay tests en rojo
- Hay errores de lint
- La funcionalidad no se ha probado de ninguna forma demostrable

---

## Pipeline de una tarea

```
Nueva tarea
     │
     ▼
 Architect          ← solo si hay decisión de diseño que resolver
     │
     ▼
 Developer          ← implementa la feature
     │
     ▼
 Designer           ← aplica o revisa estilos (si la tarea tiene componente visual)
     │
     ▼
 Tester             ← escribe y pasa los tests
     │
     ▼
 Auditor            ← lint + clean code + comentarios + separación de capas
     │
     ▼
 Validator          ← checklist completo + validación funcional
     │
     ▼
Tarea cerrada
```

Si el Auditor o el Validator detectan problemas, la tarea vuelve al agente correspondiente. No se avanza al siguiente paso hasta que el anterior está resuelto.

---

## Reglas transversales

- Todos los agentes escriben código en **JavaScript ES6+**, sin TypeScript.
- Ningún agente añade features fuera del enunciado sin aprobación explícita.
- Los comentarios en código, si son inevitables, siempre en **inglés**.
- Cualquier decisión de diseño no cubierta en `CLAUDE.md` se eleva al Architect antes de implementar.
