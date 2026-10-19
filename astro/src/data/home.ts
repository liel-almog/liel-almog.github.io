import { legacySection, site } from './site';

export const hero = {
  eyebrow: 'Senior Software Engineer · Systems thinker · End-to-end owner',
  heading: 'I build the systems',
  emphasis: 'that keep everything moving.',
  description:
    'From backend architecture to the product interface, I turn complex constraints into dependable software teams can ship, run, and trust. I work across distributed systems, cloud platforms, Go, Python, and TypeScript.',
  actions: [
    { label: 'See the work', href: '#experience', variant: 'primary', arrow: '↓' },
    { label: 'View resume', href: site.resume, variant: 'secondary', arrow: '↗' },
    { label: 'Explore the systems', href: legacySection('projects'), variant: 'secondary', arrow: '↗' },
  ],
  capabilities: ['Backend systems', 'Cloud platforms', 'Distributed architecture', 'Complete delivery'],
} as const;
