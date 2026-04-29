**TERESA MAKEUP**  
Homepage · Booking System

| Cliente Teresa Guzmán · @teresamakeup Valencia, España | Elaborado por Maria · OmniLabs omnilabs.us |
| :---- | :---- |

| ENTREGABLE Homepage custom \+ sistema de reservas |  | PRIORIDAD Mobile-first · SEO local Valencia |
| :---- | :---- | :---- |

**1\. Identidad visual**

**1.1 Paleta de colores**

No usar colores de marca ajenos.

|   | \#5C4033 | Marrón oscuro principal | Nav, CTAs, headers, textos principales sobre fondo claro |
| :---- | :---- | :---- | :---- |
|   | \#8C7355 | **Marrón medio** | Acentos, iconos, bordes, etiquetas secundarias |
|   | \#EDE0D0 | **Beige claro** | Fondos secundarios, cards de servicios, tablas |
|   | \#FAF7F4 | **Crema base** | Color de fondo de página (body background) |
|   | \#F5EFE6 | **Blanco cálido** | Texto sobre fondos oscuros, nav links |
|   | \#3D2B1F | **Negro cálido** | Footer, párrafos de cuerpo, texto secundario |

**1.2 Tipografía**

| Headings / display | Serif italic elegante — Cormorant Garamond o Playfair Display. Replicar el estilo editorial del magazine de Teresa. |
| :---- | :---- |
| **Body / UI / forms** | Sans-serif limpia — Inter o DM Sans. Tamaños: 16px body, 14px labels, 12px captions. |
| **Logo** | Usar la marca gráfica TG existente tal cual. No recrear el logo ni modificar su tipografía. |
| **Estilo numérico** | Usar cifras OldStyle si el serif las incluye. Si no, cifras estandardas. Nunca simulación de letra en negrita para precios. |

**2\. Arquitectura de la página**

La homepage es una sola página con anclas internas (no multi-página). Las secciones deben fluir verticalmente en el siguiente orden obligatorio:

| \# | Sección | Copy / Contenido | Notas técnicas para Ogi |
| ----- | :---- | :---- | :---- |
| **1** | **NAV fija** | Logo TG | Servicios | Galería | Sobre mí | Contacto — botón CTA: ‘Reservar cita’ | Sticky en scroll. Botón CTA color sólido \#5C4033. Mobile: hamburger menu. |
| **2** | **HERO ★** | Título serif italic grande: ‘Tu belleza, en el día más importante de tu vida’. Subtexto de apoya. 2 CTAs: ‘Reservar prueba de novia’ (primario) y ‘Ver trabajos’ (secundario). | Foto real de novia de Teresa (magazine p.2). Layout 50/50: texto izq, foto der. En mobile: foto primero, texto abajo. |
| **3** | **SERVICIOS** | 3 cards: Maquillaje Novia | Maquillaje Social | Tratamientos. Cada card con breve descripción y botón ‘Reservar →’ que ancla al calendario. | Cards sobre fondo beige. Al hacer click en Reservar, el calendar se pre-selecciona con ese servicio. |
| **4** | **BOOKING ★** | Selección de servicio (radio buttons) \+ calendario mensual \+ franja horaria \+ formulario: nombre, teléfono, email, notas. Botón: ‘Confirmar reserva · WhatsApp’. | Ver sección 3 para lógica completa. Fondo oscuro \#5C4033 para destacar la sección. |
| **5** | **PRUEBA SOCIAL** | 2–4 reseñas reales de clientas reales (no imágenes Unsplash). Galería de 6 fotos del trabajo real de Teresa. | Fotos de las clientas: pedir a Teresa directamente. No usar stock photography. |
| **6** | **FOOTER** | Logo TG | Email clicable | Teléfono clicable | Instagram @teresamakeup | Copyright 2025 | Teléfono como href=tel: . Email como Instagram enlace directo. |

★ \= Secciones críticas de conversión. Priorizar en QA y pruebas de rendimiento.

**3\. Lógica del sistema de reservas**

El objetivo del booking es reducir la fricción al máximo. No hay pago online en fase 1\. Teresa confirma manualmente via WhatsApp.

**3.1 Flujo de usuario**

1. **Selección de servicio** — Radio buttons visibles: Prueba de novia / Maquillaje social / Limpieza facial / Maderoterapia / Dermapen / Drenaje linfático

2. **Selección de fecha** — Calendario mensual. Días disponibles en beige (\#EDE0D0), no disponibles en gris, seleccionado en marrón oscuro (\#5C4033).

3. **Selección de hora** — Franjas horarias disponibles para esa fecha (ej. 10:00 / 12:00 / 16:00 h).

4. **Datos de contacto** — Campos: nombre completo, teléfono, email, nota opcional (ej. fecha de boda, tipo de look deseado).

5. **Confirmación** — Botón ‘Confirmar reserva’ genera enlace wa.me pre-rellenado con los datos seleccionados. Teresa recibe por WhatsApp y confirma manualmente.

**3.2 Implementación técnica — Fase 1**

| Disponibilidad | Teresa actualiza un archivo JSON o Google Sheet con los días/horas disponibles. El calendario lee ese archivo y pinta los días en consecuencia. |
| :---- | :---- |
| **Envío** | wa.me link pre-rellenado con servicio, fecha, hora, nombre y nota. Se abre WhatsApp de Teresa directamente. Alternativa: Formspree o EmailJS como fallback. |
| **Botón sticky** | WhatsApp flotante en mobile (esquina inferior derecha) en todo momento. Texto: ‘Escríbeme ahora’. |
| **Sin pagos** | No hay pasarela de pago en fase 1\. Teresa gestiona pagos por transferencia o en persona. |

**3.3 Hoja de ruta — Fase 2 (futura)**

* Integración con Google Calendar API para sincronizar disponibilidad en tiempo real.

* Recordatorio automático por WhatsApp 24h antes de la cita.

* Posibilidad de añadir señal/pago online (Stripe o Bizum) para novias.

**4\. Copy de referencia — Hero section**

El siguiente copy es una propuesta inicial. Ogi puede ajustar el tono pero debe mantener la estructura: eyebrow \+ titular serif grande \+ subtexto \+ 2 CTAs.

| Eyebrow (pequeño) | Especialista en novias · Valencia |
| :---- | :---- |
| **Título principal** | Tu belleza, en el día más importante de tu vida |
| **Subtexto** | Maquillaje personalizado, piel blindada y técnicas inigualables — desde la prueba hasta el gran día. |
| **CTA primario** | → Reservar prueba de novia |
| **CTA secundario** | Ver trabajos |

**5\. Assets que Ogi necesita de Teresa**

Antes de empezar el diseño visual, recopilar estos activos. Sin ellos no se puede avanzar en la homepage real.

| Fotos hero | Foto de novia terminada — usar la del magazine página 2 (novia sonriendo con anillo). Alta resolución mínima 1500px de ancho. |
| :---- | :---- |
| **Galería trabajos** | 6–8 fotos seleccionadas por Teresa: novias, looks sociales, maquillaje fallera, FX. Formato JPG o PNG, sin filtros de Instagram. |
| **Reseñas reales** | Mínimo 2 reseñas reales con nombre real (no stock). Preferible captura de Google o Instagram DM con permiso de la clienta. |
| **Horario disponible** | Días de la semana que trabaja \+ franjas horarias disponibles para la fase 1 del calendario. |
| **Dominio activo** | Confirmar si el dominio final es teresamakeup.es o teresamakeup.com (aparecen ambos en sus materiales). |
| **Logo TG** | Archivo vectorial del logo TG en SVG o AI. Si solo existe en PNG, mínimo 500x500px sobre fondo transparente. |

**6\. SEO local — requisitos técnicos**

La ventaja competitiva de Teresa en búsqueda orgánica depende de estos elementos. Son obligatorios en el código, no opcionales.

* **\<title\>Maquilladora Profesional en Valencia · Especialista Novias — Teresa Guzmán Makeup\</title\>** Title tag:

* **Maquillaje de novia, social y efectos especiales en Valencia. Teresa Guzmán: piel blindada, servicio a domicilio y prueba personalizada. Reserva tu cita.** Meta description:

* **Debe contener ‘maquilladora Valencia’ o ‘maquillaje novias Valencia’ naturalmente.** H1 único:

* **LocalBusiness o BeautySalon con nombre, teléfono, ciudad, descripción y enlace a Instagram.** Schema.org:

* **Instalar GA4 antes del lanzamiento. Configurar evento de conversión en click del botón WhatsApp.** Google Analytics:

* **Todas las imágenes con texto alternativo descriptivo. Ej: ‘maquillaje de novia Valencia — Teresa Guzmán Makeup’.** Alt texts:

**7\. Checklist de entregables**

| ✓ | Entregable | Prioridad | Estado |
| ----- | :---- | ----- | :---- |
| □ | Diseño visual completo de la homepage (Figma o directo a código) | **Alta** | Pendiente |
| □ | Sección hero con foto real de novia y copy propuesto | **Alta** | Pendiente |
| □ | Sección de servicios (3 cards con CTA de reserva) | **Alta** | Pendiente |
| □ | Sistema de booking con calendario \+ radio buttons \+ formulario | **Alta** | Pendiente |
| □ | Integración wa.me pre-rellenado en botón de confirmación | **Alta** | Pendiente |
| □ | Botón WhatsApp sticky en mobile | **Alta** | Pendiente |
| □ | Sección de reseñas con datos reales de Teresa | Media | Pendiente |
| □ | Galería de 6–8 fotos del trabajo real | Media | Pendiente |
| □ | Footer con teléfono, email e Instagram clicables | Media | Pendiente |
| □ | SEO local: title tag, meta description, H1, schema.org | **Alta** | Pendiente |
| □ | Google Analytics GA4 instalado \+ evento conversión WhatsApp | Media | Pendiente |
| □ | Velocidad de carga \< 2s en mobile (PageSpeed \> 85\) | **Alta** | Pendiente |
| □ | Diseño responsive validado en iPhone SE, iPhone 14, Android | **Alta** | Pendiente |

OmniLabs · omnilabs.us   ·   Brief elaborado por Maria   ·   Para uso interno del equipo