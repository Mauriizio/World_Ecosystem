# ADR-0003 — Arquitectura modular basada en sistemas sin ECS formal

## Estado

Aceptado provisional.

## Contexto

La arquitectura oficial recomienda sistemas especializados y advierte que adoptar un ECS formal demasiado pronto puede introducir complejidad prematura, pérdida de claridad de dominio y abstracción excesiva.

## Decisión

La primera base técnica usará arquitectura modular basada en sistemas, sin adoptar ECS formal. Las entidades serán datos conceptuales y los sistemas procesarán reglas sobre el estado del mundo.

La estructura inicial mantendrá separación entre `core`, `world`, `systems` y `random` para permitir evolución futura hacia ECS si los requisitos reales lo justifican.

## Alternativas consideradas

### Adoptar ECS formal desde el inicio

- Ventaja: composición flexible y escalabilidad potencial.
- Desventaja: complejidad prematura para un dominio aún en definición.
- Resultado: rechazada por ahora.

### Usar clases de entidad con comportamiento propio

- Ventaja: implementación directa.
- Desventaja: puede mezclar datos y lógica, dificultando sistemas globales y pruebas.
- Resultado: rechazada.

### Sistemas modulares con entidades como datos

- Ventaja: claro, testeable y compatible con evolución futura.
- Desventaja: exige contratos explícitos.
- Resultado: aceptada.

## Consecuencias

- Los sistemas deben tener responsabilidades acotadas.
- Las entidades no dependen del renderer ni de assets.
- El orden conceptual del Tick se mantiene como referencia, aunque la primera base solo active sistemas mínimos.

## Criterios de revisión

Revisar al escalar a cientos o miles de entidades, incorporar percepción espacial compleja, feromonas o composición dinámica de entidades.

## Relación con documentos

- `docs/03_ARCHITECTURE_BIBLE.md`
- `docs/07_DECISION_LOG.md`
- `docs/08_SIMULATION_TICK.md`
