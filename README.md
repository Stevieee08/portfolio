# Steve Varkey Santhosh — Developer Portfolio

A cinematic, animation-rich personal portfolio built with **React**, **Vite**, and **Tailwind CSS**. Features smooth scrolling (Lenis), scroll-driven animations (GSAP + ScrollTrigger), and reveal effects (AOS).

🔗 **Live demo:** [YOUR_LIVE_URL](YOUR_LIVE_URL)  
📫 **Contact:** [stevesanthosh2004@gmail.com](mailto:stevesanthosh2004@gmail.com)

---


## Features

- **Portfolio** — Fullscreen hero with cursor-reveal scanner, animated frame, and live background color switcher
- **Smooth scroll** — Lenis inertia scrolling synced with the GSAP ticker
- **Hero** — Split layout with parallax avatar, rolling role text, and social links
- **Welcome** — Cinematic typography reveal and infinite testimonial marquees
- **Skills** — Animated skill marquee rows
- **Projects** — Scroll-triggered 3D card grid (desktop) / snap carousel (mobile) with detail modals
- **Services** — Pinned 3D half-circle scroll carousel with dynamic background
- **Contact** — Glassmorphism form with WhatsApp integration
- **Footer** — Marquee CTA with profile and social buttons
- **Navbar** — Hide-on-scroll navigation with fullscreen mobile overlay

---

## Tech stack

| Purpose        | Library                |
| -------------- | ---------------------- |
| Framework      | React 18 + Vite 5      |
| Styling        | Tailwind CSS 3         |
| Animation      | GSAP 3 + ScrollTrigger |
| Smooth scroll  | Lenis                  |
| Reveal effects | AOS                    |
| Icons          | react-icons            |

---

## Prerequisites

- [Node.js](https://nodejs.org/) **18+** (LTS recommended)
- [npm](https://www.npmjs.com/) (comes with Node) or [pnpm](https://pnpm.io/) / [yarn](https://yarnpkg.com/)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Stevieee08/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### 4. Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

### 5. Preview the production build locally

```bash
npm run preview
```

---

## Project structure

```
src/
├── App.jsx                 # Lenis + GSAP + AOS setup, page layout
├── main.jsx
├── index.css
├── assets/                 # Images (avatar, portrait, etc.)
└── components/
    ├── Navbar.jsx
    ├── Portfolio.jsx       # Fixed cursor-reveal background
    ├── Hero.jsx
    ├── Welcome.jsx
    ├── Skills.jsx
    ├── Projects.jsx
    ├── Services.jsx
    ├── Contact.jsx
    └── Footer.jsx

docs/
└── screenshots/            # README preview images (not used by the app)
```

---

## Customization

| What to change | Where |
| -------------- | ----- |
| Projects list | `src/components/Projects.jsx` — `PROJECTS` array |
| Skills | `src/components/Skills.jsx` — `ROW_1`, `ROW_2`, `ROW_3` |
| Services | `src/components/Services.jsx` |
| Social / WhatsApp links | `Hero.jsx`, `Contact.jsx`, `Footer.jsx` |
| Brand colors | `tailwind.config.js` (`brand.yellow`, `brand.gold`, `brand.blue`) |
| Portrait / avatar images | `src/assets/` |

---

## Deployment

This is a static Vite app. Deploy the `dist/` folder after `npm run build`.

**Vercel / Netlify**

1. Push the repo to GitHub
2. Import the project on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Output directory: `dist`

**GitHub Pages**

Add `base: '/portfolio/'` in `vite.config.js` (use your repo name), then deploy `dist/` to GitHub Pages.

---

## Author

**Steve Varkey Santhosh**  
Full Stack Developer · React Native Specialist · Team Leader

- GitHub: [@Stevieee08](https://github.com/Stevieee08)
- LinkedIn: [stevesanthosh08](https://www.linkedin.com/in/stevesanthosh08/)
- Instagram: [@steve._santhosh._](https://www.instagram.com/steve._santhosh._)

---

## License

This project is open source for portfolio purposes.  
© Steve Varkey Santhosh — All rights reserved.
