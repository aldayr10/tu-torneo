# Tu Torneo - Product Definition

## Product Overview

**Tu Torneo** es una plataforma de gestión de torneos deportivos diseñada para equipos, ligas y organizadores.

### Propósito Principal
Centralizar la administración de torneos, equipos, jugadores y partidos en una interfaz intuitiva y profesional.

### Usuarios Primarios
1. **Organizadores de Torneos** - Crean y gestionan torneos
2. **Capitanes de Equipos** - Administran sus equipos y jugadores
3. **Jugadores** - Participan, ven estadísticas, aceptan invitaciones
4. **Árbitros/Admin** - Registran resultados y moderan

### Funcionalidades Clave
- Crear y gestionar torneos
- Registrar equipos y jugadores
- Gestionar equipos (roster, requests)
- Ver y participar en partidos (games)
- Sistema de notificaciones
- Perfil de usuario
- Autenticación y recuperación de contraseña

## Brand Definition

### Brand Voice
- **Profesional pero Accesible** - No corporativo, pero serio
- **Deportivo y Energético** - Refleja dinamismo de los deportes
- **Claro y Directo** - Usuarios quieren información rápida

### Brand Values
- **Confiabilidad** - Los datos del torneo están seguros
- **Inclusividad** - Cualquiera puede usar la plataforma
- **Eficiencia** - Reduce fricción en organización de eventos

## Visual Identity

### Color Philosophy
- **Azul**: Profesionalismo, confianza (color primario)
- **Verde**: Éxito, confirmación, positivity
- **Púrpura**: Dinamismo y energía (acentos especiales)
- **Dorado**: Premium (torneos destacados)

### Design Register
**Product UI** (aplicación de gestión) - Design sirve el producto, no es el producto en sí.

Implicaciones:
- Jerarquía clara de información
- Acciones prominentes pero no invasivas
- Consistencia visual para reducir fricción
- Accesibilidad es requisito, no bonus

### Aesthetic
- Moderno pero no trendy
- Limpio sin ser minimalista vacío
- Cards como contenedores de información (no anidadas)
- Espaciado generoso para respiración visual

## Design System Status

### Current State
- ✅ Paleta de colores consistente
- ✅ Tipografía establecida (Arial + Roboto Material)
- ✅ Componentes base (cards, buttons, inputs)
- ✅ Patrones de layout (flexbox utilities)
- ❌ **FALTA**: Responsive design
- ❌ **FALTA**: Mobile-first approach
- ❌ **FALTA**: Touch-friendly targets
- ❌ **FALTA**: Accessibility standards (WCAG)

### Priority Fixes
1. **Responsive Grid** - Dashboard debe adaptar a tablets/mobile
2. **Mobile Navigation** - Navbar debe colapsarse
3. **Flexible Widths** - Eliminar px fijos, usar max-width
4. **Touch Targets** - Botones ≥ 44x44px en mobile
5. **Semantic HTML** - Mejorar a11y

## User Journeys

### Journey 1: Organizar un Torneo
1. Login (register.css)
2. Dashboard (dashboard.css - grid 3 cols)
3. Crear Torneo
4. Agregar equipos
5. Administrar partidos

**Devices**: Desktop (90%), Tablet (8%), Mobile (2%)
**Pain Points**: Grid de 3 cols no cabe en tablet

### Journey 2: Administrar Equipo
1. Login
2. Dashboard → Mi Equipo
3. Ver roster
4. Invitar jugadores
5. Aceptar requests

**Devices**: Desktop (70%), Mobile (30%)
**Pain Points**: Formularios muy anchos, no responsivos

### Journey 3: Participar en Torneo (Mobile-Heavy)
1. Login (Mobile)
2. Dashboard
3. Ver torneo
4. Registrar equipo
5. Ver partidos
6. Notificaciones

**Devices**: Mobile (60%), Desktop (40%)
**Pain Points**: Navbar ocupa mucho, cards no se adaptan

## Information Architecture

```
Tu Torneo/
├── Login / Register
├── Dashboard
│   ├── Tournaments
│   │   ├── All Tournaments
│   │   ├── Create
│   │   ├── Description
│   │   └── Info
│   ├── Teams
│   │   ├── My Teams
│   │   ├── Create
│   │   ├── View
│   │   ├── Manage
│   │   └── Requests
│   ├── Games
│   │   └── View Games
│   ├── News (Notifications)
│   └── Profile
│       └── Update Profile
└── Auth
    └── Recover Password
```

## Constraints & Requirements

### Technical
- Angular standalone components
- Angular Material for theming
- Must work on iOS Safari, Chrome Android
- Must support users with slow connections

### Design
- No nested cards (absolute ban per design system)
- Maintain color contrast (WCAG AA minimum)
- Touch targets ≥ 44px on mobile
- Loading states for async operations
- Error messages must be clear and actionable

### Business
- Desktop-first historically, but growing mobile user base
- Need to support organizers (desktop focus) AND players (mobile focus)
- No breaking changes to existing functionality

## Accessibility (A11y) Baseline

### Required (WCAG AA)
- ✅ Color contrast 4.5:1 for text
- ❌ Semantic HTML (needs audit)
- ❌ ARIA labels (needs implementation)
- ❌ Keyboard navigation (needs testing)
- ❌ Focus indicators (needs styling)

### Should Haves
- ❌ Reduced motion respects `prefers-reduced-motion`
- ❌ Form labels properly associated
- ❌ Icons have alt text / ARIA labels
- ❌ Focus visible on interactive elements

## Next Design Phases

### Phase 1: Responsive Foundation (URGENT)
- [ ] Mobile-first media queries
- [ ] Hamburger menu for navbar
- [ ] Responsive grid (3 → 2 → 1 columns)
- [ ] Flexible form widths
- [ ] Mobile-friendly spacing

### Phase 2: A11y & UX Polish
- [ ] WCAG audit and fixes
- [ ] Keyboard navigation test
- [ ] Focus indicators
- [ ] Form validation improvements
- [ ] Loading states

### Phase 3: Performance & Delight
- [ ] Image optimization
- [ ] Animation performance review
- [ ] Micro-interactions
- [ ] Dark mode (if requested)

---

**Created**: 30 de abril de 2026
**Status**: Active Development
