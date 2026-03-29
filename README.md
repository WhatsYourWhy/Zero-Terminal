```
███████╗███████╗██████╗  ██████╗
╚══███╔╝██╔════╝██╔══██╗██╔═══██╗
  ███╔╝ █████╗  ██████╔╝██║   ██║
 ███╔╝  ██╔══╝  ██╔══██╗██║   ██║
███████╗███████╗██║  ██║╚██████╔╝
╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝
```

# ZERO TERMINAL

**An operating system for figuring it out.**

A personal website that looks and works like a terminal. No buttons, no menus, no hero sections — just a blinking cursor and 35+ commands. Type your way through projects, research, stores, and the occasional existential crisis.

Built by [Justin Shank](https://www.linkedin.com/in/justin-shank).

---

## What You See

```
> Booting...

  [OK      ] personality
  [OK      ] caffeine_dependency
  [LOADED (unfortunately)] imposter_syndrome
  [DEGRADED] sleep_module
  [RUNNING (always)] overthinking_daemon

  All systems nominal.

  Login required.
  login: operator
  password: ********
  Access granted.

  Type 'help' to view available commands.

zero:~$ _
```

Then you type. That's the whole site.

---

## Features

- **Boot sequence** — ASCII art logo, fake module loading, cosmetic login. Press ESC to skip.
- **35+ commands** — from `projects` and `contact` to `coffee`, `doomscroll`, and `meaning`
- **CRT effects** — scanlines, glow, subtle screen flicker
- **Green/amber theme** — toggle with `theme`
- **Virtual filesystem** — `ls`, `cd`, `cat` through `/zero/projects/`, `/zero/brain/3am_questions/`, and more
- **Clickable links** — URLs in output are real `<a>` tags
- **Tab completion** — commands and filesystem paths (`cd pro<Tab>` becomes `cd projects/`)
- **Command history** — up/down arrows, `history` command
- **Shareable URLs** — `?cmd=about` auto-runs a command after boot
- **Mobile support** — tappable command bar on small screens
- **Easter eggs** — find them yourself
- **13KB gzipped** — vanilla JS, no framework, no runtime dependencies

---

## Commands

### Core
| Command | What it does |
|---------|-------------|
| `help` | List all commands |
| `about` | Who is this |
| `projects` | Active projects |
| `repos` | All 22 GitHub repositories |
| `status` | Operator system status |
| `research` | Research interests |
| `store` | Shopify stores |
| `writing` | Substack + newsletter |
| `consulting` | Shank Strategy Ops |
| `contact` | GitHub, LinkedIn, Twitter, ORCID |
| `now` | What I'm working on |

### Life Simulation
| Command | What it does |
|---------|-------------|
| `build` | Start building something (build failed successfully) |
| `deploy` | Ship it. Imperfect but real. |
| `think` | Enter overthinking mode |
| `money` | Check financial reality |
| `sleep` | Attempt sleep mode (fails) |
| `coffee` | Install caffeine patch (escalates each cup) |
| `walk` | Go outside. Graphics improved. |
| `focus` | 1 task. 25 minutes. Go. |
| `small_step` | Do one small useful thing |
| `shutdown` | Power down with daily stats |

### System
| Command | What it does |
|---------|-------------|
| `ls` / `cd` / `cat` / `pwd` | Navigate the virtual filesystem |
| `theme` | Toggle green/amber |
| `version` | Life version history (v1.0 through v6.0) |
| `logs` | System logs from 2009 to now |
| `history` | Commands typed this session |
| `uptime` | Session duration + coffee count |
| `clear` | Clear the screen |

### Dangerous
| Command | What it does |
|---------|-------------|
| `compare` | Compare yourself to others (bad idea) |
| `doomscroll` | 2 hours gone. Mood: worse. |
| `redo_past` | Error: forward direction only |

### Navigation
| Command | What it does |
|---------|-------------|
| `open <name>` | Open a project, repo, or link |
| `call mom` | She is happy you called |

### Hidden
There are more. Find them.

---

## Quick Start

```bash
git clone https://github.com/WhatsYourWhy/Zero-Terminal.git
cd Zero-Terminal
npm install
npm run dev
```

Open [localhost:5173](http://localhost:5173). Type `help`.

---

## Share a Command

Link directly to any command:

```
https://your-domain.com/?cmd=about
https://your-domain.com/?cmd=projects
https://your-domain.com/?cmd=repos
```

The command runs automatically after the boot sequence.

---

## Deploy

```bash
npm run build
```

Output goes to `dist/`. Includes `vercel.json` — deploy to [Vercel](https://vercel.com) with zero config.

---

## Customize

| What | Where |
|------|-------|
| Project links + URLs | `src/data/projects.js`, `src/data/links.js` |
| Add new commands | `src/commands/`, register in `src/main.js` |
| Virtual filesystem | `src/filesystem/fs.js` |
| Boot sequence text | `src/boot/sequence.js`, `src/boot/ascii.js` |
| Flavor text + quotes | `src/data/quotes.js` |

---

## Tech

Vanilla JS + [Vite](https://vite.dev). No React, no framework, no runtime dependencies. The entire site is one hidden `<input>`, an output `<div>`, and a command registry.

---

## License

MIT

---

*Built with caffeine and existential dread.*
