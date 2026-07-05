# 04 — ENTITY REFERENCE

## Enciclopedia oficial de entidades

**Estado:** Documento fundacional v0.1  
**Relación con `01_WORLD_BIBLE.md`:** Este documento cataloga entidades derivadas del mundo conceptual.  
**Nivel:** Referencia de diseño. No contiene implementación ni código.

---

## 1. Propósito

Este documento es la enciclopedia oficial de entidades del ecosistema. Una entidad es cualquier elemento que participa en la simulación: organismo, recurso, señal, estructura, terreno, colonia, cadáver o condición material localizada.

La estructura está preparada para crecer a cientos de entidades futuras.

---

## 2. Plantilla oficial de entidad

Cada entidad futura debe documentarse con:

- **Descripción:** qué es.
- **Propósito ecológico:** por qué existe.
- **Atributos conceptuales:** propiedades relevantes.
- **Ciclo de vida:** cómo nace, cambia y desaparece.
- **Necesidades:** qué requiere.
- **Relaciones:** con qué interactúa.
- **Comportamientos:** qué puede hacer o qué procesos la afectan.
- **Eventos posibles:** qué puede causar, recibir o registrar.
- **Decisiones futuras:** aspectos no cerrados.

---

## 3. Hormiga Reina

### Descripción

Organismo reproductivo central de la colonia. No es controlable por el usuario y representa continuidad biológica.

### Propósito ecológico

Produce huevos y sostiene el crecimiento futuro. Su salud condiciona la viabilidad de la colonia.

### Atributos conceptuales

Salud, edad, fertilidad, ritmo reproductivo, hambre, estrés, sensibilidad a humedad y temperatura, dependencia de cuidado, exposición a amenazas.

### Ciclo de vida

Reina activa → producción de huevos → envejecimiento → posible pérdida de fertilidad → muerte → crisis reproductiva de colonia.

### Necesidades

Alimento, protección, humedad adecuada, temperatura estable, higiene, cuidado de obreras y estabilidad del nido.

### Relaciones

Produce huevos, depende de obreras, afecta población futura, incrementa presión alimenticia indirectamente y es vulnerable a hambre, hongos, inundación o ataques.

### Comportamientos

Poner huevos, reducir reproducción bajo estrés, deteriorarse si faltan recursos, morir si las condiciones fallan.

### Eventos posibles

Huevos producidos, fertilidad reducida, reina en peligro, reina muerta, colonia sin reproducción viable.

### Decisiones futuras

Una o múltiples reinas, visibilidad en nido, reemplazo reproductivo, fundación de nuevas colonias.

---

## 4. Hormiga Obrera

### Descripción

Unidad funcional principal de la colonia.

### Propósito ecológico

Explora, recolecta, transporta, cuida larvas, limpia, mantiene rutas y responde a amenazas.

### Atributos conceptuales

Hambre, cansancio, salud, edad, carga, rol temporal, sensibilidad a feromonas, percepción local, memoria limitada, orientación aproximada, estado de alarma.

### Ciclo de vida

Adulta funcional → tareas internas o externas → envejecimiento → desgaste → muerte → cadáver → descomposición.

### Necesidades

Energía, descanso, seguridad relativa, acceso a señales, retorno al nido y condiciones ambientales tolerables.

### Relaciones

Interactúa con comida, feromonas, larvas, reina, otras obreras, soldados, depredadores, competidores, cadáveres y terreno.

### Comportamientos

Explorar, seguir señales, recoger comida, volver al nido, reforzar rutas, alimentar larvas, descansar, evitar peligro, emitir alarma, limpiar restos y defender en crisis.

### Eventos posibles

Comida encontrada, comida entregada, feromona depositada, peligro detectado, obrera muerta, ruta abandonada, retorno fallido.

### Decisiones futuras

Roles dinámicos o permanentes, memoria exacta, edad laboral, capacidad de carga, limpieza de cadáveres, nivel de combate.

---

## 5. Hormiga Soldado

### Descripción

Casta defensiva posible. Su existencia depende de la especie o diseño elegido.

### Propósito ecológico

Proteger nido, reina, larvas, rutas críticas y entradas.

### Atributos conceptuales

Salud, fuerza, agresividad, hambre, cansancio, sensibilidad a alarma, umbral de amenaza, velocidad, posición defensiva.

### Ciclo de vida

Similar a obrera, con especialización defensiva y mayor participación en combate o bloqueo.

### Necesidades

Alimento, descanso, señales de amenaza, posición útil y apoyo colectivo.

### Relaciones

Protege colonia, responde a depredadores, enfrenta competidores, consume recursos sin recolectar necesariamente.

### Comportamientos

Patrullar, bloquear entradas, responder a alarma, atacar amenazas cercanas, retirarse, morir defendiendo.

### Eventos posibles

Defensa activada, amenaza interceptada, combate iniciado, amenaza repelida, soldado muerto.

### Decisiones futuras

Incluir o no en v0.1, casta separada o variación de obrera, representación visual, reglas de combate.

---

## 6. Larva

### Descripción

Etapa juvenil dependiente.

### Propósito ecológico

Convierte alimento y cuidado en población futura. Genera presión alimenticia.

### Atributos conceptuales

Edad, hambre, salud, etapa de desarrollo, sensibilidad a humedad, temperatura, necesidad de cuidado y supervivencia.

### Ciclo de vida

Huevo eclosiona → larva crece → posible pupa → adulta o muerte → materia orgánica.

### Necesidades

Alimento frecuente, protección, humedad adecuada, temperatura estable, higiene y obreras cuidadoras.

### Relaciones

Depende de obreras, consume reservas indirectamente, afecta presión alimenticia, vulnerable a hongos y abandono.

### Comportamientos

Crecer, demandar alimento, deteriorarse, madurar o morir.

### Eventos posibles

Larva alimentada, larva hambrienta, larva muerta, larva madura, presión alimenticia aumentada.

### Decisiones futuras

Etapa de pupa, castas desde larva, visibilidad, sensibilidad ambiental.

---

## 7. Huevo

### Descripción

Etapa inicial de hormiga.

### Propósito ecológico

Representa reproducción futura.

### Atributos conceptuales

Edad, viabilidad, humedad requerida, temperatura requerida, protección y tiempo hasta eclosión.

### Ciclo de vida

Puesto por reina → cuidado → eclosión → larva o muerte.

### Necesidades

Protección, humedad estable, temperatura viable, limpieza y cuidado.

### Relaciones

Producido por reina, cuidado por obreras, vulnerable a hongos o inundación.

### Comportamientos

Desarrollarse, eclosionar, deteriorarse o morir.

### Eventos posibles

Huevo puesto, huevo eclosionado, huevo inviable, huevo destruido.

### Decisiones futuras

Nivel visual, tasa reproductiva, manipulación por obreras.

---

## 8. Planta

### Descripción

Organismo productor que convierte luz, agua y nutrientes en biomasa.

### Propósito ecológico

Base energética del ecosistema. Produce semillas, sombra, refugio y materia orgánica.

### Atributos conceptuales

Salud, edad, tamaño, energía, humedad requerida, nutrientes, luz, etapa, producción de semillas, daño y competencia.

### Ciclo de vida

Germinación → brote → crecimiento → madurez → semillas → envejecimiento → muerte → materia orgánica → nutrientes.

### Necesidades

Luz, agua, nutrientes, espacio y temperatura viable.

### Relaciones

Consume nutrientes, produce semillas, alimenta insectos, genera materia orgánica, depende de clima y suelo.

### Comportamientos

Crecer, producir semillas, competir, marchitarse, morir y regenerar si condiciones mejoran.

### Eventos posibles

Germinación, planta madura, semillas producidas, planta dañada, planta muerta.

### Decisiones futuras

Tipos iniciales, crecimiento, dispersión, estaciones, competencia.

---

## 9. Semilla

### Descripción

Recurso producido por plantas. Puede ser alimento o futura planta.

### Propósito ecológico

Conecta flora, hormigas, insectos, suelo y futuro vegetal.

### Atributos conceptuales

Origen, edad, viabilidad, valor alimenticio, humedad, degradación, ubicación, accesibilidad y detectabilidad.

### Ciclo de vida

Producida → dispersada → recolectada, consumida, germinada o descompuesta.

### Necesidades

Su viabilidad depende de humedad, temperatura, suelo, tiempo y consumo por organismos.

### Relaciones

Producida por plantas, consumida por hormigas e insectos, germina en suelo, se descompone con hongos.

### Comportamientos

Germinar, degradarse, ser transportada, almacenada, consumida o pudrirse.

### Eventos posibles

Semilla producida, recolectada, consumida, germinada, podrida o almacenada.

### Decisiones futuras

Si las hormigas siembran accidentalmente, valor nutricional, almacenamiento, dispersión.

---

## 10. Cadáver

### Descripción

Resto físico de un organismo muerto.

### Propósito ecológico

Conecta muerte, carroña, hongos, nutrientes y memoria del mundo.

### Atributos conceptuales

Especie de origen, masa, edad, estado de descomposición, olor, riesgo sanitario, nutrientes potenciales, humedad.

### Ciclo de vida

Muerte → cadáver fresco → atracción de organismos → descomposición → reducción → nutrientes.

### Necesidades

No tiene necesidades, pero su transformación depende de humedad, temperatura, hongos, carroñeros y tiempo.

### Relaciones

Producido por muerte, procesado por hongos, posible recurso para hormigas, señal de peligro o fuente de nutrientes.

### Comportamientos

Degradarse, emitir olor, ser transportado, ser consumido, alimentar hongos.

### Eventos posibles

Cadáver creado, detectado, transportado, descomposición iniciada, nutrientes liberados.

### Decisiones futuras

Limpieza por hormigas, enfermedad, etapas visuales, manejo dentro del nido.

---

## 11. Hongo

### Descripción

Organismo descomponedor.

### Propósito ecológico

Recicla materia orgánica y devuelve nutrientes, pero puede amenazar reservas o larvas.

### Atributos conceptuales

Tamaño, salud, humedad requerida, temperatura, materia orgánica disponible, crecimiento, efecto sobre suelo y peligrosidad.

### Ciclo de vida

Presencia inicial → crecimiento sobre materia orgánica → expansión → liberación de nutrientes → latencia o muerte.

### Necesidades

Humedad, materia orgánica, temperatura viable y tiempo.

### Relaciones

Consume cadáveres y restos, afecta nutrientes, contamina reservas, depende de humedad, puede dañar nido.

### Comportamientos

Crecer, expandirse, descomponer, liberar nutrientes, contaminar, secarse.

### Eventos posibles

Brote de hongos, reservas contaminadas, nutrientes liberados, hongo seco, infestación.

### Decisiones futuras

Tipos de hongos, esporas, hongos beneficiosos y dañinos, relación con termitas futuras.

---

## 12. Piedra

### Descripción

Elemento físico del terreno.

### Propósito ecológico

Bloquea rutas, crea sombra, refugio, microhábitat y referencia espacial.

### Atributos conceptuales

Tamaño, posición, bloqueabilidad, sombra, retención térmica, efecto sobre humedad, posibilidad de refugio.

### Ciclo de vida

Puede colocarse, permanecer, desplazarse si se decide o erosionarse a muy largo plazo.

### Necesidades

No aplica.

### Relaciones

Afecta movimiento, humedad local, refugio de alacranes, rutas de hormigas y sombra para plantas.

### Comportamientos

Obstruir, proteger, canalizar movimiento, crear microhábitat.

### Eventos posibles

Ruta bloqueada, refugio creado, obstáculo detectado, zona sombreada.

### Decisiones futuras

Escalabilidad, si se mueve, si se escala, interacción con túneles.

---

## 13. Agua

### Descripción

Recurso y condición ambiental. Puede ser humedad, charco, gota, corriente o zona inundada.

### Propósito ecológico

Sostiene vida, modifica humedad, afecta feromonas y puede ser barrera o amenaza.

### Atributos conceptuales

Cantidad, profundidad, extensión, permanencia, evaporación, accesibilidad, riesgo de ahogamiento, efecto sobre señales.

### Ciclo de vida

Aparece por lluvia o intervención → se acumula → infiltra, fluye o evapora → modifica humedad.

### Necesidades

Depende de clima, terreno y temperatura.

### Relaciones

Beneficia plantas, favorece hongos, atrae anfibios, bloquea hormigas, borra feromonas, puede inundar nidos.

### Comportamientos

Evaporarse, acumularse, fluir, infiltrar, bloquear, humedecer.

### Eventos posibles

Charco creado, zona inundada, feromonas debilitadas, humedad aumentada, agua evaporada.

### Decisiones futuras

Profundidad de fluidos, ríos, agua bebible, inundación de túneles.

---

## 14. Suelo

### Descripción

Base física y nutritiva del ecosistema.

### Propósito ecológico

Sostiene plantas, nidos, humedad, nutrientes, descomposición y movimiento.

### Atributos conceptuales

Humedad, nutrientes, compactación, tipo, temperatura, fertilidad, drenaje, materia orgánica, transitabilidad.

### Ciclo de vida

Recibe nutrientes, pierde humedad, se seca, se enriquece, se compacta, se erosiona o se modifica por organismos.

### Necesidades

No aplica como organismo, pero su estado depende de clima, agua, materia y actividad biológica.

### Relaciones

Alimenta plantas, recibe cadáveres descompuestos, sostiene nidos, almacena humedad y condiciona movimiento.

### Comportamientos

Retener humedad, drenar, acumular nutrientes, permitir germinación, alterar transitabilidad.

### Eventos posibles

Suelo enriquecido, suelo seco, suelo saturado, nido inestable, germinación posible.

### Decisiones futuras

Tipos de suelo, granularidad, excavación, nutrientes visibles o abstractos.

---

## 15. Araña

### Descripción

Depredador de insectos y hormigas.

### Propósito ecológico

Introduce riesgo, regula poblaciones y altera rutas.

### Atributos conceptuales

Hambre, salud, energía, estado de espera, agresividad, velocidad, percepción, zona de caza, descanso y saciedad.

### Ciclo de vida

Aparece o nace → busca zona de caza → captura presas → se alimenta → descansa → envejece → muere.

### Necesidades

Presas, refugio, descanso, condiciones adecuadas y seguridad.

### Relaciones

Consume hormigas e insectos, genera señales de peligro, altera rutas, produce cadáver al morir.

### Comportamientos

Patrullar, emboscar, perseguir, atacar, alimentarse, descansar, evitar zonas desfavorables.

### Eventos posibles

Presa detectada, ataque iniciado, presa capturada, presa escapó, araña saciada, zona peligrosa.

### Decisiones futuras

Telarañas, tipo de araña, relación con humedad, efecto sobre rutas.

---

## 16. Alacrán

### Descripción

Depredador terrestre de alta amenaza relativa.

### Propósito ecológico

Crea peligro intenso, refugios bajo rocas y presión sobre rutas.

### Atributos conceptuales

Hambre, energía, agresividad, refugio, actividad nocturna, percepción, velocidad, necesidad térmica.

### Ciclo de vida

Busca refugio → patrulla o espera → ataca presas → come → descansa → muere.

### Necesidades

Alimento, refugio, temperatura adecuada, descanso y baja exposición.

### Relaciones

Se refugia bajo piedras, depreda hormigas o insectos, genera alarma, compite con otros depredadores.

### Comportamientos

Esconderse, patrullar, atacar, retirarse, descansar.

### Eventos posibles

Alacrán detectado, ataque, refugio ocupado, amenaza alta, alacrán muerto.

### Decisiones futuras

Peligrosidad, actividad nocturna, frecuencia de aparición, relación con rocas.

---

## 17. Sapo

### Descripción

Depredador oportunista asociado a humedad.

### Propósito ecológico

Conecta lluvia, humedad, insectos y depredación.

### Atributos conceptuales

Hambre, hidratación, energía, preferencia por humedad, descanso, actividad tras lluvia, saciedad.

### Ciclo de vida

Aparece en condiciones favorables → busca zonas húmedas → caza → descansa → migra o muere si el ambiente falla.

### Necesidades

Humedad, alimento, refugio, temperatura adecuada y descanso.

### Relaciones

Consume insectos y puede consumir hormigas, depende de lluvia, genera peligro en rutas.

### Comportamientos

Esperar, desplazarse, cazar, descansar, buscar humedad, migrar.

### Eventos posibles

Sapo activado por lluvia, presa capturada, zona húmeda ocupada, sapo deshidratado, sapo muerto.

### Decisiones futuras

Diferencia con rana, reproducción anfibia, rol en v0.1.

---

## 18. Rana

### Descripción

Anfibio depredador más asociado a agua constante.

### Propósito ecológico

Regula insectos cerca de zonas húmedas y refuerza relación clima-fauna.

### Atributos conceptuales

Hambre, hidratación, movilidad, dependencia de agua, percepción de presas, descanso, vulnerabilidad a sequía.

### Ciclo de vida

Permanece cerca de agua → caza → descansa → reduce actividad o migra si falta agua → muere si no sobrevive.

### Necesidades

Agua o humedad alta, presas, refugio y temperatura adecuada.

### Relaciones

Consume insectos, puede afectar hormigas, depende de charcos, responde a lluvia.

### Comportamientos

Cazar, descansar, saltar, permanecer cerca de agua, migrar.

### Eventos posibles

Rana aparece tras lluvia, rana caza, rana pierde hábitat, rana migra, rana muere.

### Decisiones futuras

Diferenciación funcional con sapo, ciclo acuático, presencia inicial.

---

## 19. Insectos pequeños

### Descripción

Categoría general para fauna menor no hormiga.

### Propósito ecológico

Funcionan como consumidores, presas, competidores, carroñeros o conectores de recursos.

### Atributos conceptuales

Tipo funcional, hambre, velocidad, tamaño, dieta, vulnerabilidad, reproducción, preferencia ambiental, población local.

### Ciclo de vida

Nacen o aparecen → consumen recursos → se reproducen → son depredados o mueren → se descomponen.

### Necesidades

Alimento, refugio, clima viable, humedad según especie y evitar depredadores.

### Relaciones

Consumen semillas, compiten con hormigas, sirven de presa, consumen plantas o materia orgánica, atraen depredadores.

### Comportamientos

Buscar comida, huir, consumir, reproducirse, esconderse, competir indirectamente.

### Eventos posibles

Recurso consumido, insecto depredado, población aumenta, competencia por semillas, depredadores atraídos.

### Decisiones futuras

Separar especies específicas, profundidad individual o poblacional, relación con plantas.

---

## 20. Colonia

### Descripción

Entidad colectiva compuesta por reina, huevos, larvas, obreras, posibles soldados, reservas, señales, nido y territorio.

### Propósito ecológico

Coordinar supervivencia, reproducción, recolección, defensa, expansión y adaptación mediante señales y estados globales.

### Atributos conceptuales

Reservas, población, huevos, larvas, salud de reina, presión alimenticia, amenaza, expansión, rutas activas, territorio, sanidad, humedad interna, estrés colectivo.

### Ciclo de vida

Fundación o inicio → crecimiento → estabilización → expansión → crisis → migración, recuperación o colapso.

### Necesidades

Alimento, reproducción viable, protección, rutas seguras, manejo de cadáveres, condiciones internas, territorio.

### Relaciones

Consume recursos, modifica rutas, interactúa con depredadores, compite, produce cadáveres, depende de flora, clima y usuario indirectamente.

### Comportamientos

Aumentar recolección, reducir actividad, reforzar rutas, defender, limpiar, expandirse, migrar, colapsar.

### Eventos posibles

Reservas críticas, amenaza alta, expansión iniciada, migración iniciada, colonia colapsada, guerra, ruta principal establecida.

### Decisiones futuras

Nido explícito o abstracto, territorio, múltiples colonias, guerra, migración y memoria colectiva.

---

## 21. Estructura para entidades futuras

Cada nueva entidad debe agregarse con la plantilla oficial. Categorías futuras:

- nuevas castas;
- termitas;
- abejas;
- flores;
- néctar;
- polen;
- raíces;
- árboles;
- bacterias;
- parásitos;
- enfermedades;
- aves;
- reptiles;
- mamíferos pequeños;
- biomas;
- estructuras de nido;
- señales avanzadas.

---

## 22. Decisiones futuras generales

- Entidades individuales vs poblacionales.
- Entidades visibles vs abstractas.
- Lista mínima de v0.1.
- Especies reales, ficticias o híbridas.
- Nomenclatura común o científica.
---

## 23. Taxonomía general de entidades

### 23.1 Organismos

Entidades vivas con necesidades, ciclo de vida y capacidad de interacción. Ejemplos: hormigas, plantas, hongos, arañas, sapos.

### 23.2 Recursos

Entidades consumibles, transformables o disputables. Ejemplos: semillas, comida, agua, cadáveres, nutrientes.

### 23.3 Señales

Entidades o campos de información. Ejemplos: feromonas, alarma, olor, rastros.

### 23.4 Estructuras

Elementos físicos que modifican espacio. Ejemplos: piedras, nidos, túneles, ramas, charcos.

### 23.5 Colectivos

Entidades formadas por múltiples individuos o estados agregados. Ejemplo principal: colonia.

---

## 24. Relaciones ecológicas principales

| Relación | Ejemplo | Consecuencia |
|---|---|---|
| Producción | planta produce semilla | aparece recurso |
| Consumo | hormiga consume comida | energía transferida |
| Depredación | araña captura hormiga | muerte y amenaza |
| Competencia | insectos y hormigas por semillas | recursos bajan |
| Descomposición | hongo procesa cadáver | nutrientes suben |
| Señalización | hormiga deja feromona | otras hormigas modifican conducta |
| Modificación ambiental | piedra crea sombra | microhábitat cambia |

---

## 25. Ciclos de vida comparados

### 25.1 Organismo animal

Nacimiento → crecimiento → actividad → reproducción si aplica → envejecimiento → muerte → cadáver → descomposición.

### 25.2 Planta

Semilla → germinación → crecimiento → madurez → producción → muerte → materia orgánica → nutrientes.

### 25.3 Recurso orgánico

Aparición → consumo, transporte o degradación → transformación → desaparición como recurso original.

### 25.4 Señal

Emisión → difusión o permanencia local → lectura por organismos → refuerzo o degradación → desaparición.

---

## 26. Reglas para agregar entidades futuras

Una nueva entidad solo debe aceptarse si:

- tiene función ecológica clara;
- participa en al menos una relación;
- tiene origen y destino si es material;
- tiene necesidades si es organismo;
- puede ser observada o inferida;
- no rompe principios fundacionales;
- actualiza esta referencia;
- define decisiones futuras pendientes.

---

## 27. Eventos transversales posibles

- Nacimiento.
- Muerte.
- Consumo.
- Detección.
- Ataque.
- Huida.
- Reproducción.
- Crecimiento.
- Degradación.
- Transformación.
- Señal emitida.
- Señal leída.
- Recurso agotado.
- Zona alterada.
- Amenaza aumentada.
- Estado crítico alcanzado.

---

## 28. Entidades pendientes de documentación futura

- Nido.
- Cámara de cría.
- Túnel.
- Feromona de comida.
- Feromona de alarma.
- Feromona de territorio.
- Materia orgánica genérica.
- Nutrientes del suelo.
- Charco.
- Rama.
- Hoja muerta.
- Planta con flor.
- Termita.
- Abeja.
- Pulgón u organismo simbiótico futuro.
- Bacteria.
- Parásito.
- Enfermedad.

Estas entidades no deben agregarse por ansiedad de contenido. Deben entrar cuando sus relaciones estén claras.
