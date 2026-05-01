# 📋 Quick Reference - Responsive Changes

Usa este archivo como referencia rápida mientras implementas. Tiene TODO el código que necesitas.

---

## 📐 BREAKPOINTS

```css
/* Mobile First: Estilos por defecto */
/* 0 - 479px: Extra Small Phones */
/* 480 - 767px: Small Phones */

/* Tablet: 768px y arriba */
@media (min-width: 768px) { }

/* Desktop Pequeño: 1024px y arriba */
@media (min-width: 1024px) { }

/* Desktop Grande: 1200px y arriba */
@media (min-width: 1200px) { }

/* Optional: Extra Small (add if needed) */
@media (max-width: 479px) { }
```

---

## 🎯 CAMBIOS POR ARCHIVO

### 1. dashboard.css

```css
/* ORIGINAL → CAMBIO */

/* Dashboard Container */
.dashboard-container {
  display: grid;
  grid-template-columns: 1fr;           /* 1 col mobile */
  gap: 16px;
  padding: 16px;
}

@media (min-width: 768px) {
  .dashboard-container {
    grid-template-columns: repeat(2, 1fr); /* 2 cols tablet */
    gap: 24px;
    padding: 24px;
  }
}

@media (min-width: 1200px) {
  .dashboard-container {
    grid-template-columns: repeat(3, 1fr); /* 3 cols desktop */
    gap: 30px;
    padding: 40px;
  }
}

/* Cards */
.card, .card-tournamens, .card-all-tournament {
  padding: 16px;          /* mobile */
  margin: 12px 0;
}

@media (min-width: 768px) {
  .card, .card-tournamens, .card-all-tournament {
    padding: 24px;        /* tablet */
    margin: 20px 0;
  }
}

@media (min-width: 1200px) {
  .card, .card-tournamens, .card-all-tournament {
    padding: 30px;        /* desktop */
    margin: 30px;
  }
}
```

---

### 2. nav-bar.css

```css
/* Navbar */
.navbar {
  padding: 12px 16px;    /* mobile */
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .navbar {
    padding: 15px 24px;  /* tablet */
    flex-wrap: nowrap;
  }
}

@media (min-width: 1200px) {
  .navbar {
    padding: 15px 30px;  /* desktop */
  }
}

/* Navbar Right */
.nav-right {
  gap: 8px;              /* mobile */
}

@media (min-width: 768px) {
  .nav-right {
    gap: 12px;           /* tablet */
  }
}

@media (min-width: 1200px) {
  .nav-right {
    gap: 15px;           /* desktop */
  }
}

/* Notification Dropdown */
.dropdownnoti {
  width: 90vw;
  max-width: 380px;
  right: 50%;
  transform: translateX(50%);  /* centered mobile */
  max-height: 500px;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .dropdownnoti {
    width: 320px;
    right: 0;
    transform: none;     /* not centered tablet+ */
  }
}

/* Touch Targets */
.icon-btn, .notification {
  width: 44px;           /* mobile: WCAG */
  height: 44px;
  min-width: 44px;
  min-height: 44px;
}

@media (min-width: 1200px) {
  .icon-btn, .notification {
    width: 40px;         /* desktop: optional reduce */
    height: 40px;
  }
}

/* User Dropdown */
.dropdown {
  min-width: 140px;
  max-width: 90vw;
}

@media (min-width: 768px) {
  .dropdown {
    min-width: 150px;
    max-width: none;
  }
}

/* Logo Icon */
.icon-green .material-symbols-outlined {
  font-size: 24px;       /* mobile */
}

@media (min-width: 768px) {
  .icon-green .material-symbols-outlined {
    font-size: 28px;     /* tablet */
  }
}

@media (min-width: 1200px) {
  .icon-green .material-symbols-outlined {
    font-size: 35px;     /* desktop original */
  }
}
```

---

### 3. register.css

```css
/* Form Container */
form {
  width: 100%;
  max-width: 380px;
  padding: 20px;         /* mobile */
  margin: 0 auto;
  box-sizing: border-box;
}

@media (min-width: 480px) {
  form {
    padding: 24px;       /* small phone landscape */
  }
}

@media (min-width: 768px) {
  form {
    width: 320px;
    max-width: none;
    padding: 30px;       /* tablet+ original */
  }
}

/* Overlay padding */
.overlay {
  padding: 16px;         /* mobile */
  box-sizing: border-box;
}

@media (min-width: 480px) {
  .overlay {
    padding: 24px;
  }
}

/* Heading */
h2 {
  font-size: 18px;       /* mobile */
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  h2 {
    font-size: 22px;     /* tablet+ */
    margin-bottom: 20px;
  }
}

/* Labels */
label {
  font-size: 13px;       /* mobile */
}

@media (min-width: 768px) {
  label {
    font-size: 14px;     /* desktop */
  }
}

/* Buttons */
button {
  padding: 12px;
  min-height: 44px;
  font-size: 14px;
}
```

---

### 4. styles.css (Agregar nuevo)

```css
/* ===== RESPONSIVE UTILITIES ===== */

/* Inputs */
.input-icon input {
  width: 100%;
  max-width: none;
  font-size: 16px;       /* iOS no zoom */
  padding: 12px 12px 12px 40px;
}

@media (min-width: 768px) {
  .input-icon input {
    font-size: 14px;
    padding: 8px 8px 8px 35px;
  }
}

/* Links */
.go-dashboad {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;    /* mobile */
  font-size: 14px;
  margin: 16px 16px 0;
}

@media (min-width: 768px) {
  .go-dashboad {
    padding: 8px 8px 8px 35px;
    margin: 30px 30px 0;
  }
}

/* Buttons */
button {
  min-height: 44px;
  min-width: 100px;
}

@media (min-width: 768px) {
  button {
    min-height: auto;
  }
}

/* Containers */
.responsive-container,
.responsive-container-row,
.responsive-container-column {
  width: 100%;
  min-height: 100%;      /* mobile */
  gap: 12px;
}

@media (min-width: 768px) {
  .responsive-container,
  .responsive-container-row,
  .responsive-container-column {
    gap: 15px;
  }
}

@media (min-width: 1200px) {
  .responsive-container,
  .responsive-container-row,
  .responsive-container-column {
    height: 100%;
  }
}

/* Typography */
body {
  font-size: 14px;
  line-height: 1.5;
}

h3 {
  font-size: 16px;       /* mobile */
}

@media (min-width: 768px) {
  h3 {
    font-size: 18px;     /* tablet+ */
  }
}

@media (min-width: 1200px) {
  h3 {
    font-size: 22px;     /* desktop */
  }
}
```

---

### 5. index.html (VERIFICAR)

Busca en `<head>`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Si NO existe**, agrégala:
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- resto del head -->
</head>
```

---

### 6. material-theme.scss (Agregar)

```scss
body {
  color-scheme: light;
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);
  
  /* Nuevo: Responsive defaults */
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  height: 100%;
  
  /* Prevent iOS zoom on inputs */
  input,
  button,
  select {
    font-size: 16px;
  }
}

/* Inputs smaller on tablet+ */
@media (min-width: 768px) {
  input,
  button,
  select {
    font-size: 14px;
  }
}
```

---

## 🎯 SPACING REFERENCE

### Padding (card, form, sections)
- **Mobile**: 16px
- **Tablet**: 24px
- **Desktop**: 30px

### Margin (cards, sections)
- **Mobile**: 12px
- **Tablet**: 20px
- **Desktop**: 30px

### Gap (flexbox)
- **Mobile**: 8-12px
- **Tablet**: 12-15px
- **Desktop**: 15-30px

---

## 📏 FONT SIZES

### Headings
- **h2**: 18px (mobile) → 22px (tablet) → 24px (desktop)
- **h3**: 16px (mobile) → 18px (tablet) → 22px (desktop)
- **h4**: 14px (all sizes)

### Body
- **Regular text**: 14px (all sizes)
- **Small text**: 12px (all sizes)
- **Tiny**: 10px (all sizes)

### Icons
- **Material Symbols**: 16px (mobile) → 20px (desktop)
- **Logo**: 24px (mobile) → 35px (desktop)
- **Touch circles**: 44px (all sizes)

---

## 🧪 TESTING CHECKLIST

### Mobile (375px)
```
□ Dashboard: 1 columna
□ Form: width 100%, no scroll horizontal
□ Navbar: padding 12px 16px
□ Buttons: height 44px
□ Gaps: 8-12px
□ Padding: 16px
```

### Tablet (768px)
```
□ Dashboard: 2 columnas
□ Form: centered, width auto
□ Navbar: padding 15px 24px
□ Buttons: height 44px (still WCAG)
□ Gaps: 12-15px
□ Padding: 24px
```

### Desktop (1200px)
```
□ Dashboard: 3 columnas
□ Form: width 320px
□ Navbar: padding 15px 30px
□ Buttons: height auto
□ Gaps: 15-30px
□ Padding: 30px
```

---

## ✅ IMPLEMENTACIÓN ORDER

1. **dashboard.css** (5 min)
2. **nav-bar.css** (10 min)
3. **register.css** (5 min)
4. **styles.css** (10 min)
5. **material-theme.scss** (2 min)
6. **index.html** verification (1 min)
7. **Testing** (15 min per breakpoint)

**Total**: ~2-3 horas

---

## 🚨 COMMON MISTAKES

❌ **NO HAGAS**:
- Mezclar mobile-first con `max-width` (usa solo `min-width`)
- `height: 100%` (causa overflow, usa `min-height`)
- Width fijo sin `max-width` (siempre `max-width` con `width: 100%`)
- Font < 14px (muy pequeño en mobile)
- Touch targets < 44px (imposible de tapear)
- Font < 16px en inputs (iOS hace zoom)

✅ **SÍ HACES**:
- Usa `min-width` media queries (mobile-first)
- `min-height` donde sea apropiado
- `width: 100%` + `max-width` combo
- Font ≥ 14px body, 16px inputs
- Touch targets ≥ 44x44px mobile
- Test en 3 breakpoints (not just DevTools)

---

## 💾 FILES TO CHANGE

1. `src/app/pages/dashboard/dashboard.css` ← Copiar PASO 1 + 2
2. `src/app/pages/dashboard/nav-bar/nav-bar.css` ← Copiar PASO 3
3. `src/app/pages/register/register.css` ← Copiar PASO 4
4. `src/styles.css` ← Copiar PASO 5 (append new section)
5. `src/material-theme.scss` ← Copiar PASO 6 (append to body)
6. `src/index.html` ← Verify meta viewport exists

---

## 🎓 DUDA? LEE ESTO

- **"¿Cuándo usar qué breakpoint?"**: Sigue los 10 pasos en RESPONSIVE_GUIDE.md
- **"¿Por qué 44px?"**: WCAG AA accesibility mínimo para touch
- **"¿Por qué 16px input?"**: iOS zoom prevention (< 16px = auto zoom)
- **"¿Mobile-first?"**: Sí, estilos default son mobile, luego override en media query
- **"¿Cómo testeo?"**: Chrome DevTools → Device Toolbar, o en devices reales

---

**Quick Copy**: Cada sección anterior es copy-paste ready.
**Full Details**: Lee `.github/RESPONSIVE_GUIDE.md`
**Need Help**: Usa `/impeccable adapt` en Copilot

¡Listo para implementar! 🚀
