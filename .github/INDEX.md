# 📑 AI Skills Documentation Index

Welcome! Your workspace now has three powerful AI agent skills for GitHub Copilot.

## 🚀 Get Started (Pick One)

| Option | Time | Best For |
|--------|------|----------|
| [⚡ Quick Start](QUICK_START.md) | 2 min | Jump right in |
| [🛠️ Full Setup](SETUP.md) | 5-10 min | Thorough setup |
| [📚 Full Reference](AGENTS.md) | 20 min | Complete knowledge |

---

## 📂 Complete File Structure

```
tu-torneo/
└── .github/
    ├── INDEX.md                    👈 You are here
    ├── QUICK_START.md              Quick 2-minute start
    ├── SETUP.md                    Complete setup guide
    ├── AGENTS.md                   Full skill reference & documentation
    ├── copilot-instructions.md     Auto-activation rules for Copilot
    │
    └── skills/                     Installed AI skills
        ├── README.md               Usage guide for all skills
        ├── impeccable/
        │   └── SKILL.md            Design skill (23 commands)
        ├── caveman/
        │   └── SKILL.md            Compression skill (75% token savings)
        └── autoskills/
            └── SKILL.md            Tech detection skill
```

---

## 🎨 Skill #1: Impeccable - Design Excellence

**Command**: `/impeccable [command] [target]`

**What It Does**:
- 🎯 23 specialized design commands
- ✅ Audit UI for accessibility, performance, responsive design
- 🎭 Polish designs before shipping
- 🎨 Add color, animation, typography
- ⚙️ Fix layout, spacing, visual hierarchy
- 📝 Improve UX copy and error messages

**Quick Example**:
```
/impeccable audit dashboard      # Find design issues
/impeccable colorize header      # Add strategic color
/impeccable layout forms         # Fix spacing & rhythm
```

**Create Shortcuts** (optional):
```
/impeccable pin audit            # Creates /audit
/impeccable pin colorize         # Creates /colorize
/impeccable pin layout           # Creates /layout
/impeccable pin polish           # Creates /polish
```

**Learn More**: 
- Quick: [QUICK_START.md](QUICK_START.md#-impeccable-shortcuts)
- Full: [SETUP.md](SETUP.md#-step-1-setup-impeccable-design-context-optional-but-recommended)
- Deep: [skills/README.md](skills/README.md#-using-impeccable-for-design)
- Reference: [skills/impeccable/SKILL.md](skills/impeccable/SKILL.md)

---

## 🪨 Skill #2: Caveman - Token Efficiency

**Command**: `/caveman [intensity]`

**What It Does**:
- 💰 Cuts output tokens by ~75%
- ⚡ Faster responses
- 📊 Same technical accuracy
- 💡 Multiple intensity levels (lite/full/ultra)

**Quick Example**:
```
/caveman ultra                   # Ultra compression
/caveman lite                    # Professional but concise
/caveman-commit                  # Terse commit messages
/caveman-review src/             # One-line PR feedback
/caveman-stats                   # Token savings report
```

**Token Savings Data**:
- React re-render bug: **87%** savings
- Auth middleware: **83%** savings
- PostgreSQL setup: **84%** savings
- Average: **65%** savings

**Learn More**:
- Quick: [QUICK_START.md](QUICK_START.md#-caveman-compression)
- Full: [SETUP.md](SETUP.md#-step-3-activate-caveman-for-efficiency)
- Deep: [skills/README.md](skills/README.md#-using-caveman-for-efficiency)
- Reference: [skills/caveman/SKILL.md](skills/caveman/SKILL.md)

---

## 🚀 Skill #3: Autoskills - Tech Stack Detection

**Command**: `npx autoskills`

**What It Does**:
- 🔍 Auto-detects your tech stack
- 🎯 Installs matching AI skills
- ✅ Verifies files with SHA-256 hashes
- 📋 Creates `skills-lock.json` for transparency

**Quick Example**:
```bash
npx autoskills              # Auto-detect and install
npx autoskills --dry-run    # Preview without installing
npx autoskills -y           # Skip confirmation
```

**Supports** (50+ technologies):
- Frameworks: React, Vue, Angular, Svelte, Next.js, Nuxt
- Languages: TypeScript, Node.js, Go, Python, Rust
- Backends: Express, NestJS, Spring Boot, Hono
- Databases: Prisma, Drizzle, Supabase, Neon
- Cloud: Vercel, AWS, Azure, Cloudflare
- And more...

**Learn More**:
- Quick: [QUICK_START.md](QUICK_START.md#-try-autoskills-detection)
- Full: [SETUP.md](SETUP.md#-step-4-install-tech-stack-skills-optional)
- Deep: [skills/README.md](skills/README.md#-using-autoskills)
- Reference: [skills/autoskills/SKILL.md](skills/autoskills/SKILL.md)

---

## 📚 Documentation Map

### For Different Needs

| I Want To... | Read This |
|-------------|-----------|
| Get started in 2 minutes | [QUICK_START.md](QUICK_START.md) |
| Do a complete setup | [SETUP.md](SETUP.md) |
| Understand all commands | [AGENTS.md](AGENTS.md) |
| See usage examples | [skills/README.md](skills/README.md) |
| Learn design best practices | [skills/impeccable/SKILL.md](skills/impeccable/SKILL.md) |
| Learn compression rules | [skills/caveman/SKILL.md](skills/caveman/SKILL.md) |
| Understand tech detection | [skills/autoskills/SKILL.md](skills/autoskills/SKILL.md) |
| Configure auto-activation | [copilot-instructions.md](copilot-instructions.md) |

---

## 🎯 Recommended Workflows

### 1️⃣ Design New Feature (End-to-End)
```
/impeccable teach              # Setup (one time)
/impeccable shape feature      # Plan the design
/caveman full                  # Enable compression
/impeccable craft feature      # Build with iteration
/impeccable audit feature      # Quality check
/impeccable polish feature     # Shipping ready
/caveman-stats                 # See token savings
```

### 2️⃣ Quick Design Audit
```
/audit dashboard               # Find issues
/colorize buttons              # Add color
/layout forms                  # Fix spacing
/polish checkout               # Final pass
```

### 3️⃣ Code Review (Efficient)
```
/caveman ultra                 # Enable compression
[Review code normally]
/caveman-review src/           # Get concise feedback
stop caveman                   # Back to normal
```

### 4️⃣ Full Project Setup
```
/impeccable teach              # Design context
npx autoskills                 # Install tech skills
/impeccable shape homepage     # Design first page
/impeccable craft homepage     # Build first page
```

---

## ✨ Key Features at a Glance

### 🎨 Impeccable (23 Commands)
| Category | Commands |
|----------|----------|
| Build | craft, shape, teach, document, extract |
| Evaluate | critique, audit, polish |
| Refine | bolder, quieter, distill, harden, onboard |
| Enhance | animate, colorize, typeset, layout, delight, overdrive |
| Fix | clarify, adapt, optimize |
| Iterate | live |

### 🪨 Caveman (Intensity Levels)
| Level | Use Case |
|-------|----------|
| lite | Professional + concise |
| full | Default caveman |
| ultra | Maximum compression |
| wenyan-* | Classical Chinese modes |

### 🚀 Autoskills (Tech Coverage)
✅ Frontend, Backend, Mobile, Cloud, Data, Auth, Testing, Tooling, Media, AI

---

## 🔒 Security & Trust

All skills are:
- ✅ **Version-controlled** (stored in `.github/skills/`)
- ✅ **Verified with hashes** (SHA-256 signatures)
- ✅ **Scanned for injection** (prompt injection risks checked)
- ✅ **Team-safe** (can be committed to version control)
- ✅ **Transparent** (all configuration in readable .md files)

No external downloads. No runtime surprise installations. Complete control.

---

## 🎓 Learning Path

**Beginner** (15 minutes):
1. Read [QUICK_START.md](QUICK_START.md)
2. Try `/impeccable audit` on a component
3. Try `/caveman` on a question
4. Explore shortcut commands

**Intermediate** (30 minutes):
1. Read [SETUP.md](SETUP.md)
2. Run `/impeccable teach`
3. Create shortcuts with `/impeccable pin`
4. Try combined workflows

**Advanced** (1 hour):
1. Read [AGENTS.md](AGENTS.md) (complete reference)
2. Read [skills/README.md](skills/README.md)
3. Master all 23 impeccable commands
4. Setup complex workflows
5. Run `npx autoskills` for your tech stack

---

## ❓ Quick Answers

**Q: How do I start?**
A: Read [QUICK_START.md](QUICK_START.md) (2 minutes) or try `/impeccable audit` right now.

**Q: How do I create `/layout` instead of `/impeccable layout`?**
A: Run `/impeccable pin layout` - does it automatically.

**Q: Can I use caveman with code editing?**
A: Yes! `/caveman` compresses explanations but code writing stays normal.

**Q: Are these skills secure?**
A: Yes. All in `.github/`, version-controlled, verified with hashes, no external downloads.

**Q: Can I uninstall a skill?**
A: Yes. Delete the folder in `.github/skills/` and the commands disappear.

**Q: How much do these skills save?**
A: Caveman saves ~65% output tokens average. Exact savings vary by task (22-87%).

---

## 🚀 Next Steps

1. **Right Now**: Pick a section above and click a link
2. **In 5 Minutes**: Complete [SETUP.md](SETUP.md) section by section
3. **Today**: Try `/impeccable audit` and `/caveman` 
4. **This Week**: Integrate into your daily workflow

---

## 📞 Help & Support

- **Impeccable Issues**: https://github.com/pbakaus/impeccable/issues
- **Caveman Issues**: https://github.com/JuliusBrussee/caveman/issues
- **Autoskills Issues**: https://github.com/midudev/autoskills/issues

---

## 📋 Files in This Directory

```
.github/
├── INDEX.md                    📍 Central directory (you are here)
├── QUICK_START.md              ⚡ 2-minute quick start
├── SETUP.md                    🛠️ Complete setup walkthrough
├── AGENTS.md                   📚 Full skill documentation
├── copilot-instructions.md     ⚙️ Auto-activation rules
└── skills/
    ├── README.md               📖 Usage guide
    ├── impeccable/SKILL.md      🎨 Design skill reference
    ├── caveman/SKILL.md         🪨 Compression skill reference
    └── autoskills/SKILL.md      🚀 Tech detection reference
```

---

**Pick Your Path**: [⚡ Quick Start](QUICK_START.md) • [🛠️ Full Setup](SETUP.md) • [📚 Reference](AGENTS.md)

---

*Last updated: 30 de abril de 2026*
