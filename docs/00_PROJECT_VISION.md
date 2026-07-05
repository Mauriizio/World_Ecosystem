# 00 — PROJECT VISION

**Proyecto:** Motor de Simulación de Ecosistemas Emergentes  
**Primer ecosistema:** Hormiguero  
**Estado:** Documento fundacional v0.1  
**Relación con `01_WORLD_BIBLE.md`:** Este documento no reemplaza ni modifica la World Bible. La complementa definiendo visión, alcance, identidad, objetivos y criterios de éxito.

---

## 1. Qué estamos construyendo

Estamos construyendo un **motor de simulación de ecosistemas emergentes**. El primer ecosistema será un hormiguero, pero el objetivo no es crear un juego de hormigas. El hormiguero es el primer laboratorio de validación de un motor más amplio, capaz de representar organismos, recursos, clima, terreno, señales, muerte, reproducción, competencia, cooperación y ciclos de materia.

El proyecto debe permitir observar un mundo vivo donde organismos simples producen comportamientos complejos al interactuar con un entorno dinámico. Las criaturas no siguen guiones cerrados ni órdenes directas del usuario. Responden a necesidades, estímulos, señales y condiciones ambientales.

La construcción principal no es una escena visual, ni una colección de modelos, ni una interfaz bonita. La construcción principal es un **sistema causal**: un mundo donde cada evento importante pueda explicarse por relaciones internas.

### 1.1 Declaración corta de producto

Un simulador sandbox de ecosistemas donde el usuario actúa como interventor ambiental, modifica condiciones del mundo y observa cómo colonias, organismos y recursos responden mediante comportamiento emergente.

### 1.2 Declaración larga de producto

El proyecto busca crear una plataforma de simulación en la que una colonia de hormigas pueda explorar, recolectar, comunicarse mediante feromonas, alimentar larvas, defenderse, crecer, migrar o colapsar sin que esos eventos estén programados como escenas cerradas. El mundo debe estar formado por ciclos: plantas que producen semillas, semillas que alimentan organismos, organismos que mueren, cadáveres que alimentan hongos, hongos que devuelven nutrientes al suelo y suelo que permite nueva vida.

---

## 2. Qué problema intenta resolver

Muchos juegos y simuladores representan mundos vivos de manera superficial. Hay criaturas que se mueven, plantas que decoran, recursos que aparecen y eventos que se disparan, pero las conexiones internas suelen ser débiles. Este proyecto intenta resolver ese problema diseñando un mundo donde los cambios tengan causa, los recursos tengan origen y destino, y las criaturas actúen con información limitada.

El problema principal es doble:

1. **Problema de diseño sistémico:** cómo construir un mundo que genere historias sin escribir historias.
2. **Problema de ingeniería a largo plazo:** cómo diseñar un motor suficientemente modular para que el hormiguero inicial pueda crecer hacia otros ecosistemas sin reescribir el núcleo.

Un buen resultado no se mide solo por si las hormigas se ven bien caminando. Se mide por si el usuario puede preguntar: “¿por qué la colonia abandonó esta ruta?”, “¿qué causó este brote de hongos?”, “¿por qué aumentó la mortalidad?”, “¿qué pasaría si repito el escenario con menos lluvia?”.

---

## 3. Qué hace único este proyecto

### 3.1 El usuario no controla criaturas

El usuario modifica el entorno. No selecciona hormigas, no les ordena atacar, no decide manualmente rutas ni tareas. Esta regla diferencia el proyecto de un RTS, un colony manager tradicional o un juego de unidades.

### 3.2 El mundo se basa en causalidad ecológica

La lluvia no es solo un efecto visual: modifica humedad, señales, movilidad, plantas y hongos. Una piedra no es decoración: bloquea rutas, crea sombra, refugio o microhábitat. Un cadáver no desaparece: se transforma en materia orgánica, alimenta descomponedores y puede enriquecer el suelo.

### 3.3 La inteligencia es distribuida

La colonia debe parecer inteligente, pero ninguna hormiga debe tener conocimiento global. La coordinación nace de señales, rutas reforzadas, necesidades internas y retroalimentación local.

### 3.4 El contenido existe por función

No se agregan organismos para adornar. Cada entidad debe cumplir una función ecológica: producir, consumir, competir, depredar, reciclar, bloquear, comunicar o modificar condiciones.

### 3.5 La documentación es parte del producto

El proyecto se construirá durante años. Por eso cada decisión importante debe quedar documentada. La documentación protege la visión, facilita cambios futuros y evita que el sistema se vuelva una maraña elegante pero inmantenible.

---

## 4. Filosofía general

### 4.1 Mundo antes que motor

Antes de diseñar clases, carpetas o tecnología, se diseña el mundo. Primero se entiende qué existe, por qué existe, qué transforma, qué percibe y cómo se relaciona. La arquitectura técnica debe servir al ecosistema, no al revés.

### 4.2 Reglas simples, resultados complejos

El comportamiento emergente surge de reglas pequeñas que interactúan. Una hormiga sigue feromonas, evita peligro, carga comida y vuelve al nido. Si cientos de hormigas aplican reglas similares sobre un entorno cambiante, pueden aparecer rutas eficientes, abandonos, defensas, migraciones y crisis.

### 4.3 Causa antes que espectáculo

Una animación bonita no compensa una simulación vacía. Un efecto visual debe representar un estado del mundo, no reemplazarlo. El espectáculo es bienvenido solo si no rompe causalidad.

### 4.4 Coherencia antes que realismo absoluto

El proyecto se inspira en ecología y biología, pero no pretende ser un paper científico desde el primer día. La prioridad es que el mundo sea internamente coherente, observable, extensible y honesto.

---

## 5. Público objetivo

### 5.1 Público principal

- Personas interesadas en simulaciones y sistemas complejos.
- Desarrolladores que disfrutan arquitectura de motores.
- Diseñadores sistémicos.
- Estudiantes o curiosos de biología, ingeniería, IA y ecología.
- Jugadores que prefieren sandbox, observación y experimentación antes que objetivos lineales.

### 5.2 Experiencia deseada

El usuario debe sentir curiosidad, sorpresa y responsabilidad. Debe poder intervenir, observar consecuencias, formular hipótesis, comparar escenarios y descubrir patrones. El proyecto debe despertar una mentalidad de laboratorio: “cambio una variable y observo qué ocurre”.

---

## 6. Objetivos por horizonte de madurez

### 6.1 Corto plazo

- Consolidar la documentación fundacional.
- Definir reglas de simulación.
- Definir entidades iniciales.
- Diseñar el ciclo básico de hormigas, comida, feromonas y reservas.
- Mantener separadas las decisiones conceptuales de la implementación.

### 6.2 Mediano plazo

- Incorporar terreno funcional, clima, flora, semillas, cadáveres, hongos y nutrientes.
- Crear herramientas de observación.
- Permitir experimentos reproducibles.
- Añadir depredadores con necesidades propias.
- Lograr que el usuario pueda explicar eventos emergentes mediante datos y observación.

### 6.3 Largo plazo

- Permitir múltiples colonias.
- Permitir competencia, migración, guerra y colapso emergente.
- Soportar nuevos ecosistemas como termitas, abejas, bosque o desierto.
- Mantener el núcleo reusable, modular y documentado.
- Construir una plataforma de simulación, no solo un producto cerrado.

---

## 7. Qué NO es este proyecto

Este proyecto no es:

- un RTS;
- un juego de control de unidades;
- una maqueta decorativa;
- una simulación científica estricta desde el inicio;
- un juego de mascotas;
- una experiencia basada en misiones lineales;
- un sistema de eventos guionizados disfrazado de ecosistema;
- un render bonito con lógica pegada encima.

Si una propuesta empuja el proyecto hacia control directo, eventos mágicos, contenido sin función o acoplamiento fuerte entre render y simulación, debe considerarse sospechosa.

---

## 8. Definición de éxito

### 8.1 Éxito conceptual

El mundo genera situaciones no guionizadas pero explicables: rutas eficientes, hambrunas, brotes de hongos, cambios de comportamiento por lluvia, depredación que altera territorios, sobrepoblación que causa crisis o migración por presión ambiental.

### 8.2 Éxito técnico

La simulación puede ejecutarse sin render; los sistemas son reemplazables; las entidades pueden crecer; los escenarios pueden guardarse; los eventos son auditables; la documentación se mantiene vigente.

### 8.3 Éxito de experiencia

El usuario no solo mira: investiga. Se pregunta qué causó cada fenómeno, modifica condiciones, compara resultados y empieza a pensar como diseñador de sistemas vivos.

---

## 9. Decisiones futuras

- Nombre definitivo del proyecto.
- Nivel de realismo biológico.
- Público prioritario de la primera versión.
- Tono visual y emocional.
- Criterio mínimo de “ecosistema vivo” para v0.1.
- Si el producto futuro se orientará más a laboratorio, sandbox, experiencia educativa o simulador contemplativo.
---

## 10. Pilares estratégicos del proyecto

### 10.1 Simulación como producto principal

La simulación es el producto real. El render, la interfaz, los modelos y las herramientas existen para revelar la simulación, no para reemplazarla. Si un comportamiento solo existe visualmente, pero no tiene estado ni consecuencia dentro del mundo, todavía no pertenece al núcleo del proyecto.

### 10.2 Ecosistema como red de dependencias

Cada parte del mundo debe poder explicarse por relaciones: qué consume, qué produce, qué modifica, qué amenaza y qué deja atrás. Un organismo aislado sin relaciones no es una entidad válida para este proyecto.

### 10.3 Intervención responsable

El usuario puede alterar el mundo, pero sus acciones deben tener consecuencias. La experiencia debe evitar el poder mágico sin costo conceptual. Incluso en sandbox, el mundo debe responder con causalidad.

### 10.4 Extensibilidad radical

El hormiguero no debe convertirse en una cárcel arquitectónica. Cada decisión debe preguntarse si impide o facilita ecosistemas futuros. Si una idea solo funciona para hormigas y bloquea termitas, abejas o biomas futuros, debe justificarse formalmente.

### 10.5 Observabilidad

Un mundo emergente sin herramientas de lectura puede parecer aleatorio. El usuario debe tener formas de entender capas invisibles: feromonas, presión alimenticia, amenaza, humedad, nutrientes, historial y rutas.

---

## 11. Alcance inicial recomendado

El alcance inicial debe ser deliberadamente pequeño pero profundo. La primera versión útil del ecosistema no necesita muchas especies. Necesita demostrar que las relaciones centrales funcionan.

### 11.1 Debe incluir conceptualmente

- Colonia básica.
- Obreras simples.
- Fuente de comida.
- Feromonas o señal equivalente.
- Nido o punto de retorno.
- Reservas.
- Hambre o presión alimenticia.
- Exploración.
- Recolección.
- Evaporación de señales.
- Herramienta de usuario para colocar comida.
- Observación básica de rutas.

### 11.2 Debe excluir temporalmente

- Genética avanzada.
- Múltiples biomas.
- Muchas especies simultáneas.
- Física compleja.
- Nido subterráneo detallado.
- Guerra entre colonias.
- Reproducción totalmente detallada.
- Animaciones complejas como requisito para validar simulación.

Excluir no significa descartar. Significa proteger la primera validación.

---

## 12. Riesgos estratégicos

### 12.1 Riesgo de sobrealcance

El proyecto tiene una visión grande. Eso es positivo, pero peligroso. Si se intenta implementar flora, clima, depredadores, hongos, genética y colonias avanzadas antes de validar el ciclo básico, el proyecto puede colapsar bajo su propia ambición.

### 12.2 Riesgo de acoplamiento visual

Es tentador comenzar con Three.js, modelos GLB y animaciones. Pero si la lógica nace dentro del render, el motor pierde independencia. El render debe entrar como consumidor del estado, no como origen de reglas.

### 12.3 Riesgo de falsa emergencia

Un sistema puede parecer emergente si se programan muchos eventos condicionales. Pero si esos eventos son guiones ocultos, el proyecto traiciona su filosofía. La emergencia real requiere reglas locales, memoria ambiental, recursos limitados y consecuencias acumuladas.

### 12.4 Riesgo de simulación ilegible

Demasiada complejidad sin observabilidad hará que el usuario no entienda qué ocurre. La sorpresa debe ser investigable.

### 12.5 Riesgo de realismo paralizante

Buscar exactitud biológica total desde el inicio puede impedir avanzar. La meta inicial es coherencia sistémica, no tesis doctoral con hormigas usando casco de obra.

---

## 13. Métricas de éxito por dimensión

### 13.1 Métricas de simulación

- Las rutas aparecen sin ser dibujadas manualmente.
- Las señales se refuerzan y desaparecen.
- La colonia responde a disponibilidad real de comida.
- Las decisiones individuales usan percepción limitada.
- Los cambios del usuario producen consecuencias no triviales.

### 13.2 Métricas de arquitectura

- El núcleo puede ejecutarse sin render.
- Las entidades no dependen de assets visuales.
- Los sistemas tienen responsabilidades claras.
- Las decisiones importantes tienen ADR.
- Los escenarios pueden reproducirse.

### 13.3 Métricas de experiencia

- El usuario puede formular hipótesis.
- El usuario puede observar capas invisibles.
- El usuario puede explicar eventos después de revisar datos.
- El usuario siente que el mundo tiene vida propia.

---

## 14. Declaración de identidad final

Este proyecto debe sentirse como observar una pequeña naturaleza artificial con reglas propias. No debe pedirle al usuario que controle la vida, sino que la perturbe, la estudie y aprenda de sus consecuencias.
