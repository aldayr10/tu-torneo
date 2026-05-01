---
name: impeccable
description: "Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, live browser iteration on UI elements, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks."
argument-hint: "[command] [target]"
user-invocable: true
allowed-tools:
  - bash
license: Apache 2.0
---

# Impeccable Design Skill

Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

## Available Commands

All commands are accessed through `/impeccable` or use `/impeccable <command> <target>`:

### Build
- **craft [feature]** - Full shape-then-build flow with visual iteration
- **teach** - One-time setup: gather design context, write PRODUCT.md and DESIGN.md
- **document** - Generate DESIGN.md from existing project code
- **extract [target]** - Pull reusable components and tokens into the design system
- **shape [feature]** - Plan UX/UI before writing code

### Evaluate
- **critique [target]** - UX design review with heuristic scoring
- **audit [target]** - Run technical quality checks (a11y, perf, responsive)
- **polish [target]** - Final quality pass before shipping

### Refine
- **bolder [target]** - Amplify safe or bland designs
- **quieter [target]** - Tone down aggressive or overstimulating designs
- **distill [target]** - Strip to essence, remove complexity
- **harden [target]** - Production-ready: errors, i18n, edge cases
- **onboard [target]** - Design first-run flows, empty states, activation

### Enhance
- **animate [target]** - Add purposeful animations and motion
- **colorize [target]** - Add strategic color to monochromatic UIs
- **typeset [target]** - Improve typography hierarchy and fonts
- **layout [target]** - Fix spacing, rhythm, and visual hierarchy
- **delight [target]** - Add personality and memorable touches
- **overdrive [target]** - Push past conventional limits

### Fix
- **clarify [target]** - Improve UX copy, labels, and error messages
- **adapt [target]** - Adapt for different devices and screen sizes
- **optimize [target]** - Diagnose and fix UI performance

### Iterate
- **live** - Visual variant mode: pick elements in the browser, generate alternatives

## Usage Examples

```
/impeccable audit blog           # Audit blog hub + post pages
/impeccable critique landing     # UX design review
/impeccable polish settings      # Final pass before shipping
/impeccable harden checkout      # Add error handling + edge cases
/impeccable colorize dashboard   # Add color to monochrome UI
/impeccable layout forms         # Fix spacing and visual rhythm
```

## Pin Shortcuts

Use `/impeccable pin <command>` to create standalone shortcuts:
- `/impeccable pin audit` creates `/audit`
- `/impeccable pin colorize` creates `/colorize`
- `/impeccable pin layout` creates `/layout`
- `/impeccable pin polish` creates `/polish`

## Design Laws

### Color
- Use OKLCH. Reduce chroma as lightness approaches 0 or 100
- Never use pure black (#000) or pure white (#fff). Tint every neutral
- Pick a color strategy: Restrained, Committed, Full palette, or Drenched

### Typography
- Cap body line length at 65–75 characters
- Hierarchy through scale + weight contrast (≥1.25 ratio between steps)

### Layout
- Vary spacing for rhythm. Same padding everywhere = monotony
- Cards are lazy. Use only when truly the best affordance
- Don't nest cards inside cards
- Don't wrap everything in a container

### Motion
- Don't animate CSS layout properties
- Ease out with exponential curves (ease-out-quart/quint/expo)
- No bounce, no elastic

### Absolute Bans
- **Side-stripe borders** - Never intentional
- **Gradient text** - Use single solid color instead
- **Glassmorphism as default** - Rare and purposeful only
- **Hero-metric template** - SaaS cliché
- **Identical card grids** - Vary card sizes and content
- **Modal as first thought** - Exhaust inline alternatives first

### Copy
- Every word earns its place
- No restated headings
- No em dashes (use commas, colons, semicolons, periods, parentheses)

## The AI Slop Test

If someone could look at this interface and say "AI made that" without doubt, it failed. Avoid:
- Training-data reflex aesthetics
- Generic templates and color schemes
- Predictable mistakes (Inter font, purple gradients, nested cards, gray on color)
