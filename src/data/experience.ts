import { LucideIcon, Briefcase, GraduationCap, Users } from "lucide-react"

export interface Experience {
  id: string
  company: string
  role: string
  duration: string
  location: string
  description: string
  contributions: string[]
  tech?: string[]
  focusAreas?: string[]
  icon: LucideIcon
  timestamp: string // ISO date or similar for sorting
}

export const experiences: Experience[] = [
  {
    id: "exp-wellsfargo",
    company: "Wells Fargo",
    role: "Technology Program Intern",
    duration: "May 2026 – July 2026",
    location: "Bangalore, India",
    description: "Contributed to DocForce migration, frontend feature development, and robust E2E test automation.",
    contributions: [
      "Accelerated the DocForce migration by closing 7+ Jira stories, implementing 20+ frontend features and fixes deployed successfully to production.",
      "Engineered 100+ Playwright E2E test cases spanning 40+ critical user journeys and 8+ application modules, substantially improving automated regression coverage and release confidence.",
      "Automated test generation using Playwright MCP Server, reducing manual testing effort by 40% and speeding up debugging workflows."
    ],
    tech: ["Playwright", "React", "Jira", "Testing"],
    icon: Briefcase,
    timestamp: "2026-05-01"
  },
  {
    id: "exp-svnit-coordinator",
    company: "AI Department",
    role: "Training & Placement Coordinator",
    duration: "Jan 2025 – Present",
    location: "SVNIT, Surat",
    description: "Helping manage placement activities and supporting skill development initiatives for students in the AI department.",
    contributions: [
      "Assisted in communication and coordination between students and placement teams",
      "Supported internship and recruitment process organization for students",
      "Conducted skill development sessions on Git and GitHub for students"
    ],
    icon: GraduationCap,
    timestamp: "2025-01-01"
  },
  {
    id: "exp-genus",
    company: "Genus Power",
    role: "AI/ML Intern",
    duration: "June 2025 – July 2025",
    location: "Jaipur, India",
    description: "Worked on AI-powered enterprise solutions focused on intelligent automation, multilingual support systems, and scalable dashboard interfaces for internal employee operations.",
    contributions: [
      "Built a multilingual AI support agent using LangChain, RAG pipelines, and Groq APIs for intelligent employee query handling",
      "Developed role based dashboards with React.js and REST APIs for access control, alerts, and workflow automation",
      "Integrated PDF based knowledge retrieval and chat history tracking for faster information access",
      "Worked on scalable AI workflows combining backend systems, NLP, and enterprise automation"
    ],
    tech: ["Python", "React.js", "LangChain", "FastAPI", "MongoDB", "Groq API", "RAG"],
    icon: Briefcase,
    timestamp: "2025-06-01"
  },
  {
    id: "exp-gdg-lead",
    company: "Google Developer Group on Campus",
    role: "Vice Chairperson / Community Lead",
    duration: "Sept 2025 – Present",
    location: "SVNIT, Surat",
    description: "Leading community activities and organizing technical events focused on learning, innovation, and collaboration.",
    contributions: [
      "Conducted 5+ technical events and sessions across AI, Cloud Computing, Full Stack Development, Machine Learning, and Deep Learning",
      "Organized Hack The Tank 2.0, a pan India hackathon with 150+ participants in the final round",
      "Worked closely on sponsorship outreach, event management, coordination, and execution activities",
      "Contributed to event planning, designing, promotions, and participant engagement initiatives"
    ],
    focusAreas: ["Community Building", "Event Management", "Technical Leadership", "Collaboration", "Innovation"],
    icon: Users,
    timestamp: "2025-09-01"
  }
]
