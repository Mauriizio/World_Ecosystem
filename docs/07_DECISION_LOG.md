# 07 — DECISION LOG

## Registro de decisiones arquitectónicas y de diseño

**Estado:** Documento fundacional v0.1  
**Relación con `01_WORLD_BIBLE.md`:** Este documento protege la coherencia del proyecto a largo plazo.  
**Nivel:** Gobernanza conceptual y técnica. Sin implementación ni código.

---

## 1. Propósito

Este documento define cómo se registrarán las decisiones importantes del proyecto. El simulador está pensado para años de evolución; por eso las decisiones no pueden vivir solo en memoria o conversaciones sueltas.

El Decision Log debe responder siempre:

- qué se decidió;
- por qué se decidió;
- qué alternativas se evaluaron;
- qué riesgos se aceptaron;
- qué documentos afecta;
- cuándo debe revisarse.

---

## 2. Qué es un ADR

ADR significa **Architecture Decision Record**. En este proyecto se usa de forma amplia: decisiones de arquitectura, simulación, mundo, herramientas, experiencia, assets y documentación pueden registrarse como ADR si tienen impacto estructural.

Un ADR no es una biblia completa. Es un registro enfocado de una decisión.

---

## 3. Por qué usar ADR

- Mantiene memoria histórica.
- Evita discutir lo mismo cada mes como si tuviéramos memoria RAM de pez.
- Expone trade-offs.
- Permite cambiar con contexto.
- Protege principios fundacionales.
- Ayuda a Codex o a cualquier implementador futuro a entender restricciones.

---

## 4. Cuándo crear un ADR

Crear un ADR cuando una decisión afecte:

- separación simulación/render;
- modelo de tiempo;
- modelo espacial;
- feromonas;
- entidades;
- persistencia;
- tecnología visual;
- herramientas de usuario;
- nivel de realismo;
- comportamiento de colonias;
- escalabilidad;
- assets;
- documentación.

No hace falta ADR para cambios menores de redacción, pruebas descartables o nombres temporales sin impacto.

---

## 5. Estados de ADR

- **Propuesto:** en discusión.
- **Aceptado:** aprobado y vigente.
- **Rechazado:** evaluado y descartado.
- **Reemplazado:** sustituido por otro ADR.
- **Obsoleto:** ya no aplica.
- **En revisión:** vigente temporalmente, pero debe reevaluarse.

---

## 6. Formato oficial

Cada ADR debe contener:

### Título

Claro y específico. Ejemplo: `ADR-0001 — Separación absoluta entre simulación y render`.

### Estado

Propuesto, aceptado, rechazado, reemplazado, obsoleto o en revisión.

### Contexto

Qué problema se intenta resolver, por qué importa, restricciones y principios involucrados.

### Decisión

La decisión concreta.

### Alternativas consideradas

Cada alternativa debe incluir ventajas, desventajas y motivo de aceptación o rechazo.

### Consecuencias

Beneficios, costos, riesgos, impacto a largo plazo, dependencias creadas y cosas que se vuelven más fáciles o difíciles.

### Criterios de revisión

Cuándo debe reabrirse la decisión.

### Relación con documentos

Qué documentos afecta.

---

## 7. Numeración

Formato recomendado:

- `ADR-0001-title.md`
- `ADR-0002-title.md`
- `ADR-0003-title.md`

No se reutilizan números.

---

## 8. Ubicación recomendada

Los ADR deberían vivir en:

`docs/adr/`

Este archivo funciona como norma e índice general.

---

## 9. Decisiones ya identificadas

### 9.1 Simulación independiente del render

Estado sugerido: Aceptado.  
Impacto: Muy alto.  
Documentos: `00_PROJECT_VISION.md`, `01_WORLD_BIBLE.md`, `03_ARCHITECTURE_BIBLE.md`.

### 9.2 Usuario modifica entorno, no criaturas

Estado sugerido: Aceptado.  
Impacto: Muy alto.  
Documentos: `00_PROJECT_VISION.md`, `01_WORLD_BIBLE.md`, `05_USER_EXPERIMENTS.md`.

### 9.3 TypeScript como lenguaje principal

Estado sugerido: Aceptado provisional hasta inicio de implementación.  
Impacto: Alto.

### 9.4 GLB como formato principal de modelos

Estado sugerido: Aceptado provisional.  
Impacto: Medio/alto.

### 9.5 Blender como herramienta principal de assets

Estado sugerido: Aceptado provisional.  
Impacto: Medio.

### 9.6 Arquitectura modular basada en sistemas

Estado sugerido: Aceptado provisional.  
Impacto: Muy alto.

### 9.7 ECS formal vs arquitectura propia

Estado sugerido: Pendiente.  
Impacto: Muy alto.

### 9.8 Representación espacial inicial

Estado sugerido: Pendiente.  
Impacto: Muy alto.

### 9.9 Modelo de feromonas

Estado sugerido: Pendiente.  
Impacto: Muy alto.

### 9.10 Profundidad del nido

Estado sugerido: Pendiente.  
Impacto: Alto.

---

## 10. Índice inicial de ADR sugeridos

- ADR-0001 — Separación absoluta entre simulación y render.
- ADR-0002 — Usuario como interventor ambiental.
- ADR-0003 — TypeScript como lenguaje principal.
- ADR-0004 — GLB como formato de modelos.
- ADR-0005 — Blender como herramienta principal de assets.
- ADR-0006 — Arquitectura basada en sistemas.
- ADR-0007 — ECS formal o arquitectura propia.
- ADR-0008 — Representación espacial inicial.
- ADR-0009 — Modelo de tiempo.
- ADR-0010 — Modelo inicial de feromonas.
- ADR-0011 — Profundidad conceptual del nido.
- ADR-0012 — Primer depredador.

---

## 11. Plantilla de ADR

```text
ADR-XXXX — Título de la decisión

Estado:

Contexto:

Decisión:

Alternativas consideradas:

Consecuencias positivas:

Consecuencias negativas:

Riesgos:

Criterios de revisión:

Documentos relacionados:
```

La plantilla aparece como texto de referencia, no como implementación.

---

## 12. Reglas de mantenimiento

- No modificar decisiones históricas sin registrar cambio.
- Si una decisión cambia, crear nuevo ADR o marcar reemplazo.
- Evitar justificaciones vagas.
- Registrar desacuerdos importantes.
- Revisar ADR antes de implementar sistemas grandes.

---

## 13. Decisiones futuras

- Crear carpeta formal `docs/adr/`.
- Convertir decisiones fundacionales en ADR aceptados.
- Definir quién aprueba ADR.
- Definir granularidad de ADR.
- Definir revisión por fase de roadmap.
---

## 14. Criterios para evaluar decisiones

Cada decisión debe evaluarse por:

- coherencia con filosofía;
- impacto en modularidad;
- reversibilidad;
- impacto en rendimiento futuro;
- impacto en documentación;
- facilidad de prueba;
- claridad para Codex o implementadores;
- escalabilidad hacia otros ecosistemas;
- riesgo de acoplamiento;
- costo de aprendizaje.

---

## 15. Tipos de ADR del proyecto

### 15.1 ADR de arquitectura

Tecnologías, módulos, contratos, persistencia, render, pruebas.

### 15.2 ADR de simulación

Tiempo, feromonas, percepción, recursos, muerte, reproducción, clima.

### 15.3 ADR de mundo

Especies iniciales, biomas, nido, depredadores, flora, ciclos.

### 15.4 ADR de usuario

Herramientas, sandbox, observación, experimentos, límites.

### 15.5 ADR de assets

Blender, GLB, escala, materiales, animaciones, pipeline.

---

## 16. Proceso recomendado para una decisión

1. Plantear problema.
2. Identificar principios afectados.
3. Listar alternativas.
4. Analizar ventajas y riesgos.
5. Elegir decisión provisional o definitiva.
6. Registrar ADR.
7. Actualizar documentos relacionados.
8. Definir criterio de revisión.

---

## 17. Ejemplo conceptual de decisión

### Problema

Elegir si el mundo inicial será 2D, 2.5D o 3D completo.

### Principios afectados

Simulación independiente, terreno funcional, claridad, escalabilidad, render no dominante.

### Alternativas

- 2D: simple, claro, pero menos alineado con GLB.
- 2.5D: equilibrio entre simulación de superficie y visual 3D.
- 3D completo: potente, pero complejo y riesgoso temprano.

### Posible resultado

Elegir 2.5D como primera representación espacial si permite usar modelos 3D sin complicar navegación.

Este ejemplo no cierra la decisión. Solo muestra cómo razonarla.

---

## 18. Auditoría de decisiones

Al final de cada fase del roadmap debe revisarse:

- ADR nuevos;
- ADR obsoletos;
- decisiones pendientes;
- contradicciones documentales;
- riesgos aceptados;
- decisiones que deben convertirse en pruebas.

---

## 19. Decisiones que no deben tomarse sin ADR

- Cambiar filosofía de usuario.
- Mezclar simulación con render.
- Adoptar ECS formal.
- Cambiar lenguaje principal.
- Elegir representación espacial definitiva.
- Definir modelo de feromonas.
- Definir profundidad del nido.
- Agregar genética.
- Agregar nuevos ecosistemas.
- Cambiar formato de persistencia.
