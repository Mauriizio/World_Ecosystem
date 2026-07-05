# 05 — USER EXPERIMENTS

## Herramientas de intervención, observación y laboratorio

**Estado:** Documento fundacional v0.1  
**Relación con `01_WORLD_BIBLE.md`:** Define el rol del usuario como interventor ambiental, no controlador de criaturas.  
**Nivel:** Diseño conceptual de experiencia. Sin implementación ni código.

---

## 1. Propósito

Este documento define las herramientas conceptuales disponibles para el usuario. El usuario no juega como comandante de criaturas. Juega como diseñador de condiciones, observador de consecuencias y experimentador ecológico.

La frase guía es:

**El usuario controla el laboratorio; el ecosistema controla sus respuestas.**

---

## 2. Principio de intervención indirecta

El usuario puede modificar entorno, clima, recursos, terreno, especies presentes, variables experimentales, velocidad de observación y capas de información. No puede modificar la voluntad de una criatura.

### 2.1 Permitido

- Colocar comida.
- Provocar lluvia.
- Cambiar humedad.
- Agregar piedras.
- Introducir animales.
- Crear charcos.
- Plantar vegetación.
- Guardar escenarios.
- Comparar resultados.
- Observar estadísticas.

### 2.2 Prohibido

- Ordenar a una hormiga moverse.
- Mandar un ataque.
- Seleccionar unidades.
- Asignar tareas manualmente.
- Forzar migraciones.
- Controlar reproducción individual.
- Borrar consecuencias sin explicación ecológica.

---

## 3. Edición del entorno

La edición del entorno permite preparar escenarios y alterar condiciones.

### 3.1 Herramientas posibles

- comida externa;
- semillas;
- piedras;
- obstáculos;
- humedad local;
- lluvia;
- temperatura;
- charcos;
- plantas;
- cadáveres si se decide;
- materia orgánica;
- tipo de suelo.

### 3.2 Filosofía

Cada herramienta es una pregunta experimental. Colocar comida pregunta cómo responde el flujo de energía. Provocar lluvia pregunta cómo responde el sistema de humedad. Agregar una piedra pregunta cómo cambia el espacio.

### 3.3 Consecuencias

Una acción puede tener efectos secundarios. Comida abundante puede causar explosión poblacional y luego hambruna. Lluvia puede salvar plantas y borrar feromonas. Una piedra puede proteger o bloquear.

---

## 4. Edición genética

La edición genética es una herramienta futura y debe tratarse con cuidado.

### 4.1 Posibles rasgos

- sensibilidad a feromonas;
- tolerancia a humedad;
- velocidad;
- agresividad;
- resistencia al hambre;
- fertilidad;
- longevidad;
- tamaño;
- tendencia exploratoria;
- preferencia alimenticia.

### 4.2 Filosofía

No debe ser un menú de mejoras. Debe ser intervención experimental con costos. Más velocidad puede aumentar consumo energético. Más agresividad puede aumentar bajas. Más fertilidad puede producir sobrepoblación.

### 4.3 Restricción

Modificar rasgos no debe controlar individuos. Solo altera capacidades, tendencias o probabilidades.

---

## 5. Experimentos

Un experimento es una configuración diseñada para responder una pregunta.

### 5.1 Estructura recomendada

- pregunta;
- hipótesis;
- condiciones iniciales;
- variable modificada;
- variables observadas;
- duración simulada;
- criterios de comparación;
- resultado esperado;
- resultado observado;
- interpretación.

### 5.2 Ejemplos

#### Comida cerca vs lejos

Pregunta: ¿cómo afecta la distancia al tiempo de detección, eficiencia de ruta y reservas?

#### Lluvia sobre rutas activas

Pregunta: ¿cómo afecta la lluvia a feromonas, movilidad y éxito de recolección?

#### Depredador en ruta principal

Pregunta: ¿la colonia abandona la ruta, defiende o insiste?

#### Sequía prolongada

Pregunta: ¿cuánto resiste una colonia con reservas iniciales distintas?

---

## 6. Guardado de escenarios

Un escenario es una configuración inicial del mundo: mapa, clima, entidades, recursos, estado de colonia, terreno, reglas activas y parámetros experimentales.

### 6.1 Tipos de escenario

- Natural: ecosistema equilibrado o semi-autónomo.
- Experimental: diseñado para una pregunta.
- Extremo: prueba límites del sistema.
- Educativo: demuestra un principio concreto.

### 6.2 Versionado

Los escenarios deben versionarse porque las reglas del motor evolucionarán.

---

## 7. Comparación de resultados

Comparar resultados permite entender sensibilidad del sistema.

### 7.1 Comparaciones útiles

- misma colonia con distinta humedad;
- mismo alimento en distinto terreno;
- mismo clima con distinta población;
- misma escena con depredador presente o ausente;
- mismos rasgos con distintas semillas de variabilidad.

### 7.2 Métricas

- población final;
- reservas;
- mortalidad;
- alimento recolectado;
- rutas activas;
- larvas;
- crecimiento vegetal;
- hongos;
- depredación;
- tiempo hasta colapso;
- tiempo hasta expansión.

---

## 8. Estadísticas

Las estadísticas hacen visible lo que el ojo no ve.

### 8.1 Colonia

Población, obreras, soldados, larvas, huevos, reservas, presión alimenticia, amenaza, nacimientos, muertes, alimento recolectado, eficiencia de rutas.

### 8.2 Ambiente

Humedad, temperatura, lluvia, nutrientes, cobertura vegetal, materia orgánica, agua superficial, zonas peligrosas.

### 8.3 Fauna

Población de insectos, depredadores activos, presas capturadas, hambre promedio, zonas de caza.

### 8.4 Señales

Intensidad de feromonas, rutas más usadas, señales de alarma, zonas exploradas, duración de señales.

---

## 9. Reproducción de simulaciones

El proyecto debe permitir repetir escenarios bajo condiciones equivalentes.

Debe reproducirse:

- condiciones iniciales;
- reglas activas;
- parámetros;
- variabilidad si se registra;
- intervenciones del usuario;
- secuencia temporal si corresponde.

La reproducibilidad es clave para depurar, comparar y estudiar emergencia.

---

## 10. Aceleración temporal

Permite observar procesos largos: crecimiento, larvas, descomposición, estaciones, migración, colapso.

Acelerar no debe cambiar reglas. Solo aumenta la cantidad de tiempo simulado observado.

A velocidades altas se pierde detalle causal, por lo que deben existir eventos, resúmenes e historial.

---

## 11. Modos de observación

### 11.1 Natural

Vista visual del mundo sin ayudas analíticas fuertes.

### 11.2 Feromonas

Muestra rutas, intensidad, evaporación y señales de alarma.

### 11.3 Humedad

Muestra suelo seco, húmedo, saturado y zonas de riesgo.

### 11.4 Nutrientes

Muestra fertilidad, descomposición y recuperación del suelo.

### 11.5 Amenaza

Muestra depredadores, muertes recientes, señales de peligro y zonas evitadas.

### 11.6 Colonia

Muestra reservas, larvas, población, presión alimenticia, amenaza y expansión.

### 11.7 Histórico

Muestra rutas antiguas, cadáveres, eventos, zonas agotadas y cambios territoriales.

---

## 12. Sandbox

Modo de intervención libre. Permite probar condiciones extremas, crear escenarios y romper equilibrios para observar consecuencias.

El sandbox puede ser caótico, pero no debe ser incoherente.

---

## 13. Modo natural

Modo con intervención limitada. Su objetivo es observar el ecosistema con mínima manipulación, favoreciendo contemplación y lectura de procesos.

---

## 14. Filosofía de herramientas

Cada herramienta debe ser:

- causal;
- observable;
- reversible solo mediante nueva causa;
- respetuosa con autonomía;
- útil para formular preguntas;
- capaz de producir efectos secundarios.

Una herramienta buena no dice “haz esto”. Dice “el mundo cambió; veamos quién sobrevive a la junta directiva de la naturaleza”.

---

## 15. Decisiones futuras

- Herramientas iniciales de v0.1.
- Límites del sandbox.
- Si existirá edición genética.
- Formato de experimentos.
- Métricas oficiales iniciales.
- Modos de observación mínimos.
- Nivel de reproducibilidad requerido.
---

## 16. Flujo recomendado de un experimento

1. Definir pregunta.
2. Elegir escenario base.
3. Definir variable independiente.
4. Definir métricas observadas.
5. Ejecutar simulación.
6. Registrar intervenciones.
7. Observar eventos.
8. Comparar resultado con hipótesis.
9. Repetir con variación controlada.
10. Guardar conclusiones.

Este flujo convierte el simulador en laboratorio y evita que el usuario solo “toque cosas a ver qué pasa”, aunque tocar cosas a ver qué pasa también tiene su encanto científico de garaje.

---

## 17. Herramientas de edición ambiental detalladas

### 17.1 Colocar comida

Debe afectar flujo de energía. Puede aumentar reservas, reforzar rutas, atraer competidores, generar sobrepoblación o pudrirse.

### 17.2 Cambiar humedad

Debe afectar hongos, plantas, larvas, suelo, anfibios y posiblemente feromonas.

### 17.3 Provocar lluvia

Debe afectar humedad, señales químicas, movilidad, charcos, temperatura local y plantas.

### 17.4 Agregar obstáculos

Debe afectar rutas, acceso, refugio, microclima y riesgo.

### 17.5 Introducir animales

Debe afectar cadenas alimenticias, competencia, depredación, cadáveres y señales de peligro.

### 17.6 Modificar temperatura

Debe afectar actividad, evaporación, estrés, crecimiento y supervivencia.

---

## 18. Herramientas de observación detalladas

### 18.1 Inspector de entidad

Permite ver estado conceptual de una entidad sin modificarla.

### 18.2 Historial de eventos

Permite reconstruir causalidad.

### 18.3 Mapas de calor

Muestran actividad, humedad, nutrientes, amenaza, feromonas o mortalidad.

### 18.4 Comparador de escenarios

Muestra diferencias entre ejecuciones.

### 18.5 Resumen de colonia

Muestra reservas, población, larvas, amenaza, presión alimenticia y tendencia.

---

## 19. Filosofía del sandbox vs modo natural

### 19.1 Sandbox

El usuario puede intervenir fuerte. Sirve para aprendizaje, estrés del sistema y experimentos extremos.

### 19.2 Natural

El usuario observa más y toca menos. Sirve para contemplación y validación de autonomía.

### 19.3 Ambos deben compartir reglas

El mundo no debe tener reglas distintas por modo, salvo límites de herramientas. Una hormiga no debe volverse más obediente porque el usuario está en sandbox.

---

## 20. Registro de intervención

Toda intervención importante debe quedar registrada:

- tipo;
- ubicación;
- momento;
- intensidad;
- duración;
- entidad o recurso creado;
- condiciones previas;
- efectos posteriores observables.

Esto permite reproducir experimentos y entender consecuencias.

---

## 21. Criterios de una buena herramienta

Una herramienta es buena si:

- modifica el entorno, no criaturas;
- produce consecuencias sistémicas;
- permite formular preguntas;
- puede registrarse;
- puede observarse;
- no rompe causalidad;
- no convierte el proyecto en RTS.

---

## 22. Decisiones futuras ampliadas

- Si el usuario podrá retirar recursos o solo agregarlos.
- Si habrá costos simbólicos para intervenciones.
- Si habrá límites éticos o de bienestar visual.
- Si se permitirán experimentos automatizados.
- Si se podrán compartir escenarios.
- Si existirá un modo educativo guiado.
- Si las herramientas avanzadas se desbloquean por madurez o están siempre disponibles.
