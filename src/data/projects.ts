export interface ArchitectureStep {
  layer: string;
  title: string;
  stack: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  summary: string;
  motivation: string;
  technologies: readonly string[];
  href: string;
  linkLabel: string;
  architecture: readonly ArchitectureStep[];
}

export const projectsSection = {
  eyebrow: "Selected projects",
  heading: "Curiosity into code.",
  emphasis: "From Go to the kernel.",
  description:
    "I’m enthusiastic about Go (Golang), systems programming, and understanding how software works beneath the surface. These projects turn that curiosity into working systems, from kernel-level security to search algorithms and developer tools.",
} as const;

export const projects = [
  {
    id: "ebpf",
    name: "eBPF Shield",
    category: "Kernel-level security · Go & C",
    summary:
      "A per-process firewall that connects a browser control plane and backend services to a Go host agent and kernel-level eBPF enforcement on Linux.",
    motivation:
      "Building on my degree and systems programming knowledge, I explored how operating systems, networking, and process-aware security fit together. I was especially excited to connect Go in user space with C and eBPF programs running inside the Linux kernel.",
    technologies: ["Go", "C", "eBPF", "Linux", "FastAPI", "MongoDB", "React"],
    href: "https://github.com/orgs/ebpf-shield/repositories",
    linkLabel: "Explore the organization",
    architecture: [
      {
        layer: "Product",
        title: "React control plane",
        stack: "React · TypeScript",
        description:
          "A browser interface for organizations, protected hosts, processes, dashboards, and firewall rules.",
      },
      {
        layer: "API",
        title: "FastAPI backend",
        stack: "Python · JWT",
        description:
          "Human-facing and machine-facing APIs coordinate authentication, product workflows, and host synchronization.",
      },
      {
        layer: "Data",
        title: "MongoDB state",
        stack: "MongoDB · Beanie",
        description:
          "Persistent models connect users and organizations with hosts, processes, and the policies enforced on them.",
      },
      {
        layer: "User space",
        title: "Go host agent",
        stack: "Go · Linux",
        description:
          "The Go agent observes processes, synchronizes policy, and bridges backend services with kernel-level enforcement.",
      },
      {
        layer: "Kernel space",
        title: "eBPF enforcement",
        stack: "C · eBPF",
        description:
          "Programs running inside the Linux kernel apply process-aware network policy close to the traffic source.",
      },
    ],
  },
  {
    id: "puzzle",
    name: "Eight Puzzle Solver",
    category: "Search algorithms · Go backend",
    summary:
      "An interactive Go and TypeScript application for configuring sliding puzzles, choosing a search algorithm, and following the solution step by step.",
    motivation:
      "A hands-on way to deepen my enthusiasm for Go: take the search algorithms I studied, implement them in a Go backend, and make their behavior visible through an interactive interface.",
    technologies: ["Go", "TypeScript", "React", "BFS", "DFS", "A*"],
    href: "https://github.com/liel-almog/go-eight-puzzle-solver",
    linkLabel: "View repository",
    architecture: [
      {
        layer: "Input",
        title: "Interactive web UI",
        stack: "React · TypeScript",
        description:
          "Users configure a puzzle, arrange tiles, and select a search strategy.",
      },
      {
        layer: "Service",
        title: "Go backend",
        stack: "Go · API",
        description:
          "The backend accepts puzzle states and provides a clear API boundary around the solving engine.",
      },
      {
        layer: "Logic",
        title: "Search engine",
        stack: "BFS · DFS · A*",
        description:
          "Breadth-first, depth-first, and A* search demonstrate tradeoffs in memory use, exploration, and finding a solution.",
      },
      {
        layer: "Output",
        title: "Visual solution",
        stack: "Path · Steps",
        description:
          "The interface turns the computed solution path into a sequence users can follow step by step.",
      },
    ],
  },
  {
    id: "vulnerability",
    name: "Package Vulnerability Detector",
    category: "Application security · Developer tooling",
    summary:
      "A NestJS API that analyzes package definition files and retrieves known vulnerabilities through GitHub’s Security Advisories GraphQL API.",
    motivation:
      "My curiosity extends to the tools developers rely on every day. This project brings together backend API design and security to make dependency risks easier to investigate.",
    technologies: [
      "TypeScript",
      "NestJS",
      "GraphQL",
      "GitHub Security Advisories",
      "Docker",
    ],
    href: "https://github.com/liel-almog/package-vulnerability-detector",
    linkLabel: "View repository",
    architecture: [
      {
        layer: "Input",
        title: "Package definition",
        stack: "Dependencies",
        description:
          "Package definition files supply the dependencies to inspect for known vulnerabilities.",
      },
      {
        layer: "Service",
        title: "NestJS API",
        stack: "TypeScript · Docker",
        description:
          "A structured API parses input, validates requests, and coordinates advisory lookups.",
      },
      {
        layer: "Integration",
        title: "Security Advisories",
        stack: "GitHub · GraphQL",
        description:
          "GitHub’s Security Advisories GraphQL API supplies known vulnerability records for the packages under analysis.",
      },
      {
        layer: "Output",
        title: "Vulnerability results",
        stack: "Packages · Advisories",
        description:
          "Results connect affected dependencies with known advisories so developers can investigate and act.",
      },
    ],
  },
] as const satisfies readonly Project[];
