# Contributing

Thanks for your interest in contributing to startup-ui! 🎉

## How to Contribute

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/startup-ui.git
cd startup-ui
```

### 2. Create a Branch

```bash
git checkout -b feature/component-name
```

### 3. Add Your Component

Every new component needs two files:

- `components/html/ComponentName.html` — vanilla HTML version
- `components/react/ComponentName.jsx` — React version

### Component Checklist

- [ ] Tailwind CSS only (no external libraries)
- [ ] Dark mode support (`dark:` prefix)
- [ ] ARIA attributes included
- [ ] Keyboard navigation (where applicable)
- [ ] Descriptive comment block at the top of each file
- [ ] Usage examples at the bottom of each file

### 4. Update the Demo Page

Add your component to `index.html`.

### 5. Open a Pull Request

```bash
git add .
git commit -m "feat: add ComponentName (html + react)"
git push origin feature/component-name
```

Then open a Pull Request on GitHub.

## Commit Message Format

```
feat: add Badge component
fix: Modal ESC key not closing
docs: update README usage section
style: fix Button hover color
```

## Questions?

Open an issue or start a Discussion.
