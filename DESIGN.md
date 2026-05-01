# Tu Torneo - Design System

Documentación del sistema de diseño actual y guía para responsive design.

## 🎨 Paleta de Colores

### Primarios
- **Azul Principal**: `#1976d2` - Links, acciones primarias
- **Azul Gradiente Claro**: `#2d7dff` - Botones, acciones destacadas
- **Azul Oscuro**: `#10234f` - Headings, textos principales
- **Azul Cálido**: `#2e8dff` - Fondos de gradiente

### Secundarios
- **Verde Éxito**: `#10b981` - Iconos positivos, badges
- **Verde Oscuro**: `#16a34a` - Variante más fuerte
- **Púrpura**: `#9333ea` - Acentos, botones de perfil
- **Púrpura Claro**: `#8a33ff` - Gradientes
- **Dorado**: `rgba(224, 175, 14, 0.71)` - Tournaments especiales

### Neutros
- **Blanco**: `#ffffff` - Fondos de cards, formularios
- **Gris Claro**: `#f3f4f6` - Fondo de página, botones hover
- **Gris Medio**: `#e5e7eb` - Bordes sutiles
- **Gris Oscuro**: `#1f2937` - Textos, logos
- **Gris Texto**: `#374151` - Textos secundarios
- **Gris Borde**: `#ccc`, `#ddd` - Bordes de inputs

### Colores Semánticos
- **Error**: `#d93025` - Mensajes de error
- **Éxito**: `#10b981` - Confirmaciones

## 📐 Tipografía

### Fuentes
- **Primaria**: `Arial, Helvetica, sans-serif` (Navbar, general)
- **Material**: `Roboto` (via Angular Material, body)

### Tamaños
- **Heading 1 (Logo)**: `24px`, weight `600` - Logos y títulos principales
- **Heading 2 (Formularios)**: `22px` - Titles de cards
- **Heading 3 (Cards)**: `18px` - Subtítulos
- **Body**: `14px` - Textos generales, links
- **Small**: `12px` - Textos secundarios, errores
- **Tiny**: `10px` - Badges

### Pesos
- **Regular**: Normal
- **Semibold**: `600` - Logos, headings
- **Bold**: `bold` - Botones

## 🎯 Espaciado

### Padding
- **XL**: `40px` - Contenedores principales (dashboard)
- **L**: `30px` - Cards, forms
- **M**: `15px` - Navbar, gaps
- **S**: `12px` - Botones
- **XS**: `8px` - Inputs, links interiores

### Margin
- **XL**: `30px` - Espacios entre secciones
- **L**: `20px` - Espacios internos
- **M**: `15px` - Gaps generales
- **S**: `10px` - Espacios pequeños

### Gaps (Flex)
- **XL**: `30px` - Dashboard, secciones principales
- **L**: `15px` - Navbar items
- **M**: `12px` - Nav left/right
- **S**: `8px` - Items compactos

## 🎴 Componentes Clave

### Cards
```css
background: white
border-radius: 20px
padding: 30px
box-shadow: 0px 0px 16px 3px rgba(2, 0, 0, 0.71)
transition: 0.2s
```

**Variantes**:
- **.card**: Base blanca con hover (translateY -5px)
- **.card-tournament**: Dorado semi-transparente
- **.card-all-tournament**: Dorado oscuro con hover dramatizado

### Botones
```css
padding: 12px 15px
border-radius: 10px
background: linear-gradient(90deg, #2d7dff, #8a33ff)
color: white
font-weight: bold
cursor: pointer
box-shadow: 0 8px 18px rgba(64, 85, 255, 0.35)
border: none
```

**Estados**:
- **Default**: Gradiente azul-púrpura
- **Hover**: Gradiente más oscuro `linear-gradient(90deg, #2567e8, #7a21e3)`

### Inputs
```css
padding: 8px 8px 8px 35px (con icono)
border-radius: 6px
border: 1px solid #ccc
font-size: 14px
```

### Navbar
- **Height Implicit**: ~70px (15px padding top/bottom + 40px icon height)
- **Padding**: `15px 30px`
- **Flex Layout**: `justify-content: space-between`
- **Border Bottom**: `1px solid #ddd`

### Icons (Material Symbols Outlined)
- **Navbar**: `20px`
- **Logo**: `35px`
- **Badge**: `18px`
- **Circle Icon**: `26px`
- **Register**: `80px`

### Dropdowns
- **Width**: `380px` (notifications), `150px` (user menu)
- **Max Height**: `500px` (notifications)
- **Border Radius**: `10px` - `15px`
- **Shadow**: `0 6px 15px rgba(0, 0, 0, 0.15)` - `0 10px 30px rgba(0,0,0,0.2)`

## 🏗️ Layout Patterns

### Flexbox Utilities (en styles.css)
- `.responsive-container*` - 16 variaciones
  - Direction: column, row, column-reverse, row-reverse
  - Align: center, stretch, flex-start
  - Justify: center (fijo)

### Grid
- **Dashboard**: `grid-template-columns: repeat(3, 1fr)` con `gap: 30px`

### Icons Circle
```css
width: 60px
height: 60px
border-radius: 50%
display: flex
align-items: center
justify-content: center
font-size: 26px
margin-bottom: 20px
```

## 🎬 Transiciones

- **Cards**: `transition: 0.2s` (hover effects)
- **Navbar Buttons**: `transition: 0.2s` (background)
- **Go Dashboard**: `transition: 1s` (hover translateX)
- **Card Tournament**: `transition: 2s` (dramatic transform)

## 📱 Breakpoints Necesarios (Por Definir)

El proyecto **NO tiene breakpoints responsivos aún**. Necesita:
- **Desktop**: `1200px+` (3 columnas)
- **Tablet**: `768px - 1199px` (2 columnas)
- **Mobile**: `< 768px` (1 columna)
- **Small Mobile**: `< 480px` (ajustes especiales)

## ⚠️ Problemas Actuales (No Responsive)

### Dashboard Container
```css
grid-template-columns: repeat(3, 1fr);  /* ❌ FIJO, no adapta */
```

### Register Form
```css
width: 320px;  /* ❌ FIJO, puede ser > que viewport mobile */
```

### Navbar
```css
padding: 15px 30px;  /* ❌ Fijo, desperdicia espacio en mobile */
justify-content: space-between;  /* ❌ No wraps */
```

### Cards
```css
padding: 30px;  /* ❌ Fijo, muy grande en mobile */
```

### Navigation Elements
- No hay menu hamburguesa
- Dropdown width de 380px no cabe en mobile
- Icons no se escalan

## 🎯 Estrategia de Color

**Estrategia**: Committed (colores saturados llevan 30-60% de la superficie)
- Azul gradiente es protagonista (botones, links, backgrounds)
- Verde es acento positivo (~10%)
- Púrpura es acento especial (perfil)
- Dorado es especial (tournaments)
- Blancos/grises son contenedores y descanso

## 📝 Convenciones

- **Bordes**: `border-radius` de `6px` (inputs), `10px` (botones), `15px` (dropdowns), `20px` (cards)
- **Sombras**: `box-shadow` con rgba(0,0,0, 0.08 a 0.71) para profundidad
- **Gradientes**: Siempre 90deg (vertical direction)
- **Cursores**: `cursor: pointer` en interactivos
- **Transiciones**: Suave (0.2s - 2s)

---

## ✅ Próximos Pasos

1. **Agregar Media Queries**: Adaptar grids, padding, font-sizes
2. **Mobile Menu**: Hamburguesa para navbar
3. **Flexible Widths**: Cambiar fixed widths por max-widths y percentages
4. **Touch Targets**: Aumentar tamaño de botones en mobile (min 44px)
5. **Escalar Espacios**: Reducir padding/margin en pantallas pequeñas
