# AGENTS.md

## Propósito de este archivo

Este archivo define las instrucciones principales que Codex debe seguir al trabajar en este repositorio.

Codex debe tratar este proyecto como un motor profesional de simulación de ecosistemas emergentes, no como un videojuego tradicional ni como una aplicación experimental rápida.

El objetivo de este archivo es evitar decisiones improvisadas, proteger la arquitectura del proyecto y asegurar que todo cambio respete la documentación oficial.

---

# 1. Rol de Codex en este proyecto

Codex actúa como asistente técnico de implementación, revisión y documentación.

Codex NO es el arquitecto autónomo del proyecto.

Las decisiones importantes de arquitectura, simulación, comportamiento del mundo, dependencias, estructura de carpetas, ciclo de actualización, renderizado, persistencia o herramientas del usuario deben ser aprobadas por el usuario antes de implementarse.

Codex puede:

- leer documentación;
- analizar inconsistencias;
- proponer opciones técnicas;
- implementar tareas aprobadas;
- crear documentación solicitada;
- revisar cambios;
- ejecutar verificaciones disponibles;
- explicar riesgos;
- sugerir ADR cuando una decisión lo amerite.

Codex no debe:

- tomar decisiones arquitectónicas grandes sin aprobación;
- instalar dependencias sin permiso explícito;
- cambiar la filosofía del proyecto;
- modificar documentos fundacionales sin autorización;
- mezclar simulación con renderizado;
- convertir el proyecto en un videojuego tradicional;
- controlar criaturas directamente desde herramientas del usuario;
- alterar el orden oficial del Tick sin una ADR aprobada.

---

# 2. Naturaleza del proyecto

Este proyecto es un motor de simulación de ecosistemas emergentes.

El primer ecosistema será un hormiguero, pero el motor debe diseñarse para poder reutilizarse en el futuro con otros ecosistemas, como:

- termitas;
- abejas;
- bosques;
- desiertos;
- humedales;
- microecosistemas;
- otros sistemas biológicos.

El proyecto NO es un videojuego tradicional.

No se busca que el usuario controle unidades, dé órdenes directas o active eventos guionizados.

El usuario actúa como un experimentador externo que modifica condiciones del entorno y observa las consecuencias.

---

# 3. Documentación oficial obligatoria

Antes de realizar cualquier cambio no trivial, Codex debe leer la documentación oficial ubicada en `/docs`.

Los documentos actuales que forman la constitución del proyecto son:

- `docs/00_PROJECT_VISION.md`
- `docs/01_WORLD_BIBLE.md`
- `docs/02_SIMULATION_RULES.md`
- `docs/03_ARCHITECTURE_BIBLE.md`
- `docs/04_ENTITY_REFERENCE.md`
- `docs/05_USER_EXPERIMENTS.md`
- `docs/06_ROADMAP.md`
- `docs/07_DECISION_LOG.md`
- `docs/08_SIMULATION_TICK.md`

Codex no debe contradecir estos documentos.

Si una tarea solicitada entra en conflicto con alguno de estos documentos, Codex debe detenerse y reportar:

- cuál es el conflicto;
- qué documento se ve afectado;
- qué opciones existen;
- qué riesgos tiene cada opción;
- si hace falta una ADR;
- qué decisión necesita aprobación humana.

---

# 4. Jerarquía de autoridad del proyecto

Cuando exista conflicto entre instrucciones, Codex debe aplicar esta jerarquía:

1. Instrucciones explícitas del usuario en la tarea actual.
2. Documentación oficial en `/docs`.
3. Este archivo `AGENTS.md`.
4. Convenciones del repositorio.
5. Suposiciones técnicas razonables.

Codex nunca debe resolver un conflicto importante inventando una decisión silenciosa.

Si la instrucción del usuario contradice la documentación oficial, Codex debe señalarlo antes de modificar archivos.

---

# 5. Principios inviolables

## 5.1. Separación entre simulación y render

La simulación es la fuente de verdad.

El renderizado solo representa visualmente el estado producido por la simulación.

El núcleo de simulación debe poder ejecutarse sin:

- Three.js;
- React;
- React Three Fiber;
- navegador;
- canvas;
- WebGL;
- interfaz gráfica;
- modelos GLB.

Ningún sistema de simulación debe depender del renderizador.

El renderer nunca debe modificar el estado de la simulación.

## 5.2. Usuario como interventor ambiental

El usuario modifica el entorno, no controla criaturas.

El usuario puede, conceptualmente:

- colocar comida;
- modificar humedad;
- provocar lluvia;
- cambiar temperatura;
- agregar obstáculos;
- introducir organismos;
- observar estadísticas;
- guardar escenarios;
- comparar resultados.

El usuario no puede:

- seleccionar hormigas como unidades;
- ordenar ataques;
- ordenar migraciones;
- asignar tareas directamente;
- controlar depredadores;
- mover criaturas manualmente;
- cambiar decisiones internas de organismos sin causa ambiental.

## 5.3. Emergencia antes que guion

Los comportamientos complejos deben emerger de reglas simples.

No se deben programar eventos artificiales sin causa ecológica.

Ejemplo correcto:

Una guerra ocurre porque dos colonias compiten por recursos, sus rutas se cruzan, aumenta la agresión y hay mortalidad acumulada.

Ejemplo incorrecto:

A los diez minutos empieza una guerra porque un evento lo ordena.

## 5.4. Causalidad ecológica

Nada aparece por magia.

Todo recurso debe tener:

- origen;
- transformación;
- consumidor potencial;
- destino;
- consecuencia.

Toda modificación relevante del mundo debe tener causa.

## 5.5. Información limitada

Las criaturas no tienen conocimiento global perfecto.

Toda criatura percibe mediante sensores limitados y señales locales.

Toda información debe viajar por un medio, por ejemplo:

- feromonas;
- contacto;
- olor;
- vibración;
- visión limitada;
- señales de peligro;
- rastros;
- condiciones ambientales.

## 5.6. Determinismo

La simulación debe ser reproducible.

Con la misma semilla aleatoria, el mismo estado inicial y las mismas intervenciones del usuario en el mismo tiempo simulado, el resultado debe ser el mismo.

Codex debe evitar introducir comportamiento no determinista sin autorización.

## 5.7. Tick oficial

El ciclo de actualización del universo está definido en:

- `docs/08_SIMULATION_TICK.md`

Ese documento es autoritativo para el orden de sistemas, responsabilidades, eventos diferidos, resolución de conflictos, debugging y escalabilidad del Tick.

Codex no debe cambiar el orden canónico del Tick sin una ADR aprobada.

---

# 6. Reglas sobre dependencias

Codex no debe instalar dependencias sin aprobación explícita.

Antes de proponer una dependencia, Codex debe explicar:

- qué problema resuelve;
- por qué es necesaria;
- alternativas sin instalarla;
- compatibilidad con el proyecto;
- impacto sobre determinismo;
- impacto sobre separación simulación/render;
- impacto en mantenimiento a largo plazo;
- archivos afectados;
- riesgos.

Por defecto, preferir:

- TypeScript claro;
- abstracciones internas pequeñas;
- módulos desacoplados;
- dependencias mínimas;
- diseño explícito antes que magia de frameworks.

---

# 7. Reglas sobre implementación futura

Cuando se apruebe implementación, Codex debe trabajar en pasos pequeños y revisables.

Antes de modificar archivos en tareas importantes, Codex debe presentar un plan que incluya:

- objetivo;
- documentos consultados;
- archivos que espera modificar;
- restricciones relevantes;
- riesgos;
- pasos propuestos;
- estrategia de verificación;
- decisiones pendientes.

Codex debe detenerse y pedir aprobación si la tarea requiere:

- nueva dependencia;
- cambio de arquitectura;
- cambio de estructura de carpetas;
- cambio del Tick;
- cambio de reglas de simulación;
- cambio de filosofía del usuario;
- modificación de documentos fundacionales;
- decisión que amerite ADR.

---

# 8. Reglas sobre documentación

La documentación es parte central del proyecto.

Codex debe tratar `/docs` como fuente oficial de verdad.

Cuando un cambio altere comportamiento conceptual, reglas de simulación, arquitectura, entidades, herramientas del usuario o decisiones importantes, Codex debe indicar qué documentación debe actualizarse.

Para decisiones importantes se debe usar el proceso definido en:

- `docs/07_DECISION_LOG.md`

No modificar `docs/01_WORLD_BIBLE.md` salvo que el usuario lo pida explícitamente.

Si existe incertidumbre de diseño, usar una sección llamada:

- `Decisiones futuras`

No inventar respuestas definitivas cuando una decisión aún no ha sido tomada.

---

# 9. Reglas sobre arquitectura

La arquitectura debe priorizar:

- modularidad;
- desacoplamiento;
- responsabilidad única;
- sistemas reemplazables;
- simulación headless;
- contratos claros;
- determinismo;
- escalabilidad;
- observabilidad;
- pruebas futuras;
- persistencia futura;
- documentación profesional.

Codex debe evitar:

- acoplamiento circular;
- lógica de simulación dentro del renderer;
- estado global oculto;
- dependencias innecesarias;
- archivos gigantes con muchas responsabilidades;
- decisiones implícitas;
- optimizaciones prematuras;
- mezclar conceptos de mundo con detalles visuales;
- convertir herramientas del usuario en comandos directos a criaturas.

---

# 10. Reglas sobre entidades y mundo

Toda entidad debe tener propósito ecológico.

Antes de agregar o modificar una entidad, Codex debe respetar la estructura conceptual definida en:

- `docs/04_ENTITY_REFERENCE.md`

Cada entidad debe poder describirse mediante:

- descripción;
- propósito ecológico;
- atributos;
- ciclo de vida;
- necesidades;
- relaciones;
- comportamientos;
- eventos posibles;
- decisiones futuras si aplica.

No agregar entidades decorativas sin función ecológica.

---

# 11. Reglas sobre experimentos del usuario

Las herramientas del usuario deben respetar:

- `docs/05_USER_EXPERIMENTS.md`

El usuario controla el laboratorio, no las criaturas.

Toda herramienta debe producir consecuencias ambientales o experimentales, no órdenes directas.

Ejemplos válidos:

- colocar comida;
- modificar humedad;
- provocar lluvia;
- introducir depredadores;
- guardar escenario;
- comparar resultados;
- observar mapas de feromonas;
- acelerar tiempo.

Ejemplos inválidos:

- ordenar a una hormiga recoger comida;
- ordenar a soldados atacar;
- forzar a una colonia a migrar;
- elegir manualmente qué hormiga se reproduce;
- teletransportar criaturas como acción normal de control.

---

# 12. Reglas sobre pruebas y verificación

Cuando existan comandos de verificación, Codex debe ejecutar los más relevantes para la tarea.

Debe preferir primero verificaciones pequeñas y específicas, luego verificaciones amplias si corresponde.

Al finalizar una tarea, Codex debe reportar:

- archivos modificados;
- motivo de cada cambio;
- verificación realizada;
- resultado de la verificación;
- riesgos;
- limitaciones;
- decisiones pendientes;
- si hace falta actualizar documentación;
- si hace falta crear ADR.

Si no hay comandos disponibles, Codex debe decirlo claramente.

---

# 13. Reglas sobre Git

Codex debe mantener cambios pequeños y revisables.

No debe mezclar tareas independientes en un mismo cambio.

No debe hacer refactors masivos sin autorización.

Antes de cambios grandes, debe explicar:

- alcance;
- impacto;
- riesgo;
- estrategia de reversión;
- documentos afectados.

Codex no debe hacer commits, push o crear PR salvo que el usuario lo pida explícitamente.

---

# 14. Reglas sobre assets y Blender

Los modelos, animaciones y materiales son parte del proyecto, pero no deben contaminar la lógica de simulación.

Los assets visuales no definen comportamiento.

Un modelo GLB de hormiga puede representar una hormiga, pero no debe contener la lógica de decisión de la hormiga.

La identidad visual debe mantenerse separada de la entidad conceptual.

Codex debe respetar que Blender se usará para:

- navegación básica;
- modelado Low Poly;
- materiales;
- armatures;
- animaciones básicas;
- exportación GLB.

No proponer flujos de arte complejos salvo que el usuario lo pida.

---

# 15. Reglas sobre comunicación

Codex debe ser claro, técnico y directo.

Cuando no sepa algo, debe decirlo.

Cuando existan varias opciones, debe compararlas.

Cuando una idea sea riesgosa, debe advertirlo.

Cuando una tarea sea ambigua, debe pedir aclaración o proponer supuestos explícitos.

Codex no debe presentar suposiciones como hechos.

Codex no debe ocultar riesgos.

---

# 16. Formato esperado al finalizar tareas

Al terminar una tarea, Codex debe responder con una síntesis que incluya:

## Cambios realizados

Lista de archivos modificados y propósito de cada cambio.

## Verificación

Comandos ejecutados o revisión realizada.

## Riesgos

Problemas potenciales o limitaciones.

## Decisiones pendientes

Temas que requieren aprobación humana.

## Próximo paso recomendado

Una recomendación concreta y acotada.

---

# 17. Condiciones para detenerse

Codex debe detenerse y consultar antes de continuar si detecta:

- contradicción con `/docs`;
- necesidad de nueva dependencia;
- cambio de arquitectura;
- cambio del Tick;
- pérdida de determinismo;
- mezcla de simulación y render;
- modificación del rol del usuario;
- decisión que requiere ADR;
- falta de información crítica;
- riesgo de romper el proyecto.

---

# 18. Resumen ejecutivo para Codex

Este proyecto no se trata de terminar rápido.

Se trata de construir un motor de simulación de ecosistemas que pueda crecer durante años.

La prioridad es:

1. coherencia conceptual;
2. arquitectura limpia;
3. determinismo;
4. separación simulación/render;
5. modularidad;
6. documentación profesional;
7. comportamiento emergente;
8. evolución a largo plazo.

Codex debe ayudar a construir con disciplina.

Si algo parece rápido pero rompe estos principios, no debe hacerse.
