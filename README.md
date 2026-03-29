# ZERO TERMINAL

An operating system for figuring it out.

```
███████╗███████╗██████╗  ██████╗
╚══███╔╝██╔════╝██╔══██╗██╔═══██╗
  ███╔╝ █████╗  ██████╔╝██║   ██║
 ███╔╝  ██╔══╝  ██╔══██╗██║   ██║
███████╗███████╗██║  ██║╚██████╔╝
╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝
```

A terminal-themed personal website. Users type commands to navigate. No buttons, no menus — just a blinking cursor and 30 commands.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Type `help`.

## Commands

**Core** — `help` `about` `projects` `status` `research` `store` `writing` `consulting` `contact` `now`

**Life** — `build` `deploy` `think` `money` `sleep` `coffee` `walk` `focus` `small_step`

**System** — `clear` `version` `logs` `exit` `theme` `ls` `cd` `cat` `pwd`

**Dangerous** — `compare` `doomscroll` `redo_past`

**Navigation** — `open <name>` `call <person>`

**Hidden** — find them yourself.

## Features

- Boot sequence with ASCII art, fake module loading, and login screen
- CRT effects: scanlines, glow, subtle flicker
- Green/amber theme toggle (`theme` command)
- Virtual filesystem at `/zero/` — navigate with `ls`, `cd`, `cat`
- Typewriter animations on async commands
- Command history (up/down arrows) and tab completion
- Mobile support with tappable command bar
- 12KB gzipped production build

## Tech

Vanilla JS + Vite. No framework. No runtime dependencies.

## Deploy

```bash
npm run build
```

Output goes to `dist/`. Vercel-ready with included `vercel.json`.

## Customize

- **Links** — Edit `src/data/links.js` and `src/data/projects.js` to add your real URLs
- **Commands** — Add new commands in `src/commands/`, register them in `src/main.js`
- **Filesystem** — Edit the file tree in `src/filesystem/fs.js`
- **Boot text** — Modify `src/boot/sequence.js` and `src/boot/ascii.js`

## License

MIT
