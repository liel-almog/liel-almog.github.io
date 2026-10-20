export interface Experience {
  id: string;
  title: string;
  start: { date: string; label: string };
  end: { date: string; label: string } | null;
  focus: string;
  summary: string;
  highlights: readonly string[];
  technologies: readonly string[];
  services?: readonly string[];
}

export const experienceSection = {
  eyebrow: "Professional experience",
  heading: "Growing scope.",
  emphasis: "Deeper ownership.",
  description:
    "Since 2021, I have worked across backend, cloud, platform, and frontend boundaries to ship production software that teams can maintain and operate.",
  resumeLabel: "View full resume",
} as const;

// Most recent role first. A null end date identifies the current role.
export const experiences = [
  {
    id: "senior-software-engineer",
    title: "Senior Software Engineer",
    start: { date: "2025-07", label: "July 2025" },
    end: null,
    focus: "Architecture · Reliability · Delivery",
    summary:
      "Design and maintain a resource allocation and hierarchy system, owning backend behavior, data consistency, and the product interface.",
    highlights: [
      "Keep concurrent operations safe with distributed locking.",
      "Support asynchronous workloads with Celery.",
    ],
    technologies: [
      "Flask",
      "Microsoft SQL Server",
      "Celery",
      "Angular",
      "Distributed locking",
    ],
  },
  {
    id: "platform-engineer",
    title: "Platform Engineer",
    start: { date: "2024-07", label: "July 2024" },
    end: { date: "2025-06", label: "June 2025" },
    focus: "Platform APIs · Developer experience",
    summary:
      "Built an abstraction layer over OpenShift that simplified provisioning, configuration, and deployment workflows.",
    highlights: [
      "Worked across API design, persistent data, and the web experience.",
      "Developed a distributed event system for the platform.",
    ],
    technologies: ["FastAPI", "PostgreSQL", "MongoDB", "React", "OpenShift"],
  },
  {
    id: "cloud-developer",
    title: "Full-Stack & Cloud Developer",
    start: { date: "2021-11", label: "November 2021" },
    end: { date: "2024-06", label: "June 2024" },
    focus: "Microsoft Azure · Microservices",
    summary:
      "Developed production applications on Microsoft Azure in a microservice architecture across multiple product domains.",
    highlights: [
      "Delivered backend services, asynchronous integrations, and data flows.",
      "Built responsive interfaces alongside the cloud services behind them.",
    ],
    technologies: ["TypeScript", "MongoDB", "Microsoft Azure", "Microservices"],
    services: ["Azure Functions", "Service Bus", "Web Apps", "Storage"],
  },
] as const satisfies readonly Experience[];
