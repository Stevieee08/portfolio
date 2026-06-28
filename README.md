Cinematic Creative Developer Portfolio

A premium, award-winning style portfolio built with **React + Vite + TailwindCSS**, powered by **GSAP + ScrollTrigger**, **Lenis** smooth scrolling, and **AOS** reveal animations.

## Features

- Fixed fullscreen **Portfolio** hero with a buttery cursor-reveal scanner (blur → sharp mask), animated marching-ants frame, and live background color switcher.
- Smooth inertia scrolling (Lenis) synced to the GSAP ticker.
- **Hero** split-screen with parallax avatar, rolling role text, and glowing social icons.
- **Welcome** cinematic typography reveal + infinite testimonial marquees.
- **Projects** scroll-triggered 3D card grid (desktop) / snap carousel (mobile).
- **Services** pinned 3D half-circle scroll carousel with dynamic background color.
- **Contact** pinned glassmorphism form with WhatsApp integration.
- Luxury yellow marquee **Footer** with floating profile and CTA buttons.
- Hide-on-scroll responsive navbar with fullscreen mobile overlay + feedback modal.

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview build
```

## Tech Stack

| Purpose          | Library                          |
| ---------------- | -------------------------------- |
| Framework        | React 18 + Vite 5                |
| Styling          | TailwindCSS 3                    |
| Animation        | GSAP 3 + ScrollTrigger           |
| Smooth scroll    | Lenis                            |
| Reveal effects   | AOS                              |
| Icons            | react-icons                      |

## Structure

```
src/
├── App.jsx              # Lenis + GSAP + AOS bootstrap, layout
├── components/
│   ├── Navbar.jsx
│   ├── Portfolio.jsx    # fixed cursor-reveal background
│   ├── Hero.jsx
│   ├── Welcome.jsx
│   ├── Projects.jsx
│   ├── Services.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
└── assets/              # portrait-real.png, avatar-cartoon.png
```

## Customization

- Update the WhatsApp number in `Contact.jsx` / `Hero.jsx` / `Footer.jsx` (`917695973074`).
- Swap project/service/testimonial data arrays at the top of each component.
- Brand colors live in `tailwind.config.js` (`brand.yellow`, `brand.gold`, `brand.blue`).
