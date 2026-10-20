---
name: astro-portfolio-ui
description: Polish the visual design of this repository's Astro portfolio sections when the user asks for a prettier or more refined UI. Not for content-only edits or other websites.
---

# Astro portfolio UI

Work only in `astro/`. Start from the section's actual content and the shared palette in `src/styles/tokens.css`.

Use typography, spacing, and alignment to create a clear focal point. Keep the lime accent selective so it draws attention to the main action. Prefer one coherent composition over several competing cards, glows, grids, or decorative motifs. Keep ornament subordinate to readable content.

Preserve existing destinations, accessible names, keyboard focus, and reduced-motion behavior. For the contact section, email is the primary action and LinkedIn is secondary; desktop email activation opens Gmail with the recipient populated, while the link itself remains a `mailto:` fallback.

Review the result at narrow mobile and desktop widths. Check long text for overflow, then run `npm run check` and `npm run build` from `astro/`. A successful build does not substitute for visual review when a browser preview is available.
