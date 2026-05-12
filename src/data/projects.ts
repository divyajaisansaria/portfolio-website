export interface Project {
  title: string
  description: string
  tech: string[]
  category: string
  github: string
  live: string
  image: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: "Multimodal RAG Dashboard",
    description: "Production-grade RAG application with hierarchical table parsing and vector search.",
    tech: ["Next.js", "FastAPI", "Gemini", "PostgreSQL"],
    category: "AI/ML",
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "E-Commerce Nexus",
    description: "Modern e-commerce platform with real-time inventory and serverless architecture.",
    tech: ["React", "Stripe", "Supabase", "Tailwind"],
    category: "E-Commerce",
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Agentic Workflow Engine",
    description: "Self-correcting AI agent system for automated coding and debugging tasks.",
    tech: ["Python", "LangGraph", "Docker", "Redis"],
    category: "AI/ML",
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI Code Assistant",
    description: "An agentic platform that automates complex refactoring and documentation. Integrated with Gemini 1.5 Pro for deep codebase understanding.",
    tech: ["Next.js", "TypeScript", "LangChain", "Vector DB"],
    category: "AI/ML",
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    featured: true
  }
]
