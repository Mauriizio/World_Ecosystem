# ADR-0001 — Separación absoluta entre simulación y render

## Estado

Aceptado.

## Contexto

La documentación fundacional define que la simulación es la fuente de verdad y debe poder ejecutarse sin React, Three.js, React Three Fiber, Drei, navegador, canvas, WebGL ni modelos GLB. El renderer existe para representar visualmente estados producidos por la simulación, no para decidir comportamiento.

## Decisión

El núcleo `src/simulation` será headless y no podrá importar tecnologías visuales ni estado de UI. La comunicación hacia la capa visual se hará mediante snapshots o vistas de solo lectura producidas por un `RendererBridge`.

El render podrá interpolar o representar visualmente el estado recibido, pero no modificar el estado real del mundo simulado.

## Alternativas consideradas

### Usar React/R3F como loop principal de simulación

- Ventaja: implementación inicial más rápida.
- Desventaja: acopla el resultado ecológico al frame visual y rompe reproducibilidad.
- Resultado: rechazada.

### Mantener simulación headless y render como consumidor

- Ventaja: respeta determinismo, pruebas headless y escalabilidad.
- Desventaja: requiere más disciplina arquitectónica inicial.
- Resultado: aceptada.

## Consecuencias

- `src/simulation` debe poder probarse sin render.
- El renderer solo consume snapshots.
- Cualquier intervención del usuario debe entrar como intención ambiental o evento de simulación, no como mutación desde componentes visuales.
- Se agregan pruebas para detectar imports prohibidos en `src/simulation`.

## Criterios de revisión

Revisar si se introduce otro renderer, ejecución remota/headless, workers o persistencia avanzada.

## Relación con documentos

- `docs/00_PROJECT_VISION.md`
- `docs/03_ARCHITECTURE_BIBLE.md`
- `docs/08_SIMULATION_TICK.md`
