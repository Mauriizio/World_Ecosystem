# 03 — ARCHITECTURE BIBLE

## Filosofía de ingeniería del motor

**Estado:** Documento fundacional v0.1  
**Relación con `01_WORLD_BIBLE.md`:** Este documento define principios de ingeniería para proteger la visión conceptual del mundo.  
**Nivel:** Arquitectura y especificación. No contiene implementación concreta ni código.

---

## 1. Propósito

Este documento define la filosofía de ingeniería del proyecto. Su objetivo es evitar que el simulador se convierta en una escena visual acoplada, difícil de extender y dependiente de decisiones improvisadas.

El proyecto debe diseñarse como un motor profesional de simulación: modular, observable, extensible, documentado y capaz de ejecutarse sin render.

---

## 2. Separación absoluta entre simulación y render

La simulación debe poder ejecutarse sin gráficos. El núcleo del mundo no debe depender de cámara, modelos 3D, materiales, animaciones, React, Three.js, React Three Fiber ni ninguna tecnología visual.

### 2.1 Responsabilidad de la simulación

La simulación representa estado, tiempo, entidades, reglas, ciclos, eventos y consecuencias. Decide qué ocurre en el mundo según reglas conceptuales.

### 2.2 Responsabilidad del render

El render representa visualmente el estado producido por la simulación. Puede interpolar, animar, iluminar, mostrar modelos y capas de información. No debe decidir comportamiento.

### 2.3 Regla crítica

Ningún organismo simulado debe conocer su modelo visual. Una hormiga no sabe si se dibuja como punto, icono o GLB low poly. El render observa; no gobierna.

---

## 3. Responsabilidades de módulos

### 3.1 Núcleo de simulación

Responsable de tiempo, mundo, entidades, sistemas, reglas, eventos y estado. No dibuja, no muestra UI y no carga assets visuales.

### 3.2 Mundo

Contiene el ecosistema: regiones, condiciones ambientales, entidades, recursos, señales, colonias, relaciones espaciales y estado global.

### 3.3 Sistemas

Procesos especializados que modifican el mundo según reglas claras: clima, percepción, movimiento, necesidades, feromonas, recursos, muerte, reproducción, depredación, descomposición, colonias y usuario como intervención ambiental.

### 3.4 Entidades

Representan lo que existe: organismos, recursos, señales, elementos de terreno, colonias, cadáveres, agua, plantas o depredadores. Deben ser datos conceptuales con comportamiento coordinado por sistemas.

### 3.5 Render

Traduce estado simulado en representación visual. Debe poder reemplazarse sin cambiar el núcleo.

### 3.6 Interfaz

Permite observar, intervenir, configurar experimentos, pausar, acelerar y leer estadísticas. No debe dar órdenes directas a criaturas.

### 3.7 Persistencia

Guarda escenarios, estado del mundo, parámetros, historial y resultados para reproducibilidad.

### 3.8 Depuración

Permite explicar causas: rutas, señales, humedad, nutrientes, eventos, mortalidad, reservas y estados de colonia.

---

## 4. Principios SOLID aplicados

### 4.1 Responsabilidad única

Cada módulo debe tener una razón clara para cambiar. Un sistema de clima cambia por reglas climáticas; uno de feromonas por señales; uno de render por visualización.

### 4.2 Abierto para extensión

Agregar una rana, una planta nueva o un bioma no debe obligar a reescribir el núcleo. El sistema debe crecer por extensión documentada.

### 4.3 Sustitución

Un sistema simple puede ser reemplazado por uno más sofisticado si cumple el mismo contrato conceptual.

### 4.4 Interfaces específicas

Cada módulo debe conocer solo lo necesario. Un depredador no necesita acceso a todo el mundo si solo percibe presas cercanas.

### 4.5 Inversión de dependencias

El núcleo no depende de tecnología visual. Los sistemas deben depender de contratos conceptuales, no de detalles externos.

---

## 5. Arquitectura basada en sistemas

El mundo debe organizarse por procesos. Un ecosistema no es una lista de objetos aislados; es una red de transformaciones. Por eso los sistemas son la unidad natural de comportamiento.

Un sistema debe documentar:

- propósito;
- entradas conceptuales;
- salidas conceptuales;
- entidades afectadas;
- eventos emitidos;
- dependencias;
- responsabilidades prohibidas;
- criterios de prueba.

Ejemplos de sistemas futuros:

- Time System;
- Climate System;
- Pheromone System;
- Perception System;
- Need System;
- Resource System;
- Colony System;
- Predator System;
- Decay System;
- User Intervention System.

---

## 6. ECS vs arquitectura propia

### 6.1 ECS conceptual

ECS separa entidades, componentes y sistemas. Es potente para simulaciones con muchas entidades y composición flexible.

### 6.2 Ventajas de ECS

- Modularidad alta.
- Composición flexible.
- Separación datos/lógica.
- Buen rendimiento potencial.
- Escalabilidad para muchas entidades.

### 6.3 Riesgos de ECS

- Complejidad prematura.
- Pérdida de claridad de dominio.
- Abstracción excesiva.
- Curva de aprendizaje.
- Posibilidad de consultas globales caóticas.

### 6.4 Arquitectura propia basada en sistemas

Puede ser más clara al inicio, más cercana al dominio y compatible con una evolución futura hacia ECS.

### 6.5 Posición provisional

Usar una arquitectura modular basada en sistemas, compatible con ECS, pero no adoptar ECS formal hasta que los requisitos reales lo justifiquen. Esta decisión debe registrarse como ADR cuando se cierre.

---

## 7. Escalabilidad

El motor debe escalar en cuatro dimensiones:

1. **Entidades:** de pocas hormigas a poblaciones grandes.
2. **Sistemas:** de comida y feromonas a clima, descomposición, genética y biomas.
3. **Ecosistemas:** de hormiguero a termitas, abejas, bosque o desierto.
4. **Herramientas:** de observación básica a experimentos reproducibles.

La escalabilidad no debe lograrse sacrificando claridad.

---

## 8. Modularidad y desacoplamiento

### 8.1 Reemplazabilidad

Debe ser posible reemplazar render, sistema de clima, modelo de feromonas o sistema de movimiento sin reescribir todo.

### 8.2 Dependencias explícitas

Cada dependencia entre sistemas debe estar documentada. Si el clima afecta hongos, plantas y feromonas, esa relación debe ser explícita.

### 8.3 Acoplamiento prohibido

- Simulación dependiendo del render.
- Herramientas de usuario controlando criaturas.
- Entidades con lógica global oculta.
- Sistemas modificando responsabilidades ajenas.

---

## 9. Contratos entre módulos

Un contrato define qué lee, qué modifica, qué emite y qué no debe hacer un módulo.

Ejemplo conceptual: un sistema de percepción lee posición, sensores y estímulos; produce percepciones locales; no decide acciones; no modifica recursos.

Tipos de contrato:

- contrato de datos;
- contrato de eventos;
- contrato de responsabilidad;
- contrato de tiempo;
- contrato de persistencia;
- contrato de observabilidad.

---

## 10. Eventos

Los eventos registran cambios significativos. No son guiones.

Ejemplos:

- comida encontrada;
- recurso agotado;
- hormiga muerta;
- depredador detectado;
- lluvia iniciada;
- ruta reforzada;
- colonia bajo amenaza;
- brote de hongos;
- migración iniciada.

Los eventos sirven para desacoplar sistemas, explicar causas, depurar y construir historial.

---

## 11. Ciclo de actualización

El ciclo conceptual de actualización puede incluir:

1. avance de tiempo;
2. clima;
3. ambiente;
4. señales;
5. percepción;
6. necesidades;
7. decisión local;
8. movimiento e interacción;
9. consumo y transformación;
10. muerte y reproducción;
11. descomposición;
12. estado de colonia;
13. eventos;
14. estado observable.

El orden exacto queda pendiente. Debe definirse cuando existan sistemas iniciales.

---

## 12. Persistencia y serialización

Persistir significa guardar el estado ecológico, no la apariencia visual.

Debe poder guardarse:

- entidades;
- recursos;
- clima;
- señales;
- colonias;
- reservas;
- población;
- edad;
- cadáveres;
- nutrientes;
- historial;
- parámetros de escenario;
- configuración experimental.

La serialización debe permitir escenarios, estados completos, resultados estadísticos e historial. Los formatos deberán versionarse.

---

## 13. Pruebas

Las pruebas deben validar reglas conceptuales, sistemas aislados e integración ecológica.

Ejemplos:

- sin comida suficiente, la población no crece indefinidamente;
- lluvia debilita feromonas si esa regla está activa;
- cadáveres y humedad aumentan descomposición;
- depredadores aumentan amenaza;
- rutas exitosas se refuerzan más que rutas fallidas.

Las pruebas no son solo técnicas; son garantías de coherencia del mundo.

---

## 14. Depuración

Depurar significa explicar. El proyecto debe permitir responder:

- ¿por qué murió esta colonia?
- ¿por qué se abandonó esta ruta?
- ¿por qué aparecieron hongos?
- ¿qué cambió después de la lluvia?
- ¿qué sistema generó este evento?

Herramientas futuras: capas de feromonas, humedad, nutrientes, amenaza, rutas, presión alimenticia, edad de recursos y eventos recientes.

---

## 15. Organización de carpetas

La organización debe reflejar separación conceptual. Aunque no se define implementación concreta, el repositorio futuro debe separar:

- documentación;
- simulación;
- render;
- interfaz;
- assets;
- experimentos;
- persistencia;
- pruebas;
- herramientas.

La regla es simple: la estructura debe hacer difícil mezclar responsabilidades. Si facilita acoplar render con simulación, está mal.

---

## 16. Convenciones de nombres

Los nombres deben priorizar claridad. Usar términos consistentes: entidad, organismo, recurso, señal, colonia, sistema, evento, escenario, experimento, bioma.

Evitar nombres engañosos. No llamar “decoración” a una entidad con función ecológica. No llamar “IA” a comportamiento que en realidad son reglas locales.

---

## 17. Decisiones de diseño

Toda decisión importante debe registrarse mediante ADR. Especialmente:

- ECS formal o arquitectura propia;
- representación espacial;
- modelo de tiempo;
- modelo de feromonas;
- tecnología de render;
- persistencia;
- profundidad del nido;
- genética;
- herramientas de usuario.

---

## 18. Decisiones futuras

- ECS formal vs arquitectura propia.
- Representación espacial inicial.
- Modelo exacto de tiempo y actualización.
- Tecnología visual definitiva.
- Estrategia de persistencia.
- Profundidad de pruebas.
- Organización final del repositorio.
---

## 19. Matriz conceptual de responsabilidades

| Área | Debe hacer | No debe hacer |
|---|---|---|
| Simulación | Avanzar mundo, aplicar reglas, producir estado | Dibujar, cargar modelos, depender de UI |
| Render | Mostrar estado, animar, interpolar, visualizar capas | Decidir conducta, modificar reglas |
| UI | Permitir intervención ambiental y observación | Controlar criaturas directamente |
| Persistencia | Guardar escenarios y estados | Guardar solo apariencia visual |
| Depuración | Explicar causas y eventos | Cambiar resultados al observar |
| Assets | Representar entidades | Contener lógica de simulación |

---

## 20. Contratos arquitectónicos obligatorios

### 20.1 Contrato simulación-render

La simulación entrega estado observable. El render consume ese estado. El render puede solicitar información para visualización, pero no debe convertirse en fuente de verdad.

### 20.2 Contrato usuario-simulación

La interfaz envía intervenciones ambientales. La simulación decide consecuencias. La UI no envía órdenes a organismos.

### 20.3 Contrato sistema-sistema

Los sistemas pueden comunicarse mediante estado compartido controlado, eventos o contratos explícitos. No deben modificar detalles internos de otros sistemas sin acuerdo.

### 20.4 Contrato entidad-sistema

Las entidades contienen estado conceptual. Los sistemas procesan reglas. Si una entidad necesita comportamiento especial, debe justificarse sin romper modularidad.

---

## 21. Taxonomía de sistemas futuros

### 21.1 Sistemas fundamentales

- Tiempo.
- Espacio.
- Entidades.
- Eventos.
- Persistencia.

### 21.2 Sistemas ecológicos

- Energía.
- Materia.
- Recursos.
- Crecimiento.
- Reproducción.
- Muerte.
- Descomposición.

### 21.3 Sistemas ambientales

- Clima.
- Humedad.
- Temperatura.
- Lluvia.
- Suelo.
- Agua.
- Terreno.

### 21.4 Sistemas de criaturas

- Percepción.
- Necesidades.
- Decisión local.
- Movimiento.
- Alimentación.
- Descanso.
- Depredación.
- Huida.

### 21.5 Sistemas colectivos

- Colonia.
- Feromonas.
- Territorio.
- Amenaza.
- Expansión.
- Migración.
- Guerra futura.

---

## 22. Reglas de diseño de eventos

Un evento debe tener:

- nombre claro;
- causa;
- entidad o zona relacionada;
- momento;
- severidad si aplica;
- datos mínimos para depuración;
- relación con sistemas interesados.

### 22.1 Eventos de dominio

Representan hechos del mundo: muerte, nacimiento, comida encontrada, lluvia iniciada, recurso agotado.

### 22.2 Eventos de análisis

Ayudan a entender patrones: ruta dominante, amenaza creciente, presión alimenticia crítica.

### 22.3 Eventos de usuario

Registran intervenciones: comida colocada, lluvia provocada, piedra agregada.

---

## 23. Arquitectura de observabilidad

La observabilidad debe diseñarse desde el inicio. No es “debug temporal”. Es parte del producto.

Debe permitir:

- inspeccionar entidades;
- activar capas de información;
- ver historial de eventos;
- comparar estados;
- detectar inconsistencias;
- explicar causas;
- exportar resultados futuros.

---

## 24. Estrategia conceptual de pruebas

### 24.1 Pruebas de invariantes

Verifican reglas que nunca deben romperse: recursos con destino, criaturas sin omnisciencia, render sin lógica, usuario sin control directo.

### 24.2 Pruebas de regresión ecológica

Garantizan que una mejora no rompa ciclos anteriores. Por ejemplo, agregar lluvia no debe destruir el sistema de recolección si no hay razón.

### 24.3 Pruebas de escenarios

Escenarios diseñados para comprobar preguntas: comida cercana, comida lejana, depredador, lluvia, sequía, bloqueo de ruta.

### 24.4 Pruebas de reproducibilidad

El mismo escenario debe poder repetirse bajo condiciones equivalentes.

---

## 25. Antipatrones arquitectónicos

- Sistema Dios que decide todo.
- Entidades con lógica global escondida.
- Render modificando simulación.
- UI enviando órdenes a criaturas.
- Módulos sin contrato.
- Eventos usados como guiones.
- Dependencias circulares no justificadas.
- Estados imposibles sin validación.
- Documentación que describe una cosa y motor que hace otra.

---

## 26. Organización documental recomendada

La documentación debe crecer por áreas:

- visión;
- World Bible;
- reglas;
- arquitectura;
- entidades;
- experimentos;
- roadmap;
- ADR;
- assets;
- Blender;
- investigación biológica;
- escenarios;
- pruebas;
- glosario extendido.

---

## 27. Criterios para aceptar un nuevo sistema

Un sistema nuevo debe responder:

1. ¿Qué problema ecológico o técnico resuelve?
2. ¿Qué entidades afecta?
3. ¿Qué lee?
4. ¿Qué modifica?
5. ¿Qué eventos emite?
6. ¿Qué sistemas dependen de él?
7. ¿Qué riesgos introduce?
8. ¿Cómo se observa?
9. ¿Cómo se prueba?
10. ¿Qué documento actualiza?

Si no se puede responder, el sistema todavía no está maduro.
