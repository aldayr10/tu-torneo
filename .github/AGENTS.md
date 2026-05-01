---
name: Agents Configuration
version: 1.0
---

# Agent Skills Configuration

This workspace includes three powerful AI agent skills for GitHub Copilot:

## 🎨 Impeccable - Design Excellence

**Slash command**: `/impeccable` or use pinned shortcuts like `/audit`, `/colorize`, `/layout`, `/polish`

**What it does**: Designs and iterates production-grade frontend interfaces with 23 specialized commands.

**Available commands**:
- Build: `craft`, `shape`, `teach`, `document`, `extract`
- Evaluate: `critique`, `audit`, `polish`
- Refine: `bolder`, `quieter`, `distill`, `harden`, `onboard`
- Enhance: `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive`
- Fix: `clarify`, `adapt`, `optimize`
- Iterate: `live` (browser-based visual iteration)

**Use when**: Working on UI/UX design, visual polish, accessibility, performance, responsive design, typography, spacing, color strategy, animations, error states, or design system work.

**Quick setup** (optional):
```bash
# Create pinned shortcuts for common commands
/impeccable pin audit      # Creates /audit
/impeccable pin colorize   # Creates /colorize
/impeccable pin layout     # Creates /layout
/impeccable pin polish     # Creates /polish
```

**Design principles enforced**:
- No pure black/white (always tint)
- No side-stripe borders
- No nested cards
- No gradient text
- No bounce/elastic easing
- No identical card grids
- Cards only when truly needed

---

## 🪨 Caveman - Token Efficiency

**Slash command**: `/caveman` or trigger with "caveman mode", "less tokens", "be brief"

**What it does**: Compresses agent output to ~75% fewer tokens while keeping full technical accuracy.

**Intensity levels**:
- **lite**: Professional but tight (keep articles, drop filler)
- **full**: Classic caveman (drop articles, fragments OK)
- **ultra**: Maximum compression (abbreviate words, use arrows)
- **wenyan-lite/full/ultra**: Classical Chinese modes (80-90% reduction)

**Available sub-skills**:
- `/caveman-commit` - Terse commit messages (Conventional Commits)
- `/caveman-review` - One-line PR comments
- `/caveman-help` - Quick reference guide
- `/caveman-stats` - Session token usage & savings
- `/caveman:compress <file>` - Compress memory files

**Use when**: You want faster responses, want to save API costs, need concise explanations, or working on long sessions.

**How to use**:
```
/caveman                    # Activate full mode
/caveman ultra              # Switch to ultra compression
/caveman lite               # Switch to professional mode
stop caveman                # Deactivate
```

**Example output**:
- Normal: "The bug is caused by creating a new object reference on each render..."
- Ultra: "Inline obj prop → new ref → re-render. `useMemo`."

---

## 🚀 Autoskills - Tech Stack Detection

**Slash command**: `/autoskills` or run manually with `npx autoskills`

**What it does**: Automatically detects your tech stack and installs matching AI agent skills.

**Workflow**:
1. Runs in your project root
2. Scans `package.json`, Gradle files, config files
3. Detects technologies (React, Angular, Node.js, etc.)
4. Installs best matching skills from curated registry
5. Verifies all files with SHA-256 hashes
6. Creates `skills-lock.json` for transparency

**Supported tech stacks**:
- Frameworks: React, Vue, Angular, Svelte, Next.js, Nuxt, Astro
- Backends: Node.js, Express, NestJS, Go, Deno
- Mobile: React Native, Flutter, Expo
- Cloud: Vercel, AWS, Azure, Cloudflare
- Tools: TypeScript, Tailwind CSS, Prisma, Drizzle, Vitest, Playwright
- And 50+ more...

**Use when**: 
- Starting a new project
- Adding new technologies
- Want skills optimized for your current stack
- Running `npx autoskills --dry-run` to preview

**Options**:
```bash
npx autoskills              # Auto-detect and install
npx autoskills -y           # Skip confirmation
npx autoskills --dry-run    # Preview without installing
npx autoskills --help       # Show all options
```

---

## 🔗 Quick Links

| Skill | Repo | Command | Purpose |
|-------|------|---------|---------|
| **Impeccable** | github.com/pbakaus/impeccable | `/impeccable` | Design & UX excellence |
| **Caveman** | github.com/JuliusBrussee/caveman | `/caveman` | Token efficiency & compression |
| **Autoskills** | github.com/midudev/autoskills | `npx autoskills` | Tech stack detection |

---

## 📝 Skill Files

Skills are stored in: `.github/skills/`

```
.github/
├── skills/
│   ├── impeccable/SKILL.md      # Design skill
│   ├── caveman/SKILL.md          # Compression skill
│   └── autoskills/SKILL.md       # Tech detection skill
└── agents.md                     # This file
```

---

## 🔒 Security Model

All skills follow secure practices:
- ✅ Verified with SHA-256 hashes
- ✅ Scanned for prompt injection risks
- ✅ Registered in `skills-lock.json`
- ✅ Community maintained and audited
- ✅ No external runtime downloads

---

## Getting Started

1. **Design your UI**: `/impeccable audit src/components`
2. **Save tokens**: `/caveman ultra` for long sessions
3. **Auto-install skills**: `npx autoskills` for your tech stack

Questions? Check the individual SKILL.md files in `.github/skills/` for detailed documentation.
