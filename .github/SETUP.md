# 🚀 AI Skills Setup Guide

This guide helps you get started with the three AI skills installed in your workspace.

## ✅ Pre-Configuration Checklist

Before using the skills, verify they're properly set up:

- [ ] `.github/AGENTS.md` exists and lists all skills
- [ ] `.github/copilot-instructions.md` exists with activation rules
- [ ] `.github/skills/impeccable/SKILL.md` exists
- [ ] `.github/skills/caveman/SKILL.md` exists
- [ ] `.github/skills/autoskills/SKILL.md` exists
- [ ] GitHub Copilot extension is installed and active
- [ ] You're using VS Code with Copilot Chat

## 🎨 Step 1: Setup Impeccable Design Context (Optional but Recommended)

Impeccable works best when it understands your design system:

```bash
/impeccable teach
```

This creates:
- **PRODUCT.md** - Your product, users, brand voice
- **DESIGN.md** - Your colors, typography, components

You'll answer questions like:
- What's your product? (e.g., "Tournament management platform")
- Who are your users? (e.g., "Sports teams and leagues")
- What's your brand voice? (e.g., "Professional, clear, energetic")

**Optional**: If you already have design tokens/components, skip teach and run:
```bash
/impeccable document
```

This generates DESIGN.md from your existing code.

## 🎯 Step 2: Create Impeccable Shortcuts (Recommended)

Create direct slash commands for the most-used impeccable commands:

```bash
/impeccable pin audit
/impeccable pin colorize
/impeccable pin layout
/impeccable pin polish
/impeccable pin animate
/impeccable pin harden
```

Now you can use them directly:
- `/audit` instead of `/impeccable audit`
- `/colorize` instead of `/impeccable colorize`
- `/layout` instead of `/impeccable layout`
- And so on...

## 🪨 Step 3: Activate Caveman for Efficiency

Start using caveman mode in long sessions to save tokens:

```bash
/caveman ultra
```

This activates ultra-compressed mode. You can switch anytime:
- `/caveman lite` - Professional but concise
- `/caveman full` - Default caveman mode
- `/caveman ultra` - Maximum compression
- `stop caveman` - Deactivate

## 🚀 Step 4: Install Tech Stack Skills (Optional)

Let autoskills detect your tech and install relevant skills:

```bash
npx autoskills
```

This will:
1. Detect your tech stack (Angular, TypeScript, Node.js, etc.)
2. Show you what skills would be installed
3. Ask for confirmation
4. Install and verify all skills

You can preview without installing:
```bash
npx autoskills --dry-run
```

## 📋 Verification Steps

### Verify Impeccable is Installed

In Copilot Chat, type:
```
/impeccable
```

You should see the menu of available commands.

### Verify Caveman is Installed

Type:
```
/caveman
```

You should see intensity level options.

### Verify Autoskills is Available

Run in terminal:
```bash
npx autoskills --help
```

You should see the help menu.

## 🎯 Quick Start Examples

### Design Your First Feature

```
1. /impeccable shape login-form          # Plan the UI
2. [Review the suggested design]
3. /impeccable craft login-form          # Build with iteration
4. /impeccable audit login-form          # Check for issues
5. /impeccable polish login-form         # Final quality pass
```

### Review Code in Caveman Mode

```
1. /caveman ultra                         # Enable compression
2. [Review your code normally]
3. /caveman-review src/components        # One-line feedback
4. /caveman-stats                         # See token savings
```

### Audit Your Dashboard Design

```
1. /impeccable audit dashboard           # Find design issues
2. /impeccable critique dashboard        # UX review
3. /impeccable colorize dashboard        # Add strategic color
4. /impeccable layout dashboard          # Fix spacing
5. /impeccable polish dashboard          # Final pass
```

## 🔧 Common Tasks

### Change Caveman Intensity

Already in caveman mode? Switch anytime:
```
/caveman lite      # Keep grammar, drop filler
/caveman full      # Default caveman
/caveman ultra     # Maximum compression
```

### Turn Off Caveman

```
stop caveman
normal mode
```

### Remove a Pinned Shortcut

```
/impeccable unpin audit      # Removes /audit
```

### Check Token Savings (Caveman Mode Only)

```
/caveman-stats
```

Shows:
- Tokens saved this session
- Lifetime tokens saved
- Estimated USD savings

### Compress a Memory File

If you have large memory files (like claude-md or notes), compress them:

```
/caveman:compress ./claude-md.md
```

Saves ~46% of file size, keeps all code and URLs intact.

## 🆘 Troubleshooting

### Skills Not Showing Up?

1. **Restart VS Code** - Sometimes Copilot needs a fresh start
2. **Check file paths** - Verify `.github/skills/*/SKILL.md` files exist
3. **Verify GitHub Copilot extension** - Make sure it's installed and enabled
4. **Check copilot-instructions.md** - Make sure it's in `.github/`

### Impeccable Commands Not Working?

1. Make sure you ran `/impeccable teach` or `/impeccable document` first
2. Check that PRODUCT.md exists in your project root
3. Try the command with explicit target: `/impeccable audit src/components`

### Autoskills Not Detecting My Tech?

1. Make sure your `package.json` is in the project root
2. Run `npx autoskills --dry-run` to see what would be detected
3. Check for config files in standard locations (tsconfig.json, vite.config.js, etc.)

### Caveman Output Too Short?

Use `/caveman lite` instead of `/caveman ultra` for a balance between compression and clarity.

## 📚 Next Steps

1. **Learn Impeccable**: Read `.github/skills/impeccable/SKILL.md`
2. **Learn Caveman**: Read `.github/skills/caveman/SKILL.md`
3. **Learn Autoskills**: Read `.github/skills/autoskills/SKILL.md`
4. **Full Documentation**: Check `.github/AGENTS.md`

## 💡 Pro Tips

### Combine Skills for Maximum Effect

```
# Design new feature, compress output, save tokens
/impeccable shape header-redesign   # Plan
/caveman ultra                       # Enable compression
/impeccable craft header-redesign   # Build with less tokens
/caveman-stats                      # Check savings
```

### Use Caveman for Code Review

```
/caveman full                    # Enable
Code review the PR normally
/caveman-review src/            # Get one-line feedback
stop caveman                     # Disable for clarity
```

### Create a Design System from Scratch

```
/impeccable teach               # Set up design context
/impeccable shape design-system # Plan component architecture
/impeccable craft design-system # Build with design best practices
/impeccable extract buttons     # Pull reusable patterns
/impeccable extract forms       # Extract form components
```

## 🔒 Security Notes

All skills are:
- Version-controlled locally (not downloaded from internet)
- Verified with SHA-256 hashes
- Scanned for prompt injection risks
- Team-safe to commit to version control

## ✨ You're All Set!

Your workspace now has:
- ✅ **Impeccable** - Design excellence with 23 commands
- ✅ **Caveman** - 75% token compression
- ✅ **Autoskills** - Tech-aware skill installation

Start with `/impeccable audit` or `/caveman` for your first test. Enjoy! 🎉

---

For more details, see:
- [AGENTS.md](AGENTS.md) - Skill reference
- [skills/README.md](skills/README.md) - Usage guide
- [copilot-instructions.md](copilot-instructions.md) - Auto-activation rules
