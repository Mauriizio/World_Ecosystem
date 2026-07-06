# ADR-0002 — Stack técnico inicial

## Estado

Aceptado.

## Contexto

La primera base técnica requiere una aplicación web observable, pruebas headless y un núcleo de simulación desacoplado. El usuario aprobó explícitamente npm, TypeScript, React, Vite, Three.js, React Three Fiber, Drei, Zustand, TailwindCSS, ESLint, Prettier y Vitest.

## Decisión

Se usará:

- npm como package manager;
- TypeScript como lenguaje principal;
- Vite como herramienta de desarrollo y build;
- React para UI;
- Three.js y React Three Fiber para render 3D;
- Drei solo para herramientas de render, como cámara orbital;
- Zustand exclusivamente para estado de UI;
- TailwindCSS para estilos;
- ESLint y Prettier para calidad;
- Vitest para pruebas headless y determinismo.

## Alternativas consideradas

### UI sin Three.js al inicio

- Ventaja: menor riesgo de acoplamiento visual.
- Desventaja: no valida el puente básico hacia render 3D.
- Resultado: rechazada para esta base porque el stack visual fue aprobado.

### Zustand como estado central de mundo

- Ventaja: integración cómoda con React.
- Desventaja: mezcla UI con simulación y puede romper la autoridad del núcleo.
- Resultado: rechazada.

### Vitest frente a no tener tests iniciales

- Ventaja: permite verificar determinismo e imports prohibidos desde el inicio.
- Desventaja: agrega dependencia de tooling.
- Resultado: aceptada.

## Consecuencias

- El stack visual queda permitido, pero aislado del núcleo.
- Zustand queda limitado a UI.
- Las pruebas deben ejecutarse sin depender del renderer.
- Drei no puede importarse desde `src/simulation`.

## Criterios de revisión

Revisar cuando se agreguen persistencia, workers, otra capa de render, assets GLB o ejecución fuera del navegador.

## Relación con documentos

- `docs/03_ARCHITECTURE_BIBLE.md`
- `docs/07_DECISION_LOG.md`
- `docs/08_SIMULATION_TICK.md`
