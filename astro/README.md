# Astro migration

This is a new, independent Astro application built alongside the existing portfolio.
It is an incremental migration: the page shell, metadata, navigation,
hero, system illustration, intro video, experience timeline, technical expertise, projects explorer, and footer are implemented here. The original site is
still the production application.

## Run locally

Use Node 24. The `.nvmrc` files in this directory and the repository root select Node 24.22.0:

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
    sections/IntroVideoSection.astro  Introduction copy and section layout
    sections/ExperienceSection.astro  Experience introduction and timeline layout
    sections/ExpertiseSection.astro  Technical expertise introduction and grid
    sections/ProjectsSection.astro  Projects introduction and explorer layout
    experience/ExperienceItem.astro  Reusable role, dates, responsibilities, and stack
    expertise/SkillGroup.astro   Reusable expertise card and technology list
    projects/ProjectTabs.astro   Accessible project tabs and project presentation
    projects/ArchitectureDiagram.astro  Selectable architecture components
    media/YouTubeEmbed.astro     Responsive, lazy-loaded video player
    illustrations/SystemMap.astro  Self-contained SVG diagram
    ui/ButtonLink.astro         Reusable link button
  data/
    site.ts                     Identity, social URLs, navigation destinations
    home.ts                     Hero copy, calls to action, capabilities
    intro-video.ts              Introduction copy and YouTube video ID
    experience.ts               Typed career history and section copy
    expertise.ts                Typed expertise groups and section copy
    projects.ts                 Typed project copy, links, stacks, and architecture
  scripts/navigation.ts         Mobile navigation behavior
  scripts/project-tabs.ts       Responsive tab keyboard navigation
  scripts/architecture-diagram.ts  Component selection and description updates
  styles/
    tokens.css                  Tailwind theme: colors, fonts, sizing, animation
    global.css                  Tailwind import, mobile variant, focus indicator
public/favicon.svg              Static asset copied without processing
```

Use Tailwind utilities directly in Astro components for layout, typography,
responsive behavior, interaction states, and SVG styling. Tailwind 4 is compiled
through `@tailwindcss/vite`; the app does not load a browser/CDN version. The
shared theme in `styles/tokens.css` provides utilities such as `bg-page`,
`text-accent`, `border-line`, `max-w-site`, and `shadow-panel`. The `mobile:`
variant applies at widths up to 900px, matching the navigation script.

Keep custom CSS limited to shared foundations or effects that need it (currently
the keyboard focus indicator and diagram animation keyframes). Prefer reusable
Astro components to repeated groups of utilities. Use complete utility strings
for variants so Tailwind can discover them at build time.

Browser behavior is imported by the component that owns it and uses data
attributes independently of styling classes. Content lives in typed data modules
rather than being duplicated throughout templates. This app does not import the
legacy HTML, stylesheet bundle, or script, and it does not need a browser framework.

## Next migration stages

1. Add `FocusStrip.astro`, moving its copy into data. The intro video is migrated;
   its navigation link now targets the local `#intro-video` section.
2. Technical expertise is migrated with typed data and reusable skill groups;
   navigation targets the local `#expertise` section.
3. Projects are migrated: navigation and the hero action target local `#projects`.
   Tabs support arrow keys, Home, and End, with vertical navigation on mobile.
   Architecture component selection is owned by a separate script. Without
   JavaScript, all projects and component descriptions remain visible.
4. Add `ContactSection.astro`, reusing `SocialLinks.astro`.
5. Once all sections are verified, switch the deployment build and output
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
