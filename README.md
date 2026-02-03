# Wil Bishop — Applied ML Engineer Portfolio

A modern, interactive portfolio showcasing production-grade ML systems, infrastructure projects, and full-stack engineering work.

**Live:** [wilbishop.dev](https://wilbishop.dev)

---

## Features

### Dynamic Impact Statements
Animated headline cycling through 30+ career achievements in the format:
> "Delivered [OUTCOME] for [WHO] by building [PRODUCT] that [PROOF]. Built with [STACK]."

### Selected Projects
Interactive carousel featuring deep-dive case studies:
- **Failure-Aware ML System** — Cascade inference architecture achieving 98.7% recall while reducing manual review by 68%
- **Real-time Style Transfer** — VGG-19 on Android with INT8 quantization (24fps on Snapdragon 855)
- **RL Multi-Agent Trading** — PPO agents with 2.1 Sharpe ratio in walk-forward testing
- **Medical Semantic Segmentation** — Monte Carlo Dropout U-Net with uncertainty quantification
- **Distributed Rate Limiter** — Redis Lua rate limiting handling 100k QPS at p99 < 2ms

### Interactive Visualizations
- **ML Scrubber** — Interactive confusion matrix demonstrating precision/recall tradeoffs
- **Tech Ticker** — Scrolling stack showcase (Python, TypeScript, PyTorch, Kubernetes, etc.)
- **Roles Carousel** — Typewriter-animated role exploration with skill breakdowns

### Design System
- **Liquid Glass** aesthetic with glassmorphism cards and subtle animations
- Dark-mode optimized with carefully tuned contrast ratios
- Responsive layout from mobile to ultrawide displays
- Print-safe CSS for PDF export

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro 5 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Animations | CSS transitions + vanilla JS |
| Deployment | Vercel |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/     # Astro components (Hero, Projects, WhatIBuild, etc.)
├── layouts/        # Page layouts (Layout, ProjectDetailLayout)
├── pages/          # Route pages
│   ├── index.astro
│   └── projects/   # Individual project case studies
└── styles/         # Global CSS
```

---

## License

MIT
