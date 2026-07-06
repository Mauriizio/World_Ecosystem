# ADR-0005 — Overrides experimentales y Modo Laboratorio

## Estado

Aceptado provisional.

## Contexto

El proyecto define que el usuario controla el laboratorio y el ecosistema controla sus respuestas. En Modo Natural, las criaturas solo responden a reglas internas, percepción local y condiciones ambientales. En Modo Laboratorio o Sandbox Experimental, el usuario puede preparar experimentos alterando variables observables o ambientales, siempre que esa alteración no sea una orden directa de comportamiento.

La distinción es importante: aumentar el hambre de una hormiga modifica una condición interna observable para estudiar consecuencias; ordenar a esa hormiga buscar comida controla su decisión y está prohibido.

## Decisión

Se permite introducir overrides experimentales limitados en Modo Laboratorio para modificar variables existentes, simples y observables del estado de simulación. En v0.1 se permiten únicamente overrides escalares de hormiga para:

- hambre;
- energía.

Estos overrides deben pasar por una capa de intervención o controlador de simulación. No pueden implementarse como mutaciones directas desde React, desde el renderer, desde Three.js ni desde Zustand. La UI puede solicitar una intervención, pero el núcleo de simulación es quien la valida, aplica y registra.

Todo override experimental debe ser:

- trazable;
- registrado como evento;
- reproducible si se repite con la misma semilla y la misma secuencia de intervenciones en el mismo orden;
- explícitamente distinguido de comandos directos de comportamiento.

El renderer sigue siendo consumidor de snapshots y no modifica el estado real de simulación.

## Qué se puede modificar

En Modo Laboratorio, y mientras exista la variable en el modelo de simulación, se puede modificar:

- hambre de una hormiga;
- energía de una hormiga;
- variables ambientales futuras cuando estén implementadas;
- recursos o condiciones del entorno mediante herramientas ecológicas aprobadas;
- parámetros de experimentos reproducibles.

## Qué sigue prohibido

Sigue prohibido:

- ordenar a una hormiga moverse a un punto;
- ordenar recolectar comida;
- ordenar atacar;
- asignar tareas directamente;
- forzar rutas;
- forzar migración;
- controlar reproducción individual;
- modificar decisiones internas sin pasar por una intervención trazable.

## Alternativas consideradas

### Prohibir cualquier modificación interna

- Ventaja: máxima pureza natural.
- Desventaja: limita el modo laboratorio y dificulta experimentos controlados sobre variables observables.
- Resultado: rechazada para Sandbox Experimental.

### Permitir comandos directos a criaturas

- Ventaja: interacción inmediata.
- Desventaja: contradice la filosofía central del proyecto y lo acerca a un videojuego de control de unidades.
- Resultado: rechazada.

### Permitir overrides trazables de variables existentes

- Ventaja: habilita experimentos reproducibles sin controlar decisiones.
- Desventaja: requiere disciplina en nomenclatura, auditoría y registro de eventos.
- Resultado: aceptada provisionalmente.

## Consecuencias

- La UI debe diferenciar claramente entre observar, intervenir experimentalmente y controlar comportamiento.
- Los overrides se registran en el log de eventos.
- Zustand sigue limitado a estado de UI.
- El núcleo de simulación mantiene la autoridad sobre validación y aplicación de cambios.
- Los tests deben cubrir que un override aplicado en el mismo orden sea determinista.

## Criterios de revisión

Revisar esta decisión cuando se agreguen herramientas de colocar comida, clima, genética, reproducción, persistencia de experimentos o replay formal.

## Relación con documentos

- `docs/03_ARCHITECTURE_BIBLE.md`
- `docs/05_USER_EXPERIMENTS.md`
- `docs/07_DECISION_LOG.md`
- `docs/08_SIMULATION_TICK.md`
- `docs/adr/0001-simulation-render-separation.md`
