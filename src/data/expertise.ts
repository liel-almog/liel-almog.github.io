export interface SkillGroup {
  id: string;
  label: string;
  title: string;
  description: string;
  technologies: readonly string[];
  highlighted?: boolean;
}

export const expertiseSection = {
  eyebrow: 'Technical expertise',
  heading: 'Backend first,',
  emphasis: 'with the range to ship the whole system.',
  description:
    'I choose tools around the system’s constraints and stay involved across the boundaries that determine whether the product works in production.',
} as const;

export const skillGroups = [
  {
    id: 'backend',
    label: '01 / Core',
    title: 'Backend development',
    description: 'Services and APIs with clear boundaries, reliable data flows, and maintainable code.',
    technologies: ['Go', 'Python', 'TypeScript', 'Node.js', 'FastAPI', 'Flask', 'NestJS'],
    highlighted: true,
  },
  {
    id: 'distributed-systems',
    label: '02',
    title: 'Distributed systems & data',
    description: 'Concurrency, event-driven workflows, messaging, caching, and durable persistence.',
    technologies: ['Kafka', 'Service Bus', 'PostgreSQL', 'MongoDB', 'Redis', 'SQL Server'],
  },
  {
    id: 'cloud',
    label: '03 / Cloud',
    title: 'Cloud & platforms',
    description: 'Applications and internal platforms delivered through managed cloud and containers.',
    technologies: ['Microsoft Azure', 'Docker', 'Kubernetes', 'OpenShift', 'AWS', 'CI/CD'],
    highlighted: true,
  },
  {
    id: 'security',
    label: '04',
    title: 'Security & systems',
    description: 'Security-aware engineering from application boundaries down to Linux kernel tooling.',
    technologies: ['eBPF', 'OWASP', 'Networking', 'Encryption', 'C', 'Linux'],
  },
  {
    id: 'product-delivery',
    label: '05',
    title: 'Complete product delivery',
    description: 'Enough frontend and product context to turn capable infrastructure into useful software.',
    technologies: ['React', 'Angular', 'WebSockets', 'Responsive UI', 'Developer experience'],
  },
] as const satisfies readonly SkillGroup[];
