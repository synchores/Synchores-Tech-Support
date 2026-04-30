# Synchores Hero Animation & Media Audit

## 🏁 Overview
The Hero section of the Synchores landing page has been refactored to provide a high-performance, cinematic reveal sequence that is fully optimized for both Desktop and Mobile viewports. This document details the technical implementation, media priorities, and the resolutions for previous "white-screen" glitches.

## 🛠 Cinematic Phasing System
The animation engine uses a viewport-aware GSAP timeline to handle different ignition sequences:

### 🖥 Desktop (The 5-Phase Reveal)
1.  **Phase 1 (Intro)**: Logo scales on a pure white background.
2.  **Phase 2 (Color)**: Logo transitions to full color.
3.  **Phase 3 (Split)**: Centrifugal text splitting (Scalable Tech Solutions).
4.  **Phase 4 (Assembly)**: Portal-style layout transition (Logo moves left).
5.  **Phase 5 (Grand Finale)**: The background media is revealed as the final "Aha!" moment.

### 📱 Mobile (Instant Ignition)
*   **Immediate Reveal**: To prevent "stuck-on-white" glitches caused by mobile browser hardware acceleration, the background media and mobile headline assembly trigger **immediately** upon page load.
*   **CSS Shielding**: The white cinematic mask is hidden via `opacity-0` at the CSS level on mobile viewports to guarantee no "white flashes" during the initialization.

## 📊 3-Tier Media Priority Engine
A resilient `useMemo` engine resolves the hero background using the following hierarchy:

| Priority | Source | Purpose |
| :--- | :--- | :--- |
| **1. Primary** | Local Repository (`/videos/`) | High-resolution, sharp tech footage (Optimized for Desktop). |
| **2. Secondary** | CMS Background (Strapi/Live) | Allows administrators to update the hero background dynamically. |
| **3. Fail-safe** | Cloudinary Cinematic Loop | High-compatibility MP4 failover used when local/CMS resources fail (Standard on Mobile). |

## 💡 Key Fixes & Technical Decisions

### 1. Mobile Background Visibility (MIME Types)
*   **Issue**: Local `tech_consult_vid3.webm` is not supported by iOS/Safari, causing a transparent/white background.
*   **Solution**: Implemented a multi-source `<video>` tag. If the browser rejects WebM, the engine automatically falls back to the Cloudinary **MP4** loop, which is universally compatible.

### 2. Desktop Text Overflow
*   **Issue**: Long headlines (e.g., "BUSINESS SUCCESS") overlapping the browser edge on small desktop screens.
*   **Solution**: Added `md:whitespace-normal` as a fail-safe. If space is constrained, the text wraps gracefully instead of overflowing.

### 3. "White Screen" Elimination
*   **Fix**: Removed the hard-coded `bg-white` from the main section container. Added explicit Z-indexing (`z-0` for video, `z-6` for dark overlay, `z-100` for cinematic mask).

## 🚀 Merge Readiness
The `animation-redesign` branch has been manually synchronized with the `main` branch. All production UI updates (button shadows, brand colors `#0055aa`) have been integrated into this cinematic engine. It is ready for a clean merge.
