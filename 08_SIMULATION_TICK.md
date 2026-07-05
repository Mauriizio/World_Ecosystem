# 08 — SIMULATION TICK
## Especificación del ciclo completo de actualización del motor de simulación

**Estado del documento:** v0.1 — Especificación fundacional  
**Documento relacionado:** `00_PROJECT_VISION.md`, `01_WORLD_BIBLE.md`, `02_SIMULATION_RULES.md`, `03_ARCHITECTURE_BIBLE.md`, `04_ENTITY_REFERENCE.md`, `05_USER_EXPERIMENTS.md`, `06_ROADMAP.md`, `07_DECISION_LOG.md`  
**Alcance:** Definir qué ocurre exactamente en cada Tick del universo simulado.  
**Restricción explícita:** Este documento no define código, pseudocódigo ni implementación concreta. Define contratos conceptuales, responsabilidades, orden de actualización, reglas de determinismo y criterios de ingeniería.

---

# 1. Propósito del documento

Este documento define el ciclo completo de actualización del motor de simulación. Su pregunta central es:

> ¿Qué ocurre exactamente en cada Tick del universo?

El Tick es el latido del mundo. Cada Tick transforma un estado estable del universo en otro estado estable, respetando causalidad, orden, determinismo, límites de percepción, flujo de energía, flujo de materia, información mediada y separación absoluta entre simulación y renderizado.

El objetivo de esta especificación es que cualquier implementación futura del motor pueda responder con claridad:

- qué sistemas se actualizan;
- en qué orden se actualizan;
- qué puede modificar cada sistema;
- qué nunca debe modificar cada sistema;
- cómo se resuelven conflictos;
- cuándo se aplican eventos;
- cuándo se difieren efectos;
- cómo se preserva la reproducibilidad;
- cómo se escala a miles o cientos de miles de entidades;
- cómo se depura el mundo sin romper su causalidad.

Este documento debe considerarse una pieza de gobernanza técnica. Cambiar el orden del Tick no es una optimización menor: es una decisión arquitectónica que puede cambiar el comportamiento del ecosistema completo. Cualquier cambio relevante en este documento debe registrarse mediante ADR.

---

# 2. Alcance y no alcance

## 2.1. Alcance

Este documento define:

- la naturaleza conceptual del Tick;
- la diferencia entre Tick, Frame y Render;
- la relación entre tiempo real y tiempo simulado;
- el modelo recomendado de frecuencia de simulación;
- la pausa, reanudación y aceleración temporal;
- las reglas de determinismo;
- el orden exacto de actualización de sistemas;
- la responsabilidad de cada sistema durante el Tick;
- la resolución de conflictos;
- el manejo de eventos inmediatos y diferidos;
- la estrategia conceptual de escalabilidad;
- las reglas de debugging del Tick;
- los principios inviolables del ciclo de simulación;
- las preguntas abiertas que deben resolverse antes de implementar.

## 2.2. No alcance

Este documento no define:

- estructura definitiva de carpetas;
- nombres finales de clases, interfaces o archivos;
- implementación de un ECS formal;
- implementación de React, Three.js o React Three Fiber;
- formatos binarios de guardado;
- algoritmos concretos de pathfinding;
- estructuras exactas de datos;
- APIs concretas;
- código;
- pseudocódigo.

La intención es especificar el contrato del mundo antes de escribir el motor.

---

# 3. Definiciones fundamentales

## 3.1. Tick

Un Tick es una unidad discreta de avance de la simulación.

En un Tick, el universo toma un estado inicial estable, evalúa sus sistemas en un orden definido y produce un nuevo estado estable. El Tick no es una animación visual, no es un Frame gráfico y no depende del monitor, del navegador ni del renderizador.

Un Tick representa una porción fija o controlada de tiempo simulado. Dentro de ese tiempo, pueden ocurrir procesos como:

- cambio ambiental;
- evaporación de feromonas;
- metabolismo;
- percepción;
- toma de decisión;
- movimiento;
- interacción;
- combate;
- alimentación;
- muerte;
- reproducción;
- actualización de colonias;
- generación de eventos;
- captura de estadísticas;
- preparación de datos para render.

El Tick es la unidad mínima de causalidad oficial del motor.

## 3.2. Estado estable

Un estado estable es un punto del universo donde todas las modificaciones correspondientes al Tick anterior ya fueron resueltas y ningún sistema se encuentra a mitad de una modificación.

El mundo debe estar en estado estable:

- antes de iniciar un Tick;
- después de terminar un Tick;
- cuando se guarda una simulación;
- cuando se genera una instantánea reproducible;
- cuando el RendererBridge entrega datos al renderizador.

No debe guardarse ni renderizarse un estado parcial a mitad de una fase, salvo en herramientas explícitas de debugging interno.

## 3.3. Frame

Un Frame es una unidad visual. Representa una imagen presentada al usuario por la capa de renderizado.

Un Frame puede ocurrir más rápido, más lento o con frecuencia distinta al Tick de simulación. La simulación no debe depender del Frame. Si el renderizador baja de rendimiento, el ecosistema no debe cambiar sus reglas. Si el renderizador se desactiva, la simulación debe poder seguir ejecutándose.

## 3.4. Render

Render es la representación visual del estado producido por la simulación.

El renderizador interpreta datos ya calculados. No decide comportamientos, no resuelve conflictos, no altera recursos, no mueve criaturas, no calcula hambre, no decide ataques y no modifica feromonas.

El render puede interpolar visualmente entre estados estables para dar fluidez, pero esa interpolación no forma parte de la verdad de la simulación.

## 3.5. Tiempo real

Tiempo real es el tiempo percibido fuera de la simulación: el tiempo del usuario, del dispositivo y del sistema operativo.

El motor puede usar tiempo real para decidir cuántos Ticks deben ejecutarse durante una sesión, pero los sistemas de simulación no deben depender directamente del reloj externo para tomar decisiones ecológicas. Si dependen de tiempo real, se rompe la reproducibilidad.

## 3.6. Tiempo simulado

Tiempo simulado es el tiempo interno del universo.

El ecosistema vive dentro del tiempo simulado. Las plantas crecen por tiempo simulado. Las hormigas se cansan por tiempo simulado. Las feromonas se evaporan por tiempo simulado. Las lluvias duran tiempo simulado.

La aceleración temporal debe modificar la relación entre tiempo real y tiempo simulado, no las reglas internas del mundo.

## 3.7. Semilla aleatoria

La semilla aleatoria es el origen determinista de toda variabilidad controlada del sistema.

Con el mismo estado inicial, la misma semilla, la misma configuración y la misma secuencia de intervenciones del usuario, el experimento debe producir el mismo resultado.

La semilla no elimina el azar. Lo gobierna.

---

# 4. Tick, Frame y Render

## 4.1. Separación obligatoria

El Tick pertenece a la simulación. El Frame pertenece a la visualización. El Render pertenece a la presentación.

La relación correcta es:

1. la simulación avanza mediante Ticks;
2. cada Tick produce estados estables;
3. el RendererBridge expone una vista segura de esos estados;
4. el renderizador dibuja esa vista;
5. el usuario observa o interviene mediante herramientas permitidas;
6. las intervenciones se convierten en comandos ambientales para futuros Ticks.

La relación incorrecta sería:

- que una animación decida la posición real de una hormiga;
- que el renderizador actualice hambre;
- que el Frame determine cuántos recursos consume una entidad;
- que una caída de FPS cambie el resultado ecológico;
- que un objeto visual sea fuente de verdad del mundo.

## 4.2. Por qué esta separación importa

La separación entre Tick y Render permite:

- simulación headless;
- pruebas reproducibles;
- debugging determinista;
- guardado confiable;
- renderizadores reemplazables;
- escalabilidad;
- aceleración temporal;
- análisis estadístico;
- comparación de experimentos;
- futura ejecución en servidores, herramientas offline o visualizadores alternativos.

Si se rompe esta separación, el proyecto deja de ser un motor de simulación y se convierte en una escena visual con lógica acoplada. Eso va contra la filosofía fundacional.

## 4.3. Interpolación visual

El renderizador puede suavizar visualmente la transición entre dos estados simulados. Por ejemplo, puede mostrar una hormiga moviéndose fluidamente entre dos posiciones producidas por Ticks distintos.

Esa interpolación debe considerarse cosmética. La posición real de la hormiga es la que define la simulación en estados estables. Si ocurre un combate, una colisión o una interacción con comida, debe resolverse según el estado de simulación, no según la posición interpolada del render.

## 4.4. Render sin autoridad

El renderizador no tiene autoridad sobre el mundo.

Puede leer:

- posición visual;
- orientación visual;
- estado de animación sugerido;
- estado visible de entidades;
- mapas de observación;
- señales visualizables;
- estadísticas.

No puede escribir:

- posición real;
- hambre;
- salud;
- decisiones;
- rutas;
- feromonas;
- recursos;
- eventos;
- muertes;
- reproducción;
- estado de colonia.

---

# 5. Frecuencia del Tick

## 5.1. Modelo recomendado: Tick fijo determinista

La recomendación fundacional es que la simulación utilice Tick fijo determinista.

Esto significa que cada Tick representa una cantidad constante de tiempo simulado. Esa cantidad debe ser definida por configuración del motor y no por fluctuaciones del renderizador.

La razón principal es la reproducibilidad. En un ecosistema emergente, pequeñas diferencias numéricas pueden escalar hasta producir resultados completamente distintos. Si el Tick depende de la velocidad real del dispositivo, dos usuarios con máquinas distintas podrían obtener mundos distintos usando la misma semilla.

Un Tick fijo facilita:

- repetición de experimentos;
- comparación de resultados;
- debugging;
- guardado y restauración;
- pruebas automatizadas;
- balance ecológico;
- detección de regresiones;
- documentación de escenarios.

## 5.2. Frecuencia conceptual

La frecuencia exacta no se define todavía como valor final. Debe decidirse mediante ADR cuando se conozca la escala inicial del mundo.

Sin embargo, conceptualmente el Tick debe ser suficientemente pequeño para representar con estabilidad:

- percepción local;
- movimiento de criaturas pequeñas;
- evaporación de señales;
- interacción con recursos;
- ataques cercanos;
- cambios de necesidades.

Y suficientemente grande para no desperdiciar capacidad computacional en cambios imperceptibles.

El proyecto debe evitar dos extremos:

- Ticks demasiado grandes, que producirían saltos bruscos, conflictos artificiales y pérdida de causalidad fina.
- Ticks demasiado pequeños, que aumentarían el costo sin mejorar la calidad ecológica de forma proporcional.

## 5.3. Sistemas de distinta escala temporal

Aunque el Tick sea fijo, no todos los sistemas tienen que producir cambios significativos en todos los Ticks.

Algunos sistemas son de alta frecuencia:

- percepción;
- decisión;
- movimiento;
- feromonas;
- interacciones inmediatas;
- combate cercano.

Otros son de frecuencia media:

- hambre;
- cansancio;
- metabolismo;
- clima local;
- descomposición inicial;
- crecimiento de hongos.

Otros son de baja frecuencia:

- crecimiento vegetal;
- reproducción;
- maduración de larvas;
- cambios estacionales;
- evolución genética;
- recuperación de nutrientes.

La arquitectura del Tick debe permitir múltiples escalas temporales sin romper la noción de estado estable.

## 5.4. Multi-rate conceptual

A futuro, el motor puede permitir que algunos sistemas se evalúen cada cierto número de Ticks, siempre que se mantengan estas reglas:

- la omisión de actualización debe ser determinista;
- el sistema debe acumular tiempo simulado de forma controlada;
- ningún sistema dependiente debe leer estados obsoletos sin saberlo;
- el comportamiento ecológico no debe cambiar por rendimiento de máquina;
- la frecuencia reducida debe ser una decisión del diseño del sistema, no una consecuencia accidental.

Este tema requiere ADR antes de implementación avanzada.

---

# 6. Relación entre tiempo real y tiempo simulado

## 6.1. Tiempo real como conductor externo

El tiempo real puede determinar cuántos Ticks se intentan ejecutar durante la sesión de usuario. Sin embargo, una vez que un Tick comienza, sus reglas pertenecen al tiempo simulado.

El mundo no debe preguntarse “qué hora es en el sistema operativo” para decidir si una planta crece, si una hormiga tiene hambre o si una feromona se evapora.

Debe preguntarse cuánto tiempo simulado ha pasado.

## 6.2. Tiempo simulado como verdad ecológica

Todas las transformaciones ecológicas deben basarse en tiempo simulado:

- envejecimiento;
- hambre;
- cansancio;
- duración de lluvia;
- evaporación;
- crecimiento;
- descomposición;
- incubación;
- reproducción;
- recuperación;
- degradación de señales.

Esto permite que una simulación pausada no envejezca, que una simulación acelerada envejezca más rápido respecto al usuario, y que un experimento reproducido con la misma semilla tenga la misma historia interna.

## 6.3. Aceleración temporal

Acelerar el tiempo significa ejecutar más tiempo simulado por unidad de tiempo real.

No significa:

- multiplicar arbitrariamente el hambre sin respetar metabolismo;
- saltarse percepción;
- omitir conflictos;
- hacer crecer plantas sin consumir recursos;
- teletransportar criaturas;
- reducir precisión de causalidad sin control.

La aceleración temporal debe preservar el orden de Ticks. Si el usuario acelera el mundo, el motor debe avanzar por los mismos estados que habría recorrido en tiempo normal, solo que más rápido desde la perspectiva del usuario.

## 6.4. Riesgo de aceleración mal diseñada

Una aceleración mal diseñada puede producir errores graves:

- criaturas atraviesan obstáculos;
- dos entidades consumen el mismo recurso;
- feromonas no se evaporan correctamente;
- depredadores atacan presas que ya murieron;
- eventos se ejecutan en orden distinto;
- el mismo experimento deja de ser reproducible;
- plantas crecen sin consumir tiempo ecológico real;
- colonias toman decisiones con información que no deberían tener.

Por eso la aceleración no debe ser un “multiplicador caótico” aplicado a cada sistema por separado. Debe ser una propiedad del avance global del tiempo simulado.

## 6.5. Pausa

Pausar significa detener el avance del tiempo simulado.

Durante la pausa:

- no se ejecutan Ticks normales;
- no envejecen entidades;
- no se evapora feromona;
- no crecen plantas;
- no se resuelve combate;
- no se consume metabolismo;
- no se ejecutan eventos ecológicos;
- no cambian recursos por causas internas.

La pausa sí puede permitir:

- observación;
- inspección;
- lectura de estadísticas;
- preparación de intervenciones;
- navegación visual;
- selección de herramientas de laboratorio;
- planificación de escenarios.

Las intervenciones preparadas durante pausa deben aplicarse en un punto determinista de Tick cuando la simulación avance o cuando el sistema defina explícitamente que una edición ambiental en pausa produce un nuevo estado estable antes de reanudar.

## 6.6. Reanudación

Reanudar significa permitir que el siguiente Tick tome como base el último estado estable.

Al reanudar, el motor no debe “compensar” todo el tiempo real que pasó mientras estuvo en pausa. Si el mundo estuvo pausado durante diez minutos reales, esos diez minutos no ocurrieron en el universo simulado.

La reanudación debe mantener:

- el mismo estado interno;
- la misma semilla y posición del generador aleatorio;
- la misma cola de eventos pendientes;
- la misma secuencia de intervenciones programadas;
- el mismo índice de Tick;
- la misma reproducibilidad.

## 6.7. Paso manual de Tick

Para debugging y análisis, el motor debe contemplar conceptualmente la posibilidad de avanzar un solo Tick a la vez.

Esto permite observar:

- qué percibió una entidad;
- qué decisión tomó;
- qué conflicto se generó;
- qué sistema modificó un valor;
- qué evento fue diferido;
- cuándo cambió una estadística.

El paso manual no es una herramienta de juego. Es una herramienta de ingeniería.

---

# 7. Determinismo y reproducibilidad

## 7.1. Definición de determinismo

Una simulación es determinista cuando, bajo las mismas condiciones iniciales, produce la misma secuencia de estados.

Condiciones mínimas:

- mismo estado inicial;
- misma versión de reglas;
- misma configuración del mundo;
- misma semilla aleatoria;
- misma secuencia de intervenciones del usuario;
- mismo orden de sistemas;
- mismas reglas de resolución de conflictos;
- mismas reglas de eventos diferidos;
- mismo modelo de tiempo.

## 7.2. Por qué el determinismo es obligatorio

Este proyecto se basa en experimentos. El usuario debe poder comparar escenarios, repetir simulaciones y analizar consecuencias.

Sin determinismo:

- no se pueden reproducir bugs complejos;
- no se puede validar balance ecológico;
- no se puede comparar una intervención contra otra;
- no se puede confiar en estadísticas;
- no se puede hacer replay exacto;
- no se puede construir una herramienta seria de laboratorio.

Un simulador emergente sin reproducibilidad es bonito, pero difícil de estudiar. Y este proyecto quiere ser más laboratorio que espectáculo.

## 7.3. Fuentes comunes de no determinismo

Deben evitarse o controlarse:

- lectura directa del reloj externo dentro de sistemas;
- dependencia del Frame visual;
- orden no estable de entidades;
- iteraciones sobre colecciones sin orden garantizado;
- uso no controlado de aleatoriedad;
- paralelización que cambie el orden de resolución;
- eventos ejecutados inmediatamente desde sistemas ajenos;
- operaciones dependientes del hardware sin normalización;
- decisiones basadas en render;
- cambios manuales no registrados;
- guardados realizados a mitad de Tick.

## 7.4. Semillas aleatorias

Toda aleatoriedad debe derivar de una semilla controlada.

El azar puede usarse para:

- variación de exploración;
- selección entre opciones equivalentes;
- rasgos genéticos;
- éxito o fracaso parcial de eventos biológicos;
- dispersión de semillas;
- variabilidad climática;
- comportamiento no perfectamente predecible.

Pero cada uso debe ser reproducible.

No debe existir azar “libre” que no pueda ser repetido.

## 7.5. Canales de aleatoriedad

A futuro, puede ser conveniente separar conceptualmente la aleatoriedad por dominio:

- aleatoriedad climática;
- aleatoriedad genética;
- aleatoriedad de comportamiento;
- aleatoriedad de conflictos;
- aleatoriedad de eventos ecológicos.

Separar canales ayuda a depurar. Si un cambio en render altera el canal de azar de genética, hay un problema grave. Si un sistema consume azar extra sin razón, podría cambiar toda la historia futura del experimento.

Este diseño requiere decisión formal antes de implementación.

## 7.6. Intervenciones reproducibles

Las intervenciones del usuario deben registrarse como parte del experimento.

No basta con guardar que el usuario “puso comida”. Debe registrarse conceptualmente:

- qué acción realizó;
- en qué Tick fue aplicada;
- bajo qué configuración;
- con qué parámetros;
- en qué ubicación conceptual;
- qué versión de reglas estaba activa;
- si la intervención ocurrió en pausa o en ejecución.

Solo así se puede reproducir el experimento completo.

## 7.7. Determinismo no significa previsibilidad humana

Un sistema determinista puede ser sorprendente.

Si hay miles de interacciones locales, el usuario puede no anticipar el resultado, aunque el motor sea completamente reproducible. Ese es el punto ideal: sorpresa explicable.

El mundo debe sorprender por complejidad emergente, no por arbitrariedad técnica.

---

# 8. Principio de actualización por fases

## 8.1. Por qué el orden importa

En una simulación ecológica, el orden de actualización no es detalle técnico. Es regla del universo.

Si la percepción ocurre antes de actualizar feromonas, las criaturas perciben señales antiguas. Si ocurre después, perciben señales actualizadas. Ambas opciones son posibles, pero producen mundos distintos.

Si el combate se resuelve antes del movimiento, los depredadores atacan según posiciones previas. Si se resuelve después, atacan según posiciones nuevas. Ambas opciones tienen implicaciones.

Si la colonia actualiza sus reservas antes de que las obreras entreguen comida, tomará decisiones con información retrasada. Si actualiza después, responderá con información más reciente.

Por eso este documento propone un orden canónico.

## 8.2. Estados de lectura y escritura

Durante un Tick, no todos los sistemas deben escribir libremente en cualquier momento.

Cada sistema debe tener:

- entradas permitidas;
- salidas permitidas;
- modificaciones autorizadas;
- modificaciones prohibidas;
- dependencias explícitas;
- fase asignada.

Esto evita que un sistema invada responsabilidades de otro.

## 8.3. Intenciones antes que mutaciones cruzadas

Cuando una entidad desea actuar, el sistema no debe permitir que modifique arbitrariamente todo el mundo.

Una hormiga que decide recoger comida no debería borrar directamente el recurso. Debe generar una intención o solicitud de interacción que será resuelta por la fase correspondiente. Esto permite manejar conflictos como dos hormigas intentando recoger la misma semilla.

Una araña que decide atacar no debería matar inmediatamente a la presa desde la fase de decisión. Debe generar una intención de ataque que será resuelta por el sistema de combate.

Este principio es clave para determinismo y resolución limpia de conflictos.

---

# 9. Orden canónico del Tick

## 9.1. Orden propuesto

El orden canónico inicial del Tick se define así:

1. **TimeSystem**
2. **SaveStateSystem — fase de frontera inicial**
3. **EventSystem — eventos diferidos entrantes**
4. **UserInterventionSystem — comandos ambientales programados**
5. **EntitySystem — validación y mantenimiento inicial**
6. **ClimateSystem**
7. **EnvironmentSystem**
8. **PlantSystem**
9. **ResourceSystem**
10. **DecaySystem**
11. **PheromoneSystem — fase ambiental de señales**
12. **MetabolismSystem**
13. **NeedsSystem**
14. **PerceptionSystem**
15. **DecisionSystem**
16. **TaskSystem**
17. **MovementSystem**
18. **CombatSystem**
19. **InteractionSystem**
20. **PheromoneSystem — fase de emisión y compromiso**
21. **ColonySystem**
22. **ReproductionSystem**
23. **GeneticsSystem**
24. **PopulationSystem**
25. **EntitySystem — compromiso final de ciclo de vida**
26. **EventSystem — publicación y diferimiento saliente**
27. **StatisticsSystem**
28. **SaveStateSystem — fase de frontera final**
29. **RendererBridge**

Este orden puede parecer largo, pero responde a una necesidad: separar condiciones del mundo, estados internos, percepción, decisión, acciones, consecuencias colectivas, estadísticas y visualización.

## 9.2. Justificación general del orden

El orden sigue una lógica causal:

1. Primero se establece cuánto tiempo simulado avanza.
2. Luego se aplican eventos diferidos y comandos externos programados.
3. Después se estabiliza el registro de entidades.
4. Luego se actualizan condiciones ambientales.
5. Después se actualizan productores, recursos, descomposición y señales ambientales.
6. Luego las criaturas actualizan metabolismo y necesidades.
7. Después perciben el mundo actualizado.
8. Luego deciden y convierten decisiones en tareas.
9. Después se mueven.
10. Luego se resuelven combate e interacciones.
11. Después se comprometen señales nuevas.
12. Luego la colonia agrega resultados individuales.
13. Después se procesan reproducción, genética y población.
14. Se estabilizan altas, bajas y muertes.
15. Se publican eventos, estadísticas y guardados.
16. Finalmente se entrega una vista segura al renderizador.

La idea es simple: el mundo primero cambia; las criaturas luego lo perciben; después actúan; finalmente el mundo registra las consecuencias.

## 9.3. Por qué el RendererBridge va al final

El RendererBridge debe recibir un estado estable posterior a todas las modificaciones del Tick.

Si el render leyera antes:

- podría mostrar criaturas que ya murieron;
- podría mostrar comida que ya fue consumida;
- podría mostrar feromonas sin emisiones recientes;
- podría mostrar reservas de colonia desactualizadas;
- podría mezclar estados parciales de movimiento y combate.

El render nunca debe observar el mundo a medio resolver, salvo mediante herramientas explícitas de debug.

## 9.4. Por qué PerceptionSystem ocurre antes de DecisionSystem

Una criatura debe decidir en función de lo que percibe, no en función de información global.

Si DecisionSystem ocurriera antes de PerceptionSystem:

- las criaturas decidirían con datos obsoletos;
- se perdería coherencia sensorial;
- se facilitaría accidentalmente conocimiento global;
- las señales nuevas o evaporadas no afectarían a tiempo.

Por eso la percepción debe construir la vista local antes de decidir.

## 9.5. Por qué MovementSystem ocurre después de TaskSystem

TaskSystem convierte decisiones en intenciones operativas: explorar, recolectar, volver al nido, atacar, huir, alimentar larva, descansar.

MovementSystem no debe decidir por qué se mueve una criatura. Solo debe resolver cómo se desplaza físicamente según la tarea e intención vigentes.

Si MovementSystem decidiera tareas, se mezclaría locomoción con comportamiento. Eso generaría acoplamiento peligroso.

## 9.6. Por qué CombatSystem ocurre después de MovementSystem

El combate debe resolverse según proximidad y situación resultante del movimiento del Tick.

Si se resolviera antes del movimiento:

- un depredador no podría atacar a una presa que acaba de alcanzar;
- una hormiga no podría escapar antes de ser evaluada;
- los ataques dependerían de posiciones antiguas;
- se generaría una sensación de retraso artificial.

Resolver combate después de movimiento permite que persecución, huida, emboscada y contacto físico tengan coherencia.

## 9.7. Por qué InteractionSystem ocurre después de CombatSystem

Las interacciones no combativas, como recoger comida, entregar recursos, alimentar larvas o consumir agua, deben considerar el resultado del combate.

Si InteractionSystem ocurriera antes de CombatSystem:

- una hormiga podría recoger comida aunque muera en el mismo Tick por un ataque ya inevitable;
- una presa podría consumir recurso antes de ser capturada;
- un organismo muerto podría completar una acción no combativa;
- se producirían resultados confusos.

Por eso primero se resuelve la supervivencia inmediata. Luego los sobrevivientes interactúan con recursos y estructuras.

Esta regla puede revisarse para casos específicos, pero cualquier excepción debe documentarse.

## 9.8. Por qué ColonySystem ocurre después de acciones individuales

La colonia debe agregar resultados, no anticiparlos mágicamente.

Debe actualizarse después de que las hormigas:

- se movieron;
- combatieron;
- recolectaron;
- entregaron comida;
- alimentaron larvas;
- murieron;
- emitieron señales;
- limpiaron cadáveres;
- modificaron reservas.

Si ColonySystem ocurriera antes, la colonia tomaría decisiones globales con información incompleta del Tick actual.

## 9.9. Por qué ReproductionSystem y GeneticsSystem ocurren después de ColonySystem

La reproducción depende del estado colectivo:

- reservas;
- presión alimenticia;
- salud de reina;
- población;
- condiciones del nido;
- amenaza;
- humedad;
- viabilidad larval.

La genética depende de que exista un evento reproductivo o una nueva entidad biológica por definir.

Por eso ColonySystem debe cerrar primero el estado colectivo, luego ReproductionSystem evalúa reproducción, y GeneticsSystem asigna herencia o rasgos a nuevos organismos cuando corresponda.

## 9.10. Por qué StatisticsSystem ocurre casi al final

Las estadísticas deben medir el resultado estable del Tick, no intenciones parciales.

Si se midieran antes:

- contarían entidades que luego mueren;
- registrarían comida antes de ser consumida;
- medirían amenazas antes del combate;
- producirían gráficas engañosas;
- dificultarían reproducibilidad de experimentos.

StatisticsSystem debe observar después de que el mundo resolvió sus cambios principales.

## 9.11. Por qué SaveStateSystem tiene dos fronteras

SaveStateSystem aparece conceptualmente en dos momentos:

- frontera inicial;
- frontera final.

En la frontera inicial puede procesar restauraciones o solicitudes de carga antes de que el Tick modifique el mundo.

En la frontera final puede capturar un estado estable completo después de que todos los sistemas se resolvieron.

Guardar a mitad de Tick es peligroso porque captura un universo incompleto. Solo herramientas de debugging profundo podrían hacerlo, y esos estados no deben considerarse partidas o escenarios oficiales.

---

# 10. Especificación por sistema

Las siguientes secciones definen responsabilidad, entradas, salidas, modificaciones permitidas, modificaciones prohibidas, dependencias, errores posibles, costo esperado y paralelización futura de cada sistema.

El costo computacional se expresa de forma conceptual. No define estructuras concretas, pero ayuda a anticipar escalabilidad.

---

## 10.1. TimeSystem

### Responsabilidad

TimeSystem define el avance temporal del universo para el Tick actual.

Determina:

- índice del Tick;
- tiempo simulado acumulado;
- cantidad de tiempo simulado representada por el Tick;
- estado de pausa;
- factor de aceleración temporal;
- si el Tick debe ejecutarse o no;
- frontera temporal para eventos programados.

TimeSystem es la autoridad temporal interna. Ningún otro sistema debe inventar su propio reloj ecológico.

### Entradas

- estado de pausa;
- configuración temporal del experimento;
- velocidad de simulación seleccionada;
- solicitudes de paso manual;
- estado del Tick anterior;
- cola temporal de eventos programados.

### Salidas

- tiempo simulado del Tick;
- índice de Tick;
- marca temporal interna;
- ventana temporal que los sistemas pueden procesar;
- señal de avance, pausa o paso único.

### Qué modifica

- contador de Tick;
- tiempo simulado acumulado;
- estado temporal interno de la simulación.

### Qué nunca debe modificar

- entidades;
- recursos;
- clima;
- decisiones;
- feromonas;
- render;
- estadísticas ecológicas directas;
- estado de colonias.

### Dependencias

- configuración de simulación;
- comandos de pausa, reanudación o aceleración;
- estado de guardado/restauración.

### Posibles errores

- usar tiempo real como tiempo ecológico;
- avanzar Ticks durante pausa;
- compensar tiempo real acumulado durante pausa;
- cambiar tamaño de Tick sin ADR;
- permitir que distintos sistemas usen escalas temporales incompatibles;
- romper reproducibilidad por variación de frecuencia.

### Costo computacional esperado

Muy bajo. Su costo no depende significativamente del número de entidades.

### Paralelización futura

No requiere paralelización. Debe ejecutarse de forma secuencial al inicio para establecer el contrato temporal común.

---

## 10.2. SaveStateSystem — fase de frontera inicial

### Responsabilidad

En la frontera inicial, SaveStateSystem procesa operaciones que deben ocurrir antes de modificar el mundo durante el Tick.

Puede validar:

- restauración de un estado guardado;
- carga de escenario;
- solicitud de replay;
- integridad del estado estable anterior;
- compatibilidad de versión de reglas;
- semilla y posición de aleatoriedad.

### Entradas

- solicitudes de carga;
- solicitudes de restauración;
- metadatos de escenario;
- configuración del experimento;
- índice de Tick actual;
- estado estable previo.

### Salidas

- estado restaurado si aplica;
- validaciones;
- errores de compatibilidad;
- confirmación de frontera estable.

### Qué modifica

- estado global completo solo si se está cargando o restaurando oficialmente;
- metadatos de sesión;
- posición del experimento reproducible.

### Qué nunca debe modificar

- decisiones de criaturas durante un Tick normal;
- resultados ecológicos sin solicitud explícita;
- estado parcial de sistemas;
- render;
- estadísticas históricas sin registrar la restauración.

### Dependencias

- TimeSystem;
- sistema de versiones de reglas;
- estado estable anterior.

### Posibles errores

- cargar a mitad de Tick;
- restaurar sin reiniciar colas de eventos coherentemente;
- perder posición de semilla aleatoria;
- mezclar estado guardado con configuración incompatible;
- guardar o cargar objetos visuales como fuente de verdad.

### Costo computacional esperado

Bajo en Tick normal. Alto solo cuando hay operación de carga/restauración.

### Paralelización futura

La validación de integridad podría paralelizarse. La restauración del estado debe tratarse como operación atómica y secuencial.

---

## 10.3. EventSystem — eventos diferidos entrantes

### Responsabilidad

EventSystem procesa eventos que fueron diferidos desde Ticks anteriores y cuya activación corresponde al Tick actual.

Estos eventos pueden representar:

- nacimiento programado;
- muerte diferida;
- transformación de entidad;
- finalización de lluvia;
- germinación;
- maduración;
- descomposición por etapa;
- aplicación de intervención programada;
- cambios de estado previamente encolados.

### Entradas

- cola de eventos diferidos;
- índice de Tick;
- tiempo simulado;
- estado estable previo;
- prioridades de evento;
- reglas de ordenamiento determinista.

### Salidas

- eventos activados;
- solicitudes de cambio para sistemas responsables;
- eventos descartados por invalidez;
- registros de auditoría.

### Qué modifica

EventSystem no debería modificar directamente cualquier dominio arbitrario. Debe activar eventos y entregar solicitudes a la fase responsable.

Puede modificar:

- cola de eventos;
- estado de procesamiento de eventos;
- bitácora interna de eventos.

### Qué nunca debe modificar

- posición de entidades directamente;
- recursos directamente;
- vida o muerte directamente sin pasar por sistema responsable;
- render;
- decisiones individuales;
- estadísticas finales antes de tiempo.

### Dependencias

- TimeSystem;
- reglas de eventos;
- EntitySystem para materialización;
- sistemas de dominio que recibirán solicitudes.

### Posibles errores

- ejecutar eventos fuera de orden;
- ejecutar dos veces un evento;
- ejecutar un evento cuyo objetivo ya no existe;
- permitir que eventos salten fases;
- crear cadenas infinitas de eventos inmediatos;
- romper determinismo por ordenamiento no estable.

### Costo computacional esperado

Proporcional a la cantidad de eventos activados en el Tick, no necesariamente a la cantidad total de entidades.

### Paralelización futura

Eventos independientes podrían clasificarse en paralelo, pero su compromiso debe respetar orden determinista.

---

## 10.4. UserInterventionSystem — comandos ambientales programados

### Responsabilidad

Aunque no estaba en la lista inicial, este sistema es necesario para mantener la filosofía del proyecto: el usuario modifica el laboratorio, no controla criaturas.

UserInterventionSystem traduce acciones del usuario en cambios ambientales autorizados y programados.

Ejemplos:

- colocar comida;
- provocar lluvia;
- cambiar humedad;
- introducir un depredador;
- agregar piedras;
- crear charcos;
- modificar temperatura;
- iniciar experimento sandbox.

### Entradas

- comandos del usuario;
- modo de simulación;
- estado de pausa o ejecución;
- permisos de herramienta;
- ubicación de intervención;
- parámetros del experimento;
- Tick de aplicación.

### Salidas

- solicitudes ambientales;
- eventos programados;
- registros de intervención;
- cambios de escenario si están permitidos.

### Qué modifica

Solo debe modificar el mundo mediante canales autorizados:

- recursos externos colocados;
- condiciones ambientales;
- entidades introducidas como parte del entorno;
- obstáculos;
- parámetros de laboratorio.

### Qué nunca debe modificar

- decisiones de una criatura;
- tarea asignada a una hormiga específica;
- ruta interna de una entidad;
- feromonas de forma arbitraria salvo herramienta explícita de laboratorio documentada;
- estado mental de organismos;
- resultado de un combate;
- voluntad de una colonia.

### Dependencias

- TimeSystem;
- EventSystem;
- EnvironmentSystem;
- EntitySystem;
- ResourceSystem;
- reglas de herramientas de usuario.

### Posibles errores

- convertir intervención ambiental en control directo;
- aplicar cambios en momentos no deterministas;
- no registrar intervención para replay;
- permitir recursos sin origen conceptual;
- romper escenarios naturales con herramientas sandbox sin marcar el modo.

### Costo computacional esperado

Generalmente bajo. Puede ser alto si una intervención modifica áreas grandes del terreno o clima.

### Paralelización futura

Intervenciones espaciales en regiones independientes podrían prepararse en paralelo, pero su compromiso debe ser determinista.

---

## 10.5. EntitySystem — validación y mantenimiento inicial

### Responsabilidad

EntitySystem mantiene la existencia formal de entidades.

En la fase inicial del Tick valida que el registro de entidades esté coherente antes de que otros sistemas operen.

Puede verificar:

- entidades activas;
- entidades pendientes de creación;
- entidades pendientes de eliminación;
- consistencia de identificadores;
- pertenencia a colonia;
- estado vivo/muerto;
- referencias inválidas;
- integridad mínima.

### Entradas

- registro estable de entidades;
- eventos entrantes activados;
- solicitudes de creación o transformación;
- solicitudes de eliminación diferida;
- estado de escenario.

### Salidas

- registro validado;
- entidades activas para el Tick;
- entidades excluidas por invalidez;
- advertencias de integridad;
- solicitudes preparadas para sistemas correspondientes.

### Qué modifica

- registro de entidades;
- estado administrativo de vida útil;
- referencias de pertenencia básicas;
- marcadores de entidad activa, inactiva o pendiente.

### Qué nunca debe modificar

- hambre;
- decisiones;
- clima;
- recursos internos de colonia;
- movimiento;
- combate;
- reproducción por iniciativa propia;
- render.

### Dependencias

- EventSystem;
- SaveStateSystem;
- reglas de identidad de entidades.

### Posibles errores

- eliminar entidades mientras otros sistemas aún las necesitan;
- crear entidades sin pasar por eventos o sistemas responsables;
- permitir identificadores no deterministas;
- mezclar entidad visual con entidad simulada;
- dejar referencias colgantes.

### Costo computacional esperado

Proporcional al número de entidades activas y cambios pendientes.

### Paralelización futura

La validación de entidades puede dividirse por regiones o tipos, pero la asignación de identidad y compromiso de altas/bajas debe mantenerse determinista.

---

## 10.6. ClimateSystem

### Responsabilidad

ClimateSystem actualiza condiciones climáticas globales o regionales.

Incluye conceptualmente:

- temperatura;
- lluvia;
- humedad ambiental;
- viento;
- sequía;
- ciclos día/noche;
- estaciones futuras;
- tendencias climáticas.

ClimateSystem define fuerzas ambientales de alto nivel, no efectos locales detallados sobre cada entidad.

### Entradas

- tiempo simulado;
- estado climático anterior;
- estación si existe;
- eventos climáticos activos;
- intervenciones del usuario;
- configuración del bioma;
- semilla climática si aplica.

### Salidas

- estado climático actualizado;
- lluvia activa o terminada;
- temperatura ambiente;
- humedad ambiental;
- viento conceptual;
- señales para EnvironmentSystem.

### Qué modifica

- variables climáticas;
- eventos climáticos globales o regionales;
- condiciones macroambientales.

### Qué nunca debe modificar

- salud directa de una hormiga;
- crecimiento directo de una planta;
- feromonas directamente, salvo como factor que PheromoneSystem leerá;
- recursos individuales;
- posición de criaturas;
- decisiones de colonias.

### Dependencias

- TimeSystem;
- UserInterventionSystem;
- configuración ambiental;
- estado estacional futuro.

### Posibles errores

- aplicar efectos locales que pertenecen a EnvironmentSystem;
- matar organismos directamente por clima sin pasar por metabolismo/necesidades;
- borrar feromonas directamente en lugar de influir sobre PheromoneSystem;
- usar azar no determinista;
- convertir clima en evento visual sin consecuencia ecológica.

### Costo computacional esperado

Bajo si el clima es global. Medio o alto si se modelan regiones climáticas o microclimas.

### Paralelización futura

Las regiones climáticas podrían actualizarse en paralelo si no dependen entre sí, con compromiso ordenado.

---

## 10.7. EnvironmentSystem

### Responsabilidad

EnvironmentSystem traduce clima y terreno en condiciones locales del mundo.

Se ocupa de:

- humedad del suelo;
- temperatura local;
- charcos;
- drenaje;
- exposición solar;
- sombra;
- fertilidad ambiental derivada;
- accesibilidad local;
- condiciones de nido si se modelan ambientalmente.

Es la capa que convierte “llueve” en “esta zona está húmeda”, “este suelo retiene agua” o “esta ruta se volvió difícil”.

### Entradas

- estado climático;
- terreno;
- agua;
- suelo;
- obstáculos;
- vegetación que genera sombra;
- intervenciones ambientales;
- tiempo simulado.

### Salidas

- condiciones locales actualizadas;
- zonas húmedas;
- zonas secas;
- modificadores de movimiento;
- señales de riesgo ambiental;
- condiciones para plantas, hongos, criaturas y feromonas.

### Qué modifica

- propiedades ambientales locales;
- humedad local;
- accesibilidad ambiental;
- estado de agua superficial;
- mapas conceptuales de condición del terreno.

### Qué nunca debe modificar

- decisiones de criaturas;
- vida/muerte directa salvo eventos ambientales que serán resueltos por sistemas responsables;
- reservas de colonia;
- genética;
- render;
- inventarios de entidades.

### Dependencias

- ClimateSystem;
- Terrain o representación conceptual de suelo;
- UserInterventionSystem;
- ResourceSystem para agua o materia ambiental si aplica.

### Posibles errores

- duplicar responsabilidad con ClimateSystem;
- modificar entidades directamente;
- no conservar causalidad espacial;
- aplicar cambios globales sin respetar terreno;
- generar microclimas no reproducibles.

### Costo computacional esperado

Depende de la granularidad espacial. Puede ser bajo en mundo pequeño, alto en mapas grandes con muchas celdas o regiones.

### Paralelización futura

Alta posibilidad. Las regiones del entorno pueden actualizarse por particiones espaciales, siempre que bordes y flujos sean resueltos de forma determinista.

---

## 10.8. PlantSystem

### Responsabilidad

PlantSystem actualiza la vida vegetal.

Se ocupa de:

- crecimiento;
- estrés hídrico;
- estrés térmico;
- consumo de nutrientes;
- producción de semillas;
- muerte vegetal;
- competencia por luz, espacio, agua y nutrientes;
- transformación en materia orgánica al morir.

### Entradas

- condiciones ambientales locales;
- nutrientes del suelo;
- humedad;
- luz;
- temperatura;
- estado actual de plantas;
- competencia cercana;
- tiempo simulado;
- eventos de daño o consumo.

### Salidas

- plantas crecidas, estresadas o muertas;
- semillas producidas;
- materia orgánica generada;
- consumo de nutrientes;
- señales para ResourceSystem y DecaySystem.

### Qué modifica

- estado de plantas;
- madurez;
- salud vegetal;
- producción de semillas;
- muerte vegetal;
- solicitudes de creación de semillas o materia orgánica.

### Qué nunca debe modificar

- decisiones de hormigas;
- consumo directo por animales;
- clima;
- feromonas;
- combate;
- genética animal;
- render.

### Dependencias

- EnvironmentSystem;
- ResourceSystem;
- TimeSystem;
- DecaySystem para materia muerta.

### Posibles errores

- crear semillas sin costo energético o ambiental;
- crecer sin luz, agua o nutrientes;
- morir sin generar consecuencia material;
- duplicar consumo de nutrientes;
- producir recursos antes de que el ambiente esté actualizado.

### Costo computacional esperado

Proporcional al número de plantas y a la complejidad de competencia espacial.

### Paralelización futura

Alta. Plantas en regiones independientes pueden actualizarse en paralelo, con cuidado en competencia por recursos compartidos.

---

## 10.9. ResourceSystem

### Responsabilidad

ResourceSystem mantiene recursos materiales disponibles en el mundo.

Incluye:

- comida;
- semillas como recurso;
- agua disponible;
- nutrientes;
- materia orgánica;
- reservas ambientales;
- recursos transportables;
- recursos almacenables.

Debe garantizar que todo recurso tenga origen, destino y cantidad coherente.

### Entradas

- producción de PlantSystem;
- agua de EnvironmentSystem;
- materia de DecaySystem;
- intervenciones del usuario;
- consumo solicitado por InteractionSystem del Tick anterior o fases resueltas;
- eventos diferidos.

### Salidas

- recursos disponibles;
- recursos degradados;
- recursos agotados;
- solicitudes de descomposición;
- cambios de cantidad;
- disponibilidad para percepción e interacción.

### Qué modifica

- cantidades de recursos;
- estado de recursos;
- disponibilidad;
- degradación material;
- pertenencia o ubicación de recursos cuando corresponde.

### Qué nunca debe modificar

- hambre directa de criaturas;
- decisiones;
- clima;
- combate;
- genética;
- render;
- crecimiento vegetal por sí mismo.

### Dependencias

- PlantSystem;
- EnvironmentSystem;
- DecaySystem;
- UserInterventionSystem;
- InteractionSystem para solicitudes resueltas.

### Posibles errores

- permitir consumo doble del mismo recurso;
- crear recursos sin origen;
- destruir materia sin destino;
- mezclar recursos visuales con recursos reales;
- no diferenciar recurso disponible de recurso reservado;
- actualizar después de percepción si las criaturas necesitan estado actual.

### Costo computacional esperado

Proporcional a recursos activos. Puede crecer mucho si cada partícula de materia se modela individualmente.

### Paralelización futura

Media o alta. Recursos por región pueden procesarse en paralelo. Los recursos disputados requieren resolución determinista central o regional.

---

## 10.10. DecaySystem

### Responsabilidad

DecaySystem actualiza procesos de descomposición.

Se ocupa de:

- cadáveres;
- materia orgánica;
- hojas muertas;
- comida podrida;
- actividad de hongos;
- microorganismos conceptuales;
- generación de nutrientes;
- degradación de recursos orgánicos.

### Entradas

- cadáveres;
- materia orgánica;
- humedad local;
- temperatura;
- presencia de hongos;
- tiempo simulado;
- estado de suelo;
- eventos de muerte.

### Salidas

- avance de descomposición;
- nutrientes producidos;
- hongos fortalecidos o debilitados;
- materia orgánica reducida;
- riesgos sanitarios;
- eventos de recurso transformado.

### Qué modifica

- estado de cadáveres y restos;
- nivel de descomposición;
- nutrientes del suelo;
- biomasa fúngica si aplica;
- disponibilidad de materia orgánica.

### Qué nunca debe modificar

- decisiones de criaturas;
- clima global;
- movimiento;
- combate;
- reproducción animal directa;
- render.

### Dependencias

- EnvironmentSystem;
- ResourceSystem;
- EntitySystem para cadáveres;
- TimeSystem.

### Posibles errores

- hacer desaparecer cadáveres sin nutrientes;
- generar nutrientes sin materia;
- ignorar humedad;
- duplicar conversión con ResourceSystem;
- procesar cadáveres antes de que existan formalmente.

### Costo computacional esperado

Proporcional a cadáveres, restos y zonas con actividad fúngica.

### Paralelización futura

Alta por partición espacial. Los procesos de descomposición son generalmente locales.

---

## 10.11. PheromoneSystem — fase ambiental de señales

### Responsabilidad

En esta fase, PheromoneSystem actualiza señales existentes antes de que las criaturas perciban.

Se ocupa de:

- evaporación;
- difusión conceptual;
- debilitamiento por lluvia;
- dispersión por viento;
- saturación;
- interferencia;
- limpieza de señales agotadas.

### Entradas

- señales químicas existentes;
- humedad;
- lluvia;
- viento;
- terreno;
- tiempo simulado;
- tipo de feromona;
- intensidad previa.

### Salidas

- mapa o conjunto actualizado de señales;
- señales debilitadas;
- señales eliminadas;
- señales disponibles para percepción.

### Qué modifica

- intensidad de feromonas existentes;
- distribución de señales;
- estado de degradación;
- disponibilidad perceptiva.

### Qué nunca debe modificar

- decisión de hormigas;
- movimiento;
- recursos;
- clima;
- vida/muerte;
- colonia directamente;
- render.

### Dependencias

- EnvironmentSystem;
- ClimateSystem;
- TimeSystem.

### Posibles errores

- aplicar emisiones nuevas antes de resolver acciones;
- borrar señales sin considerar clima;
- permitir señales eternas;
- permitir información instantánea global;
- actualizar después de percepción si se espera que las criaturas perciban señales actuales.

### Costo computacional esperado

Puede ser bajo si las señales son escasas. Puede ser alto si se representan como campos densos sobre el mundo.

### Paralelización futura

Alta si se particiona espacialmente. Deben resolverse bordes de difusión de forma determinista.

---

## 10.12. MetabolismSystem

### Responsabilidad

MetabolismSystem actualiza el consumo interno de energía y efectos fisiológicos básicos de organismos.

Incluye:

- gasto energético por existencia;
- costo de actividad previa;
- efectos de temperatura;
- fatiga acumulada;
- estrés hídrico o térmico;
- recuperación parcial por descanso;
- deterioro por falta de alimento.

### Entradas

- tiempo simulado;
- estado fisiológico previo;
- actividad del Tick anterior o costos comprometidos;
- condiciones ambientales locales;
- especie;
- edad;
- carga transportada;
- estado de descanso o actividad.

### Salidas

- energía actualizada;
- fatiga actualizada;
- estrés fisiológico;
- salud modificada si corresponde;
- señales para NeedsSystem;
- posibles solicitudes de muerte por colapso fisiológico.

### Qué modifica

- energía;
- fatiga;
- salud fisiológica;
- estrés interno;
- recuperación.

### Qué nunca debe modificar

- decisiones de tarea directamente;
- recursos externos;
- clima;
- movimiento del Tick actual;
- combate;
- colonia directamente;
- render.

### Dependencias

- EnvironmentSystem;
- TimeSystem;
- EntitySystem;
- registros de actividad anterior.

### Posibles errores

- duplicar costos de movimiento;
- aplicar hambre en NeedsSystem y MetabolismSystem de forma redundante;
- matar directamente sin evento o fase de ciclo de vida;
- ignorar pausa;
- usar tiempo real.

### Costo computacional esperado

Proporcional al número de organismos vivos.

### Paralelización futura

Alta. El metabolismo individual es local y puede procesarse por lotes, con resultados comprometidos de forma determinista.

---

## 10.13. NeedsSystem

### Responsabilidad

NeedsSystem deriva necesidades conductuales a partir de estados internos y condiciones relevantes.

Convierte fisiología y contexto en presiones como:

- hambre;
- sed si aplica;
- cansancio;
- necesidad de seguridad;
- necesidad de regresar al nido;
- necesidad de alimentar larvas;
- necesidad de evitar peligro;
- necesidad de explorar;
- necesidad de defensa.

NeedsSystem no decide acciones finales. Calcula presiones.

### Entradas

- estado metabólico;
- salud;
- energía;
- fatiga;
- rol;
- especie;
- estado de colonia;
- contexto ambiental básico;
- edad;
- carga.

### Salidas

- prioridades internas;
- necesidades individuales;
- presión de tarea;
- advertencias de necesidad crítica.

### Qué modifica

- estado de necesidades;
- niveles de prioridad interna;
- marcadores de urgencia.

### Qué nunca debe modificar

- movimiento;
- recursos;
- feromonas;
- decisiones finales;
- combate;
- clima;
- render.

### Dependencias

- MetabolismSystem;
- ColonySystem del Tick anterior para presiones colectivas;
- EntitySystem;
- TimeSystem.

### Posibles errores

- tomar decisiones en lugar de preparar prioridades;
- leer estado de colonia del futuro;
- ignorar estados fisiológicos;
- generar necesidades incompatibles sin resolución clara;
- convertir necesidades colectivas en control directo.

### Costo computacional esperado

Proporcional al número de organismos con conducta.

### Paralelización futura

Alta. Las necesidades se calculan individualmente, aunque algunas dependan de estado colectivo ya estable.

---

## 10.14. PerceptionSystem

### Responsabilidad

PerceptionSystem construye la percepción local de cada criatura.

No entrega conocimiento global. Entrega una vista limitada según sensores, especie, estado, ambiente y señales.

Puede incluir:

- comida cercana;
- feromonas cercanas;
- otras criaturas cercanas;
- obstáculos;
- humedad local;
- peligro cercano;
- cadáveres;
- entrada del nido si está en rango;
- señales de alarma;
- presas o depredadores detectables.

### Entradas

- estado ambiental actualizado;
- señales actualizadas;
- posiciones de entidades;
- recursos disponibles;
- obstáculos;
- sensores de la criatura;
- estado fisiológico que afecte percepción;
- condiciones de luz o clima.

### Salidas

- percepción local por criatura;
- estímulos detectados;
- incertidumbre perceptiva;
- datos para DecisionSystem.

### Qué modifica

- buffers o registros de percepción;
- memoria sensorial de corto plazo si se define como parte perceptiva.

### Qué nunca debe modificar

- mundo físico;
- recursos;
- decisiones finales;
- feromonas;
- posición;
- salud;
- combate;
- render.

### Dependencias

- EnvironmentSystem;
- PheromoneSystem;
- ResourceSystem;
- EntitySystem;
- MovementSystem del Tick anterior para posiciones estables.

### Posibles errores

- entregar información global;
- permitir percepción a través de obstáculos sin regla;
- detectar entidades inexistentes;
- usar posición visual interpolada;
- mezclar percepción con decisión;
- olvidar que clima afecta señales.

### Costo computacional esperado

Potencialmente alto. Puede crecer con el número de entidades y vecinos cercanos.

### Paralelización futura

Alta, especialmente usando particiones espaciales. Debe preservarse orden determinista para estímulos equivalentes.

---

## 10.15. DecisionSystem

### Responsabilidad

DecisionSystem selecciona la intención conductual de cada criatura a partir de:

- necesidades;
- percepción;
- memoria limitada;
- rol;
- estado fisiológico;
- señales;
- reglas de especie;
- presión colectiva indirecta.

No ejecuta acciones físicas. Decide qué desea intentar hacer.

### Entradas

- percepción local;
- necesidades;
- memoria limitada;
- rol;
- estado interno;
- tarea actual;
- señales de colonia;
- rasgos individuales si existen;
- semilla aleatoria controlada para variación.

### Salidas

- intención conductual;
- cambio de prioridad;
- solicitud de tarea;
- intención de huida, búsqueda, recolección, ataque, descanso, cuidado, retorno o exploración.

### Qué modifica

- intención actual;
- estado de decisión;
- memoria individual limitada si corresponde;
- selección de objetivo conceptual, no posesión garantizada.

### Qué nunca debe modificar

- posición;
- recursos;
- salud de otros;
- muerte;
- feromonas directas;
- reservas de colonia;
- clima;
- render.

### Dependencias

- PerceptionSystem;
- NeedsSystem;
- estado de tareas anterior;
- ColonySystem del Tick anterior;
- GeneticsSystem para rasgos si existen.

### Posibles errores

- resolver acciones directamente;
- usar información no percibida;
- crear inteligencia individual excesiva;
- producir decisiones no reproducibles;
- ignorar conflictos de prioridad;
- dejar que una colonia controle individuos directamente.

### Costo computacional esperado

Proporcional al número de criaturas con conducta. Puede aumentar con complejidad de reglas.

### Paralelización futura

Alta. Decisiones individuales pueden calcularse en paralelo si todas leen estado estable y producen intenciones separadas.

---

## 10.16. TaskSystem

### Responsabilidad

TaskSystem convierte intenciones en tareas operativas y solicitudes de acción.

Es el puente entre “quiero buscar comida” y “voy a moverme hacia una dirección”, “quiero recoger esa semilla” o “quiero volver al nido”.

Coordina:

- continuidad de tareas;
- interrupción por peligro;
- selección de objetivo local;
- preparación de movimiento;
- preparación de interacción;
- preparación de emisión de señales;
- solicitudes de reserva conceptual.

### Entradas

- intenciones de DecisionSystem;
- tarea previa;
- percepción;
- restricciones físicas;
- estado de carga;
- rol;
- memoria limitada;
- disponibilidad de objetivos.

### Salidas

- tarea activa;
- intención de movimiento;
- intención de interacción;
- intención de ataque o defensa;
- intención de emisión de feromona;
- intención de descanso.

### Qué modifica

- estado de tarea de la entidad;
- objetivos tentativos;
- solicitudes de acción;
- continuidad o cancelación de tarea.

### Qué nunca debe modificar

- posición real;
- recurso consumido;
- muerte;
- daño;
- clima;
- reservas;
- render.

### Dependencias

- DecisionSystem;
- PerceptionSystem;
- EntitySystem;
- ResourceSystem para disponibilidad leída, no modificación.

### Posibles errores

- garantizar éxito de una acción antes de resolución;
- reservar recursos sin pasar por reglas de conflicto;
- mover entidades directamente;
- duplicar lógica de decisión;
- ignorar interrupciones críticas.

### Costo computacional esperado

Proporcional a entidades activas con tareas.

### Paralelización futura

Alta. La preparación de tareas es individual. Las reservas o conflictos deben resolverse luego de forma determinista.

---

## 10.17. MovementSystem

### Responsabilidad

MovementSystem resuelve desplazamiento físico o espacial.

Se ocupa de:

- movimiento según tarea;
- restricciones del terreno;
- obstáculos;
- velocidad;
- carga;
- fatiga;
- pendientes;
- agua;
- colisiones suaves o duras;
- ocupación espacial;
- llegada a rangos de interacción.

### Entradas

- intenciones de movimiento;
- posiciones actuales;
- terreno;
- obstáculos;
- estado físico de entidades;
- carga;
- fatiga;
- reglas de ocupación;
- señales de huida o persecución.

### Salidas

- nuevas posiciones estables;
- movimientos fallidos;
- colisiones;
- bloqueos;
- costos de movimiento para metabolismo futuro;
- solicitudes de conflicto espacial;
- eventos de llegada o contacto.

### Qué modifica

- posición real;
- orientación simulada si aplica;
- estado de movimiento;
- costos físicos derivados;
- ocupación espacial.

### Qué nunca debe modificar

- decisiones;
- recursos consumidos;
- salud por combate;
- clima;
- feromonas directamente salvo emitir intención posterior;
- reservas;
- render.

### Dependencias

- TaskSystem;
- EnvironmentSystem;
- EntitySystem;
- reglas de terreno;
- orden de conflictos espaciales.

### Posibles errores

- permitir atravesar obstáculos;
- resolver ocupación sin determinismo;
- usar posición visual;
- ignorar carga o fatiga;
- ejecutar interacciones al llegar en lugar de dejarlo a InteractionSystem;
- mezclar pathfinding con decisión ecológica profunda.

### Costo computacional esperado

Alto si hay muchas entidades móviles. Depende de vecinos, obstáculos y complejidad del terreno.

### Paralelización futura

Media o alta. Movimiento por regiones puede paralelizarse, pero entidades en bordes o conflictos de ocupación requieren resolución determinista.

---

## 10.18. CombatSystem

### Responsabilidad

CombatSystem resuelve ataques, defensa, captura, daño, muerte por combate y consecuencias inmediatas de violencia ecológica.

Incluye:

- ataques de depredadores;
- defensa de hormigas;
- conflictos entre colonias;
- captura de presas;
- daño;
- huida fallida;
- muertes;
- generación de cadáveres;
- señales de alarma diferidas.

### Entradas

- intenciones de ataque;
- posiciones resultantes de MovementSystem;
- proximidad;
- estado de salud;
- tamaño;
- rol;
- especie;
- energía;
- defensa;
- prioridad de conflicto;
- azar controlado si aplica.

### Salidas

- daño aplicado;
- organismos muertos o heridos;
- ataques fallidos;
- presas capturadas;
- señales de peligro;
- cadáveres solicitados;
- eventos de amenaza.

### Qué modifica

- salud;
- estado de combate;
- vida/muerte pendiente;
- heridas;
- solicitudes de cadáver;
- eventos de alarma.

### Qué nunca debe modificar

- movimiento posterior del mismo Tick;
- recursos no relacionados;
- clima;
- crecimiento;
- reproducción;
- render;
- decisiones retroactivas.

### Dependencias

- MovementSystem;
- TaskSystem;
- EntitySystem;
- reglas de especies;
- EventSystem para consecuencias diferidas.

### Posibles errores

- permitir múltiples depredadores consumir la misma presa sin resolución;
- matar entidad y dejarla interactuar después;
- modificar población sin pasar por PopulationSystem;
- generar cadáver doble;
- usar azar no controlado;
- resolver conflictos según orden accidental de colección.

### Costo computacional esperado

Proporcional a conflictos activos, no necesariamente a todas las entidades. Puede ser alto en guerras o zonas densas.

### Paralelización futura

Media. Conflictos independientes pueden resolverse por región, pero conflictos sobre la misma presa o espacio requieren arbitraje determinista.

---

## 10.19. InteractionSystem

### Responsabilidad

InteractionSystem resuelve interacciones no combativas entre entidades, recursos y estructuras.

Incluye:

- recoger comida;
- entregar comida al nido;
- alimentar larvas;
- beber agua si aplica;
- transportar cadáveres;
- limpiar nido;
- depositar recursos;
- consumir recursos;
- interacción con semillas;
- contacto social simple;
- uso de refugio.

### Entradas

- entidades sobrevivientes tras CombatSystem;
- intenciones de interacción;
- posiciones estables;
- recursos disponibles;
- estado de carga;
- estado de colonia;
- reglas de prioridad;
- disponibilidad de objetivo.

### Salidas

- recursos recogidos o consumidos;
- reservas modificadas;
- larvas alimentadas;
- carga cambiada;
- recursos agotados;
- interacciones fallidas;
- eventos de entrega, consumo o transformación.

### Qué modifica

- inventario/carga de entidades;
- cantidad de recursos;
- reservas de nido mediante canal autorizado;
- estado de larvas alimentadas;
- estado de interacción.

### Qué nunca debe modificar

- clima;
- movimiento;
- decisiones anteriores;
- daño de combate;
- genética;
- render;
- plantas fuera de eventos de consumo autorizados.

### Dependencias

- CombatSystem;
- MovementSystem;
- ResourceSystem;
- ColonySystem del Tick anterior para restricciones;
- EntitySystem.

### Posibles errores

- consumo doble;
- entregar recursos a una colonia incorrecta;
- permitir que entidades muertas interactúen;
- cambiar reservas sin registro;
- resolver disputa por recurso sin reglas deterministas.

### Costo computacional esperado

Proporcional al número de interacciones activas. Puede aumentar en zonas de comida concentrada.

### Paralelización futura

Media. Interacciones con recursos independientes pueden paralelizarse. Recursos compartidos requieren arbitraje.

---

## 10.20. PheromoneSystem — fase de emisión y compromiso

### Responsabilidad

En esta fase, PheromoneSystem compromete nuevas señales emitidas durante el Tick.

Las emisiones pueden provenir de:

- rutas de comida;
- retorno al nido;
- alarma;
- exploración;
- defensa;
- cadáveres;
- limpieza;
- territorio.

### Entradas

- intenciones de emisión generadas por TaskSystem, MovementSystem, CombatSystem o InteractionSystem;
- posición final de entidades;
- tipo de señal;
- intensidad;
- estado fisiológico;
- clima local;
- terreno.

### Salidas

- nuevas señales comprometidas;
- señales reforzadas;
- registros de emisión;
- mapas actualizados para el siguiente Tick.

### Qué modifica

- campo o conjunto de feromonas;
- intensidad por tipo;
- historial de señales si existe.

### Qué nunca debe modificar

- decisiones actuales ya tomadas;
- movimiento actual;
- recursos;
- salud;
- clima;
- render;
- estado de colonia directamente.

### Dependencias

- MovementSystem;
- CombatSystem;
- InteractionSystem;
- EnvironmentSystem;
- reglas de feromonas.

### Posibles errores

- permitir que una señal emitida en el mismo Tick afecte decisiones ya cerradas;
- duplicar emisiones;
- emitir desde entidades muertas sin regla;
- ignorar lluvia o terreno;
- usar feromona como orden absoluta.

### Costo computacional esperado

Depende del número de emisiones y de la representación espacial. Puede ser alto en colonias grandes.

### Paralelización futura

Alta para emisiones locales, con compromiso determinista de señales coincidentes.

---

## 10.21. ColonySystem

### Responsabilidad

ColonySystem actualiza el estado colectivo de colonias después de las acciones individuales.

Calcula o actualiza:

- reservas;
- población funcional;
- presión alimenticia;
- nivel de amenaza;
- actividad de recolección;
- actividad de defensa;
- salud del nido;
- estado de larvas;
- necesidad de expansión;
- estrés colectivo;
- éxito de rutas;
- pérdidas recientes.

### Entradas

- resultados de InteractionSystem;
- resultados de CombatSystem;
- señales emitidas;
- reservas;
- larvas;
- huevos;
- reina;
- población;
- amenazas detectadas;
- eventos de muerte;
- estado ambiental del nido.

### Salidas

- estado global actualizado de colonia;
- presiones colectivas para Tick siguiente;
- eventos de alerta;
- condiciones para reproducción;
- condiciones para expansión o migración futura.

### Qué modifica

- estado colectivo de colonia;
- métricas internas de colonia;
- reservas agregadas;
- presión alimenticia;
- nivel de amenaza;
- señales colectivas abstractas.

### Qué nunca debe modificar

- decisiones individuales ya tomadas;
- posición de hormigas;
- comportamiento directo de una obrera;
- clima;
- recursos externos no entregados;
- render.

### Dependencias

- InteractionSystem;
- CombatSystem;
- EntitySystem;
- ResourceSystem;
- EnvironmentSystem para nido;
- PopulationSystem del Tick anterior.

### Posibles errores

- actuar como cerebro central controlador;
- asignar órdenes directas a individuos;
- leer resultados futuros;
- no reflejar pérdidas o entregas del Tick;
- mezclar estadísticas visuales con estado real.

### Costo computacional esperado

Proporcional al número de colonias y agregaciones de miembros. Bajo con pocas colonias, medio con colonias enormes.

### Paralelización futura

Alta entre colonias independientes. Dentro de una colonia grande, agregaciones pueden prepararse por grupos y comprometerse de forma determinista.

---

## 10.22. ReproductionSystem

### Responsabilidad

ReproductionSystem evalúa y procesa reproducción biológica.

Incluye:

- producción de huevos;
- viabilidad reproductiva;
- maduración de etapas si se decide ubicar aquí;
- inversión reproductiva;
- restricciones por alimento;
- salud de reina;
- condiciones ambientales;
- presión poblacional.

### Entradas

- estado de colonia;
- salud de reina;
- reservas;
- población;
- presión alimenticia;
- ambiente del nido;
- genética si influye;
- tiempo simulado;
- condiciones de especie.

### Salidas

- solicitudes de nuevos huevos;
- reproducción bloqueada;
- reducción reproductiva por estrés;
- eventos de ciclo de vida;
- solicitudes para GeneticsSystem.

### Qué modifica

- estado reproductivo;
- solicitudes de nacimiento o puesta;
- progreso reproductivo.

### Qué nunca debe modificar

- rasgos genéticos finales sin GeneticsSystem;
- población final sin PopulationSystem;
- recursos externos;
- decisiones individuales;
- movimiento;
- render.

### Dependencias

- ColonySystem;
- EnvironmentSystem;
- TimeSystem;
- GeneticsSystem para herencia posterior.

### Posibles errores

- crear individuos completos sin etapas;
- reproducir sin costo;
- ignorar reservas;
- aumentar población sin presión ecológica;
- duplicar nacimientos.

### Costo computacional esperado

Bajo o medio, salvo sistemas reproductivos masivos.

### Paralelización futura

Alta entre colonias o especies independientes.

---

## 10.23. GeneticsSystem

### Responsabilidad

GeneticsSystem define herencia, rasgos y variación biológica cuando el diseño del ecosistema lo permita.

No debe convertirse en magia de mejora gratuita. Todo rasgo debe tener costo, beneficio y consecuencia ecológica.

Puede influir en:

- velocidad;
- resistencia;
- sensibilidad a feromonas;
- tolerancia a humedad;
- tamaño;
- eficiencia metabólica;
- agresividad;
- fertilidad;
- longevidad.

### Entradas

- eventos reproductivos;
- rasgos parentales o de colonia;
- semilla genética;
- presión ambiental si se decide incluir selección;
- reglas de herencia;
- mutación controlada.

### Salidas

- rasgos asignados a nuevos organismos;
- variación heredable;
- eventos genéticos;
- datos para PopulationSystem.

### Qué modifica

- rasgos de nuevas entidades;
- información hereditaria;
- variaciones definidas.

### Qué nunca debe modificar

- comportamiento instantáneo de una criatura adulta sin causa;
- clima;
- recursos;
- movimiento;
- combate;
- decisiones directas;
- render.

### Dependencias

- ReproductionSystem;
- EntitySystem;
- reglas de especie;
- semilla aleatoria controlada.

### Posibles errores

- permitir evolución instantánea sin generaciones;
- crear rasgos sin costo;
- modificar individuos existentes arbitrariamente;
- mezclar edición genética del usuario con genética natural sin registro;
- romper reproducibilidad por azar no controlado.

### Costo computacional esperado

Bajo al inicio. Puede crecer si se modelan poblaciones grandes con rasgos complejos.

### Paralelización futura

Alta. Asignación genética por nacimiento puede procesarse en lotes con canales de aleatoriedad deterministas.

---

## 10.24. PopulationSystem

### Responsabilidad

PopulationSystem actualiza agregados poblacionales y transiciones demográficas.

Se ocupa de:

- conteo de vivos;
- conteo de muertos;
- huevos;
- larvas;
- adultas;
- roles;
- castas;
- especies;
- colonias;
- tasas de nacimiento;
- tasas de muerte;
- colapsos o crecimientos.

### Entradas

- muertes de CombatSystem;
- muertes fisiológicas solicitadas;
- nacimientos de ReproductionSystem;
- rasgos de GeneticsSystem;
- estado de EntitySystem;
- estado de colonias.

### Salidas

- población actualizada;
- métricas demográficas;
- solicitudes finales de creación o eliminación;
- eventos de umbral poblacional;
- alertas de sobrepoblación o colapso.

### Qué modifica

- contadores poblacionales;
- estado demográfico;
- solicitudes de ciclo de vida;
- pertenencia poblacional.

### Qué nunca debe modificar

- decisiones individuales;
- recursos;
- clima;
- movimiento;
- combate ya resuelto;
- render.

### Dependencias

- ReproductionSystem;
- GeneticsSystem;
- CombatSystem;
- MetabolismSystem para muertes fisiológicas;
- EntitySystem.

### Posibles errores

- contar entidades pendientes como activas antes de compromiso;
- duplicar muertes;
- perder cadáveres;
- actualizar colonia antes de que ColonySystem cierre;
- mezclar estadísticas con estado real.

### Costo computacional esperado

Bajo a medio, proporcional a cambios demográficos y entidades activas.

### Paralelización futura

Alta para conteos por especie, colonia o región, con reducción determinista.

---

## 10.25. EntitySystem — compromiso final de ciclo de vida

### Responsabilidad

En la fase final, EntitySystem compromete altas, bajas y transformaciones aprobadas durante el Tick.

Incluye:

- convertir muertes en cadáveres;
- crear huevos;
- retirar entidades destruidas;
- aplicar transformaciones de etapa;
- limpiar referencias;
- estabilizar registro para el siguiente Tick.

### Entradas

- solicitudes de PopulationSystem;
- eventos de muerte;
- solicitudes de nacimiento;
- transformaciones de DecaySystem;
- eventos diferidos salientes;
- reglas de identidad.

### Salidas

- registro estable de entidades para el siguiente Tick;
- cadáveres formalizados;
- nuevas entidades pendientes o activas según regla;
- referencias limpias;
- eventos de entidad creada o eliminada.

### Qué modifica

- existencia formal de entidades;
- identidad;
- estado vivo/muerto;
- registros de ciclo de vida;
- referencias estructurales.

### Qué nunca debe modificar

- causa de muerte;
- decisiones;
- clima;
- recursos no relacionados;
- estadísticas ya interpretadas;
- render.

### Dependencias

- PopulationSystem;
- CombatSystem;
- ReproductionSystem;
- DecaySystem;
- EventSystem.

### Posibles errores

- crear entidad activa demasiado pronto;
- eliminar antes de que estadísticas y eventos la registren;
- perder trazabilidad causal;
- duplicar cadáver;
- romper referencias de colonia.

### Costo computacional esperado

Proporcional al número de entidades creadas, eliminadas o transformadas.

### Paralelización futura

Limitada en el compromiso final. La preparación puede paralelizarse, pero el registro oficial debe cerrarse determinísticamente.

---

## 10.26. EventSystem — publicación y diferimiento saliente

### Responsabilidad

Al final del Tick, EventSystem organiza los eventos generados durante la actualización.

Clasifica eventos en:

- eventos observables;
- eventos de dominio;
- eventos diferidos para Ticks futuros;
- eventos estadísticos;
- eventos de debugging;
- eventos descartados o fusionados.

### Entradas

- eventos generados por sistemas;
- estado estable final;
- reglas de diferimiento;
- prioridades;
- índice de Tick;
- dependencias temporales.

### Salidas

- cola de eventos futuros;
- bitácora de eventos del Tick;
- eventos visibles para UI o debugging;
- eventos para StatisticsSystem si corresponde;
- alertas de inconsistencia.

### Qué modifica

- cola de eventos;
- log de eventos;
- estado de publicación.

### Qué nunca debe modificar

- mundo físico ya cerrado;
- recursos;
- decisiones;
- combate;
- reproducción;
- render directamente.

### Dependencias

- todos los sistemas que generan eventos;
- TimeSystem;
- reglas de ordenamiento.

### Posibles errores

- publicar eventos antes de que el mundo esté estable;
- ejecutar eventos salientes inmediatamente sin fase;
- perder eventos importantes;
- saturar log con ruido;
- crear eventos recursivos infinitos.

### Costo computacional esperado

Proporcional a eventos generados. Puede crecer mucho en guerras, colapsos o grandes migraciones.

### Paralelización futura

Clasificación puede paralelizarse. Orden final debe ser determinista.

---

## 10.27. StatisticsSystem

### Responsabilidad

StatisticsSystem observa el estado final del Tick y calcula métricas.

Puede registrar:

- población;
- reservas;
- muertes;
- nacimientos;
- comida recolectada;
- distancia recorrida;
- feromonas activas;
- presión alimenticia;
- humedad promedio;
- crecimiento vegetal;
- descomposición;
- amenazas;
- rendimiento de sistemas;
- métricas de experimento.

### Entradas

- estado estable final;
- eventos del Tick;
- métricas de sistemas;
- configuración de experimento;
- índice de Tick.

### Salidas

- estadísticas agregadas;
- series temporales;
- alertas;
- datos para observación;
- métricas de debugging;
- resúmenes de escenario.

### Qué modifica

- registros estadísticos;
- métricas;
- informes;
- datos derivados no autoritativos.

### Qué nunca debe modificar

- estado real de simulación;
- decisiones;
- recursos;
- entidades;
- clima;
- render como fuente de verdad.

### Dependencias

- EventSystem saliente;
- estado final de todos los sistemas;
- TimeSystem.

### Posibles errores

- modificar el mundo por accidente;
- contar estados parciales;
- mezclar estadísticas con lógica;
- generar dependencia inversa donde sistemas leen estadísticas para decidir en el mismo Tick;
- registrar demasiados datos sin estrategia.

### Costo computacional esperado

Bajo a alto según cantidad de métricas. Las series históricas pueden crecer mucho.

### Paralelización futura

Alta para agregaciones. Debe mantenerse consistencia de series y orden temporal.

---

## 10.28. SaveStateSystem — fase de frontera final

### Responsabilidad

En la frontera final, SaveStateSystem captura un estado estable después de que todos los sistemas terminaron.

Puede producir:

- guardado manual;
- checkpoint;
- snapshot de replay;
- estado para comparación experimental;
- punto de rollback para debugging.

### Entradas

- estado estable final;
- índice de Tick;
- semilla y posición aleatoria;
- cola de eventos futuros;
- configuración;
- historial de intervenciones;
- versión de reglas.

### Salidas

- snapshot reproducible;
- confirmación de guardado;
- errores de serialización conceptual;
- metadatos de experimento.

### Qué modifica

- almacenamiento de snapshots;
- metadatos de guardado;
- historial de escenarios.

### Qué nunca debe modificar

- estado de simulación como efecto secundario;
- decisiones;
- recursos;
- entidades;
- render;
- orden de eventos.

### Dependencias

- StatisticsSystem si el snapshot incluye métricas;
- EventSystem;
- TimeSystem;
- EntitySystem final.

### Posibles errores

- guardar sin eventos futuros;
- perder semilla;
- guardar estado visual en vez de estado simulado;
- capturar datos derivados como si fueran autoridad;
- no registrar versión de reglas.

### Costo computacional esperado

Bajo si no hay guardado. Alto durante snapshots completos.

### Paralelización futura

Serialización puede prepararse por bloques, pero el snapshot debe representar un único Tick estable.

---

## 10.29. RendererBridge

### Responsabilidad

RendererBridge expone una vista segura, de solo lectura, para la capa visual.

No es el renderizador. Es una frontera entre simulación y representación.

Prepara datos como:

- entidades visibles;
- posiciones estables;
- orientaciones;
- estados visuales sugeridos;
- animaciones sugeridas;
- mapas de depuración;
- señales visualizables;
- estadísticas visibles;
- eventos relevantes para UI.

### Entradas

- estado estable final;
- estadísticas;
- eventos observables;
- configuración de observación;
- modo visual.

### Salidas

- snapshot visual de solo lectura;
- datos derivados para render;
- mapas de overlay;
- información de debug visual.

### Qué modifica

- únicamente estructuras derivadas de presentación;
- cachés visuales no autoritativas;
- adaptadores de observación.

### Qué nunca debe modificar

- estado de simulación;
- entidades reales;
- recursos;
- clima;
- decisiones;
- feromonas reales;
- estadísticas autoritativas;
- eventos.

### Dependencias

- todos los sistemas de simulación ya cerrados;
- StatisticsSystem;
- EventSystem;
- configuración visual.

### Posibles errores

- convertirse en fuente de verdad;
- interpolar y devolver datos interpolados a la simulación;
- filtrar objetos visuales como entidades reales;
- afectar rendimiento del Tick por preparar demasiados datos;
- acoplarse a Three.js, React o un renderizador específico en el núcleo.

### Costo computacional esperado

Depende de cantidad de entidades visibles y overlays. Puede ser alto si prepara datos masivos cada Tick.

### Paralelización futura

Media o alta. Preparar vistas por región o tipo puede paralelizarse. La frontera de solo lectura debe mantenerse estricta.

---

# 11. Orden de resolución de conflictos

## 11.1. Principio general

Un conflicto ocurre cuando dos o más entidades, sistemas o procesos intentan afectar el mismo recurso, espacio, presa, señal o estado de forma incompatible durante el mismo Tick.

El conflicto no debe resolverse por accidente. No debe depender del orden casual de una colección, del renderizador, del hardware o del azar no controlado.

Todo conflicto debe resolverse por:

1. sistema responsable;
2. fase definida;
3. prioridad explícita;
4. desempate determinista;
5. registro opcional para debugging.

## 11.2. Conflictos de comida

Ejemplo: dos animales llegan a la misma comida.

Sistema responsable: **InteractionSystem**, con apoyo de ResourceSystem.

Momento: después de MovementSystem y CombatSystem.

Regla conceptual:

- primero se confirma que ambas entidades están vivas y en rango;
- luego se valida que el recurso existe y está disponible;
- si el recurso puede dividirse, puede repartirse según reglas de cantidad;
- si el recurso es indivisible, se aplica prioridad ecológica o desempate determinista;
- el recurso pasa a estado consumido, cargado o reducido;
- los perdedores reciben interacción fallida y podrán decidir nuevamente en el siguiente Tick.

Posibles prioridades:

- entidad que ya tenía contacto físico;
- entidad con mayor capacidad de carga;
- entidad más cercana;
- entidad con tarea más específica;
- especie dominante si está definido;
- desempate por identificador estable;
- desempate por azar controlado si la regla lo permite.

No debe ocurrir que dos entidades consuman el mismo recurso completo.

## 11.3. Conflictos de depredación

Ejemplo: dos depredadores atacan la misma presa.

Sistema responsable: **CombatSystem**.

Momento: después de MovementSystem y antes de InteractionSystem.

Regla conceptual:

- se evalúan ataques válidos sobre la presa;
- se ordenan por reglas de prioridad;
- se resuelve daño, captura o escape;
- si la presa muere, se define quién obtiene derecho inicial sobre el cadáver o alimento;
- ataques posteriores pueden fallar, redirigirse o producir disputa según reglas futuras;
- se genera un solo evento de muerte.

No debe ocurrir:

- doble muerte;
- doble cadáver;
- múltiples consumidores obteniendo la misma presa completa;
- presa muerta completando interacciones posteriores sin regla específica.

## 11.4. Conflictos de ocupación espacial

Ejemplo: dos hormigas quieren ocupar el mismo espacio.

Sistema responsable: **MovementSystem**.

Momento: durante resolución de movimiento.

Regla conceptual:

- si el modelo espacial permite superposición parcial, se aplican reglas de densidad;
- si el espacio es exclusivo, se resuelve prioridad;
- si ambas son pequeñas y compatibles, puede permitirse paso compartido temporal;
- si hay bloqueo, una o ambas entidades ajustan movimiento;
- si el conflicto es persistente, puede generar congestión observable.

La congestión puede ser ecológicamente interesante. No todos los conflictos espaciales deben eliminarse mágicamente. Un túnel estrecho saturado debe sentirse como cuello de botella real.

## 11.5. Conflictos de rutas

Ejemplo: muchas hormigas siguen feromona hacia un paso bloqueado.

Sistemas responsables:

- MovementSystem para bloqueo;
- PheromoneSystem para persistencia de ruta;
- DecisionSystem en Ticks futuros para abandono o exploración alternativa;
- ColonySystem para efecto agregado.

No debe resolverse todo en un solo Tick con inteligencia global. El abandono de ruta debe emerger por fallos, señales, evaporación y exploración alternativa.

## 11.6. Conflictos de señales

Ejemplo: feromona de comida y feromona de peligro en la misma zona.

Sistema responsable: **PheromoneSystem** para coexistencia e intensidad; **PerceptionSystem** para interpretación; **DecisionSystem** para respuesta.

Regla conceptual:

- las señales pueden coexistir;
- no todas se cancelan automáticamente;
- la criatura percibe mezcla según sensores;
- la decisión resultante depende de necesidades y umbrales;
- peligro fuerte puede dominar sobre comida;
- comida fuerte puede atraer a criaturas hambrientas si peligro es débil.

La señal no debe ordenar. Debe influir.

## 11.7. Conflictos de reproducción y recursos

Ejemplo: la colonia tiene reservas para alimentar larvas o producir nuevos huevos, pero no ambas cosas.

Sistema responsable: **ColonySystem** y **ReproductionSystem**.

Momento: después de acciones individuales y actualización de reservas.

Regla conceptual:

- primero se conoce estado real de reservas;
- luego se evalúa presión alimenticia;
- después reproducción decide si procede, se reduce o se bloquea;
- alimentar larvas existentes puede tener prioridad sobre crear más demanda futura, salvo diseño específico.

No debe haber reproducción gratuita si no hay capacidad ecológica.

## 11.8. Conflictos de muerte y transformación

Ejemplo: una entidad muere por hambre y combate en el mismo Tick.

Sistemas responsables:

- MetabolismSystem puede solicitar muerte fisiológica;
- CombatSystem puede solicitar muerte por daño;
- PopulationSystem consolida;
- EntitySystem compromete.

Regla conceptual:

- una entidad solo puede morir una vez;
- pueden registrarse múltiples causas contribuyentes;
- debe existir una causa primaria determinista;
- solo se crea un cadáver;
- eventos estadísticos pueden registrar causas secundarias.

## 11.9. Conflictos de intervención del usuario

Ejemplo: el usuario coloca una piedra donde hay hormigas.

Sistema responsable: **UserInterventionSystem**, **EnvironmentSystem**, **MovementSystem** y posiblemente **EventSystem**.

Regla conceptual:

- la intervención debe aplicarse en una fase determinista;
- si desplaza entidades, debe generar consecuencias ambientales, no control directo;
- si aplasta, bloquea o encierra organismos, eso debe ser registrado como efecto físico del entorno;
- debe quedar en el historial de experimento.

La herramienta del usuario puede ser poderosa, pero sus consecuencias deben entrar al mundo por reglas.

---

# 12. Eventos diferidos

## 12.1. Definición

Un evento diferido es una consecuencia generada durante un Tick que no se aplica inmediatamente, sino en una fase posterior o en un Tick futuro.

Diferir eventos evita que un sistema invada responsabilidades de otro y previene cadenas de cambios incontroladas.

## 12.2. Cuándo ejecutar inmediatamente

Un efecto puede ejecutarse inmediatamente dentro de la fase responsable cuando:

- pertenece completamente al sistema que lo produce;
- no afecta a entidades externas en conflicto;
- no altera el orden de sistemas;
- no requiere arbitraje;
- no crea entidades nuevas;
- no destruye entidades que otros sistemas aún deben leer;
- no produce una cadena de eventos globales.

Ejemplos conceptuales:

- TimeSystem avanza el contador de Tick;
- ClimateSystem actualiza temperatura global;
- PheromoneSystem reduce intensidad de señales existentes;
- NeedsSystem recalcula hambre interna;
- StatisticsSystem registra una métrica derivada.

## 12.3. Cuándo diferir

Un evento debe diferirse cuando:

- afecta otro sistema;
- crea o destruye entidades;
- podría entrar en conflicto con otras solicitudes;
- depende de resolución de prioridad;
- modifica recursos disputables;
- desencadena consecuencias de ciclo de vida;
- debe ser visible para debugging;
- debe ejecutarse en frontera estable;
- puede causar cadena recursiva.

Ejemplos:

- una hormiga muere y debe convertirse en cadáver;
- una planta produce semillas;
- una larva madura;
- una presa capturada genera alimento;
- una lluvia termina;
- una intervención del usuario se aplica al siguiente Tick;
- una colonia inicia migración;
- un recurso se transforma en materia orgánica.

## 12.4. Ventajas del diferimiento

Diferir permite:

- orden claro;
- determinismo;
- resolución de conflictos;
- debugging;
- auditoría;
- prevención de efectos colaterales;
- separación de responsabilidades;
- replay confiable.

## 12.5. Riesgos del diferimiento excesivo

Diferir demasiado puede causar:

- latencia artificial;
- comportamiento torpe;
- eventos difíciles de seguir;
- colas enormes;
- retraso ecológico no deseado;
- sensación de mundo poco responsivo.

Por eso cada evento debe indicar por qué se difiere y cuándo se compromete.

## 12.6. Regla de oro

Si un sistema quiere modificar algo fuera de su responsabilidad, debe generar una solicitud o evento. No debe invadir.

---

# 13. Escalabilidad del Tick

## 13.1. Escala: 100 entidades

Con 100 entidades, el Tick puede ser conceptualmente directo.

Características esperadas:

- pocas hormigas;
- pocos recursos;
- pocos depredadores;
- ambiente pequeño;
- debugging detallado;
- inspección individual completa;
- visualización rica.

Objetivo de esta escala:

- validar causalidad;
- validar orden de sistemas;
- validar feromonas;
- validar recolección;
- validar separación simulación/render;
- validar reproducibilidad.

Riesgo principal:

- diseñar pensando solo en escala pequeña y luego no poder crecer.

## 13.2. Escala: 1.000 entidades

Con 1.000 entidades empiezan problemas reales:

- percepción costosa;
- movimiento denso;
- congestión;
- muchas señales;
- recursos disputados;
- estadísticas más grandes;
- depuración individual menos práctica.

Estrategias conceptuales:

- partición espacial;
- percepción local;
- señales agregadas;
- eventos filtrados por importancia;
- estadísticas por colonia o región;
- debug por muestreo;
- actualización multi-rate para sistemas lentos.

Objetivo de esta escala:

- demostrar que la colonia puede parecer viva;
- observar rutas emergentes;
- comenzar presión ecológica real.

## 13.3. Escala: 10.000 entidades

Con 10.000 entidades, el motor debe tratar la simulación como sistema masivo.

Problemas:

- percepción de vecinos;
- miles de decisiones;
- muchas interacciones simultáneas;
- colas de eventos grandes;
- mapas de feromonas densos;
- render completo inviable si se dibuja todo con máximo detalle;
- debugging individual costoso.

Estrategias conceptuales:

- particiones espaciales estrictas;
- procesamiento por regiones;
- entidades dormidas o de baja actividad;
- agregación de señales;
- estadísticas jerárquicas;
- render por nivel de detalle;
- separación de simulación visible y no visible sin cambiar reglas;
- resúmenes colectivos para zonas alejadas, si se documenta.

Advertencia:

La optimización no debe cambiar el resultado ecológico sin decisión formal. Si una entidad lejana se simula de forma simplificada, eso debe ser una regla del motor, no un truco invisible.

## 13.4. Escala: 100.000 entidades

Con 100.000 entidades, la simulación individual completa de cada organismo en cada Tick puede ser inviable o innecesaria.

El motor debe poder evolucionar hacia:

- simulación jerárquica;
- agregados poblacionales;
- zonas activas y zonas latentes;
- comportamiento estadístico para entidades no observadas;
- actualización por importancia ecológica;
- paralelización por región;
- partición de colonias;
- representación de enjambres o grupos;
- compresión de eventos;
- persistencia incremental;
- debugging por capas.

La arquitectura no debe cambiar. Debe cambiar la estrategia interna de algunos sistemas bajo el mismo contrato.

## 13.5. Principio de escalabilidad sin cambiar arquitectura

La arquitectura debe permanecer estable porque:

- los sistemas mantienen responsabilidades;
- los contratos no cambian;
- el orden de Tick sigue siendo oficial;
- el render sigue separado;
- el usuario sigue interviniendo el entorno;
- la simulación sigue determinista;
- los eventos siguen ordenados.

Lo que puede cambiar:

- representación interna;
- granularidad;
- frecuencia de actualización de sistemas lentos;
- nivel de detalle por región;
- agregación;
- paralelización;
- cacheo;
- estrategias de búsqueda espacial.

## 13.6. Riesgo de optimización prematura

Optimizar antes de entender el comportamiento puede destruir el diseño.

El proyecto debe primero validar:

- causalidad;
- emergencia;
- reglas ecológicas;
- depuración;
- reproducibilidad.

Luego optimizar.

La optimización debe preservar la filosofía del mundo. Si una optimización hace que recursos aparezcan o desaparezcan sin causa, es mala aunque mejore rendimiento.

---

# 14. Debug del Tick

## 14.1. Filosofía de debugging

Debuggear este motor no consiste solo en ver errores técnicos. Consiste en entender por qué el mundo hizo lo que hizo.

El motor debe permitir responder:

- ¿por qué esta hormiga eligió esta ruta?
- ¿qué percibió antes de decidir?
- ¿por qué no recogió comida?
- ¿por qué murió esta larva?
- ¿por qué aumentó la presión alimenticia?
- ¿por qué esta ruta se abandonó?
- ¿por qué una colonia migró?
- ¿qué sistema modificó este valor?
- ¿en qué Tick ocurrió el cambio?

## 14.2. Visualización interna del Tick

El debugging debería permitir visualizar el Tick como una línea de fases:

- Time;
- eventos entrantes;
- ambiente;
- flora;
- recursos;
- señales;
- metabolismo;
- necesidades;
- percepción;
- decisión;
- tareas;
- movimiento;
- combate;
- interacción;
- colonia;
- reproducción;
- población;
- eventos salientes;
- estadísticas;
- render bridge.

Cada fase debe poder mostrar:

- duración conceptual o costo real medido;
- entidades procesadas;
- cambios producidos;
- eventos generados;
- errores o advertencias;
- invariantes validados.

## 14.3. Inspección por sistema

Cada sistema debería ser inspeccionable de forma aislada.

Ejemplos:

- ClimateSystem: temperatura, lluvia, humedad ambiental.
- EnvironmentSystem: mapas locales de humedad y accesibilidad.
- PheromoneSystem: intensidad, tipo, evaporación, rutas activas.
- PerceptionSystem: qué detectó cada criatura.
- DecisionSystem: qué intención eligió y por qué factores.
- MovementSystem: movimiento deseado, movimiento logrado, bloqueos.
- CombatSystem: ataques, daño, fallos, muertes.
- ColonySystem: presión alimenticia, reservas, amenaza.
- StatisticsSystem: métricas por Tick.

## 14.4. Pausar en medio del Tick

Para usuarios normales, la pausa debe ocurrir en fronteras estables.

Para debugging interno, puede existir pausa de fase. Esta pausa permite detenerse después de un sistema específico para inspección.

Pero esa pausa de fase debe marcarse claramente como estado parcial. No debe permitirse guardar una partida oficial desde allí ni permitir que el usuario realice intervenciones normales.

Estado parcial no es mundo válido para gameplay o experimento. Es quirófano de ingeniería.

## 14.5. Registro de métricas

El motor debe registrar métricas de rendimiento y comportamiento.

Métricas de rendimiento:

- costo por sistema;
- entidades procesadas;
- eventos generados;
- conflictos resueltos;
- recursos activos;
- señales activas;
- memoria conceptual usada;
- regiones activas.

Métricas ecológicas:

- población;
- reservas;
- muertes;
- nacimientos;
- comida recolectada;
- comida consumida;
- recursos disponibles;
- humedad promedio;
- actividad de depredadores;
- cantidad de cadáveres;
- nutrientes;
- salud de colonias;
- expansión territorial.

## 14.6. Detección de cuellos de botella

El debugging debe identificar sistemas cuyo costo crece peligrosamente.

Sospechosos típicos:

- PerceptionSystem;
- MovementSystem;
- PheromoneSystem;
- CombatSystem en guerras;
- ResourceSystem con demasiados objetos pequeños;
- StatisticsSystem con demasiada historia;
- RendererBridge preparando demasiados datos.

El objetivo no es optimizar a ciegas. El objetivo es saber dónde duele.

## 14.7. Replays deterministas

El debugging debe poder reproducir un escenario desde:

- estado inicial;
- semilla;
- secuencia de intervenciones;
- versión de reglas;
- configuración temporal.

Si un bug ocurre en el Tick 42.391, el equipo debe poder llegar al mismo Tick y observar el mismo problema.

## 14.8. Inspección de causalidad

Para eventos importantes, el motor debería poder mostrar cadena causal.

Ejemplo conceptual:

Una colonia colapsó porque:

- hubo sequía;
- bajó producción de semillas;
- aumentó exploración;
- aumentaron muertes por depredación;
- bajaron obreras;
- no se alimentaron larvas;
- murió la reina o se agotó reproducción.

El proyecto debe aspirar a que los eventos emergentes sean explicables.

---

# 15. Principios inviolables

## 15.1. Ningún sistema puede depender del renderizador

La simulación debe poder ejecutarse sin render.

Ningún sistema de simulación puede necesitar Three.js, React, React Three Fiber, animaciones visuales, modelos GLB o estado de cámara para tomar decisiones.

## 15.2. El Renderer nunca modifica el estado de simulación

El renderizador es consumidor, no autoridad.

Cualquier cambio de mundo debe entrar por sistemas de simulación autorizados.

## 15.3. Ningún sistema modifica directamente otro sistema

Los sistemas no deben invadirse.

Un sistema puede producir salidas, eventos o solicitudes. Otro sistema responsable las consume en su fase.

## 15.4. Toda modificación ocurre en su fase correspondiente

Movimiento ocurre en MovementSystem. Combate en CombatSystem. Interacciones en InteractionSystem. Reproducción en ReproductionSystem. Genética en GeneticsSystem. Estadísticas en StatisticsSystem.

Romper esta regla crea caos técnico.

## 15.5. Toda decisión debe ser reproducible con la misma semilla

Si una decisión usa azar, ese azar debe estar controlado.

Si no puede reproducirse, no pertenece al motor oficial.

## 15.6. Ningún sistema puede alterar el orden del Tick sin ADR

El orden del Tick es parte de la física del universo.

Cambiarlo puede alterar todos los resultados. Por tanto, requiere decisión documentada.

## 15.7. Ninguna criatura tiene conocimiento global perfecto

Las criaturas deciden desde percepción local y memoria limitada.

Si una criatura conoce algo, debe existir un medio de transmisión.

## 15.8. El usuario no controla criaturas

Las intervenciones del usuario modifican el entorno, no la voluntad de organismos.

## 15.9. Nada aparece ni desaparece sin causa

Recursos, entidades, señales y materia deben tener origen y destino.

## 15.10. La simulación debe poder correr headless

Debe ser posible ejecutar el Tick sin interfaz visual.

Esto es obligatorio para pruebas, experimentos, replay y escalabilidad.

## 15.11. Los estados parciales no son estados oficiales

Un estado a mitad de Tick sirve para debug, no para guardado oficial ni render normal.

## 15.12. Las estadísticas no gobiernan el mundo

StatisticsSystem observa. No decide.

Si un sistema necesita presión alimenticia o amenaza, eso pertenece a ColonySystem o sistemas de dominio, no a estadísticas derivadas para análisis.

## 15.13. Las optimizaciones no pueden cambiar reglas sin declaración

Si una optimización cambia el resultado de la simulación, no es solo optimización. Es cambio de diseño y requiere ADR.

---

# 16. Problemas potenciales detectados y alternativas

## 16.1. Riesgo: demasiados sistemas demasiado pronto

La lista de sistemas es poderosa, pero puede generar sobreingeniería si todos se implementan desde el inicio.

Alternativa recomendada:

- mantener el orden canónico completo como destino conceptual;
- implementar fases mínimas con sistemas vacíos o simplificados;
- no eliminar la fase del diseño solo porque aún no tenga comportamiento profundo;
- documentar qué sistemas están activos, simplificados o pendientes.

Esto permite crecer sin rediseñar el Tick.

## 16.2. Riesgo: ColonySystem como cerebro central

ColonySystem puede volverse peligroso si empieza a ordenar individuos directamente.

Alternativa:

- ColonySystem solo produce presiones colectivas y estados globales;
- las hormigas siguen decidiendo mediante percepción, necesidades y señales;
- si una necesidad colectiva influye, debe hacerlo como sesgo, no como mandato.

## 16.3. Riesgo: PheromoneSystem demasiado costoso

Las feromonas pueden volverse el sistema más caro si se modelan densamente.

Alternativas conceptuales:

- señales discretas por puntos;
- campos por regiones;
- rutas agregadas;
- evaporación por lotes;
- representación híbrida;
- nivel de detalle para señales lejanas.

La decisión requiere ADR porque afecta emergencia.

## 16.4. Riesgo: PerceptionSystem explosivo

Si cada entidad revisa a todas las demás, el costo crece de forma inaceptable.

Alternativas conceptuales:

- percepción por vecindad;
- regiones espaciales;
- filtros por tipo de sensor;
- señales agregadas;
- percepción incompleta como regla natural;
- actualización perceptiva no necesariamente en cada Tick para todas las criaturas.

## 16.5. Riesgo: eventos inmediatos en cadena

Si cada evento dispara otro instantáneamente, el Tick puede perder control.

Alternativa:

- diferir consecuencias cruzadas;
- limitar profundidad de cadenas inmediatas;
- separar eventos de dominio y solicitudes de sistema;
- cerrar cambios en fronteras estables.

## 16.6. Riesgo: estadísticas usadas como lógica

Puede ser tentador hacer que sistemas lean métricas estadísticas para decidir. Eso mezcla observación con simulación.

Alternativa:

- las métricas que gobiernan el mundo deben pertenecer a sistemas de dominio;
- StatisticsSystem solo registra y analiza;
- si una métrica se vuelve causal, debe moverse al sistema responsable.

---

# 17. Preguntas abiertas

Estas decisiones no deben inventarse en este documento. Requieren discusión y, en varios casos, ADR.

## 17.1. ¿Cuál será la duración conceptual de un Tick?

Debe decidirse cuánto tiempo simulado representa un Tick inicial.

La respuesta depende de:

- escala del mundo;
- velocidad de hormigas;
- precisión de movimiento;
- evaporación de feromonas;
- costo computacional;
- nivel de observabilidad deseado.

## 17.2. ¿El mundo inicial será 2D, 2.5D o 3D completo?

Esta decisión afecta:

- movimiento;
- percepción;
- terreno;
- agua;
- pendientes;
- colisiones;
- render;
- pathfinding;
- costo de simulación.

## 17.3. ¿Qué modelo espacial usará el motor?

Pendiente decidir si el mundo se representa conceptualmente mediante:

- espacio continuo;
- grilla;
- regiones;
- nodos;
- híbrido;
- superficie navegable.

Esto impacta MovementSystem, PerceptionSystem, PheromoneSystem y EnvironmentSystem.

## 17.4. ¿Cómo se representarán las feromonas?

Opciones pendientes:

- puntos discretos;
- campo continuo;
- mapa por celdas;
- rutas abstractas;
- grafo de caminos;
- sistema híbrido.

Esta es una de las decisiones más importantes del proyecto.

## 17.5. ¿Qué nivel de determinismo numérico se exigirá?

Debe decidirse si basta con determinismo práctico dentro de una misma plataforma o si se buscará determinismo fuerte entre plataformas.

La segunda opción es más exigente.

## 17.6. ¿Cómo se manejará la paralelización sin romper determinismo?

Debe definirse:

- qué fases pueden paralelizarse;
- cómo se comprometen resultados;
- cómo se ordenan conflictos;
- cómo se separan regiones;
- cómo se manejan bordes.

## 17.7. ¿Qué eventos son de dominio y cuáles son solo de observación?

Debe construirse una taxonomía oficial de eventos.

Ejemplos:

- muerte;
- nacimiento;
- comida recolectada;
- ruta reforzada;
- ataque;
- lluvia iniciada;
- lluvia terminada;
- colonia en hambruna;
- migración iniciada;
- colapso.

## 17.8. ¿Cómo se manejarán entidades dormidas o latentes?

Para escalabilidad, algunas entidades podrían actualizarse con menor frecuencia.

Debe decidirse si eso forma parte del modelo oficial y cómo evitar que altere resultados de forma injustificada.

## 17.9. ¿Cuándo una intervención del usuario en pausa se aplica al mundo?

Opciones:

- inmediatamente creando nuevo estado estable;
- al siguiente Tick;
- como evento programado;
- según modo sandbox o natural.

Debe definirse para reproducibilidad.

## 17.10. ¿Cuál será el criterio oficial de estado estable?

Debe precisarse qué datos deben estar cerrados para considerar que un Tick terminó:

- entidades;
- recursos;
- eventos;
- señales;
- estadísticas;
- colonia;
- snapshots;
- render bridge.

## 17.11. ¿Cómo se representará el nido dentro del Tick?

El nido puede ser:

- entidad agregada;
- espacio físico navegable;
- conjunto de cámaras;
- abstracción parcial;
- mundo subterráneo separado.

Esta decisión afecta ColonySystem, MovementSystem, InteractionSystem y ReproductionSystem.

## 17.12. ¿Qué reglas de prioridad serán oficiales en conflictos?

Se requiere un documento o sección futura con prioridades exactas para:

- comida;
- espacio;
- ataques;
- presas;
- entradas de nido;
- agua;
- recursos indivisibles;
- señales contradictorias.

## 17.13. ¿Cómo se verificará que una optimización no cambió el comportamiento?

Debe definirse una estrategia de pruebas de regresión ecológica:

- escenarios fijos;
- semillas fijas;
- métricas esperadas;
- tolerancias;
- comparación de series temporales;
- replays.

## 17.14. ¿Qué información podrá inspeccionar el usuario y cuál solo el desarrollador?

El proyecto necesita distinguir:

- observación natural;
- overlays de laboratorio;
- debug técnico;
- información que podría romper la experiencia si se muestra siempre.

## 17.15. ¿Qué sistemas serán mínimos para Ecosistema v0.1?

Aunque el Tick canónico contemple todos los sistemas, la primera versión funcional debe seleccionar un subconjunto mínimo sin traicionar la arquitectura.

Posible núcleo mínimo:

- TimeSystem;
- EnvironmentSystem simplificado;
- ResourceSystem;
- PheromoneSystem;
- MetabolismSystem;
- NeedsSystem;
- PerceptionSystem;
- DecisionSystem;
- TaskSystem;
- MovementSystem;
- InteractionSystem;
- ColonySystem;
- StatisticsSystem;
- RendererBridge.

La selección final debe definirse en roadmap técnico o ADR.

---

# 18. Declaración final

El Tick es la física administrativa del universo.

No es un detalle de implementación. Es el contrato que determina cómo el mundo respira, cómo las criaturas perciben, cómo deciden, cómo actúan, cómo mueren, cómo se reproducen, cómo se recicla la materia, cómo fluye la información y cómo el usuario puede estudiar consecuencias sin controlar voluntades.

Este documento establece que el motor debe avanzar mediante fases claras, deterministas, auditables y separadas. Cada sistema tiene una responsabilidad. Cada modificación tiene un lugar. Cada conflicto tiene una autoridad. Cada evento tiene un momento. Cada experimento debe poder repetirse.

Si la World Bible define qué es el mundo, este documento define cómo late.
