# Astro migration

This is a new, independent Astro application built alongside the existing portfolio.
It is stage one of an incremental migration: the page shell, metadata, navigation,
hero, system illustration, and footer are implemented here. The original site is
still the production application.

## Run locally

Use Node 22.22 or newer. A compatible Node 24 release is selected by `.nvmrc`:

```sh
cd astro
nvm use
npm ci
npm run dev
```

Open the local address printed by Astro (normally `http://localhost:4321`).
Run `npm run check` for Astro/TypeScript diagnostics, `npm run build` for static
output in `astro/dist/`, and `npm run preview` to serve that build.

After installing this app's dependencies, the repository root also provides
`npm run astro:dev`, `astro:check`, `astro:build`, and `astro:preview`.
These commands require the same compatible Node version.

## Responsibilities

```text
src/
  pages/index.astro              Route: compose sections only
  layouts/BaseLayout.astro       HTML document, shared header/footer, skip link
  components/
    seo/SeoHead.astro            Metadata and structured data
    layout/                     Header, footer, social links
    sections/HeroSection.astro  Hero presentation
    illustrations/SystemMap.astro  Self-contained SVG diagram
    ui/ButtonLink.astro         Reusable link button
  data/
    site.ts                     Identity, social URLs, navigation destinations
    home.ts                     Hero copy, calls to action, capabilities
  scripts/navigation.ts         Mobile navigation behavior
  styles/
    tokens.css                  Shared colors and sizing
    global.css                  Reset, typography, shared container
public/favicon.svg              Static asset copied without processing
```

Component-specific CSS belongs in the component's scoped `<style>` block.
Only site-wide rules belong in `styles/`. Browser behavior is imported by the
component that owns it. Content lives in typed data modules rather than being
duplicated throughout templates. This app does not import the legacy HTML,
stylesheet bundle, or script, and it does not need Tailwind or a browser framework.

## Next migration stages

1. Add `IntroVideoSection.astro` and `FocusStrip.astro`, moving their copy into data.
2. Add `ExperienceSection.astro` with a reusable `ExperienceItem.astro` and typed
   experience data.
3. Add `ExpertiseSection.astro` with a reusable skill-group component and data.
4. Add `ProjectsSection.astro`, `ProjectTabs.astro`, `ArchitectureDiagram.astro`,
   and project data. Keep tab keyboard handling and diagram selection behavior
   in separate modules owned by those components.
5. Add `ContactSection.astro`, reusing `SocialLinks.astro`.
6. Once all sections are verified, switch the deployment build and output
   directory to this app, add production robots/sitemap assets, enable indexing,
   and retire the legacy files in a separate change.

For each stage, compose the new section in `pages/index.astro`, then update its
navigation and action destinations from `legacySection('section-id')` to
`#section-id`. Until then, links open that section of the existing production site.
The Astro preview defaults to `noindex` in `SeoHead.astro`; pass `noindex={false}`
to `BaseLayout` when the complete site is ready for production.

Check desktop and mobile layouts, keyboard navigation, reduced motion, and
behavior without JavaScript for each migrated section. The mobile menu in stage
one progressively enhances visible navigation and supports Escape to close.

The root `npm run build`, legacy source files, and `.openai/hosting.json` continue
to build and serve the existing site. Astro has its own package manifest, lockfile,
dependencies, and output directory, so migration work can be reviewed independently.
