# shivamlakhotia.github.io/slakhotia

Personal portfolio site for **Shivam Lakhotia** — Senior Software Engineer at NVIDIA, based in the Bay Area.

🌐 **Live site:** [shivamlakhotia.github.io/slakhotia](https://shivamlakhotia.github.io/slakhotia)

---

## About

This is a fully custom static site — no frameworks, no build tools. Pure HTML, CSS, and vanilla JS, deployed via GitHub Pages.

**Sections:**
- **Hero** — Full-screen cinematic intro
- **About** — Background, philosophy, skills
- **Experience** — Career timeline (NVIDIA → UCSD → Samsung R&D → IIT Guwahati)
- **Adventures** — Surfing, windsurfing, scuba, guitar, chess, coffee
- **Thinking** — Topics I find interesting
- **Writing & Research** — NVIDIA Developer Blog posts + IEEE publication
- **Contact** — GitHub, LinkedIn, email

---

## Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 semantic |
| Styling | Custom CSS with design tokens (no Tailwind/Bootstrap) |
| Scripts | Vanilla JS — no dependencies |
| Fonts | [Zodiak](https://www.fontshare.com/fonts/zodiak) (display) + [Satoshi](https://www.fontshare.com/fonts/satoshi) (body) via Fontshare |
| Images | AI-generated hero and adventure backgrounds |
| Hosting | GitHub Pages |

---

## Features

- Dark / light mode toggle (preference saved to `localStorage`)
- Page-wise scroll snap — each section fills the viewport
- Scroll-reveal animations with IntersectionObserver (+ fallback)
- Sticky header with blur backdrop
- Fully responsive — mobile, tablet, desktop
- Semantic HTML + keyboard accessible

---

## Local Development

No build step needed — just open `index.html` in a browser:

```bash
# Clone
git clone https://github.com/shivamlakhotia/slakhotia.git
cd slakhotia

# Open directly (macOS)
open index.html

# Or serve with any static server
npx serve .
python3 -m http.server 8080
```

---

## File Structure

```
slakhotia/
├── index.html          # Single-page site
├── style.css           # All styles — design tokens, layout, components, responsive
├── main.js             # Theme toggle, scroll reveal, mobile nav, animations
├── images/
│   ├── hero-ocean.jpg          # Hero background (AI-generated)
│   └── adventures-bg.jpg       # Adventures section background (AI-generated)
└── README.md
```

---

## Updating Content

All content lives in `index.html`. Key sections to edit:

- **About text** → `<section id="about">` → `.about-body`
- **Timeline entries** → `<section id="work">` → `.timeline-item`
- **Adventure cards** → `<section id="adventures">` → `.adventure-card`
- **Photo grid** → `.photo-grid` — replace `.photo-placeholder` divs with `<img>` tags
- **Writing cards** → `<section id="writing">` → `.writing-card`
- **Contact links** → `<section id="contact">` → `.contact-links`

### Adding your own photos

Replace any `photo-placeholder` div with a real image:

```html
<!-- Before -->
<div class="photo-placeholder dark">
  <span>Surfing photo</span>
</div>

<!-- After -->
<img src="images/surf-pacifica.jpg" alt="Surfing at Pacifica, CA" loading="lazy">
```

---

## Planned

- [ ] Personal blog / short essays (agents, systems design, psychology)
- [ ] Projects section (Context Aware RAG, VSS Agent)
- [ ] Photo gallery with real shots

---

*Built with [Perplexity Computer](https://www.perplexity.ai/computer)*
