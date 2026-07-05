# GRAMMALGICO — Sitio de Autor

Página web minimalista y de alto rendimiento para Grammálgico, escritor y poeta.

---

## Archivos

| Archivo | Líneas | Propósito |
|---|---|---|
| `index.html` | 174 | Estructura semántica del sitio |
| `styles.css` | 973 | Estilos responsive-first |
| `main.js` | 212 | Interacciones y animaciones |

## Secciones del HTML

1. **Navbar** — Barra fija con logo, enlaces y menú hamburger para móvil
2. **Hero** (`#inicio`) — Portada con título, subtítulo y CTA
3. **Libros** (`#libros`) — Libro destacado con portada, descripción y enlaces
4. **Sobre Mí** (`#sobre-mi`) — Biografía con dropcap y grid de texto
5. **Contactar** (`#contactar`) — Formulario con validación inline y EmailJS

## Optimizaciones de velocidad

- Google Fonts con `preconnect` para reducir latencia
- `<script defer>` — JS no bloquea el parseo del HTML
- `loading="lazy"` en imágenes
- Sin etiquetas ocultas en el DOM
- Meta tags Open Graph y Twitter Cards

## CSS — Mobile-first

| Breakpoint | Ajustes |
|---|---|
| 1024px | Hero compacto, layout en columna |
| 768px | Menú hamburger, hero reducido |
| 480px | Padding mínimo, tipografía pequeña |

Técnicas: `body::before` para fondo animado, CSS custom properties, backdrop-filter, transiciones suaves.

## JavaScript

| Función | Descripción |
|---|---|
| `prepareStagger()` | Asigna `--i` a cada `.fade-in-stagger` para animación escalonada |
| `isElementInViewport()` | Detecta si un elemento está visible en el viewport |
| `revealElements()` | Agrega `.revealed` a elementos visibles |
| `resetSectionAnimations()` | Reinicia animaciones al navegar entre secciones |
| `updateOverlay()` | Calcula opacidad de navbar según scroll |
| Menú móvil | Creado dinámicamente con toggle de clases |
| Formulario | Validación inline + envío vía EmailJS |

## EmailJS

- SDK cargado desde CDN
- `emailjs.init('6lbairgGzunhw-8n-')`
- Envío con `emailjs.send('service_rc0jrwh', 'template_hltrdtf', data)`
- Template variables: `from_name`, `from_email`, `message`
