# 09 — PHEROMONE AND RECRUITMENT DESIGN

## Diseño conceptual y técnico para feromonas y reclutamiento colectivo

**Estado:** Documento de diseño previo a implementación v0.2  
**Relación con documentos fundacionales:** `01_WORLD_BIBLE.md`, `02_SIMULATION_RULES.md`, `03_ARCHITECTURE_BIBLE.md`, `04_ENTITY_REFERENCE.md`, `05_USER_EXPERIMENTS.md`, `08_SIMULATION_TICK.md`  
**Relación con ADRs:** `docs/adr/0004-initial-spatial-model-v0-1.md`, `docs/adr/0005-experimental-overrides-and-lab-mode.md`  
**Alcance:** Diseñar el futuro sistema de feromonas y reclutamiento indirecto antes de implementar `PheromoneSystem` v0.2.  
**No alcance:** Este documento no implementa código, no define pseudocódigo, no cambia el Tick oficial y no decide de forma irreversible la representación espacial final.

---

## 1. Propósito del sistema

El sistema de feromonas es una pieza central para que una colonia de hormigas parezca inteligente sin que exista una inteligencia individual compleja ni una mente central que coordine a todas las criaturas.

La World Bible establece que la inteligencia colectiva debe surgir de individuos simples, señales acumulativas, comunicación indirecta, necesidades compartidas y presión ambiental. Las feromonas son el primer medio explícito para convertir descubrimientos individuales en comportamiento colectivo observable.

El propósito del futuro `PheromoneSystem` es permitir que:

- una exploradora comunique indirectamente que encontró comida;
- otras hormigas detecten esa señal mediante percepción local;
- las rutas útiles se refuercen por uso repetido;
- las rutas inútiles o antiguas desaparezcan por evaporación;
- la colonia produzca filas, rutas y concentración de obreras sin órdenes directas;
- el usuario pueda crear condiciones experimentales y observar la respuesta emergente;
- el renderer pueda visualizar señales sin tener autoridad sobre ellas.

La meta no es crear una IA de planificación global. La meta es crear un campo de información local que permita a muchas hormigas con reglas sencillas producir patrones colectivos complejos.

---

## 2. Problema actual en v0.1

En v0.1, cada hormiga actúa de forma casi aislada:

- puede caminar y explorar;
- puede detectar comida cercana mediante percepción simple;
- puede recoger comida;
- puede volver al nido;
- puede entregar comida;
- puede volver a explorar.

Pero todavía no existe comunicación indirecta. Si una hormiga encuentra comida en una esquina lejana del mapa, la colonia no se entera de forma ecológicamente válida. Otras hormigas no reciben señal química, no cambian su probabilidad de moverse hacia esa zona y no se forma una ruta colectiva.

Esto produce una limitación conceptual importante:

- las hormigas individuales sí pueden encontrar comida;
- la colonia no puede aprovechar hallazgos lejanos de forma coordinada;
- no existe reclutamiento;
- no existen caminos colectivos;
- no hay competencia entre rutas;
- no hay memoria ambiental compartida;
- no aparece una fila de obreras entre nido y recurso;
- el usuario puede colocar comida lejos, pero la respuesta colectiva queda débil o ausente.

El problema no debe resolverse dando conocimiento global a la colonia ni asignando tareas directas. Debe resolverse introduciendo un medio de información ambiental compatible con sensores limitados, Tick fijo y determinismo.

---

## 3. Principios de diseño

El sistema de feromonas debe respetar los siguientes principios:

### 3.1. Información local

Una hormiga solo debe responder a señales dentro de su radio o área de percepción. No debe conocer la ubicación exacta de una fuente de comida lejana si nunca estuvo allí ni detectó señales que la conecten con esa fuente.

### 3.2. Sin conocimiento global

La colonia no debe tener un mapa perfecto de todas las fuentes de comida, rutas o peligros. La información colectiva debe existir como rastros físicos o químicos distribuidos en el mundo.

### 3.3. Señales químicas como medio de información

Las feromonas son información en el entorno. No son comandos, no son memoria privada perfecta y no son una interfaz de órdenes. Son señales que pueden ser creadas, detectadas, reforzadas, degradadas y desaparecer.

### 3.4. Rutas emergentes

Una ruta debe surgir porque muchas hormigas responden localmente a un gradiente y lo refuerzan al tener éxito. No debe aparecer como una línea dibujada por un sistema central ni como una ruta global calculada para toda la colonia.

### 3.5. Refuerzo por éxito

Una ruta que conduce a comida y permite retornos exitosos debe recibir más señal. El éxito debe aumentar la probabilidad de que más hormigas la usen.

### 3.6. Evaporación por tiempo

Toda señal debe degradarse. Si una ruta deja de ser útil, si la comida se agota o si ninguna hormiga la refuerza, la feromona debe disminuir hasta desaparecer.

### 3.7. Competencia entre rutas

Si existen varias fuentes de comida o varias rutas hacia una fuente, las rutas deben competir por refuerzo. Una ruta corta, segura y productiva debería tender a dominar, pero no de forma absoluta ni instantánea.

### 3.8. Nada de teleport mental

La información no debe teletransportarse entre hormigas. Una hormiga no debe saber que otra encontró comida salvo mediante señales locales, contacto futuro u otro medio explícito.

### 3.9. Nada de órdenes directas

El usuario no debe ordenar a hormigas seguir un rastro, recolectar un recurso o formar fila. El usuario puede colocar comida, modificar condiciones ambientales futuras y observar qué rutas emergen.

### 3.10. Determinismo

Con la misma seed, el mismo estado inicial, las mismas intervenciones y el mismo número de Ticks, el campo de feromonas y las decisiones derivadas deben reproducirse.

### 3.11. Compatibilidad con Tick fijo

Las feromonas deben actualizarse por Tick simulado, no por frame visual ni por tiempo real del navegador. La evaporación, refuerzo y percepción deben basarse en tiempo simulado.

### 3.12. Independencia del renderer

El renderer puede visualizar feromonas, pero no puede crearlas, evaporarlas, reforzarlas ni decidir su influencia sobre hormigas. La fuente de verdad debe permanecer en `src/simulation`.

---

## 4. Tipos iniciales de feromonas

No conviene implementar todos los tipos de feromonas en la primera versión. Es mejor diseñar una taxonomía conceptual y seleccionar un subconjunto conservador para v0.2.

### 4.1. Feromona de alimento

Indica que una ruta o zona está asociada con una fuente de comida. Es la candidata principal para v0.2.

Uso conceptual:

- depositada por hormigas que regresan con comida;
- detectada por exploradoras o recolectoras;
- reforzada si la ruta sigue siendo productiva;
- debilitada si la fuente se agota;
- usada para producir reclutamiento indirecto.

### 4.2. Feromona de retorno al nido

Indica dirección o proximidad relativa al nido. Puede ayudar a hormigas a regresar o a estructurar rutas bidireccionales.

Riesgo: si se implementa demasiado pronto, puede ocultar problemas de navegación y convertirse en una solución artificial de pathfinding.

Recomendación: postergar hasta que la feromona de alimento funcione con movimiento local sencillo.

### 4.3. Feromona de alarma

Indica peligro, depredación, daño o amenaza. Podría afectar evasión, defensa o reducción de recolección.

Recomendación: futura. No corresponde a v0.2 porque todavía no hay combate, depredadores ni mortalidad.

### 4.4. Feromona de exploración

Señal débil que indica zonas ya recorridas o reduce probabilidad de explorar repetidamente el mismo lugar.

Puede ayudar a distribuir exploradoras, pero también puede complejizar demasiado el modelo temprano.

Recomendación: futura o experimental después de validar alimento.

### 4.5. Feromona territorial futura

Podría representar presencia de colonia, frontera, competencia o señales entre colonias.

Recomendación: futura. Requiere múltiples colonias, agresión y reglas territoriales aún no implementadas.

### 4.6. Feromona de cadáver/limpieza futura

Podría guiar comportamiento de limpieza, transporte de cadáveres o zonas sanitarias.

Recomendación: futura. Requiere muerte, cadáveres y descomposición, explícitamente fuera del alcance actual.

### 4.7. Recomendación para v0.2

La primera versión debería implementar únicamente feromona de alimento. El objetivo es validar comunicación indirecta, reclutamiento básico, evaporación y determinismo sin abrir demasiados frentes.

---

## 5. Ciclo de vida de una feromona

Una feromona debe tratarse como una entidad o campo ambiental con vida temporal.

### 5.1. Creación

Una señal puede crearse cuando una hormiga cumple una condición ecológica. Para v0.2, la condición más clara es regresar al nido cargando comida o después de haber recogido comida de una fuente conocida.

La creación no debe ocurrir porque el usuario lo ordene directamente. Debe ser consecuencia de comportamiento de hormiga y estado del mundo.

### 5.2. Intensidad inicial

La intensidad inicial representa cuánta información química se deposita. Puede depender de:

- cantidad de comida recogida;
- distancia recorrida;
- hambre de la colonia;
- energía de la hormiga;
- tipo de fuente;
- éxito del retorno.

Para v0.2 conviene usar una intensidad simple y constante o una intensidad proporcional a comida transportada, sin mezclar todavía demasiadas variables.

### 5.3. Refuerzo

Cada hormiga que use una ruta exitosa puede reforzar la señal. El refuerzo debe tener límites para evitar saturación infinita.

El refuerzo debe representar retroalimentación positiva: más éxito produce más señal; más señal atrae más hormigas; más hormigas exitosas producen más refuerzo.

### 5.4. Difusión

La difusión representa expansión local de la señal hacia zonas vecinas. Puede hacer que el rastro sea más suave y detectable, pero también aumenta costo computacional y complejidad.

Para v0.2, la difusión podría omitirse o mantenerse muy limitada. Un modelo sin difusión puede ser suficiente si la percepción evalúa concentraciones cercanas.

### 5.5. Evaporación

Cada Tick debe reducir la intensidad de feromona según una tasa determinista. La evaporación es la retroalimentación negativa que evita que el mundo quede saturado de rastros antiguos.

### 5.6. Desaparición

Cuando la intensidad cae por debajo de un mínimo, la señal debe eliminarse o considerarse inactiva. La eliminación debe realizarse en orden estable para preservar determinismo.

### 5.7. Influencia de lluvia/humedad futura

En fases futuras, lluvia o humedad podrían:

- acelerar evaporación;
- borrar rastros débiles;
- desplazar o difundir señales;
- reducir capacidad de detección;
- crear experimentos sobre rutas bajo clima.

No debe implementarse clima funcional en v0.2 si el alcance aprobado es solo feromona de alimento.

### 5.8. Saturación máxima

Cada celda, punto o zona debe tener un máximo de intensidad para evitar crecimiento infinito y rutas dominantes imposibles de abandonar.

### 5.9. Límites mínimos

Debe existir un umbral bajo el cual la señal deja de afectar decisiones. Esto evita que rastros residuales muy pequeños generen ruido permanente.

### 5.10. Degradación por tiempo

La degradación debe ser función del Tick simulado, no del frame. Debe ser reproducible y no depender de FPS, animación o reloj del sistema.

---

## 6. Comportamiento de una hormiga exploradora

Una exploradora no debe tener ruta clara ni conocimiento global. Su comportamiento debería mantenerse simple:

1. Camina dentro de límites del mundo usando variación determinista.
2. Percibe comida cercana mediante sensores locales.
3. Si detecta comida, evalúa si puede recogerla.
4. Si recoge comida, cambia a estado de retorno.
5. Mientras vuelve, puede depositar feromona de alimento en el camino o en puntos relevantes.
6. Al llegar al nido, entrega comida.
7. Si el retorno fue exitoso, la ruta puede quedar reforzada.
8. Luego vuelve a explorar o pasa a responder a rastros según presión de colonia.

La exploradora no debe publicar la ubicación exacta de la comida a todas las hormigas. La única comunicación colectiva inicial debe ser el rastro ambiental.

---

## 7. Comportamiento de una hormiga recolectora

Una recolectora o una obrera disponible debería responder a feromonas mediante decisiones probabilísticas locales.

Comportamiento conceptual:

- detecta concentraciones cercanas;
- estima un gradiente local;
- aumenta la probabilidad de moverse hacia mayor concentración;
- puede ignorar rastros débiles a veces;
- conserva una probabilidad de exploración alternativa;
- evita quedar atrapada en una ruta si la señal desaparece;
- recoge comida si llega a una fuente;
- refuerza rastro si regresa con éxito.

Para evitar comportamiento robótico:

- no todas las hormigas deben seguir la señal con la misma fuerza;
- debe existir ruido determinista controlado por seed;
- los rastros débiles no deben ser órdenes absolutas;
- una parte de la población debe seguir explorando;
- la sensibilidad puede depender de hambre, energía, estado o presión de colonia.

---

## 8. Reclutamiento indirecto

El reclutamiento debe emerger sin comandos explícitos.

Mecanismo conceptual:

1. Una exploradora encuentra comida.
2. Regresa al nido y deposita feromona de alimento.
3. Otras hormigas cerca del nido detectan la señal.
4. La señal aumenta su probabilidad de moverse por esa ruta.
5. Si llegan a comida y vuelven con éxito, refuerzan el rastro.
6. Más intensidad atrae a más obreras.
7. Si la comida se agota, deja de reforzarse.
8. La evaporación debilita la ruta hasta desaparecer.

Así la colonia “recluta” porque el entorno contiene una señal útil, no porque una entidad central asigne obreras.

---

## 9. Formación de filas

Las filas deben emerger como resultado de:

- rastro químico persistente;
- movimiento local de hormigas;
- refuerzo por retornos exitosos;
- evaporación de alternativas débiles;
- concentración progresiva de obreras sobre rutas productivas.

No deben implementarse como:

- animación programada;
- camino fijo dibujado por el diseñador;
- path global calculado para todas las hormigas;
- teletransporte de intención;
- estado “formar fila” impuesto por el usuario.

Una fila realista no tiene que ser perfectamente recta. Puede fluctuar, dividirse, recompactarse y desaparecer cuando cambian las condiciones.

---

## 10. Relación con la colonia

La colonia puede modular sensibilidad o prioridad sin convertirse en mente central. El `ColonySystem` futuro podría influir en parámetros agregados:

- reservas bajas aumentan sensibilidad a feromonas de comida;
- presión alimenticia aumenta exploración;
- muchas larvas aumentan prioridad de comida;
- amenaza reduce recolección o aumenta respuesta a alarma futura;
- reservas altas reducen intensidad de reclutamiento;
- agotamiento de obreras limita número de recolectoras activas.

Estas influencias deben ser condiciones internas o agregadas de la colonia, no órdenes directas a individuos específicos.

---

## 11. Relación con el usuario

El usuario debe seguir actuando como experimentador ambiental:

- colocar comida cerca del nido;
- colocar comida lejos;
- colocar múltiples fuentes;
- comparar qué ruta gana;
- bloquear rutas en el futuro mediante obstáculos;
- alterar condiciones ambientales futuras;
- exportar experimento;
- comparar seeds;
- observar mapas de feromonas;
- medir tiempo hasta descubrimiento y reclutamiento.

El usuario no debe poder:

- ordenar a una hormiga seguir un rastro;
- asignar obreras a una fuente concreta;
- forzar una fila;
- elegir manualmente qué ruta debe reforzarse;
- mover criaturas para completar una ruta.

Las herramientas válidas formulan preguntas experimentales. Las hormigas responden.

---

## 12. Relación con el Tick

Este documento no cambia el Tick oficial. Solo ubica conceptualmente dónde podría encajar el futuro `PheromoneSystem`.

Dependencias conceptuales:

### 12.1. PerceptionSystem

Debe leer feromonas cercanas y exponer estímulos locales a cada hormiga. No debe dar conocimiento global.

### 12.2. DecisionSystem

Debe convertir estímulos en tendencias de decisión: seguir rastro, explorar, recoger comida, regresar o ignorar señal débil.

### 12.3. TaskSystem

En fases futuras podría asignar estados internos derivados de condiciones, pero no debe ser un sistema de órdenes del usuario.

### 12.4. MovementSystem

Debe usar decisiones locales para modificar movimiento. Si una hormiga sigue un gradiente, el movimiento resultante debe continuar perteneciendo al núcleo de simulación.

### 12.5. InteractionSystem

Debe resolver recogida de comida, entrega al nido y condiciones que justifican depósito o refuerzo de feromonas.

### 12.6. PheromoneSystem

Debería actualizar creación, refuerzo, evaporación y eliminación de señales. Su posición exacta en el Tick requiere revisión antes de implementación para no alterar el orden canónico sin ADR.

Una ubicación conceptual conservadora sería separar:

- lectura de feromonas durante percepción;
- decisiones de hormigas durante decisión;
- movimiento e interacciones;
- depósito/refuerzo después de interacciones exitosas;
- evaporación y limpieza en fase ambiental o de señales;
- snapshot para render al final del Tick estable.

### 12.7. ColonySystem

Puede calcular presión alimenticia, reservas y sensibilidad agregada. No debe conocer rutas perfectas ni mandar hormigas individuales.

### 12.8. StatisticsSystem

Debe medir intensidad, rutas activas, reclutamiento y eficiencia sin modificar comportamiento.

### 12.9. RendererBridge

Debe exponer vistas de solo lectura para visualización. No debe modificar concentración, rutas, evaporación ni decisiones.

### Decisiones futuras

Antes de implementar, se debe decidir si el `PheromoneSystem` se ubica antes o después de movimiento, si evaporación ocurre al inicio o final del Tick y si depósito queda en InteractionSystem o en un sistema dedicado de señales. Si esta decisión altera el orden oficial del Tick, debe registrarse mediante ADR.

---

## 13. Modelo espacial provisional

El mundo v0.1 usa un plano continuo 2D `x/z`, con `y = 0` solo para render. No hay grilla, navmesh ni pathfinding. Las feromonas obligan a revisar el modelo espacial, pero no conviene bloquear el proyecto con una decisión definitiva demasiado temprana.

### 13.1. Puntos discretos

Representar cada depósito como un punto con posición, radio e intensidad.

Ventajas:

- compatible con plano continuo actual;
- simple de crear;
- fácil de depurar;
- no requiere grilla global.

Riesgos:

- muchas hormigas pueden producir demasiados puntos;
- consultar vecinos puede volverse costoso;
- los rastros pueden verse granulados;
- requiere estrategia de fusión o limpieza.

### 13.2. Partículas

Similar a puntos discretos, pero pensado como muchas partículas pequeñas.

Ventajas:

- flexible;
- visualmente intuitivo;
- puede representar difusión aproximada.

Riesgos:

- alto costo si crece sin control;
- difícil mantener determinismo y rendimiento;
- puede tentar a mezclar visualización con simulación.

### 13.3. Grid de concentración

Dividir el mundo en celdas y almacenar intensidad por celda y tipo.

Ventajas:

- consultas locales eficientes;
- evaporación simple;
- gradientes fáciles de calcular;
- útil para overlays de debug;
- más escalable para muchos depósitos.

Riesgos:

- introduce discretización en un mundo continuo;
- tamaño de celda condiciona movimiento y percepción;
- puede generar patrones demasiado cuadriculados;
- requiere decidir resolución.

### 13.4. Campos continuos

Modelar concentración como función continua o estructuras espaciales más avanzadas.

Ventajas:

- conceptualmente elegante;
- evita artefactos de grilla;
- puede producir gradientes suaves.

Riesgos:

- sobrealcance para v0.2;
- más difícil de testear;
- más costoso;
- mayor riesgo de decisiones numéricas frágiles.

### 13.5. Nodos/rutas

Representar rutas como segmentos, nodos o grafos entre nido y fuentes.

Ventajas:

- eficiente para rutas consolidadas;
- fácil medir ruta más usada;
- útil con obstáculos futuros.

Riesgos:

- se acerca a pathfinding o rutas explícitas;
- puede fabricar filas artificiales;
- puede contradecir emergencia si aparece demasiado temprano.

### 13.6. Modelo híbrido

Combinar un grid de baja resolución para concentración con depósitos puntuales o rutas derivadas para análisis.

Ventajas:

- equilibrio entre escalabilidad y flexibilidad;
- permite visualización clara;
- deja margen para migración futura.

Riesgos:

- más complejo que una sola representación;
- puede introducir duplicación de información.

### 13.7. Recomendación conservadora para v0.2

Para v0.2, la opción más conservadora parece un grid de concentración limitado al núcleo de simulación, con coordenadas derivadas desde el plano `x/z`. Debe mantenerse como implementación interna reemplazable, sin convertir la grilla en modelo espacial global del mundo.

Alternativa si se quiere minimizar todavía más el alcance: puntos discretos con fusión por proximidad y límite máximo de depósitos. Esta alternativa puede ser más rápida de implementar, pero requiere vigilancia de rendimiento.

---

## 14. Determinismo y reproducibilidad

El sistema debe mantener reproducibilidad bajo estas condiciones:

- misma seed;
- mismo estado inicial;
- mismas intervenciones del usuario;
- mismos Ticks;
- mismas reglas activas;
- mismo orden de actualización;
- mismo resultado.

Riesgos principales:

### 14.1. Iterar colecciones sin orden estable

Si las feromonas se almacenan en mapas, sets o estructuras cuya iteración no sea explícitamente ordenada por ID o coordenada, pueden aparecer diferencias difíciles de reproducir.

### 14.2. Usar tiempo real

Evaporación, difusión y refuerzo no deben depender de `Date`, duración de frame, FPS ni intervalos del navegador.

### 14.3. Usar aleatoriedad no controlada

No debe usarse `Math.random` en el núcleo. Cualquier variación debe venir del PRNG con seed.

### 14.4. Floats sin cuidado

Las concentraciones pueden acumular errores. Se deben definir límites, redondeos si aplica y tolerancias de tests.

### 14.5. Depender del renderer

El renderer no debe decidir dónde hay feromona ni qué intensidad tiene. Solo puede visualizar snapshots.

### 14.6. Eliminación no determinista

La limpieza de feromonas débiles debe ocurrir en orden estable. Si varias señales se fusionan o eliminan, el resultado debe ser reproducible.

---

## 15. Visualización futura

La visualización debe ayudar a entender el sistema sin convertirse en fuente de verdad.

Opciones futuras:

- overlay de calor sobre el terreno;
- líneas suaves para rastros dominantes;
- partículas transparentes solo como representación visual;
- modo debug por tipo de feromona;
- intensidad por color o alpha;
- filtros por feromona de alimento, alarma o exploración;
- lectura puntual de intensidad al inspeccionar una zona;
- métricas de ruta activa en panel de sistema.

Regla obligatoria: el render solo visualiza. Si el usuario apaga el overlay, la simulación debe producir exactamente el mismo resultado.

---

## 16. Métricas y estadísticas

Las feromonas deben volverse observables mediante estadísticas, no solo visualmente.

Métricas futuras posibles:

- intensidad total de feromona de comida;
- número de rutas activas;
- ruta más usada;
- tiempo hasta descubrimiento de comida;
- tiempo hasta primer retorno exitoso;
- cantidad de hormigas reclutadas;
- eficiencia de recolección;
- comida recolectada por minuto simulado;
- evaporación promedio;
- rutas abandonadas;
- duración media de una ruta;
- concentración máxima por zona;
- proporción exploradoras/recolectoras;
- distancia promedio recorrida por alimento entregado;
- diferencia de rendimiento entre seeds.

Estas métricas deben ser calculadas por sistemas de simulación o estadísticas, y expuestas por snapshots de solo lectura.

---

## 17. Casos de prueba conceptuales

### 17.1. Comida cerca del nido

Se espera detección rápida, ruta corta, refuerzo temprano y recolección eficiente.

### 17.2. Comida en esquina lejana

Se espera descubrimiento más tardío, retorno más lento y formación gradual de ruta si la fuente sigue disponible.

### 17.3. Dos fuentes de comida

Se espera competencia entre rutas. La fuente más cercana, abundante o descubierta primero puede dominar, pero no debería eliminar exploración alternativa por completo.

### 17.4. Comida que se agota

Al agotarse la fuente, el rastro debería dejar de reforzarse y evaporarse.

### 17.5. Ruta interrumpida por obstáculo futuro

Cuando existan obstáculos funcionales, una ruta bloqueada debería perder eficacia, reducir refuerzo y permitir exploración de alternativas.

### 17.6. Comida colocada durante pausa

La intervención debe registrarse y aplicarse según la política del runtime. El reclutamiento debe comenzar solo cuando la simulación avance según Ticks.

### 17.7. Lluvia futura borrando rastros

Cuando exista clima funcional, lluvia debería afectar señales de forma causal y determinista.

### 17.8. Múltiples colonias futuras

Cada colonia podría responder principalmente a sus propias señales o interpretar señales ajenas de manera distinta. Esto requiere diseño futuro de identidad química.

---

## 18. Riesgos de diseño

### 18.1. Rutas demasiado perfectas

Si las hormigas siguen gradientes con demasiada precisión, las filas parecerán robóticas y artificiales.

### 18.2. Todas las hormigas siguiendo una sola ruta

Si la sensibilidad es demasiado alta, se pierde exploración y el sistema se vuelve frágil ante cambios.

### 18.3. Cero exploración

Una colonia que se encierra en rutas existentes puede no descubrir fuentes mejores.

### 18.4. Demasiada aleatoriedad

Si el ruido domina, las feromonas no producen reclutamiento visible y el usuario no percibe inteligencia colectiva.

### 18.5. Feromonas demasiado fuertes

Rastros saturados pueden permanecer activos aunque la fuente ya no exista.

### 18.6. Feromonas que nunca desaparecen

Sin evaporación efectiva, el mundo acumula memoria falsa y se pierde causalidad temporal.

### 18.7. Rendimiento

Muchas hormigas depositando muchas señales pueden escalar mal. Deben existir límites, agregación o representación eficiente.

### 18.8. Dificultad visual

Si la visualización es demasiado intensa, puede tapar entidades. Si es demasiado sutil, el usuario no entenderá el sistema.

### 18.9. Acoplamiento con render

Una visualización atractiva puede tentar a usar partículas visuales como fuente de verdad. Esto está prohibido por la arquitectura.

### 18.10. Ruptura del Tick

Agregar el sistema en el lugar incorrecto puede cambiar causalidad, determinismo o interacción con movimiento. Debe revisarse cuidadosamente antes de implementar.

---

## 19. Propuesta v0.2

Una primera versión mínima implementable debería ser deliberadamente pequeña:

1. Implementar únicamente feromona de alimento.
2. Representar la señal en una estructura interna determinista y reemplazable.
3. Depositar señal cuando una hormiga regresa con comida o durante su retorno exitoso.
4. Evaporar señal de forma simple en cada Tick.
5. Permitir percepción local de gradiente por hormigas cercanas.
6. Aumentar probabilidad de seguir rastro, sin convertirlo en orden absoluta.
7. Mantener una probabilidad de exploración independiente.
8. Limitar intensidad máxima y eliminar señales bajo umbral mínimo.
9. Exponer estadísticas básicas de feromona de alimento.
10. Exponer snapshot de solo lectura para debug overlay opcional.
11. Agregar tests de determinismo y frontera de imports.
12. No implementar alarma, exploración, territorio, lluvia, obstáculos, pathfinding real ni múltiples colonias todavía.

Esta versión debe responder una pregunta concreta:

> ¿Puede una fuente de comida descubierta por una hormiga producir reclutamiento indirecto observable mediante un rastro de feromona de alimento, sin conocimiento global ni órdenes directas?

---

## 20. Decisiones futuras

Antes de implementar o expandir el sistema, quedan decisiones pendientes:

- representación espacial definitiva: grid, puntos, partículas, campos, nodos o híbrido;
- resolución espacial si se usa grid;
- cantidad de tipos de feromonas iniciales;
- intensidad inicial de depósito;
- tasa de evaporación;
- existencia y magnitud de difusión;
- umbral mínimo de eliminación;
- intensidad máxima por zona;
- si el depósito ocurre continuamente durante el retorno o solo en eventos discretos;
- si lluvia futura borra, difunde o reduce detección de feromonas;
- cómo evitar comportamiento robótico;
- cómo mantener exploración residual;
- cómo medir éxito de una ruta;
- cómo representar rutas activas en estadísticas;
- cómo visualizar rastros sin acoplar renderer;
- cómo exportar datos de feromonas en experimentos reproducibles;
- cómo escalar a 1.000, 10.000 y 100.000 entidades;
- cómo manejar múltiples colonias y señales químicas propias o ajenas;
- si hace falta una ADR específica antes de fijar la representación espacial de feromonas;
- cómo versionar cambios de reglas para que experimentos exportados sigan siendo interpretables.

---

## Cierre

El sistema de feromonas debe ser el primer gran paso desde comportamiento individual hacia inteligencia colectiva emergente. Su diseño debe mantenerse fiel a la identidad del proyecto: reglas simples, información local, causalidad ecológica, determinismo, usuario como interventor ambiental y separación absoluta entre simulación y render.

La colonia debe parecer inteligente no porque el motor le regale conocimiento global, sino porque cientos de decisiones pequeñas, rastros químicos y retroalimentaciones locales generan patrones colectivos visibles.
