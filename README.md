# SafeZone

**A 100% Client-Side, Air-Gapped TikTok & Instagram Reels Safe Zone Preview Tool**  
*by [nodedCode Studio](https://nodedcode.studio/)*

[![Live Tool](https://img.shields.io/badge/Live%20Tool-safezone.nodedcode.studio-EA5E58?style=flat-square)](https://safezone.nodedcode.studio/)
[![License](https://img.shields.io/badge/License-Proprietary%20Open%20View-blue?style=flat-square)](#license)
[![Built with Vue 3](https://img.shields.io/badge/Built%20with-Vue%203-42b883?style=flat-square)](https://vuejs.org/)

---

![SafeZone Preview](https://raw.githubusercontent.com/nodedCode/nodedcode.github.io/main/public/images/safezone.png)

---

## What is SafeZone?

SafeZone is a professional-grade video preview tool built for content creators, agencies, and social media managers. It renders pixel-perfect TikTok and Instagram Reels UI overlays on top of your local video file so you can verify that critical content (captions, faces, CTAs) falls within the platform's visible safe zone before publishing.

**No uploads. No accounts. No backend.** SafeZone operates entirely within your browser's volatile memory using native HTML5 video decoding. The moment you close the tab, your file is gone.

---

## Key Features

| Feature | Detail |
|---|---|
| **Zero Server Uploads** | Videos are processed entirely in-browser via Object URLs. Nothing is transmitted. |
| **Pixel-Perfect Overlays** | Safe zone dimensions derived from current TikTok and Instagram Reels UI specifications. |
| **Air-Gapped Architecture** | No network requests are made for video processing at any stage. |
| **Mobile Compatible** | Responsive layout with hardware-accelerated video rendering on iOS and Android. |
| **Instant Preview** | No encoding or transcoding step; overlays render directly on the native video element. |
| **Free to Use** | No registration, subscription, or account required. |

---

## Supported Platforms

- **TikTok:** Bottom UI bar, right-side action panel
- **Instagram Reels:** Top status bar, bottom caption area, right-side action panel

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build Tool | Vite + vite-ssg (Static Site Generation) |
| Styling | Vanilla CSS with a custom design token system |
| Video Rendering | Native HTML5 `<video>` element with Object URL |
| SEO | `@unhead/vue` for reactive meta tags + JSON-LD structured data |
| Deployment | GitHub Pages via GitHub Actions |

---

## Local Development

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/nodedCode/safezone.git
cd safezone

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build
```

The development server runs at `http://localhost:5173` by default.

---

## Codec Compatibility Notes

SafeZone relies on the browser's native video decoder. Compatibility varies by codec:

| Codec | Chrome Desktop | Chrome Android | Safari (iOS/macOS) |
|---|---|---|---|
| H.264 (AVC) MP4 | Full Support | Full Support | Full Support |
| H.265 (HEVC) MP4 | Partial | Not Supported | Full Support |
| MOV (H.264) | Full Support | Full Support | Full Support |

**Recommendation:** Export videos as H.264 MP4 for maximum cross-browser compatibility.

---

## Deployment

This project uses GitHub Actions for automated CI/CD deployment to GitHub Pages. The workflow file is located at `.github/workflows/deploy.yml`. On every push to `main`, the site is rebuilt and deployed automatically.

---

## License

This project is published under a **Proprietary Open-View License**. See [`LICENSE`](./LICENSE) for the full terms.

**Summary:** You may view and study the source code for personal and educational purposes. Redistribution, resale, or use of the source code to build a competing service is strictly prohibited.

