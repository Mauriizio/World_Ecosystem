# ADR-0004 — Modelo espacial inicial v0.1

## Estado

Aceptado provisional.

## Contexto

El modelo espacial inicial debe permitir una simulación mínima sin bloquear futuras decisiones sobre grilla, regiones, nodos, navmesh, feromonas o pathfinding. La documentación identifica el modelo espacial como una decisión de alto impacto para movimiento, percepción, feromonas y ambiente.

## Decisión

La base v0.1 usará un plano continuo 2D con coordenadas `x/z` dentro del núcleo de simulación. La coordenada `y = 0` pertenece solo al render. El mundo tendrá bordes simples y no usará grilla, navmesh ni pathfinding.

Las hormigas placeholder se moverán con dirección vectorial, percepción circular simple de comida cercana y retorno directo al nido cuando carguen comida.

## Alternativas consideradas

### Grilla desde el inicio

- Ventaja: simplifica vecindad y discretización.
- Desventaja: condiciona feromonas, movimiento y render antes de decidir el modelo final.
- Resultado: rechazada por ahora.

### Navmesh o pathfinding real

- Ventaja: movimiento más realista.
- Desventaja: sobrealcance y dependencia de decisiones espaciales no cerradas.
- Resultado: rechazada.

### Plano continuo 2D provisional

- Ventaja: simple, testeable y no requiere assets ni pathfinding.
- Desventaja: no resuelve obstáculos ni rutas complejas.
- Resultado: aceptada provisionalmente.

## Consecuencias

- El movimiento inicial es placeholder y no debe confundirse con pathfinding definitivo.
- Las feromonas no se implementan todavía.
- El modelo no debe impedir migrar a grilla, regiones o híbrido en el futuro.

## Criterios de revisión

Revisar antes de implementar feromonas, obstáculos, terreno funcional, pathfinding, percepción avanzada o múltiples regiones.

## Relación con documentos

- `docs/03_ARCHITECTURE_BIBLE.md`
- `docs/07_DECISION_LOG.md`
- `docs/08_SIMULATION_TICK.md`
