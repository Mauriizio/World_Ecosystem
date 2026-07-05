WORLD BIBLE v0.1
Motor de Simulación de Ecosistemas Emergentes
Primer ecosistema: Hormiguero
Estado del documento: Primera versión fundacional
Propósito: Definir el funcionamiento conceptual del mundo antes de diseñar arquitectura, sistemas técnicos o implementación.
Naturaleza del proyecto: Simulador de ecosistemas emergentes, no videojuego tradicional.
________________________________________
## 1. Filosofía del proyecto
## 1.1. ¿Por qué existe este proyecto?
Este proyecto existe para construir un mundo vivo donde los comportamientos complejos no sean escritos directamente, sino que aparezcan como consecuencia de reglas simples, relaciones ecológicas y condiciones cambiantes del entorno.
El objetivo no es crear una experiencia donde el usuario controle unidades, gane niveles o complete misiones. El objetivo es crear un ecosistema observable, dinámico y sorprendente, capaz de generar situaciones que incluso su diseñador no haya anticipado por completo.
El primer ecosistema será un hormiguero, porque las hormigas son un excelente punto de partida para estudiar comportamiento emergente: cada individuo tiene capacidades limitadas, pero la colonia puede producir patrones colectivos extremadamente complejos.
A largo plazo, este proyecto debe funcionar como la base conceptual de un motor reutilizable para simular otros ecosistemas: termitas, abejas, bosques, desiertos, humedales, colonias de insectos, cadenas alimenticias y ambientes vivos más amplios.

## 1.2. Qué lo diferencia de un videojuego tradicional
Un videojuego tradicional suele estar diseñado alrededor de objetivos explícitos, control directo, reglas visibles, progresión, recompensas y eventos predefinidos. En este proyecto, esos elementos no son el centro.
Aquí el foco está en observar un sistema. El usuario no juega “contra” el mundo ni “maneja” criaturas. El usuario modifica condiciones ambientales y luego observa cómo el ecosistema responde.
La diferencia principal es esta:
•	En un videojuego tradicional, el diseñador suele programar lo que debe ocurrir.
•	En este simulador, el diseñador define condiciones y reglas; lo que ocurre emerge de su interacción.
No se busca fabricar una historia cerrada. Se busca crear un espacio de posibilidades.
Una guerra entre colonias no debe ocurrir porque el diseñador haya decidido que “a los diez minutos empieza una guerra”. Debe ocurrir porque dos colonias crecieron, agotaron sus recursos cercanos, expandieron sus rutas, se encontraron, compitieron por comida y elevaron progresivamente su nivel de agresión.
Una migración no debe activarse por guion. Debe aparecer porque el nido se volvió inviable: poca comida, exceso de humedad, depredadores cercanos, temperatura adversa o presión poblacional.

## 1.3. Qué significa comportamiento emergente
El comportamiento emergente ocurre cuando muchas reglas simples interactúan y producen resultados complejos.
Una hormiga individual no necesita ser “inteligente” en sentido humano. Puede seguir reglas pequeñas:
•	si tiene hambre, busca comida;
•	si detecta feromona de comida, tiende a seguirla;
•	si encuentra comida, la lleva al nido;
•	si vuelve con comida, refuerza la ruta;
•	si detecta peligro, emite señal de alarma;
•	si está cansada, reduce actividad;
•	si hay amenaza, prioriza defensa o retirada.
Ninguna de esas reglas aisladas parece impresionante. Pero cuando cientos o miles de hormigas aplican esas reglas al mismo tiempo, pueden aparecer rutas eficientes, defensa colectiva, exploración organizada, recolección masiva, abandono de zonas peligrosas y expansión territorial.
Eso es el corazón del proyecto.
La complejidad no debe venir de un “cerebro central” que decide todo. Debe surgir de la relación entre individuos, colonia, entorno, recursos, clima, depredadores y flujo de información.

## 1.4. Papel del usuario
El usuario actúa como una fuerza externa que modifica el entorno.
Puede intervenir en el mundo, pero no controlar directamente a las criaturas. Su papel se parece más al de un observador con herramientas de alteración ambiental que al de un jugador tradicional.
El usuario puede, por ejemplo:
•	colocar comida;
•	provocar lluvia;
•	cambiar humedad;
•	alterar temperatura;
•	introducir obstáculos;
•	colocar piedras;
•	modificar el terreno;
•	introducir nuevos animales;
•	eliminar o añadir fuentes de agua;
•	afectar la disponibilidad de recursos;
•	crear condiciones de sequía;
•	modificar ciclos ambientales.
Pero el usuario no puede ordenar a una hormiga que vaya a un punto específico. No puede seleccionar un grupo y mandarlo a atacar. No puede decidir manualmente que una colonia migre. No puede forzar directamente la conducta de una criatura.
El usuario crea condiciones. Las criaturas responden.

## 1.5. Qué NO queremos hacer
Este proyecto debe evitar convertirse en un juego de estrategia tradicional disfrazado de simulador.
No queremos:
•	control directo de criaturas;
•	comandos tipo “atacar”, “mover”, “construir” aplicados a individuos;
•	eventos artificiales sin causa ecológica;
•	criaturas que actúen por guion rígido;
•	recursos que aparezcan sin origen;
•	desapariciones mágicas de materia;
•	decoración sin función ecológica;
•	inteligencia individual exagerada;
•	sistemas acoplados donde todo dependa de todo;
•	mundos visualmente bonitos pero ecológicamente vacíos;
•	comportamientos complejos fabricados manualmente;
•	decisiones colectivas inexplicables;
•	simulación falsa que solo parezca viva desde lejos.
La prioridad no es impresionar en cinco minutos. La prioridad es construir un mundo que siga siendo interesante después de años de desarrollo.
________________________________________

## 2. Principios fundamentales
Estos principios definen la identidad del proyecto. Cualquier decisión futura debe evaluarse contra ellos.

## 2.1. El usuario modifica el entorno, nunca controla criaturas
El usuario puede alterar condiciones externas, pero no puede tomar decisiones por los organismos.
Una hormiga no obedece órdenes directas del usuario. Una araña no recibe instrucciones de patrullaje manual. Una rana no es colocada para atacar a una hormiga específica por mandato directo.
La intervención del usuario debe modificar variables ambientales o introducir elementos en el mundo. A partir de ahí, el ecosistema responde por sí mismo.
2.2. Todo organismo debe cumplir una función ecológica
Ningún organismo debe existir únicamente como decoración.
Una planta debe producir recursos, competir por luz, consumir nutrientes, depender de agua, generar semillas o materia orgánica. Un hongo debe descomponer restos. Un depredador debe cazar, descansar, consumir energía y afectar poblaciones. Un insecto menor debe participar como consumidor, presa, competidor o reciclador.
Si un organismo no tiene función dentro del ecosistema, todavía no pertenece al mundo.
2.3. Toda energía proviene indirectamente del Sol
El Sol es la fuente primaria de energía del ecosistema.
Las plantas convierten energía solar en biomasa. Los herbívoros o consumidores primarios comen plantas, semillas o materia vegetal. Los depredadores comen consumidores. Los descomponedores procesan restos orgánicos y devuelven nutrientes al suelo.
Incluso cuando el sistema se complejice, debe mantenerse esta lógica general: la energía fluye, se transforma y se degrada. No aparece de la nada.
2.4. Todo recurso debe tener origen y destino
La comida no aparece mágicamente. Las semillas vienen de plantas. Los cadáveres vienen de criaturas muertas. Los nutrientes vienen del suelo, de la descomposición o de procesos ambientales. El agua viene de lluvia, ríos, humedad o fuentes naturales.
Todo recurso debe responder a dos preguntas:
1.	¿De dónde viene?
2.	¿A dónde va?
Si no podemos responder esas dos preguntas, el recurso todavía está mal definido.
2.5. Nada aparece por magia
Todo cambio relevante debe tener causa.
Una población crece porque hay comida, reproducción y supervivencia. Una colonia colapsa porque fallan sus condiciones de vida. Los hongos aparecen porque hay humedad y materia orgánica. Los depredadores se acercan porque hay presas, refugio o condiciones favorables.
La simulación puede tener incertidumbre, azar y variabilidad, pero no debe tener arbitrariedad injustificada.
2.6. Toda información tiene un medio de transmisión
La información no debe viajar instantáneamente sin soporte.
En el ecosistema pueden existir distintos medios de información:
•	feromonas;
•	contacto físico;
•	vibraciones;
•	señales químicas;
•	señales visuales simples;
•	rastros;
•	olor;
•	sonido;
•	cambios ambientales;
•	presencia física de objetos o criaturas.
Si una criatura “sabe” algo, debe existir una razón conceptual para que lo sepa.
Una hormiga no debería conocer la ubicación exacta de una comida lejana si nunca estuvo allí, si no detectó feromonas y si ninguna señal llegó hasta ella.
2.7. Toda criatura tiene sensores limitados
Las criaturas no poseen información global perfecta.
Cada organismo percibe una porción limitada del mundo según sus capacidades:
•	distancia de visión;
•	sensibilidad química;
•	capacidad de detectar vibraciones;
•	percepción de humedad;
•	percepción de temperatura;
•	detección de alimento;
•	detección de peligro;
•	memoria local;
•	reconocimiento de rutas.
La limitación sensorial es clave para la emergencia. Si cada criatura sabe todo, el sistema se vuelve artificial y pierde profundidad.
2.8. La inteligencia colectiva debe surgir de individuos simples
La colonia de hormigas puede parecer inteligente, pero ninguna hormiga individual debe comportarse como una mente superior.
La inteligencia colectiva debe emerger de:
•	reglas locales;
•	comunicación indirecta;
•	señales acumulativas;
•	retroalimentación positiva;
•	retroalimentación negativa;
•	división de tareas;
•	presión ambiental;
•	necesidades compartidas;
•	supervivencia diferencial.
Una colonia “decide” recolectar más comida porque muchas hormigas responden a hambre, reservas bajas, rutas de feromonas, disponibilidad de alimento y presión de larvas. No porque exista una entidad invisible tomando decisiones perfectas.
2.9. El mundo debe poder desequilibrarse
Un ecosistema vivo no debe ser perfectamente estable.
Deben existir riesgos de:
•	hambruna;
•	sobrepoblación;
•	agotamiento de recursos;
•	sequía;
•	exceso de humedad;
•	invasión de hongos;
•	depredación excesiva;
•	colapso de colonias;
•	migraciones forzadas;
•	competencia territorial;
•	extinción local.
El equilibrio no debe estar garantizado. Debe ser un resultado posible, no una obligación.
2.10. Todo sistema debe tener consecuencias
Si algo existe en el mundo, debe afectar algo más.
La lluvia no es solo visual: modifica humedad, suelo, hongos, movilidad, disponibilidad de agua y comportamiento animal.
Una roca no es solo decoración: altera rutas, refugios, obstáculos, sombra, humedad local o protección.
Un cadáver no es basura visual: alimenta descomponedores, atrae organismos, modifica nutrientes y puede generar riesgo sanitario.
________________________________________
3. El mundo
3.1. Descripción general
El mundo es un ecosistema dinámico compuesto por elementos físicos, ambientales y biológicos.
No es un escenario estático. Es un sistema vivo donde cada elemento puede afectar a otros. El clima modifica el suelo. El suelo afecta plantas. Las plantas producen recursos. Los recursos alimentan animales. Los animales mueren. Los cadáveres alimentan descomponedores. Los descomponedores devuelven nutrientes. Los nutrientes permiten nuevo crecimiento.
El mundo existe como una red de relaciones.
3.2. Qué existe en el mundo
En la versión conceptual inicial, el mundo puede contener:
•	clima;
•	luz solar;
•	temperatura;
•	humedad;
•	lluvia;
•	suelo;
•	arena;
•	rocas;
•	agua;
•	obstáculos;
•	plantas;
•	semillas;
•	materia orgánica;
•	hongos;
•	microorganismos;
•	insectos menores;
•	hormigas;
•	colonias;
•	larvas;
•	huevos;
•	depredadores;
•	cadáveres;
•	nutrientes;
•	rastros;
•	feromonas;
•	señales de peligro;
•	zonas de refugio;
•	zonas de alimentación;
•	zonas de riesgo.
Cada elemento debe tener propiedades ecológicas y relaciones con otros elementos.
3.3. División conceptual del mundo
El mundo puede entenderse en capas conceptuales:
Capa abiótica
Incluye los elementos no vivos:
•	luz;
•	temperatura;
•	humedad;
•	lluvia;
•	viento;
•	terreno;
•	suelo;
•	agua;
•	rocas;
•	pendientes;
•	obstáculos.
Esta capa define las condiciones de posibilidad de la vida.
Capa de productores
Incluye organismos que generan biomasa a partir de energía solar y recursos del entorno:
•	plantas;
•	hierbas;
•	musgos;
•	arbustos;
•	plantas pequeñas productoras de semillas.
Esta capa convierte energía ambiental en alimento potencial.
Capa de consumidores
Incluye organismos que consumen plantas, semillas, hongos, otros animales o materia orgánica:
•	hormigas;
•	insectos pequeños;
•	larvas;
•	otros artrópodos;
•	posibles especies futuras.
Capa de depredadores
Incluye organismos que cazan otros animales:
•	arañas;
•	alacranes;
•	sapos;
•	ranas;
•	otros depredadores futuros.
Capa de descomposición
Incluye organismos y procesos que reciclan materia:
•	hongos;
•	microorganismos;
•	descomposición;
•	degradación de cadáveres;
•	transformación de materia orgánica en nutrientes.
Capa de información
Incluye señales que no son recursos materiales principales, pero que modifican decisiones:
•	feromonas;
•	rastros;
•	señales de alarma;
•	olor de comida;
•	vibraciones;
•	humedad local;
•	presencia de depredadores.
3.4. Cómo evoluciona el mundo
El mundo cambia continuamente.
Las plantas crecen, producen semillas, compiten y mueren. Las hormigas exploran, recolectan, descansan, alimentan larvas y defienden el nido. Los depredadores patrullan, cazan y descansan. La lluvia aumenta la humedad. La sequía reduce la disponibilidad de plantas. Los cadáveres se descomponen. Los nutrientes se reciclan.
El mundo no debe evolucionar únicamente por eventos globales. Debe evolucionar por acumulación de microcambios.
Una pequeña variación de humedad puede aumentar hongos. Más hongos pueden acelerar descomposición. Más nutrientes pueden favorecer plantas. Más plantas pueden generar más semillas. Más semillas pueden alimentar más insectos. Más insectos pueden atraer más depredadores. Más depredadores pueden afectar rutas de hormigas.
3.5. Qué significa que el mundo esté vivo
Un mundo vivo no es simplemente un mundo con movimiento.
Un mundo vivo es un sistema donde:
•	las condiciones cambian;
•	los organismos responden;
•	los recursos circulan;
•	la información se propaga;
•	las acciones tienen consecuencias;
•	las poblaciones suben y bajan;
•	los equilibrios pueden romperse;
•	el pasado afecta el presente;
•	pequeñas causas pueden generar grandes efectos.
El mundo debe tener memoria ecológica. Una sequía anterior puede dejar menos plantas. Una guerra puede dejar cadáveres. Una zona con cadáveres puede generar hongos. Una zona con hongos puede cambiar la fertilidad. Una colonia debilitada puede ser más vulnerable después.
________________________________________
4. Tiempo
4.1. Naturaleza del tiempo
El tiempo es el eje que permite que los procesos ecológicos se desarrollen.
No todos los procesos ocurren a la misma velocidad. Una hormiga puede tomar una decisión en segundos. Una planta puede crecer durante días. Un cadáver puede descomponerse durante horas o semanas. Una colonia puede expandirse durante ciclos completos.
El mundo debe reconocer múltiples escalas temporales.
4.2. Ticks
El tick es la unidad conceptual mínima de avance de la simulación.
En cada tick, el mundo progresa. Las criaturas pueden percibir, decidir, moverse, consumir energía, dejar rastros, reaccionar a estímulos y modificar su entorno inmediato.
No todos los sistemas necesitan cambiar en cada tick. Algunos procesos son rápidos y otros lentos.
Ejemplos:
•	movimiento de hormigas: escala corta;
•	evaporación de feromonas: escala corta o media;
•	hambre: escala media;
•	crecimiento vegetal: escala larga;
•	descomposición: escala media o larga;
•	cambio estacional: escala muy larga.
4.3. Día y noche
El ciclo día/noche modifica las condiciones del ecosistema.
Durante el día puede haber:
•	mayor temperatura;
•	más luz solar;
•	más actividad de ciertas especies;
•	mayor evaporación;
•	mayor fotosíntesis;
•	diferente exposición a depredadores.
Durante la noche puede haber:
•	menor temperatura;
•	más humedad relativa;
•	menor actividad de plantas;
•	mayor actividad de algunos depredadores;
•	cambios en rutas de búsqueda;
•	variaciones en visibilidad y percepción.
El día y la noche no deben ser solo cambios visuales. Deben afectar procesos ecológicos.
4.4. Estaciones
Las estaciones representan variaciones de largo plazo.
Pueden modificar:
•	temperatura promedio;
•	frecuencia de lluvia;
•	disponibilidad de plantas;
•	producción de semillas;
•	humedad del suelo;
•	supervivencia de larvas;
•	actividad de depredadores;
•	riesgo de sequía;
•	ciclos reproductivos.
No es obligatorio introducir estaciones desde la primera versión funcional del ecosistema, pero conceptualmente deben estar contempladas para permitir escalabilidad.
4.5. Velocidad de simulación
El usuario puede observar el mundo a diferentes velocidades.
La simulación puede avanzar en tiempo normal, acelerado o pausado. Sin embargo, cambiar la velocidad no debe alterar las reglas internas del mundo. Solo debe modificar la rapidez con que el usuario observa los procesos.
Una colonia no debe comportarse diferente porque el usuario aceleró el tiempo, salvo por los efectos naturales de que más tiempo simulado está pasando.
4.6. Pausa
La pausa detiene el avance del mundo.
Mientras el mundo está pausado, el usuario puede observar, analizar o preparar intervenciones. Conceptualmente, la pausa no forma parte del ecosistema; es una herramienta externa de observación.
Debe evitarse que la pausa se convierta en una forma de control directo sobre criaturas.
4.7. Escalas temporales
El ecosistema debe distinguir entre procesos de distintas escalas:
Escala instantánea
•	detección de peligro;
•	contacto con comida;
•	colisión con obstáculo;
•	ataque cercano;
•	señal de alarma.
Escala corta
•	movimiento;
•	exploración;
•	seguimiento de feromonas;
•	recolección;
•	persecución;
•	huida.
Escala media
•	hambre;
•	cansancio;
•	evaporación de rastros;
•	acumulación de recursos;
•	descomposición inicial;
•	cambios de humedad.
Escala larga
•	crecimiento de plantas;
•	reproducción;
•	desarrollo de larvas;
•	expansión de colonias;
•	agotamiento de zonas;
•	recuperación del suelo.
Escala muy larga
•	estaciones;
•	migraciones;
•	cambios poblacionales;
•	colapso ecológico;
•	transformación del paisaje.
________________________________________
5. Energía
5.1. Principio general
La energía entra al ecosistema principalmente a través del Sol.
El Sol permite la fotosíntesis. Las plantas convierten luz, agua y nutrientes en biomasa. Esa biomasa alimenta consumidores. Los consumidores alimentan depredadores. Cuando los organismos mueren, los descomponedores procesan sus restos y devuelven nutrientes al suelo.
El ciclo de energía no es perfectamente cerrado, porque parte de la energía se pierde en forma de calor o actividad metabólica. Sin embargo, la materia sí puede circular mediante nutrientes, restos y crecimiento.
5.2. Sol
El Sol es la fuente primaria.
Afecta:
•	crecimiento de plantas;
•	temperatura;
•	evaporación;
•	actividad diaria;
•	disponibilidad energética general;
•	ciclos de día y noche.
La luz solar debe tener consecuencias ecológicas, no solo visuales.
5.3. Fotosíntesis
La fotosíntesis es el proceso conceptual mediante el cual las plantas producen biomasa.
Requiere:
•	luz;
•	agua o humedad suficiente;
•	nutrientes;
•	condiciones térmicas viables.
Produce:
•	crecimiento vegetal;
•	hojas;
•	tallos;
•	semillas;
•	materia orgánica futura.
La fotosíntesis conecta directamente el clima con la cadena alimenticia.
5.4. Plantas
Las plantas son productoras.
Generan recursos para otros organismos:
•	semillas;
•	hojas;
•	néctar futuro si se agregan especies polinizadoras;
•	refugio;
•	sombra;
•	materia orgánica al morir.
Las plantas también compiten entre sí por luz, espacio, agua y nutrientes.
5.5. Consumidores
Los consumidores obtienen energía comiendo otros elementos vivos o derivados de ellos.
Pueden consumir:
•	semillas;
•	hojas;
•	hongos;
•	materia orgánica;
•	insectos;
•	cadáveres, dependiendo de la especie.
Las hormigas pueden comportarse como consumidoras flexibles según especie y contexto: recolectar semillas, carroñear restos, consumir insectos muertos o aprovechar fuentes de azúcar si el ecosistema se amplía.
5.6. Depredadores
Los depredadores obtienen energía cazando otros organismos.
En el primer ecosistema pueden incluir:
•	arañas;
•	alacranes;
•	sapos;
•	ranas.
Su presencia afecta:
•	mortalidad de hormigas;
•	rutas de exploración;
•	comportamiento defensivo;
•	población de insectos menores;
•	presión ecológica general.
5.7. Descomponedores
Los descomponedores transforman materia orgánica muerta en nutrientes reutilizables.
Procesan:
•	cadáveres;
•	hojas muertas;
•	restos de comida;
•	semillas degradadas;
•	materia fecal si se incorpora;
•	biomasa vegetal muerta.
Son esenciales para cerrar el ciclo de materia.
5.8. Nutrientes
Los nutrientes son el resultado de procesos físicos, químicos y biológicos.
Permiten:
•	crecimiento vegetal;
•	recuperación del suelo;
•	fertilidad local;
•	aparición de zonas más productivas.
La disponibilidad de nutrientes debe variar espacialmente. Un área donde murieron muchas criaturas o se acumuló materia orgánica puede volverse más fértil con el tiempo.
5.9. Ciclo cerrado conceptual
El ciclo base del ecosistema es:
Sol → plantas → semillas / biomasa → consumidores → depredadores → cadáveres / restos → descomponedores → nutrientes → plantas.
Este ciclo debe ser una columna vertebral del diseño.
No todos los elementos deben estar presentes desde el inicio, pero cualquier expansión futura debe respetar esta lógica.
________________________________________
6. Clima
6.1. Función del clima
El clima define las condiciones generales del ecosistema.
No es un fondo visual. Es una fuerza activa que modifica disponibilidad de agua, temperatura, humedad, crecimiento, actividad animal, descomposición y supervivencia.
6.2. Temperatura
La temperatura afecta:
•	velocidad de actividad de las criaturas;
•	consumo de energía;
•	supervivencia de huevos y larvas;
•	evaporación de humedad;
•	crecimiento de plantas;
•	actividad de hongos;
•	frecuencia de búsqueda de comida;
•	riesgo de estrés térmico.
Temperaturas muy bajas pueden reducir actividad. Temperaturas muy altas pueden aumentar estrés, secar el suelo y forzar cambios de comportamiento.
6.3. Humedad
La humedad es una variable central para el primer ecosistema.
Afecta:
•	hongos;
•	descomposición;
•	plantas;
•	suelo;
•	supervivencia de larvas;
•	confort del nido;
•	disponibilidad de agua;
•	actividad de algunas criaturas.
Demasiada humedad puede favorecer hongos, pero también puede volver ciertas zonas peligrosas para el nido. Muy poca humedad puede provocar sequía, muerte vegetal y reducción de alimento.
6.4. Lluvia
La lluvia modifica el ecosistema de forma directa e indirecta.
Puede:
•	aumentar humedad del suelo;
•	formar charcos;
•	dificultar movimiento;
•	borrar o debilitar feromonas;
•	desplazar semillas;
•	beneficiar plantas;
•	inundar zonas bajas;
•	enfriar el ambiente;
•	alterar actividad de depredadores.
La lluvia debe tener consecuencias mixtas. No debe ser simplemente “buena” o “mala”. Puede salvar plantas y al mismo tiempo poner en riesgo túneles o larvas.
6.5. Sequías
La sequía representa falta prolongada de agua.
Puede causar:
•	reducción de plantas;
•	menor producción de semillas;
•	aumento de competencia por recursos;
•	mortalidad de organismos sensibles;
•	cambios en rutas de búsqueda;
•	migración;
•	colapso de colonias débiles;
•	concentración de animales cerca de fuentes de agua.
La sequía es un buen ejemplo de evento emergente. No necesita ser un “evento programado” si resulta de baja lluvia, alta temperatura y consumo de recursos.
6.6. Viento
El viento puede afectar:
•	dispersión de semillas;
•	evaporación;
•	percepción química;
•	propagación o dispersión de olores;
•	dificultad de movimiento para criaturas pequeñas;
•	enfriamiento local;
•	caída de materia vegetal.
En versiones futuras, el viento puede ser importante para polen, esporas, semillas livianas y señales químicas.
6.7. Clima como presión evolutiva del ecosistema
El clima fuerza adaptaciones de comportamiento.
Si llueve con frecuencia, las hormigas pueden preferir rutas elevadas o zonas protegidas. Si hay sequía, pueden explorar más lejos. Si la temperatura sube, ciertas criaturas pueden reducir actividad durante el día y moverse de noche.
El clima no decide por las criaturas. Cambia el tablero de posibilidades.
________________________________________
7. Terreno
7.1. Función del terreno
El terreno es el soporte físico del ecosistema.
Define dónde pueden moverse las criaturas, dónde crecen las plantas, dónde se acumula agua, dónde se esconden depredadores y dónde puede establecerse una colonia.
El terreno debe afectar comportamiento, rutas, acceso a recursos y riesgo.
7.2. Suelo
El suelo puede contener:
•	humedad;
•	nutrientes;
•	textura;
•	compactación;
•	materia orgánica;
•	temperatura local;
•	capacidad de drenaje;
•	fertilidad.
No todo suelo debe ser igual. Algunas zonas pueden ser fértiles, otras pobres, otras secas, otras húmedas, otras compactas.
7.3. Arena
La arena puede representar un tipo de terreno más suelto.
Puede afectar:
•	velocidad de movimiento;
•	construcción de túneles;
•	estabilidad del nido;
•	retención de humedad;
•	rastros;
•	facilidad para excavar.
Para hormigas, la arena puede ser favorable o problemática según humedad y compactación.
7.4. Rocas
Las rocas no deben ser decoración pura.
Pueden funcionar como:
•	obstáculos;
•	refugios;
•	sombra;
•	acumuladores de calor;
•	barreras de rutas;
•	puntos de orientación;
•	protección contra lluvia;
•	escondites para depredadores.
Una roca puede alterar completamente una ruta de recolección si bloquea un paso estrecho o crea una zona segura.
7.5. Agua
El agua puede existir como:
•	humedad del suelo;
•	charcos;
•	gotas;
•	riachuelos;
•	zonas inundadas;
•	fuentes permanentes;
•	lluvia temporal.
El agua puede ser recurso, barrera o amenaza.
Para organismos pequeños, incluso una acumulación pequeña puede modificar rutas. Una zona inundada puede bloquear acceso a comida o dañar un nido.
7.6. Ríos y corrientes
Los ríos o corrientes representan barreras dinámicas.
Pueden:
•	separar territorios;
•	transportar semillas;
•	ahogar criaturas;
•	crear humedad local;
•	atraer plantas;
•	atraer animales;
•	erosionar terreno.
No son necesarios para la primera versión, pero deben considerarse para ecosistemas futuros.
7.7. Pendientes
Las pendientes afectan movimiento y drenaje.
Pueden:
•	ralentizar criaturas;
•	favorecer escorrentía de agua;
•	crear zonas secas o húmedas;
•	dificultar transporte de comida;
•	aumentar costo energético;
•	generar refugios o zonas inaccesibles.
Para una hormiga, una pendiente puede ser una decisión importante de ruta.
7.8. Obstáculos
Los obstáculos modifican acceso, movimiento y seguridad.
Pueden ser:
•	piedras;
•	ramas;
•	hojas grandes;
•	grietas;
•	agua;
•	raíces;
•	cuerpos muertos grandes;
•	estructuras generadas por organismos.
Un obstáculo no solo bloquea. También puede redirigir, proteger, dividir o concentrar actividad.
________________________________________
8. Flora
8.1. Rol de la flora
La flora es la base productiva del ecosistema.
Convierte condiciones ambientales en recursos biológicos. Sin flora, el ecosistema depende de comida externa o carroña. Con flora, aparece producción continua, competencia, crecimiento, reproducción y ciclos de materia.
8.2. Tipos de plantas
En versiones iniciales pueden existir plantas simples:
•	hierbas pequeñas;
•	brotes;
•	plantas productoras de semillas;
•	musgos;
•	plantas rastreras;
•	arbustos pequeños.
En versiones futuras pueden añadirse:
•	árboles;
•	flores;
•	hongos visibles diferenciados;
•	plantas tóxicas;
•	plantas con néctar;
•	plantas estacionales;
•	raíces complejas.
8.3. Crecimiento
Las plantas crecen si las condiciones son adecuadas.
Factores relevantes:
•	luz solar;
•	humedad;
•	temperatura;
•	nutrientes;
•	espacio;
•	competencia cercana;
•	daño por consumidores;
•	estación.
El crecimiento no debe ser instantáneo. Debe ocurrir gradualmente y responder al entorno.
8.4. Reproducción
Las plantas pueden reproducirse mediante semillas.
La producción de semillas depende de:
•	madurez de la planta;
•	energía acumulada;
•	estación;
•	salud;
•	disponibilidad de agua;
•	nutrientes;
•	ausencia de daño excesivo.
Las semillas pueden caer cerca, dispersarse por viento, agua, animales o actividad de hormigas.
8.5. Muerte
Las plantas pueden morir por:
•	sequía;
•	falta de luz;
•	falta de nutrientes;
•	consumo excesivo;
•	enfermedad;
•	inundación;
•	temperatura extrema;
•	vejez;
•	competencia.
Al morir, la planta se convierte en materia orgánica. Esa materia puede alimentar descomponedores y devolver nutrientes al suelo.
8.6. Necesidades
Toda planta debe tener necesidades básicas:
•	luz;
•	agua;
•	nutrientes;
•	espacio;
•	temperatura viable.
No debe existir crecimiento vegetal infinito sin costo ni límite.
8.7. Competencia
Las plantas compiten por:
•	luz;
•	agua;
•	nutrientes;
•	espacio.
Una zona fértil puede volverse densa. Una zona seca puede quedar vacía. La competencia vegetal crea estructura espacial para el ecosistema.
8.8. Producción de semillas
Las semillas son uno de los recursos iniciales más importantes.
Pueden:
•	alimentar hormigas;
•	alimentar insectos pequeños;
•	convertirse en nuevas plantas;
•	ser almacenadas;
•	pudrirse;
•	atraer fauna;
•	concentrar competencia.
La semilla es un puente perfecto entre flora, fauna, colonias y descomposición.
8.9. Relación con el clima
La flora responde directamente al clima.
Más lluvia puede aumentar crecimiento. Sequía puede reducir semillas. Temperatura extrema puede frenar desarrollo. Humedad alta puede favorecer enfermedades u hongos. La luz regula producción.
La flora debe ser una de las primeras capas donde el clima se vuelve visible de forma ecológica.
________________________________________
9. Hongos y microorganismos
9.1. Rol ecológico
Hongos y microorganismos son los recicladores del ecosistema.
Sin ellos, la materia muerta se acumularía sin volver al ciclo. Con ellos, cadáveres, hojas y restos se transforman en nutrientes reutilizables.
Son fundamentales para cerrar el ciclo de materia.
9.2. Descomposición
La descomposición transforma materia orgánica en nutrientes.
Puede aplicarse a:
•	cadáveres de hormigas;
•	cadáveres de insectos;
•	restos de depredadores;
•	hojas muertas;
•	semillas podridas;
•	plantas muertas;
•	restos de comida abandonados.
La velocidad de descomposición depende de condiciones ambientales.
9.3. Relación con humedad
La humedad favorece hongos y microorganismos.
Humedad alta puede acelerar descomposición y crecimiento de hongos. Humedad baja puede ralentizarlos.
Sin embargo, demasiada humedad puede generar problemas en nidos, alimentos almacenados o larvas.
9.4. Cadáveres
Los cadáveres son recursos ecológicos.
Pueden:
•	atraer descomponedores;
•	atraer carroñeros;
•	generar nutrientes;
•	favorecer hongos;
•	aumentar riesgo sanitario;
•	alterar comportamiento de hormigas;
•	indicar zonas peligrosas.
Un cadáver no debe desaparecer simplemente. Debe pasar por etapas.
9.5. Materia orgánica
La materia orgánica incluye restos vegetales, animales y alimentos degradados.
Puede acumularse, descomponerse, ser transportada o consumida.
Una zona rica en materia orgánica puede volverse fértil o peligrosa, según humedad y organismos presentes.
9.6. Hongos como oportunidad y amenaza
Los hongos pueden ser beneficiosos o perjudiciales.
Beneficios:
•	reciclan nutrientes;
•	transforman restos;
•	sostienen fertilidad;
•	pueden alimentar especies futuras.
Amenazas:
•	pueden contaminar reservas;
•	afectar larvas;
•	invadir zonas húmedas del nido;
•	alterar salud de la colonia.
Esto los convierte en un sistema ecológico interesante, no solo en decoración.
________________________________________
10. Fauna
10.1. Clasificación general
La fauna incluye todos los animales del ecosistema.
Puede clasificarse por función ecológica:
•	consumidores primarios;
•	consumidores secundarios;
•	omnívoros;
•	carroñeros;
•	depredadores;
•	competidores;
•	presas;
•	simbiontes futuros.
La clasificación no debe ser rígida. Una especie puede cumplir varios roles según contexto.
10.2. Consumidores
Los consumidores obtienen energía de otros organismos o recursos orgánicos.
Pueden consumir:
•	semillas;
•	plantas;
•	hongos;
•	insectos;
•	cadáveres;
•	materia orgánica.
Las hormigas pueden actuar como consumidoras, carroñeras, depredadoras menores o recolectoras.
10.3. Herbívoros
Los herbívoros consumen plantas, hojas, raíces o semillas.
En ecosistemas futuros, pueden cumplir funciones como:
•	controlar crecimiento vegetal;
•	dispersar semillas;
•	servir de presa;
•	competir con hormigas por recursos.
10.4. Omnívoros
Los omnívoros consumen recursos variados.
Las hormigas pueden ser tratadas como omnívoras funcionales si recolectan semillas, restos animales, pequeños insectos muertos o secreciones dulces en versiones futuras.
Los omnívoros son importantes porque se adaptan a cambios de disponibilidad.
10.5. Carnívoros
Los carnívoros consumen otros animales.
Pueden cazar activamente o esperar presas.
Su presencia introduce riesgo, modifica rutas, regula poblaciones y puede desencadenar defensa colectiva.
10.6. Insectos
Los insectos menores pueden cumplir muchos roles:
•	presas;
•	competidores;
•	consumidores de semillas;
•	consumidores de plantas;
•	carroñeros;
•	polinizadores futuros;
•	fuente de alimento para depredadores;
•	perturbadores de colonias.
No todos los insectos deben estar simulados con la misma profundidad. Algunos pueden ser simples pero ecológicamente relevantes.
10.7. Arácnidos
Los arácnidos pueden incluir arañas y alacranes.
Pueden actuar como depredadores, emboscadores o amenazas territoriales. Su presencia debe afectar el comportamiento de criaturas pequeñas.
10.8. Anfibios
Sapos y ranas pueden funcionar como depredadores de insectos.
Su actividad puede depender fuertemente de humedad, lluvia, temperatura y disponibilidad de presas.
Son excelentes conectores entre clima, agua y cadenas alimenticias.
________________________________________
11. Hormigas
11.1. Rol central
Las hormigas son el primer organismo principal del proyecto.
El objetivo no es simular una hormiga perfecta individualmente, sino una colonia que produzca comportamiento colectivo creíble.
Cada hormiga debe ser limitada, simple y local. La colonia debe parecer compleja por acumulación de interacciones.
11.2. Reina
La reina representa la continuidad reproductiva de la colonia.
Funciones conceptuales:
•	producción de huevos;
•	estabilidad reproductiva;
•	dependencia de cuidado;
•	vulnerabilidad crítica;
•	relación con reservas de alimento;
•	relación con salud general de la colonia.
La reina no debe ser una “unidad controlable”. Es un organismo central cuyo estado afecta el futuro de la colonia.
Si la reina muere, la colonia puede entrar en colapso, modo supervivencia o transición según reglas futuras.
11.3. Obreras
Las obreras son la fuerza funcional principal.
Pueden realizar tareas como:
•	explorar;
•	recolectar comida;
•	transportar recursos;
•	cuidar larvas;
•	limpiar restos;
•	reforzar rutas;
•	responder a peligro;
•	mantener el nido;
•	retirar cadáveres;
•	asistir defensa en casos extremos.
Las obreras no deben saber todo. Deben actuar por estímulos, necesidades y señales locales.
11.4. Soldados
Los soldados son hormigas especializadas en defensa, si la especie elegida los contempla.
Pueden:
•	patrullar cerca del nido;
•	responder a señales de alarma;
•	atacar depredadores pequeños;
•	bloquear entradas;
•	proteger rutas críticas;
•	acompañar recolección en zonas peligrosas.
No todas las especies de hormigas tienen soldados diferenciados. Esto queda como decisión de diseño biológico.
11.5. Larvas
Las larvas representan el futuro de la colonia.
Necesitan:
•	alimento;
•	cuidado;
•	condiciones adecuadas de humedad;
•	temperatura estable;
•	protección;
•	higiene.
Si hay muchas larvas, la presión alimenticia sube. Si falta comida, la colonia debe priorizar recolección o reducir supervivencia larval.
Las larvas son una excelente forma de convertir el estado interno de la colonia en presión de comportamiento.
11.6. Huevos
Los huevos son la etapa inicial del ciclo de vida.
Requieren:
•	protección;
•	humedad adecuada;
•	temperatura viable;
•	cuidado de obreras;
•	estabilidad del nido.
Los huevos no participan activamente, pero su existencia afecta proyección poblacional.
11.7. Ciclo de vida
El ciclo conceptual base es:
huevo → larva → pupa si se decide incluir → adulta → muerte → cadáver → descomposición → nutrientes.
Cada etapa debe tener necesidades y vulnerabilidades.
El desarrollo no debe ser instantáneo. Debe depender de tiempo, alimentación y condiciones ambientales.
11.8. Estados individuales
Una hormiga puede tener estados internos como:
•	hambre;
•	cansancio;
•	salud;
•	carga transportada;
•	rol;
•	edad;
•	exposición a peligro;
•	orientación aproximada;
•	motivación de tarea;
•	sensibilidad a feromonas;
•	memoria local limitada;
•	distancia al nido;
•	estado de alarma.
Estos estados no deben convertirla en una mente compleja. Solo deben guiar decisiones simples.
11.9. Necesidades
Las hormigas pueden necesitar:
•	energía;
•	descanso;
•	seguridad;
•	regreso al nido;
•	contacto con señales;
•	alimento para sí mismas o la colonia;
•	protección de larvas;
•	evitar depredadores;
•	mantener rutas viables.
Las necesidades individuales deben interactuar con necesidades colectivas.
11.10. Sensores
Una hormiga puede percibir:
•	feromonas cercanas;
•	comida cercana;
•	obstáculos próximos;
•	otras hormigas cercanas;
•	señales de peligro;
•	humedad local;
•	temperatura local;
•	entrada del nido si está cerca;
•	depredadores cercanos;
•	cadáveres cercanos;
•	carga o rastros recientes.
Su percepción debe ser local y limitada.
11.11. Percepción
La percepción no es conocimiento absoluto.
Una hormiga puede detectar una señal, pero no necesariamente entender el mundo completo. Puede interpretar intensidad de feromona, presencia de comida o peligro cercano, pero no calcular una estrategia global perfecta.
La percepción debe ser imperfecta, local y contextual.
11.12. Memoria
La memoria individual debe ser limitada.
Una hormiga puede recordar:
•	dirección aproximada al nido;
•	última fuente de comida;
•	estado de tarea actual;
•	si una zona reciente fue peligrosa;
•	una ruta aproximada durante poco tiempo.
No debe recordar mapas completos ni tener planificación avanzada.
La memoria colectiva debe emerger principalmente de señales externas como feromonas, no de cerebros individuales sofisticados.
11.13. Feromonas
Las feromonas son el principal medio de comunicación indirecta.
Pueden representar:
•	ruta hacia comida;
•	alarma;
•	camino al nido;
•	zona explorada;
•	zona peligrosa;
•	reclutamiento;
•	territorio;
•	cadáveres o limpieza.
Las feromonas deben:
•	tener intensidad;
•	degradarse con el tiempo;
•	verse afectadas por lluvia, humedad o viento;
•	acumularse con uso repetido;
•	competir entre sí si hay señales distintas;
•	guiar comportamiento sin obligarlo.
Una feromona fuerte no debe controlar como magia. Debe aumentar probabilidad de ciertas acciones.
11.14. Comportamiento individual
El comportamiento individual de una hormiga debe surgir de prioridades simples.
Ejemplo conceptual:
•	si tiene comida, intenta volver al nido;
•	si detecta comida y puede cargarla, la recoge;
•	si detecta feromona de comida y busca alimento, tiende a seguirla;
•	si detecta peligro fuerte, huye o emite alarma;
•	si está cansada, reduce exploración;
•	si está cerca del nido y hay larvas hambrientas, puede asistir cuidado;
•	si no hay señales claras, explora.
La clave es que ninguna regla aislada sea demasiado inteligente.
11.15. Comportamiento colectivo
El comportamiento colectivo aparece cuando muchas hormigas comparten señales y modifican el entorno.
Ejemplos:
•	rutas de comida;
•	refuerzo de caminos eficientes;
•	abandono de caminos malos;
•	concentración de defensa;
•	limpieza de cadáveres;
•	expansión hacia zonas ricas;
•	reducción de actividad en zonas peligrosas;
•	respuesta a escasez.
La colonia debe parecer coordinada sin requerir control central perfecto.
11.16. Colonias
Una colonia es más que un conjunto de hormigas.
Incluye:
•	nido;
•	reina;
•	huevos;
•	larvas;
•	obreras;
•	soldados si existen;
•	reservas;
•	territorio;
•	rutas;
•	señales químicas;
•	memoria ambiental;
•	presión alimenticia;
•	amenazas;
•	estado reproductivo.
La colonia es una unidad ecológica emergente.
11.17. Expansión
Una colonia puede expandirse cuando:
•	tiene población suficiente;
•	hay recursos cercanos;
•	las rutas son seguras;
•	existe presión interna;
•	el nido actual queda limitado;
•	aparecen oportunidades territoriales.
La expansión puede implicar nuevas cámaras, nuevas rutas, mayor territorio o incluso nidos satélite en versiones futuras.
11.18. Migración
La migración ocurre cuando la colonia abandona o reduce dependencia de un nido.
Causas posibles:
•	inundación;
•	depredación constante;
•	hongos internos;
•	falta de recursos;
•	temperatura extrema;
•	colapso estructural;
•	presión territorial;
•	intervención del usuario.
La migración debe ser un evento emergente de alto impacto.
11.19. Guerra
La guerra entre colonias debe surgir de competencia.
Causas posibles:
•	rutas superpuestas;
•	escasez de comida;
•	invasión territorial;
•	proximidad de nidos;
•	robo de recursos;
•	presión poblacional;
•	señales agresivas acumuladas.
No debe existir guerra sin causa ecológica.
11.20. Supervivencia
La supervivencia de una colonia depende de equilibrio entre:
•	comida;
•	población;
•	reproducción;
•	defensa;
•	clima;
•	salud del nido;
•	disponibilidad de territorio;
•	depredadores;
•	gestión de residuos;
•	resiliencia ante cambios.
Una colonia puede prosperar, estancarse, migrar, dividirse o colapsar.
________________________________________
12. Colonias
12.1. Estado global
La colonia tiene variables conceptuales globales, aunque ninguna hormiga individual las comprenda plenamente.
Ejemplos:
•	reservas de alimento;
•	población total;
•	cantidad de larvas;
•	cantidad de huevos;
•	salud de la reina;
•	presión alimenticia;
•	nivel de amenaza;
•	actividad de recolección;
•	actividad de defensa;
•	necesidad de expansión;
•	estado sanitario;
•	humedad interna;
•	estabilidad del nido;
•	estrés colectivo.
Estas variables permiten describir la colonia como organismo colectivo.
12.2. Reservas
Las reservas representan alimento almacenado.
Afectan:
•	supervivencia;
•	reproducción;
•	alimentación de larvas;
•	actividad de exploración;
•	capacidad de resistir sequía;
•	tolerancia ante amenazas;
•	crecimiento poblacional.
Reservas altas pueden permitir expansión. Reservas bajas pueden generar presión alimenticia.
12.3. Población
La población define capacidad de acción.
Más hormigas permiten más exploración, recolección y defensa, pero también aumentan consumo de alimento.
Una colonia grande no siempre es más segura. Puede colapsar si sus necesidades superan su entorno.
12.4. Amenazas
El nivel de amenaza puede aumentar por:
•	depredadores cercanos;
•	ataques;
•	cadáveres recientes;
•	rutas peligrosas;
•	invasión de otra colonia;
•	inundación;
•	hongos;
•	intervención ambiental hostil.
La amenaza modifica prioridades. Una colonia amenazada puede explorar menos, defender más, abandonar rutas o migrar.
12.5. Necesidades
La colonia puede tener necesidades colectivas:
•	alimentar larvas;
•	aumentar reservas;
•	defender entradas;
•	explorar zonas nuevas;
•	limpiar cadáveres;
•	reparar o adaptar el nido;
•	expandirse;
•	reducir riesgo;
•	proteger a la reina.
Estas necesidades no deben ser órdenes directas. Deben influir en la probabilidad de comportamientos individuales.
12.6. Decisiones colectivas
Una colonia “decide” mediante señales distribuidas.
No existe necesariamente una mente central. La decisión colectiva puede surgir de:
•	intensidad de feromonas;
•	cantidad de hormigas realizando una tarea;
•	éxito o fracaso de rutas;
•	reservas bajas;
•	hambre individual;
•	señales de peligro;
•	concentración de cadáveres;
•	tasa de retorno con comida;
•	mortalidad reciente.
La colonia parece decidir porque el sistema distribuye información mediante acciones locales.
12.7. Inteligencia aparente
La colonia parece inteligente cuando:
•	encuentra rutas eficientes;
•	abandona rutas peligrosas;
•	concentra esfuerzo en fuentes abundantes;
•	cambia prioridades ante escasez;
•	defiende zonas críticas;
•	limpia restos;
•	protege larvas;
•	migra ante peligro extremo.
Pero ninguna hormiga necesita entender “la estrategia”. Solo sigue reglas simples bajo señales locales.
Ese es uno de los objetivos expresivos principales del proyecto.
________________________________________
13. Recursos
13.1. Definición
Un recurso es cualquier elemento del mundo que puede ser utilizado, consumido, transformado, transportado o disputado por organismos.
Los recursos no son solo comida. También pueden ser agua, espacio, refugio, nutrientes, cadáveres, semillas, humedad o información.
13.2. Comida
La comida puede incluir:
•	semillas;
•	restos vegetales;
•	insectos muertos;
•	pequeños organismos;
•	sustancias dulces futuras;
•	materia orgánica aprovechable.
Debe tener origen, cantidad, calidad, degradación y consumidores posibles.
13.3. Semillas
Las semillas pueden cumplir doble función:
•	recurso alimenticio;
•	potencial nueva planta.
Esto genera decisiones ecológicas interesantes. Si muchas semillas son comidas, hay menos plantas futuras. Si muchas germinan, hay más producción futura.
13.4. Agua
El agua puede ser recurso y amenaza.
Puede:
•	permitir vida vegetal;
•	sostener humedad;
•	atraer anfibios;
•	dificultar movimiento;
•	inundar nidos;
•	borrar señales;
•	concentrar actividad.
13.5. Materia orgánica
La materia orgánica es material muerto o degradado.
Puede alimentar:
•	hongos;
•	microorganismos;
•	carroñeros;
•	suelo;
•	ciclos de nutrientes.
13.6. Cadáveres
Los cadáveres son recursos de transición.
Pasan de organismo vivo a materia orgánica, luego a nutrientes mediante descomposición.
Pueden atraer:
•	hormigas carroñeras;
•	hongos;
•	microorganismos;
•	depredadores oportunistas;
•	otros insectos.
También pueden representar riesgo sanitario.
13.7. Nutrientes
Los nutrientes sostienen la fertilidad.
Afectan principalmente:
•	plantas;
•	hongos;
•	productividad local;
•	recuperación del ecosistema.
Los nutrientes no son visibles necesariamente como objetos individuales. Pueden ser una propiedad del suelo.
13.8. Cómo nacen los recursos
Los recursos nacen de procesos:
•	plantas producen semillas;
•	animales mueren y generan cadáveres;
•	lluvia genera agua disponible;
•	descomposición genera nutrientes;
•	viento dispersa material;
•	usuario puede introducir comida externa;
•	plantas muertas generan materia orgánica.
13.9. Cómo desaparecen los recursos
Los recursos desaparecen o se transforman cuando:
•	son consumidos;
•	se pudren;
•	germinan;
•	se descomponen;
•	son transportados;
•	son enterrados;
•	se evaporan;
•	son arrastrados por agua;
•	se integran al suelo.
Nada debe desaparecer sin transformación conceptual.
13.10. Quién consume qué
Relaciones iniciales:
•	hormigas consumen o transportan semillas y comida;
•	insectos pequeños consumen semillas, plantas o materia orgánica;
•	depredadores consumen insectos y hormigas;
•	hongos consumen materia orgánica y cadáveres;
•	plantas consumen agua, luz y nutrientes;
•	microorganismos procesan restos.
________________________________________
14. Depredadores
14.1. Rol de los depredadores
Los depredadores introducen presión, riesgo y regulación poblacional.
No deben ser enemigos programados para atacar siempre. Deben ser organismos con necesidades propias.
Un depredador caza porque necesita energía, no porque el usuario necesite drama.
14.2. Arañas
Las arañas pueden funcionar como depredadores de emboscada o patrullaje limitado.
Pueden:
•	ocupar zonas con paso frecuente;
•	cazar insectos pequeños;
•	capturar hormigas aisladas;
•	crear zonas de riesgo;
•	modificar rutas de recolección;
•	descansar después de alimentarse.
Su presencia puede hacer que una ruta eficiente se vuelva peligrosa.
14.3. Alacranes
Los alacranes pueden representar depredadores más peligrosos y menos frecuentes.
Pueden:
•	patrullar lentamente;
•	refugiarse bajo rocas;
•	activarse más en ciertas condiciones;
•	atacar presas cercanas;
•	generar señales de alarma;
•	alterar comportamiento de colonias.
No deberían aparecer en exceso si desequilibran demasiado el sistema.
14.4. Sapos
Los sapos pueden ser depredadores oportunistas dependientes de humedad.
Pueden:
•	aparecer cerca de zonas húmedas;
•	consumir insectos;
•	cazar hormigas si están disponibles;
•	descansar en sombra;
•	aumentar actividad tras lluvia;
•	reducir actividad en sequía.
Conectan clima, agua y depredación.
14.5. Ranas
Las ranas pueden cumplir un rol similar al sapo, pero más asociado a agua o humedad alta.
Pueden:
•	habitar cerca de charcos;
•	cazar insectos pequeños;
•	responder a lluvia;
•	servir como presión temporal en zonas húmedas.
14.6. Comportamiento
Los depredadores pueden alternar entre estados conceptuales:
•	hambre;
•	búsqueda;
•	espera;
•	persecución;
•	ataque;
•	alimentación;
•	descanso;
•	huida;
•	reproducción futura;
•	defensa territorial futura.
Deben tener necesidades y limitaciones. Un depredador no debe matar indefinidamente sin cansarse o saciarse.
14.7. Patrullaje
El patrullaje debe responder a motivaciones:
•	búsqueda de presas;
•	territorio;
•	refugio;
•	temperatura;
•	humedad;
•	rutas de movimiento de presas.
No debe ser movimiento aleatorio decorativo. Aunque tenga azar, debe tener sentido ecológico.
14.8. Caza
La caza puede depender de:
•	hambre;
•	distancia a presa;
•	percepción;
•	velocidad;
•	riesgo;
•	tamaño relativo;
•	energía disponible;
•	éxito previo;
•	tipo de depredador.
La caza fallida también debe ser posible.
14.9. Descanso
El descanso evita depredadores infinitamente activos.
Después de comer, cazar o moverse, un depredador puede descansar. Esto genera ventanas de oportunidad para otras especies.
14.10. Necesidades
Los depredadores pueden necesitar:
•	alimento;
•	refugio;
•	humedad;
•	temperatura adecuada;
•	descanso;
•	territorio;
•	seguridad.
Si no satisfacen necesidades, pueden migrar, morir, reducir actividad o cambiar zona.
________________________________________
15. Intervención del usuario
15.1. Principio general
El usuario interviene en el entorno, no en la voluntad de los organismos.
Sus acciones son causas ambientales. Las consecuencias pertenecen al ecosistema.
15.2. Qué puede hacer
El usuario puede:
•	colocar comida;
•	retirar o modificar recursos externos si se decide permitirlo;
•	agregar obstáculos;
•	colocar piedras;
•	alterar humedad;
•	provocar lluvia;
•	intensificar sequía;
•	modificar temperatura;
•	introducir depredadores;
•	introducir insectos;
•	plantar vegetación;
•	crear charcos;
•	modificar terreno;
•	acelerar o pausar observación;
•	observar datos del ecosistema.
15.3. Qué no puede hacer
El usuario no puede:
•	controlar directamente una hormiga;
•	ordenar ataques;
•	ordenar migraciones;
•	seleccionar unidades;
•	asignar trabajos manualmente;
•	decidir qué hormiga será obrera o soldado;
•	obligar a una criatura a comer;
•	forzar rutas internas;
•	crear recursos sin consecuencia;
•	eliminar causalidad ecológica.
15.4. Consecuencias de colocar comida
Colocar comida puede:
•	atraer hormigas;
•	reforzar rutas de feromonas;
•	aumentar reservas;
•	favorecer crecimiento poblacional;
•	atraer competidores;
•	atraer depredadores;
•	generar restos si no se consume;
•	favorecer hongos si se pudre;
•	alterar equilibrio local.
Una intervención aparentemente positiva puede producir consecuencias negativas después.
15.5. Consecuencias de modificar clima
Modificar clima puede:
•	acelerar o frenar crecimiento vegetal;
•	afectar actividad animal;
•	alterar humedad;
•	modificar supervivencia de larvas;
•	cambiar descomposición;
•	afectar rutas químicas;
•	intensificar sequías o lluvias.
15.6. Consecuencias de agregar obstáculos
Agregar obstáculos puede:
•	bloquear rutas;
•	crear refugio;
•	modificar patrullaje;
•	proteger zonas;
•	concentrar tráfico;
•	aislar recursos;
•	forzar exploración;
•	cambiar riesgo de depredación.
15.7. Consecuencias de introducir animales
Introducir animales puede:
•	alterar cadenas alimenticias;
•	aumentar depredación;
•	crear competencia;
•	introducir nuevas fuentes de cadáveres;
•	modificar comportamiento de colonias;
•	desequilibrar poblaciones.
Introducir una araña no es “poner un enemigo”. Es agregar un organismo con necesidades que afectará el sistema.
15.8. Consecuencias de cambiar humedad
Cambiar humedad puede:
•	favorecer hongos;
•	afectar plantas;
•	alterar suelo;
•	modificar salud del nido;
•	cambiar actividad de anfibios;
•	afectar descomposición;
•	modificar supervivencia de huevos y larvas.
15.9. Consecuencias de provocar lluvia
La lluvia puede:
•	aumentar agua disponible;
•	borrar feromonas;
•	dificultar movimiento;
•	favorecer plantas;
•	inundar zonas;
•	activar anfibios;
•	reducir temperatura;
•	alterar rutas de recolección.
La lluvia debe ser ambivalente: puede ayudar y perjudicar al mismo tiempo.
________________________________________
16. Eventos emergentes
16.1. Definición
Un evento emergente es una situación significativa que aparece por la interacción de reglas, no por activación manual prediseñada.
El evento puede ser reconocido por el observador, pero no necesita existir como “misión” o “guion”.
16.2. Guerras
Una guerra puede emerger cuando:
•	dos colonias compiten por recursos;
•	sus rutas se cruzan constantemente;
•	hay escasez;
•	aumentan señales agresivas;
•	mueren obreras;
•	se refuerzan defensas;
•	se invade territorio.
La guerra es resultado de presión ecológica, no de un botón narrativo.
16.3. Migraciones
Una migración puede emerger por:
•	inundación del nido;
•	hongos internos;
•	falta de comida;
•	depredadores persistentes;
•	destrucción de rutas;
•	sobrepoblación;
•	cambios de clima;
•	agotamiento del entorno.
La migración debe sentirse como decisión colectiva, aunque surja de señales locales.
16.4. Hambrunas
Una hambruna puede emerger cuando:
•	hay pocas semillas;
•	mueren plantas;
•	aumenta población;
•	se bloquean rutas;
•	hay sequía;
•	competidores consumen recursos;
•	depredadores limitan exploración.
La hambruna no debe aparecer como castigo arbitrario. Debe ser consecuencia de flujo de energía insuficiente.
16.5. Explosiones demográficas
Una explosión demográfica puede ocurrir si:
•	hay alimento abundante;
•	baja depredación;
•	clima favorable;
•	alta supervivencia larval;
•	buenas reservas;
•	nido estable.
Pero ese crecimiento puede crear problemas futuros: más bocas que alimentar, expansión forzada y mayor competencia.
16.6. Colapso de colonias
Una colonia puede colapsar por:
•	muerte de la reina;
•	hambre;
•	depredación;
•	enfermedad;
•	hongos;
•	inundación;
•	guerra;
•	aislamiento;
•	mala ubicación;
•	falta de obreras;
•	exceso de larvas sin alimento.
El colapso debe ser doloroso pero lógico. Si pasa, el usuario debe poder entender las causas al observar el sistema.
16.7. Invasiones
Una invasión puede emerger cuando:
•	una colonia detecta recursos en territorio ajeno;
•	depredadores desplazan organismos;
•	competidores saturan una zona;
•	una especie introducida encuentra condiciones ideales;
•	el usuario altera el equilibrio sin prever consecuencias.
16.8. Competencia por recursos
La competencia puede aparecer entre:
•	hormigas y otros insectos por semillas;
•	colonias por rutas;
•	plantas por nutrientes;
•	depredadores por presas;
•	hongos y colonia por materia orgánica almacenada;
•	anfibios y arácnidos por insectos.
La competencia no siempre implica combate. Puede ser consumo antes que otro, bloqueo territorial, desplazamiento o presión indirecta.
16.9. Brotes de hongos
Un brote de hongos puede emerger por:
•	humedad alta;
•	acumulación de cadáveres;
•	restos abandonados;
•	poca limpieza;
•	temperatura favorable;
•	mala ventilación del nido.
Puede beneficiar nutrientes externos, pero amenazar reservas y larvas.
16.10. Rutas inteligentes
Una ruta eficiente puede emerger cuando:
•	varias hormigas encuentran comida;
•	las rutas cortas son reforzadas más rápido;
•	las rutas largas se evaporan;
•	rutas peligrosas reciben señales de alarma;
•	obstáculos redirigen tráfico.
Nadie diseñó la ruta. La ruta apareció.
________________________________________
17. Escalabilidad
17.1. Principio de reutilización conceptual
El motor debe poder representar distintos ecosistemas sin reescribir sus fundamentos conceptuales.
Para lograrlo, el mundo debe pensarse mediante principios generales:
•	organismos;
•	recursos;
•	energía;
•	materia;
•	información;
•	ambiente;
•	ciclos;
•	necesidades;
•	reproducción;
•	muerte;
•	interacción;
•	territorio;
•	adaptación conductual.
El hormiguero es el primer caso, no el límite.
17.2. Abejas
Para abejas, el sistema podría reutilizar:
•	colonia;
•	roles;
•	recursos;
•	comunicación;
•	rutas;
•	depredadores;
•	reproducción;
•	clima.
Pero requeriría nuevos conceptos:
•	vuelo;
•	flores;
•	néctar;
•	polen;
•	colmena vertical;
•	danza o comunicación direccional;
•	producción de miel;
•	polinización.
La base energética y ecológica seguiría siendo compatible.
17.3. Termitas
Para termitas, podrían reutilizarse:
•	colonia;
•	castas;
•	reina;
•	obreras;
•	soldados;
•	humedad;
•	suelo;
•	túneles;
•	recursos orgánicos;
•	hongos si se modela simbiosis;
•	defensa.
Nuevos énfasis:
•	madera;
•	construcción compleja;
•	control interno de humedad y temperatura;
•	simbiosis microbiana;
•	arquitectura del termitero.
17.4. Bosques
Un bosque requeriría ampliar escala.
Elementos reutilizables:
•	energía solar;
•	plantas;
•	nutrientes;
•	suelo;
•	agua;
•	descomposición;
•	fauna;
•	depredación;
•	competencia.
Nuevos conceptos:
•	árboles grandes;
•	sombra compleja;
•	raíces;
•	estratos vegetales;
•	polinización;
•	dispersión de semillas por animales;
•	incendios;
•	sucesión ecológica.
17.5. Desiertos
Un desierto reutilizaría:
•	temperatura;
•	humedad;
•	agua escasa;
•	depredación;
•	recursos limitados;
•	actividad nocturna;
•	refugios;
•	competencia extrema.
Nuevos énfasis:
•	supervivencia hídrica;
•	calor extremo;
•	ciclos de actividad nocturna;
•	plantas resistentes;
•	eventos raros de lluvia;
•	explosiones temporales de vida tras lluvia.
17.6. Otros ecosistemas
El mismo marco conceptual podría servir para:
•	humedales;
•	selvas;
•	cuevas;
•	jardines;
•	microecosistemas bajo tierra;
•	ecosistemas urbanos;
•	charcos temporales;
•	troncos en descomposición.
La clave es mantener separados los principios universales de las reglas específicas de cada ecosistema.
17.7. Qué debe permanecer constante
En cualquier ecosistema futuro deben mantenerse:
•	flujo de energía;
•	ciclo de materia;
•	recursos con origen y destino;
•	organismos con necesidades;
•	percepción limitada;
•	información con medio de transmisión;
•	comportamiento emergente;
•	intervención ambiental del usuario;
•	consecuencias ecológicas.
________________________________________
18. Glosario
Ambiente
Conjunto de condiciones físicas y químicas que afectan a los organismos: temperatura, humedad, luz, lluvia, suelo, viento, agua y terreno.
Colonia
Unidad colectiva formada por individuos relacionados funcionalmente, como una colonia de hormigas. Tiene estado global, aunque sus miembros actúen con información limitada.
Comportamiento emergente
Resultado complejo que aparece por la interacción de reglas simples y múltiples agentes, sin haber sido programado directamente como evento cerrado.
Consumidor
Organismo que obtiene energía comiendo plantas, semillas, hongos, animales, cadáveres o materia orgánica.
Depredador
Organismo que obtiene energía cazando otros organismos.
Descomposición
Proceso mediante el cual materia orgánica muerta se transforma en nutrientes reutilizables.
Descomponedor
Organismo, como hongo o microorganismo, que procesa materia muerta y contribuye al reciclaje de nutrientes.
Ecosistema
Red dinámica de organismos, recursos, ambiente, energía, materia e información que interactúan en un espacio determinado.
Energía
Capacidad que sostiene procesos vitales. En este proyecto proviene principalmente del Sol y fluye a través de plantas, consumidores, depredadores y descomponedores.
Entorno abiótico
Parte no viva del mundo: clima, suelo, agua, rocas, temperatura, humedad, luz y terreno.
Feromona
Señal química utilizada por hormigas u otros organismos para transmitir información local, como rutas, peligro o presencia de recursos.
Flujo de información
Movimiento de señales entre organismos o entre organismo y ambiente. Puede ocurrir mediante feromonas, olor, contacto, vibración, sonido, visión o rastros.
Flujo de materia
Movimiento y transformación de recursos físicos: semillas, cadáveres, nutrientes, agua, biomasa y materia orgánica.
Flora
Conjunto de organismos vegetales del ecosistema.
Fauna
Conjunto de animales del ecosistema.
Hongo
Organismo descomponedor que procesa materia orgánica y puede afectar nutrientes, cadáveres, reservas y salud del nido.
Hormiga
Organismo social individual con sensores limitados, necesidades simples y comportamiento local. La complejidad aparece al interactuar con otras hormigas y señales.
Humedad
Cantidad de agua presente en aire, suelo o ambiente local. Afecta plantas, hongos, larvas, nidos y actividad de organismos.
Inteligencia colectiva
Apariencia de decisión o coordinación grupal que emerge de muchos individuos simples interactuando mediante señales y reglas locales.
Larva
Etapa joven de una hormiga u otro insecto. Requiere alimento, cuidado y condiciones adecuadas.
Materia orgánica
Restos de organismos vivos o muertos que pueden descomponerse y devolver nutrientes al suelo.
Microorganismo
Organismo microscópico que participa en procesos como descomposición, transformación de nutrientes y degradación de materia.
Nido
Estructura habitada por una colonia. Proporciona refugio, organización espacial, protección de la reina, huevos, larvas y reservas.
Nutriente
Elemento o propiedad del suelo que permite crecimiento vegetal y productividad ecológica.
Organismo
Ser vivo dentro del ecosistema: planta, animal, hongo, microorganismo o criatura social.
Productor
Organismo que transforma energía ambiental en biomasa. En este proyecto, principalmente plantas mediante fotosíntesis.
Recurso
Elemento utilizable o transformable por organismos: comida, agua, semillas, cadáveres, refugio, nutrientes, espacio o materia orgánica.
Reina
Individuo reproductivo central de una colonia de hormigas. Su estado afecta continuidad y crecimiento de la colonia.
Semilla
Recurso producido por plantas. Puede convertirse en alimento o en una nueva planta.
Sensor limitado
Capacidad parcial de una criatura para percibir su entorno. Evita conocimiento global perfecto y favorece emergencia.
Simulación
Representación dinámica de procesos ecológicos, físicos y biológicos mediante reglas conceptuales.
Terreno
Soporte físico del mundo. Incluye suelo, arena, rocas, pendientes, obstáculos, agua y estructuras espaciales.
Usuario
Observador e interventor externo que modifica condiciones del entorno, pero no controla directamente organismos.
________________________________________
19. PENDIENTE DE DISEÑO
Esta sección registra decisiones importantes que todavía no deben cerrarse. No se inventan respuestas definitivas en esta versión.
19.1. Escala del mundo inicial
Debe decidirse si el primer mundo será:
•	un pequeño patio;
•	una zona de jardín;
•	un terrario;
•	un fragmento de bosque;
•	una escena abstracta centrada en el hormiguero;
•	un mapa cerrado;
•	un mundo expansible.
Esta decisión afectará densidad ecológica, cantidad de especies y ritmo de simulación.
19.2. Nivel de realismo biológico
Debe definirse cuánto realismo buscamos.
Opciones:
•	realismo inspirado en biología, pero simplificado;
•	simulación biológica estricta;
•	ecosistema estilizado;
•	equilibrio entre credibilidad científica y claridad observable.
Mi recomendación futura será no perseguir realismo absoluto desde el inicio. Mejor construir una simulación coherente, comprensible y extensible.
19.3. Especie inicial de hormiga
No se ha definido qué tipo de hormiga inspirará el primer modelo.
Debe decidirse si será:
•	recolectora de semillas;
•	omnívora generalista;
•	agresiva territorial;
•	cortadora de hojas;
•	especie ficticia inspirada en varias;
•	especie simplificada diseñada para simulación.
Esto afecta alimento, roles, feromonas, nido y comportamiento.
19.4. Existencia de soldados
No todas las hormigas tienen soldados diferenciados.
Debe decidirse si la primera colonia tendrá:
•	solo obreras;
•	obreras con grados de especialización;
•	soldados claros;
•	castas futuras desbloqueadas por crecimiento;
•	variación continua de tamaño y función.
19.5. Profundidad del nido
Debe decidirse si el nido será:
•	una representación conceptual;
•	una estructura visible en corte;
•	un sistema subterráneo completo;
•	un espacio abstracto con cámaras;
•	una capa separada del mundo exterior.
Esta decisión es grande y no debe tomarse rápido.
19.6. Movimiento sobre terreno
Debe decidirse si el mundo inicial será:
•	2D conceptual;
•	2.5D con apariencia 3D;
•	3D completo;
•	superficie con altura;
•	terreno navegable simplificado.
Esto afectará rutas, obstáculos, pendientes, agua y percepción.
19.7. Nivel de detalle individual
Debe decidirse cuánta información tendrá cada criatura.
Especialmente:
•	memoria;
•	sensores;
•	necesidades;
•	edad;
•	salud;
•	experiencia;
•	variación individual;
•	roles dinámicos.
Demasiado detalle puede hacer el sistema pesado y difícil de entender. Muy poco detalle puede hacerlo plano.
19.8. Modelo de feromonas
Debe diseñarse con cuidado:
•	tipos de feromonas;
•	duración;
•	evaporación;
•	difusión;
•	interferencia;
•	efecto de lluvia;
•	efecto de viento;
•	intensidad;
•	acumulación;
•	saturación.
Las feromonas serán uno de los pilares del comportamiento emergente.
19.9. Modelo de clima
Debe decidirse si el clima será:
•	global;
•	por zonas;
•	dinámico;
•	estacional;
•	controlable por usuario;
•	parcialmente aleatorio;
•	dependiente de bioma.
19.10. Plantas iniciales
Debe decidirse qué plantas existirán primero.
Criterios:
•	función ecológica clara;
•	producción de semillas;
•	relación con humedad;
•	relación con nutrientes;
•	facilidad de observación;
•	impacto sobre hormigas.
19.11. Depredadores iniciales
Debe decidirse si el primer depredador será:
•	araña;
•	alacrán;
•	sapo;
•	rana;
•	insecto depredador menor;
•	ninguno en la primera fase.
Agregar depredadores demasiado pronto puede ocultar problemas básicos del sistema de recolección y colonia.
19.12. Interfaz de intervención del usuario
Debe definirse conceptualmente qué herramientas tendrá el usuario al inicio.
Posibles herramientas:
•	colocar comida;
•	cambiar humedad;
•	provocar lluvia;
•	colocar obstáculos;
•	introducir criatura;
•	observar mapas de señales;
•	pausar y acelerar tiempo.
Pero debe mantenerse la regla: intervención ambiental, nunca control directo.
19.13. Visualización de información invisible
Debe decidirse cómo se mostrarán elementos invisibles como:
•	feromonas;
•	humedad del suelo;
•	nutrientes;
•	amenaza;
•	presión alimenticia;
•	rutas;
•	señales de alarma.
Esto no es implementación todavía; es diseño de observabilidad del mundo.
19.14. Tolerancia al caos
Debe decidirse cuánto caos aceptará el sistema.
Un ecosistema muy estable puede ser aburrido. Uno demasiado caótico puede ser ilegible.
Debe buscarse un punto donde el usuario pueda entender causas, pero todavía sorprenderse con consecuencias.
19.15. Muerte y sufrimiento animal
Debe decidirse el tono visual y conceptual de muerte, depredación y colapso.
El proyecto necesita muerte ecológica, pero no necesariamente violencia gráfica.
Posibles enfoques:
•	representación limpia y naturalista;
•	estilo low poly suave;
•	indicadores abstractos;
•	cadáveres visibles sin gore;
•	desaparición gradual mediante descomposición.
19.16. Persistencia histórica del mundo
Debe decidirse si el mundo conservará historial:
•	zonas donde hubo cadáveres;
•	rutas antiguas;
•	suelos enriquecidos;
•	colonias desaparecidas;
•	restos de nidos;
•	memoria territorial.
Esto puede dar profundidad enorme al simulador.
19.17. Criterio de éxito del ecosistema v0.1
Debe definirse cuándo consideramos que Ecosistema v0.1 funciona.
Una posible definición futura:
•	hormigas exploran;
•	encuentran comida;
•	dejan feromonas;
•	otras hormigas siguen rutas;
•	comida llega al nido;
•	reservas cambian;
•	larvas generan presión alimenticia;
•	el usuario puede alterar el entorno;
•	las consecuencias son observables;
•	no hay control directo de criaturas.


20. Intervención Experimental
20.1 Propósito
El usuario no representa un personaje dentro del ecosistema.
No es una hormiga.
No es un depredador.
No es un constructor.
No es un estratega.
El usuario representa una entidad externa al mundo, similar a un científico, investigador o "dios observador", cuya función principal consiste en experimentar con las condiciones del ecosistema y observar las consecuencias naturales de dichas modificaciones.
El objetivo principal del proyecto no es "ganar", sino descubrir comportamientos emergentes.
Cada sesión de simulación debe sentirse como un experimento diferente.
________________________________________
20.2 Principio Fundamental
El usuario nunca debe controlar directamente la voluntad de una criatura.
No existen órdenes como:
•	ir hacia un lugar 
•	atacar 
•	defender 
•	construir 
•	escapar 
•	recolectar 
Las decisiones siempre pertenecen a la criatura.
El usuario únicamente modifica el entorno o las características del experimento.
________________________________________
20.3 Intervenciones permitidas
El usuario podrá modificar el ecosistema mediante herramientas de laboratorio.
Entre ellas:
Recursos
•	Agregar comida 
•	Eliminar comida 
•	Crear semillas 
•	Agregar agua 
•	Crear cadáveres 
•	Introducir nutrientes 
________________________________________
Clima
•	Cambiar temperatura 
•	Modificar humedad 
•	Provocar lluvia 
•	Provocar sequía 
•	Cambiar intensidad solar 
•	Acelerar estaciones 
________________________________________
Terreno
•	Colocar piedras 
•	Crear obstáculos 
•	Abrir túneles 
•	Cerrar túneles 
•	Crear lagos 
•	Modificar relieve 
________________________________________
Especies
•	Introducir nuevas colonias 
•	Introducir nuevos depredadores 
•	Eliminar especies 
•	Cambiar densidad poblacional 
•	Crear individuos especiales 
________________________________________
Tiempo
•	Pausar simulación 
•	Avanzar rápidamente 
•	Retroceder a un punto guardado 
•	Ejecutar miles de ticks por segundo 
•	Ejecutar experimentos acelerados 
________________________________________
20.4 Modificación de individuos
Además de alterar el entorno, el usuario podrá intervenir sobre individuos específicos.
Estas modificaciones representan experimentos biológicos.
Nunca órdenes directas.
Entre los parámetros modificables podrán existir:
•	Vida máxima 
•	Energía 
•	Hambre 
•	Sed 
•	Edad 
•	Velocidad 
•	Fuerza 
•	Capacidad de carga 
•	Percepción 
•	Memoria 
•	Curiosidad 
•	Agresividad 
•	Aprendizaje 
•	Metabolismo 
•	Resistencia 
•	Fertilidad 
•	Esperanza de vida 
Cada atributo deberá tener límites naturales configurables.
El modo Sandbox permitirá sobrepasar dichos límites para realizar experimentos extremos.
________________________________________
20.5 Individualidad
Ninguna criatura nace idéntica a otra.
Toda entidad posee una combinación única de características.
Aunque dos individuos pertenezcan a la misma especie, existirán pequeñas diferencias naturales en sus atributos.
Estas diferencias representan la variabilidad biológica del ecosistema.
La diversidad es un requisito del motor de simulación.
________________________________________
20.6 Genes
Los atributos permanentes de una criatura conforman su información genética.
Los genes podrán influir en:
•	velocidad 
•	fuerza 
•	metabolismo 
•	memoria 
•	percepción 
•	agresividad 
•	curiosidad 
•	aprendizaje 
•	resistencia 
•	esperanza de vida 
•	fertilidad 
Los descendientes heredarán parcialmente dichos genes mediante reglas de reproducción definidas por el motor.
________________________________________
20.7 Experimentos
El simulador deberá permitir responder preguntas como:
•	¿Qué ocurre si una colonia dispone de comida ilimitada? 
•	¿Qué sucede si desaparecen todas las arañas? 
•	¿Qué ocurre si aumenta permanentemente la humedad? 
•	¿Qué sucede si las plantas producen el doble de semillas? 
•	¿Qué ocurre si una reina posee una esperanza de vida mucho mayor? 
•	¿Cómo cambia el ecosistema si una colonia desarrolla mayor capacidad de aprendizaje? 
•	¿Qué sucede cuando dos especies con ventajas distintas compiten durante años? 
El simulador no debe contener respuestas programadas.
Las respuestas deberán emerger naturalmente de las reglas del ecosistema.
________________________________________
20.8 Modo Natural
En este modo todas las modificaciones deberán respetar límites biológicos.
No existirán criaturas imposibles.
El objetivo consiste en estudiar ecosistemas plausibles.
________________________________________
20.9 Modo Sandbox
El usuario podrá eliminar restricciones naturales.
Este modo existe exclusivamente para experimentar.
Permitirá modificar libremente cualquier parámetro del ecosistema.
Su propósito no es mantener el realismo, sino explorar comportamientos inesperados.
________________________________________
20.10 Filosofía del laboratorio
El simulador debe sentirse más cercano a un laboratorio científico que a un videojuego tradicional.
El usuario formula hipótesis.
El ecosistema responde.
El descubrimiento surge de la observación y no de objetivos predefinidos.
La satisfacción del proyecto proviene de comprender cómo reglas simples generan comportamientos complejos.

________________________________________
Cierre de la World Bible v0.1
Esta World Bible no cierra el diseño del proyecto. Establece su columna vertebral conceptual.
La idea central queda definida:
Un ecosistema vivo no se construye programando historias, sino diseñando relaciones.
El usuario no controla criaturas; modifica condiciones.
Las criaturas no tienen conocimiento perfecto; perciben localmente.
La colonia no piensa como un individuo; parece pensar porque sus miembros interactúan.
La energía fluye, la materia se transforma, la información viaja por medios concretos y toda consecuencia debe tener causa.
El primer hormiguero no será el producto final. Será el laboratorio donde nacerá el motor.
