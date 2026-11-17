# Preethi S — STEM Trainer Portfolio

![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3 Flexbox & Grid](https://img.shields.io/badge/CSS3-Flexbox%20%26%20Grid-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vanilla JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-3D%20Graphics-black?style=for-the-badge&logo=three.js&logoColor=white)

A modern, accessible, and high-performance single-page portfolio tailored for **Preethi S**, dedicated **STEM & Robotics Trainer** based in Pollachi, Tamil Nadu.

Designed with a clean, tech-focused aesthetic featuring a futuristic **Dark Mode** with neon cyan and purple accents, seamless **Light Mode** toggle, an interactive **Three.js 3D STEM Universe**, and fluid **Flexbox & Grid responsive layouts** optimized for all form factors (Mobile, Tablet, Laptop, and 4K Desktops).

---

## 🌟 Key Features

### 📱 All Form Factor Responsiveness (Flexbox & CSS Grid)
- **Mobile Phones (< 768px):** Touch-friendly full-screen drawer menu with background scroll lock, stacked full-width contact pills, 2-column stat counters, and touch-optimized tap targets (≥ 44px).
- **Tablets (768px – 1024px):** Fluid multi-column transitions, touch gesture support for the 3D canvas, and proportional padding.
- **Laptops (1024px – 1440px):** Balanced side-by-side hero composition, sticky glassmorphic navigation with active scrollspy, and interactive 3D card tilt.
- **Ultra-Wide & 4K (> 1440px):** Contained max-width layout (`max-width: 1240px`) centered with fluid `clamp()` typography and spacing, eliminating layout stretching.

### ⚛️ Interactive 3D STEM Universe (Three.js)
- **3 Visualization Modes:** Switch between **Atom Core**, **Orbitals** (gyroscopic rings with orbiting electrons), and **Deep Space Nebula**.
- **Touch & Mouse Drag Physics:** Rotate the 3D model with realistic momentum and inertia damping on both desktop and mobile.
- **Energy Burst Trigger:** Click the canvas or tap **💥 Pulse** to trigger a dynamic shockwave and lighting flare.
- **Mobile-Safe Touch Controls:** Configured with `touch-action: pan-y;` so vertical scrolling remains smooth while rotating the 3D model.

### 🌓 Dual-Theme System (Dark / Light Mode)
- **Futuristic Dark Theme (Default):** Deep obsidian (`#070b18`), translucent frosted glass cards (`backdrop-filter: blur(16px)`), neon cyan (`#38bdf8`), and electric violet (`#818cf8`).
- **Clean Minimalist Light Theme:** Soft slate backgrounds (`#f8fafc`), crisp card surfaces, and deep sky blue typography.
- **Automatic Preference & Persistence:** Remembers user choice in `localStorage` and dynamically syncs Three.js materials and lighting colors.

### 🛠️ Technical Competency & Timeline Layout
- **Vertical Career Timeline:** Detailed history with GD Naidu STEM Lab and SK Robotics, featuring styled indicator dots, dates, role badges, and custom bullets.
- **Hardware & Software Tag Clouds:** Categorized flex clouds covering Arduino, Raspberry Pi, Quarky, BBC micro:bit, IoT, Scratch, Wokwi, Tinkercad, and Arduino IDE.
- **Education Card:** Styled credential badge for B.Sc. Computer Science (2022–2025) at Sree Saraswathi Thyagaraja College, Pollachi.

### ⚡ Direct Utility & Accessibility
- **One-Click Clipboard Copy:** Instant copy for Email (`preethistem@gmail.com`) and Phone (`9344102150`) with toast alert feedback.
- **Reading Progress Bar:** Fixed neon gradient indicator at the top tracking scroll percentage.
- **Circular SVG Back-to-Top:** Floating button displaying dynamic circular scroll completion.
- **Keyboard & Screen-Reader Accessible:** Semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), `aria-expanded` menu states, `Escape` key close listener, and `prefers-reduced-motion` compliance.

---

## 📂 Project Structure

```text
Preethi_portfolio/
├── index.html        # Semantic HTML5 single-page structure
├── style.css         # Modern CSS3 with Flexbox, Grid, custom properties & media queries
├── script.js         # Vanilla JS: Three.js engine, theme toggle, mobile nav & animations
└── README.md         # Documentation & deployment guide
```

---

## 👩‍🏫 Injected Portfolio Content

| Section | Details |
| :--- | :--- |
| **Name** | **PREETHI S** |
| **Title** | **STEM TRAINER** |
| **Location** | Pollachi, Tamil Nadu, India |
| **Email** | [preethistem@gmail.com](mailto:preethistem@gmail.com) |
| **Phone** | [+91 9344102150](tel:9344102150) |
| **Current Role** | **STEM Trainer** at **GD Naidu STEM Lab** (May 2026 – Present) |
| **Previous Role**| **Robotics Trainer** at **SK Robotics** (June 2025 – April 2026) |
| **Hardware Skills**| Arduino, Raspberry Pi, Quarky, BBC micro:bit, IoT, Robotics, Sensors & Automation |
| **Software Skills**| Scratch, Wokwi, Blynk, EduBlocks, MakeCode, PictoBlox, Tinkercad, Arduino IDE |
| **Education** | **B.Sc. Computer Science (2022–2025)**<br>Sree Saraswathi Thyagaraja College, Pollachi (Bharathiar University) |

---

## 🚀 GitHub Pages Deployment Guide

This project is 100% vanilla and contains zero build steps, bundlers, or external dependencies. It is ready to be hosted immediately on GitHub Pages:

### Step 1: Initialize Git and Commit
Open a terminal in the project directory:
```bash
git init
git add index.html style.css script.js README.md
git commit -m "Deploy Preethi S STEM Trainer Portfolio"
```

### Step 2: Push to GitHub
Create a new public or private repository on [GitHub](https://github.com/new), then link and push:
```bash
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (tab at the top).
3. In the left navigation, select **Pages**.
4. Under **Build and deployment > Branch**:
   - Select **Branch: `main`**
   - Select **Folder: `/ (root)`**
5. Click **Save**.
6. Within 1–2 minutes, your website will be live at:
   ```text
   https://<your-username>.github.io/<your-repo-name>/
   ```

---

## 💻 Local Development / Preview

No node_modules or compilers needed. You can preview the website locally using any of the following methods:

1. **Direct Browser Open:** Double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.
2. **VS Code Live Server:** Right-click `index.html` in VS Code and select **Open with Live Server**.
3. **Python HTTP Server:**
   ```bash
   python3 -m http.server 8000
   ```
   Open your browser and navigate to `http://localhost:8000`.

---

## 🌐 Browser Support

- **Google Chrome** (Mobile & Desktop) — Fully supported
- **Apple Safari** (iOS & macOS) — Fully supported
- **Mozilla Firefox** — Fully supported
- **Microsoft Edge** — Fully supported
- **Samsung Internet & Android WebViews** — Fully supported

---

## 📄 License & Attribution

Designed and crafted for **Preethi S**. Free to adapt for educational and portfolio purposes.
