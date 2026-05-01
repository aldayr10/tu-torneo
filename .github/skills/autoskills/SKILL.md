---
name: autoskills
description: "Use when user wants to install AI agent skills for their tech stack automatically. Detects technologies from package.json, config files, and project structure, then installs the best matching skills from the curated registry. Runs 'npx autoskills' command."
user-invocable: true
allowed-tools:
  - bash
---

# Autoskills Installer

Automatically detects your tech stack and installs curated AI agent skills.

## What It Does

1. **Scans** your `package.json`, config files, and project structure
2. **Detects** technologies you're using (frameworks, languages, tools)
3. **Matches** the best AI agent skills from the audited registry
4. **Installs** only the skills you need (verified & secure)
5. **Creates** a `skills-lock.json` with version tracking

## Security

- Skills come from a **curated registry** maintained by the community
- Every file is **scanned for injection risks** before you install
- Files are **verified with SHA-256 hashes** against the manifest
- No live downloads from third-party repos during installation
- Complete transparency with `skills-lock.json` tracking

## How to Use

### Basic Installation

```bash
npx autoskills
```

Detects your tech and installs matching skills automatically.

### Options

```bash
npx autoskills -y, --yes       # Skip confirmation
npx autoskills --dry-run       # Preview without installing
npx autoskills --help          # Show all options
```

## Supported Technologies

### Frontend & UI
React, Next.js, Vue, Nuxt, Svelte, Angular, Astro, Tailwind CSS, shadcn/ui, GSAP, Three.js

### Languages & Runtimes
TypeScript, JavaScript, Node.js, Go, Bun, Deno, Dart, Rust

### Backend & APIs
Express, Hono, NestJS, Spring Boot

### Mobile & Desktop
Expo, React Native, Flutter, SwiftUI, Android, Kotlin Multiplatform, Tauri, Electron

### Data & Storage
Supabase, Neon, Prisma, Drizzle ORM, Zod, React Hook Form

### Auth & Billing
Better Auth, Clerk, Stripe

### Testing
Vitest, Playwright, Jest

### Cloud & Infrastructure
Vercel, Vercel AI SDK, Cloudflare, Durable Objects, AWS, Azure, Terraform

### Tooling
Turborepo, Vite, oxlint

### Media & AI
Remotion, ElevenLabs

## Files Generated

After installation, you'll get:
- **skills/** - Directory with installed skills for your agent
- **skills-lock.json** - Version manifest with file hashes and sources
- **.gitignore** - Updated to exclude generated skill files

## After Installation

Once skills are installed, you can use them via slash commands:
- `/audit` - Code quality checks
- `/refactor` - Code improvements
- `/document` - Generate documentation
- `/test` - Test generation
- `/secure` - Security analysis

(Exact commands depend on your installed skills)

## Verify Installation

Check what was installed:
```bash
cat skills-lock.json
```

See the manifest and all installed skills.

## Troubleshooting

**Skills didn't install?**
- Check your internet connection
- Verify you have Node.js >= 22
- Try `npx autoskills --dry-run` to see what would install

**Wrong skills detected?**
- Make sure your `package.json` is in the project root
- Verify config files are in expected locations
- You can always run again to update

## Requirements

- Node.js >= 22
- npm or yarn package manager
- Internet connection (for first installation only)

## Learn More

Visit **autoskills.sh** for more information and community resources.
