# startup-ui

> Copy-paste ready, dependency-free, production-quality Tailwind CSS components.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![No Dependencies](https://img.shields.io/badge/dependencies-0-success)](./package.json)

---

## 🧩 What is this?

**startup-ui** lets you use production-ready UI components without any library dependencies.

No installation. No imports. Just copy, paste, and customize.

---

## ✨ Features

- 📋 **Copy-paste philosophy** — grab a component, drop it in your project, done
- 🚫 **Zero dependencies** — Tailwind CSS only
- 🌙 **Dark mode** — full class-based support (`dark:`)
- ♿ **Accessible** — ARIA attributes, keyboard navigation throughout
- 📱 **Responsive** — mobile-first design
- ⚛️ **HTML + React** — every component ships in both flavors
- 🎨 **Minimal & modern** — no bloat, no opinions

---

## 🤔 Why this project?

|                    | startup-ui | shadcn/ui | Headless UI | Bootstrap |
| ------------------ | ---------- | --------- | ----------- | --------- |
| Dependencies       | ✅ None    | ⚠️ Radix  | ⚠️ React    | ❌ Yes    |
| Copy-paste         | ✅         | ✅        | ❌          | ❌        |
| Vanilla HTML       | ✅         | ❌        | ❌          | ✅        |
| Dark mode          | ✅         | ✅        | ✅          | ⚠️        |
| Full customization | ✅         | ✅        | ✅          | ❌        |

> Inspired by shadcn/ui — but simpler, more independent, and with vanilla HTML support.

---

## 📦 Installation

No installation needed. The only requirement is Tailwind CSS.

**Via CDN (quick start):**

```html
<script src="https://cdn.tailwindcss.com"></script>
```

**In your project:**

```bash
npm install -D tailwindcss
npx tailwindcss init
```

`tailwind.config.js`:

```js
module.exports = {
  darkMode: "class",
  content: ["./**/*.{html,js,jsx,tsx}"],
};
```

---

## 🚀 Usage

1. Find the component you need under `components/html/` or `components/react/`
2. Copy the code
3. Paste it into your project
4. Adjust Tailwind classes to match your design

No imports, no setup, no config required.

---

## 🗂️ Components

| Component | HTML | React | Dark Mode | Accessible |
| --------- | ---- | ----- | --------- | ---------- |
| Button    | ✅   | ✅    | ✅        | ✅         |
| Card      | ✅   | ✅    | ✅        | ✅         |
| Input     | ✅   | ✅    | ✅        | ✅         |
| Modal     | ✅   | ✅    | ✅        | ✅         |
| Dropdown  | ✅   | ✅    | ✅        | ✅         |
| Navbar    | ✅   | ✅    | ✅        | ✅         |
| Toast     | ✅   | ✅    | ✅        | ✅         |

---

## 🖥️ Demo

> Live demo coming soon → [startup-ui.vercel.app](#)

Run locally:

```bash
git clone https://github.com/omersaklikaya/startup-ui.git
cd startup-ui

# Open index.html in your browser (Live Server recommended)
open index.html
```

---

## 📸 Screenshots

> Coming soon.

---

## 🤝 Contributing

Want to contribute? Check out [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📄 License

[MIT](./LICENSE) — use it, modify it, ship it.

---

<p align="center">
  <sub>Built with 🖤 from Istanbul — <a href="https://github.com/omersaklikaya">@omersaklikaya</a></sub>
</p>
