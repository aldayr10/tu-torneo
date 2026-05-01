# AI Agent Skills for Tu Torneo

This directory contains three powerful AI agent skills integrated with GitHub Copilot.

## 📂 Structure

```
.github/
├── skills/
│   ├── impeccable/          # 🎨 Design excellence (23 commands)
│   ├── caveman/             # 🪨 Token efficiency (~75% compression)
│   └── autoskills/          # 🚀 Tech stack detection & skill installation
├── AGENTS.md                # Skill registration & documentation
├── copilot-instructions.md  # Auto-activation rules for Copilot
└── skills/README.md         # This file
```

## 🎨 Using Impeccable for Design

### Quick Examples

**Audit your UI for design issues:**
```
/impeccable audit components
```

**Add color to a monochrome interface:**
```
/impeccable colorize dashboard
```

**Fix layout and spacing:**
```
/impeccable layout forms
```

**Add animations:**
```
/impeccable animate buttons
```

**Polish before shipping:**
```
/impeccable polish checkout-form
```

### Create Shortcut Commands

Want `/layout` instead of `/impeccable layout`?

```bash
/impeccable pin layout      # Creates /layout
/impeccable pin colorize    # Creates /colorize
/impeccable pin audit       # Creates /audit
/impeccable pin polish      # Creates /polish
/impeccable pin animate     # Creates /animate
```

After pinning, you can use these directly:
```
/layout forms               # Same as /impeccable layout forms
/colorize dashboard         # Same as /impeccable colorize dashboard
```

### All 23 Impeccable Commands

**Build** - Create design from scratch
- `craft [feature]` - Full shape-then-build flow
- `shape [feature]` - Plan UX/UI before coding
- `teach` - Set up PRODUCT.md and DESIGN.md
- `document` - Generate DESIGN.md from code
- `extract [target]` - Extract components & tokens

**Evaluate** - Review & audit design
- `critique [target]` - UX design review
- `audit [target]` - a11y, performance, responsive checks
- `polish [target]` - Final quality pass

**Refine** - Improve & adjust design
- `bolder [target]` - Make bland designs bold
- `quieter [target]` - Tone down loud designs
- `distill [target]` - Strip to essence
- `harden [target]` - Error handling & edge cases
- `onboard [target]` - First-run flows

**Enhance** - Add visual treatments
- `animate [target]` - Purposeful motion
- `colorize [target]` - Add strategic color
- `typeset [target]` - Fix typography
- `layout [target]` - Fix spacing & rhythm
- `delight [target]` - Add personality
- `overdrive [target]` - Push past limits

**Fix** - Solve specific problems
- `clarify [target]` - Improve UX copy
- `adapt [target]` - Make responsive
- `optimize [target]` - Performance fixes

**Iterate** - Visual browser mode
- `live` - Pick elements, generate alternatives

## 🪨 Using Caveman for Efficiency

### Basic Usage

**Activate caveman mode:**
```
/caveman              # Activates full mode
/caveman lite         # Professional but concise
/caveman ultra        # Maximum compression
stop caveman          # Deactivate
```

### What It Does

Caveman cuts ~75% of output tokens while keeping technical accuracy:

**Before (Normal)**:
> "The issue you're experiencing is caused by creating a new object reference on each render. This happens because you're defining the object inline in the JSX. The solution is to wrap it in the `useMemo` hook to prevent unnecessary re-renders."

**After (Caveman)**:
> "Inline obj prop → new ref → re-render. Wrap in `useMemo`."

### Token Savings

Real data from usage:
- React re-render bug: 87% savings
- Auth middleware: 83% savings
- PostgreSQL pooling: 84% savings
- Average: 65% across tasks

### Sub-Skills

- `/caveman-commit` - Terse commit messages
- `/caveman-review` - One-line PR reviews
- `/caveman-help` - Quick reference
- `/caveman-stats` - Session token usage
- `/caveman:compress <file>` - Compress memory files

## 🚀 Using Autoskills

### One-Command Installation

Autoskills detects your tech stack and installs matching skills:

```bash
npx autoskills              # Auto-detect and install
npx autoskills -y           # Skip confirmation
npx autoskills --dry-run    # Preview without installing
```

### What Gets Installed

Your tech stack determines what gets installed:
- **React project** → React + TypeScript + Tailwind skills
- **Next.js project** → Full-stack skills (frontend + backend)
- **Node.js API** → Backend + database skills
- **Angular project** → Angular-specific skills
- **Mixed stack** → All relevant skills

### Verification

After running autoskills, check what was installed:

```bash
cat skills-lock.json    # See version manifest
ls skills/              # List installed skills
```

Each skill is verified with SHA-256 hashes for security.

## 💡 Recommended Workflow

### For Design Work
```
1. /impeccable teach           # Setup design context (one time)
2. /impeccable shape feature   # Plan the design
3. /impeccable craft feature   # Build & iterate
4. /impeccable audit feature   # Final quality check
5. /impeccable polish feature  # Shipping ready
```

### For Code Review
```
1. /caveman ultra              # Activate compression
2. Review code/design normally
3. /caveman-review src/        # One-line review comments
4. /caveman-stats              # Check token savings
```

### For Performance Optimization
```
1. /caveman                    # Enable compression
2. /impeccable audit           # Find performance issues
3. /impeccable optimize        # Apply fixes
4. /impeccable polish          # Final pass
```

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `.github/AGENTS.md` | Skill registration & documentation |
| `.github/copilot-instructions.md` | Auto-activation rules |
| `.github/skills/impeccable/SKILL.md` | Design skill definition |
| `.github/skills/caveman/SKILL.md` | Compression skill definition |
| `.github/skills/autoskills/SKILL.md` | Tech detection skill definition |

## 🔒 Security & Verification

All skills are:
- ✅ Version-controlled (no external downloads)
- ✅ Verified with SHA-256 hashes
- ✅ Scanned for injection risks
- ✅ Registered in AGENTS.md
- ✅ Team-safe to commit

## 📖 Learn More

- **Impeccable**: https://github.com/pbakaus/impeccable
- **Caveman**: https://github.com/JuliusBrussee/caveman  
- **Autoskills**: https://github.com/midudev/autoskills

## 🚀 Get Started

1. **Design**: Start with `/impeccable audit` to find design issues
2. **Optimize**: Use `/caveman ultra` to save tokens on long sessions
3. **Expand**: Run `npx autoskills` to install skills for your tech stack

Enjoy your enhanced AI agent capabilities! 🎉
