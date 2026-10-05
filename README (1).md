# Techfest IIT Bombay — "Simulated Paradigm"

A 3D interactive concept site built for the Techfest, IIT Bombay Campus Ambassador task — "Design and develop a 3D interactive website for Techfest."

**Live concept:** built around Techfest's own current theme, *Welcome to the Simulated Paradigm* — the idea that the festival is a system you step into, not just an event you attend.

## What's in here

- `index.html` — page structure and copy
- `style.css` — full visual design (palette, type, layout, glitch effects)
- `script.js` — Three.js scenes, scroll interactions, and UI logic

## Features

- **Scroll-reactive 3D core** — a particle sphere and wireframe icosahedron in the hero that explodes apart as you scroll, tied directly to scroll position (not just a fixed animation)
- **Mouse parallax** on the 3D camera in the hero
- **Custom cursor** that reacts to interactive elements
- **3D tilt cards** in the Domains section that respond to cursor position
- **Scroll-drawn timeline** — an SVG line that "compiles" itself as you scroll through the event protocol section
- **Animated stat counters** that count up when scrolled into view
- **Glitch text effects** on key headlines, both on hover and as ambient pulses
- **Fully responsive**, down to mobile, with a simplified nav on small screens

## Tech stack

- Vanilla HTML/CSS/JS — no build step, no framework
- [Three.js](https://threejs.org/) (r128) for the WebGL scenes
- [GSAP](https://gsap.com/) + ScrollTrigger for scroll-driven animation

## Running locally

No build tools needed. Either:

1. Open `index.html` directly in a browser, or
2. Serve it locally for best results (some browsers restrict local file access for scripts):
   ```bash
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`

## Deploying (for submission)

**GitHub Pages** (recommended for the GitHub link option):
1. Push this folder to a GitHub repo
2. Go to Settings → Pages → set source to the `main` branch, root folder
3. Your live link will be `https://<username>.github.io/<repo-name>/`

## Notes

Stat numbers (footfall, partner colleges, etc.) are approximate figures drawn from Techfest's public materials, included for atmosphere — swap in the official current numbers before any public submission if precision matters.
