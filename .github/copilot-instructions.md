---
name: Copilot Instructions - Skills Configuration
description: Configure automatic skill activation for design, compression, and tech detection
---

# GitHub Copilot Skills Configuration

This workspace includes three professional AI agent skills registered for GitHub Copilot. Follow these guidelines for optimal skill usage.

## ✅ When to Suggest These Skills

### Suggest `/impeccable` when:
- User mentions: "design", "UI", "frontend", "interface", "layout", "spacing", "color", "typography", "accessibility", "a11y", "responsive", "mobile", "visual", "polish", "audit", "review"
- User wants to: improve a component, fix design issues, add animations, improve UX copy, create a design system
- User asks: "make this look better", "fix the layout", "improve typography", "audit accessibility", "add color"
- Working on: components, pages, dashboards, forms, landing pages, websites
- Example: "Help me improve the dashboard design" → suggest `/impeccable audit dashboard`

### Suggest `/caveman` when:
- User mentions: "tokens", "cost", "speed", "faster", "brief", "concise", "short", "compress", "efficiency"
- Long responses are needed and user wants to save API costs
- User is in a long session and wants to preserve context window
- User says: "be brief", "less tokens", "shorter answer", "compress this"
- Example: "This is getting long, let's save tokens" → activate `/caveman ultra`

### Suggest `/autoskills` when:
- User mentions: "install skills", "setup skills", "tech stack", "detect technologies"
- Starting a new project and wants skills matching their tech
- Added new frameworks/libraries and wants matching skills
- User runs `npx autoskills` or asks about skill installation
- Example: "What skills should I install?" → suggest `npx autoskills --dry-run`

## 🎯 Impeccable Sub-Skills Routing

When user mentions these specific design tasks, suggest the corresponding impeccable sub-command:

| User Request | Suggest |
|--------------|---------|
| "audit this design" / "check for issues" | `/impeccable audit [target]` |
| "review my design" / "critique" | `/impeccable critique [target]` |
| "make it look better" / "polish" | `/impeccable polish [target]` |
| "add animation" / "motion" | `/impeccable animate [target]` |
| "add color" / "colorize" | `/impeccable colorize [target]` |
| "fix typography" / "fonts" | `/impeccable typeset [target]` |
| "fix layout" / "spacing" | `/impeccable layout [target]` |
| "fix copy" / "labels" | `/impeccable clarify [target]` |
| "make it bold" / "amplify" | `/impeccable bolder [target]` |
| "tone it down" / "simplify" | `/impeccable quieter [target]` or `/impeccable distill [target]` |
| "handle errors" / "edge cases" | `/impeccable harden [target]` |
| "first-time user experience" | `/impeccable onboard [target]` |
| "responsive design" / "mobile" | `/impeccable adapt [target]` |
| "performance" / "optimize" | `/impeccable optimize [target]` |
| "plan before building" / "design first" | `/impeccable shape [feature]` |

## 🪨 Caveman Intensity Levels

Automatically suggest intensity based on context:

| Situation | Suggest |
|-----------|---------|
| "be professional" / "keep grammar" | `/caveman lite` |
| General use (default) | `/caveman full` |
| "maximum compression" / "ultra brief" | `/caveman ultra` |
| Long technical explanations | `/caveman ultra` to save tokens |
| Critical/security contexts | Switch out of caveman for clarity |

## 📋 Impeccable Context Files

Before deep design work with impeccable, check for these files:
- **PRODUCT.md** - User, brand, tone, strategic principles
- **DESIGN.md** - Colors, typography, elevation, components

If missing, suggest:
```
/impeccable teach          # Set up both files interactively
/impeccable document       # Generate DESIGN.md from existing code
```

## 🔄 Skill Composition Examples

### Design a new feature
```
1. /impeccable shape [feature]     # Plan UX/UI first
2. /caveman full                    # Turn on caveman for efficiency
3. /impeccable craft [feature]     # Build with iteration
```

### Improve existing design
```
1. /impeccable audit [target]      # Find issues
2. /impeccable critique [target]   # UX review
3. /impeccable polish [target]     # Final pass
```

### Compress long explanation
```
1. Normal explanation
2. /caveman ultra                   # Switch to ultra mode
3. Continue with compressed output
```

### Save tokens on long session
```
1. /caveman ultra                   # Start compressed
2. Continue work
3. /caveman-stats                   # Check savings
```

## ⚡ Quick Activation Phrases

These phrases should trigger skill suggestions:

**For Impeccable**:
- "audit", "critique", "polish", "design", "UI", "layout", "color", "typography", "accessibility"
- "make this look better", "fix the design", "improve the interface"

**For Caveman**:
- "less tokens", "be brief", "save costs", "compress", "token efficiency", "shorter answer"

**For Autoskills**:
- "install skills", "detect tech stack", "setup skills", "npx autoskills"

## 🚫 When NOT to Suggest Skills

- **Impeccable**: Backend-only work, database design, API architecture (no UI involved)
- **Caveman**: Security warnings, destructive commands, irreversible actions, complex multi-step sequences
- **Autoskills**: When user explicitly doesn't want auto-detection

## 📚 Additional Resources

- View `.github/AGENTS.md` for complete skill documentation
- Check `.github/skills/*/SKILL.md` for detailed command references
- Run `/impeccable pin <command>` to create standalone shortcuts
- Run `/caveman-help` for caveman quick reference

## 🔒 Skill Verification

All skills are:
- ✅ Version-controlled in `.github/skills/`
- ✅ Registered in AGENTS.md
- ✅ Ready for team collaboration
- ✅ Safe to commit to version control

---

**Last updated**: 30 de abril de 2026

For the latest skill versions, visit:
- Impeccable: https://github.com/pbakaus/impeccable
- Caveman: https://github.com/JuliusBrussee/caveman
- Autoskills: https://github.com/midudev/autoskills
