# 06 — ROADMAP

## Roadmap por madurez del proyecto

**Estado:** Documento fundacional v0.1  
**Relación con `01_WORLD_BIBLE.md`:** Organiza la evolución del proyecto sin fechas.  
**Nivel:** Planificación estratégica. Sin implementación ni código.

---

## 1. Propósito

Este roadmap no usa fechas. El proyecto debe avanzar por madurez, no por calendario. Cada fase existe para validar fundamentos antes de agregar complejidad.

---

## 2. Filosofía del roadmap

- Madurez antes que velocidad.
- Ecosistema antes que espectáculo.
- Documentación antes de expansión.
- Ciclos completos antes de contenido masivo.
- Observabilidad antes de complejidad oculta.

---

## 3. Fase 0 — Fundación conceptual

### Objetivos

Crear documentación base: visión, World Bible, reglas de simulación, arquitectura, entidades, experimentos, roadmap y decision log.

### Criterios de finalización

Existen documentos coherentes, las reglas fundacionales están claras y las decisiones pendientes están identificadas.

### Dependencias

Ninguna.

### Riesgos

Documentar sin tomar decisiones útiles, cerrar decisiones prematuras, mezclar implementación con concepto.

### Entregables

- `00_PROJECT_VISION.md`
- `01_WORLD_BIBLE.md`
- `02_SIMULATION_RULES.md`
- `03_ARCHITECTURE_BIBLE.md`
- `04_ENTITY_REFERENCE.md`
- `05_USER_EXPERIMENTS.md`
- `06_ROADMAP.md`
- `07_DECISION_LOG.md`

---

## 4. Fase 1 — Núcleo mínimo del hormiguero

### Objetivos

Definir y validar el ciclo básico: obreras exploran, encuentran comida, dejan señales, otras responden, comida llega al nido, reservas cambian y presión alimenticia influye en actividad.

### Criterios de finalización

El ciclo exploración → comida → feromona → recolección → reservas puede explicarse y observarse.

### Dependencias

Fase 0, modelo inicial de feromonas, representación espacial mínima, entidades mínimas.

### Riesgos

Hormigas demasiado inteligentes, feromonas como control absoluto, demasiadas entidades al inicio.

### Entregables

Especificación de obrera mínima, comida, colonia mínima, feromonas v0.1, eventos de recolección y criterios de observación.

---

## 5. Fase 2 — Observabilidad básica

### Objetivos

Permitir leer el sistema: rutas, feromonas, reservas, actividad, población, eventos y presión alimenticia.

### Criterios de finalización

El usuario puede entender por qué una ruta se forma, se refuerza o desaparece.

### Dependencias

Fase 1, eventos iniciales y métricas.

### Riesgos

Demasiada información, causas ocultas, herramientas que controlan en vez de observar.

### Entregables

Modos de observación iniciales, lista de eventos, estadísticas mínimas y guía de interpretación.

---

## 6. Fase 3 — Terreno funcional

### Objetivos

Hacer que el espacio importe: suelo, piedras, obstáculos, accesibilidad, distancia y costo de movimiento.

### Criterios de finalización

Los obstáculos redirigen rutas; la ubicación de comida importa; el terreno crea oportunidades y riesgos.

### Dependencias

Fase 1 y 2; decisión espacial.

### Riesgos

Geometría demasiado compleja, pathfinding perfecto, acoplamiento con render.

### Entregables

Especificación de terreno, obstáculos, costos de movimiento y accesibilidad.

---

## 7. Fase 4 — Clima mínimo funcional

### Objetivos

Introducir humedad, lluvia y temperatura con consecuencias reales.

### Criterios de finalización

La lluvia afecta feromonas, humedad, movilidad o crecimiento; el clima cambia decisiones indirectamente.

### Dependencias

Fases 1 a 3 recomendadas, modelo climático.

### Riesgos

Clima solo visual, demasiadas variables, efectos ilegibles.

### Entregables

Reglas de lluvia, humedad, temperatura básica, eventos climáticos y efectos sobre señales.

---

## 8. Fase 5 — Flora y recursos renovables

### Objetivos

Agregar plantas, semillas, crecimiento y producción ecológica de alimento.

### Criterios de finalización

Existe el ciclo clima/suelo → plantas → semillas → consumidores.

### Dependencias

Terreno y clima recomendados.

### Riesgos

Plantas decorativas, semillas infinitas, crecimiento irrelevante.

### Entregables

Especificación de planta, semilla, crecimiento, producción y relación con humedad/nutrientes.

---

## 9. Fase 6 — Muerte y descomposición

### Objetivos

Cerrar ciclo de materia con cadáveres, hongos, materia orgánica y nutrientes.

### Criterios de finalización

Organismo muerto → cadáver → descomposición → nutrientes → plantas.

### Dependencias

Flora recomendada, reglas de muerte, entidad hongo.

### Riesgos

Cadáveres que desaparecen sin causa, hongos decorativos, nutrientes invisibles e ilegibles.

### Entregables

Reglas de cadáver, hongo, descomposición, nutrientes y relación con humedad.

---

## 10. Fase 7 — Fauna menor y competencia

### Objetivos

Agregar insectos pequeños como consumidores, presas y competidores.

### Criterios de finalización

Existe competencia por semillas y cadenas hacia depredadores.

### Dependencias

Flora y recursos.

### Riesgos

Muchas especies sin función, competencia ilegible, desequilibrio de recursos.

### Entregables

Insectos iniciales, reglas de competencia, consumo y población.

---

## 11. Fase 8 — Depredadores

### Objetivos

Introducir araña, alacrán, sapo o rana como presión ecológica real.

### Criterios de finalización

El depredador caza por necesidad, descansa, se sacia, genera peligro y altera rutas.

### Dependencias

Fauna menor recomendable, señales de peligro, observabilidad.

### Riesgos

Depredadores como enemigos artificiales, mortalidad excesiva, respuestas ilegibles.

### Entregables

Primer depredador, reglas de caza, descanso, amenaza y eventos de depredación.

---

## 12. Fase 9 — Colonias avanzadas

### Objetivos

Expansión, migración, defensa, limpieza, rutas múltiples, presión interna y posibles conflictos.

### Criterios de finalización

La colonia parece inteligente sin aumentar inteligencia individual artificialmente.

### Dependencias

Amenaza, eventos, observabilidad, nido y territorio.

### Riesgos

Controlador central oculto, decisiones opacas, exceso de complejidad.

### Entregables

Estado global de colonia, expansión, migración, defensa, crisis y eventos colectivos.

---

## 13. Fase 10 — Escenarios y reproducibilidad

### Objetivos

Convertir el simulador en laboratorio: guardar escenarios, repetir, comparar y analizar resultados.

### Criterios de finalización

El usuario puede repetir un escenario, cambiar una variable y comparar resultados.

### Dependencias

Eventos, métricas, persistencia conceptual.

### Riesgos

Estado incompleto, azar no reproducible, métricas insuficientes.

### Entregables

Especificación de escenario, experimento, historial, métricas y comparación.

---

## 14. Fase 11 — Assets y pipeline Blender

### Objetivos

Integrar modelos GLB, materiales y animaciones sin acoplar lógica.

### Criterios de finalización

Los assets representan estado; no contienen reglas de simulación.

### Dependencias

Entidades definidas, render separado, decisiones visuales.

### Riesgos

Priorizar estética sobre sistema, lógica pegada a modelos, inconsistencias de escala.

### Entregables

Guía de assets, modelos iniciales, criterios GLB, materiales y estados visuales.

---

## 15. Fase 12 — Nuevos ecosistemas

### Objetivos

Validar que el motor sirve para termitas, abejas, bosque, desierto u otros ecosistemas.

### Criterios de finalización

Un nuevo ecosistema reutiliza energía, materia, organismos, señales, ambiente, muerte, reproducción y observación.

### Dependencias

Motor maduro, documentación estable, sistemas desacoplados.

### Riesgos

Descubrir acoplamiento oculto al hormiguero, reglas no generalizables.

### Entregables

Especificación del segundo ecosistema, sistemas reutilizados, sistemas nuevos y ADR de extensión.

---

## 16. Decisiones futuras

- Orden real de implementación.
- Momento exacto de introducir render atractivo.
- Profundidad del nido.
- Momento de múltiples colonias.
- Genética.
- Balance entre educación, laboratorio y sandbox.
---

## 17. Puertas de madurez entre fases

Antes de pasar de fase, se debe revisar:

- documentación actualizada;
- decisiones registradas;
- criterios de finalización cumplidos;
- riesgos revisados;
- nuevas decisiones futuras identificadas;
- coherencia con World Bible;
- no acoplamiento indebido;
- observabilidad suficiente.

---

## 18. Workstreams transversales

### 18.1 Documentación

Debe mantenerse en todas las fases. Cada entidad, sistema, herramienta y decisión debe actualizar documentos correspondientes.

### 18.2 Investigación biológica

No se exige realismo absoluto, pero se deben consultar referencias cuando se diseñen comportamientos importantes.

### 18.3 Assets y Blender

Aprender Blender solo en función del proyecto: navegación, low poly, materiales, armatures, animaciones simples y exportación GLB.

### 18.4 Observabilidad

Cada fase debe agregar maneras de entender lo que ocurre.

### 18.5 Pruebas conceptuales

Cada fase debe definir escenarios de validación.

---

## 19. Gestión de riesgos por madurez

### 19.1 Riesgos tempranos

- Sobrearquitectura.
- Falta de ciclo básico.
- Confusión entre simulador y juego.
- Querer usar todos los assets descargados.

### 19.2 Riesgos medios

- Complejidad ilegible.
- Clima sin consecuencias.
- Depredadores demasiado fuertes.
- Flora decorativa.
- Observabilidad insuficiente.

### 19.3 Riesgos tardíos

- Núcleo demasiado acoplado al hormiguero.
- Persistencia difícil.
- Nuevos ecosistemas que requieren reescritura.
- Documentación obsoleta.

---

## 20. Criterio de avance sano

Una fase está sana si agrega profundidad sin romper principios. Si agrega contenido pero reduce claridad, no es progreso real.

---

## 21. Backlog conceptual no priorizado

- Nido subterráneo detallado.
- Múltiples colonias.
- Guerra territorial.
- Genética.
- Enfermedades.
- Biomas.
- Polinización.
- Termitas.
- Abejas.
- Estaciones completas.
- Corrientes de agua.
- Incendios.
- Ecosistemas urbanos.

Nada de esto entra por capricho. Entra cuando el núcleo pueda sostenerlo.
