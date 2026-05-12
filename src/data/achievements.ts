import { Trophy, FileText, Award, LucideIcon } from "lucide-react"

export interface AchievementDetails {
  rank?: string
  team?: string
  org?: string
  location?: string
  techStack?: string[]
  responsibilities?: string[]
  problemStatement?: string
  solution?: string
  teamImages?: string[]
  certificateImages?: string[]
  certificateLink?: string
  projectImages?: string[]
  projectLink?: string
  moreLink?: string
}

export interface Achievement {
  id: string
  title: string
  subtitle: string
  category: "Hackathons" | "Publications" | "Certifications"
  description: string
  date: string
  timestamp: string
  icon: LucideIcon
  details?: AchievementDetails
}

export const achievements: Achievement[] = [
  {
    id: "hackathon-adani",
    title: "Powermind Hackathon '26",
    subtitle: "Winner (Team Lead)",
    category: "Hackathons",
    description: "National-level hackathon organized by Adani Group focusing on innovative energy and infrastructure solutions.",
    date: "May 2026",
    timestamp: "2026-05",
    icon: Trophy,
    details: {
      rank: "Winner",
      team: "Team of 5 (Leader)",
      org: "Adani Group",
      location: "SVNIT, Surat",
      problemStatement: "Build a retrieval augmented PDF chatbot that can handle complex multimodal documents.",
      solution: "A multimodal Retrieval-Augmented Generation (RAG) platform designed to transform complex documents — including PDFs, reports, financial statements, tables, charts, and graph-heavy files — into interactive, searchable, and insightful knowledge bases with intelligent AI-powered document understanding.",
      techStack: [
        "FastAPI", "Prisma", "ChromaDB", "Gemini 2.5", "Groq", "PyMuPDF", 
        "Next.js 14", "TailwindCSS", "Zustand", "Adobe PDF SDK", "Cloudinary"
      ],
      responsibilities: [
        "Led the team and coordinated backend–frontend development workflows throughout the hackathon",
        "Architected the multimodal RAG pipeline using Gemini Vision for parsing complex PDFs, tables, charts, and financial documents",
        "Implemented high-speed fallback response mechanisms using Groq and Llama 3.3 for seamless AI interactions",
        "Managed scalable embedding generation and document indexing workflows during PDF uploads without interrupting system performance"
      ],
      projectLink: "/projects/powermind-rag",
      teamImages: [
        "/achievements/powermind/team/1778573990369.jpeg",
        "/achievements/powermind/team/1778573998228.jpeg",
        "/achievements/powermind/team/IMG_8430.JPG"
      ],
      certificateImages: [], // To be populated by user
      projectImages: [
        "/achievements/powermind/project/1778573987387.jpeg",
        "/achievements/powermind/project/1778573990118.jpeg"
      ]
    }
  },
  {
    id: "paper-eeg-depression",
    title: "EEG-Based Depression Detection",
    subtitle: "Accepted at ComSIA 2026 (Springer)",
    category: "Publications",
    description: "Designed and developed an AI-powered framework for detecting Major Depressive Disorder (MDD) using EEG signal processing and hybrid deep learning.",
    date: "Jan 2026",
    timestamp: "2026-01",
    icon: FileText,
    details: {
      rank: "Accepted",
      team: "Co-Author & Presenter",
      org: "Int. Conference on Computing Systems and Intelligent Applications (ComSIA 2026)",
      location: "Delhi, India",
      problemStatement: "Traditional methods for diagnosing depression are often subjective and time-consuming, creating the need for a more objective and technology-driven mental health assessment system.",
      solution: "Developed a hybrid CNN-BiLSTM architecture for accurate depression classification from raw EEG data, integrating advanced signal preprocessing with Machine Learning models.",
      techStack: [
        "Python", "EEG Signal Processing", "XGBoost", "Random Forest", 
        "Hybrid CNN-BiLSTM", "MLFlow", "Matplotlib", "Springer proceedings"
      ],
      responsibilities: [
        "Worked on EEG signal preprocessing and data analysis to clean and normalize brainwave data",
        "Implemented and compared ML models including Random Forest and Logistic Regression; achieved 95% accuracy with XGBoost",
        "Co-authored the complete research paper and designed the system architecture and workflow diagrams",
        "Presented the research work at the conference in Delhi as co-author and presenter"
      ],
      projectImages: [
        "/achievements/depression_paper/paper/module 1 .jpeg",
        "/achievements/depression_paper/paper/module 2 .jpeg"
      ],
      certificateLink: "/achievements/depression_paper/certificate/Divya Jaisansaria_3.pdf",
      moreLink: "https://comsia.in/"
    }
  },
  {
    id: "hackathon-abode",
    title: "Abode India Hackathon '25",
    subtitle: "Top 100 (by Adobe India)",
    category: "Hackathons",
    description: "Digital transformation challenge focused on enhancing document intelligence and contextual retrieval.",
    date: "August 2025",
    timestamp: "2025-08",
    icon: Trophy,
    details: {
      rank: "Top 100",
      team: "Team of 3",
      org: "Adobe India",
      location: "Online",
      problemStatement: "Professionals, students, and researchers often struggle to connect ideas and recall insights scattered across large collections of documents and PDFs.",
      solution: "Developed a smart document intelligence platform that detects related and contextual information across documents, surfaces overlapping or contradictory insights instantly, and enhances comprehension using AI-powered contextual retrieval.",
      techStack: [
        "Next.js", "Tailwind CSS", "Adobe PDF Embed API", "Gemini 2.5 Flash", 
        "CrossEncoder (ms-marco)", "bge-small-en-v1", "Docker", "Cloudinary"
      ],
      responsibilities: [
        "Integrated GenAI-powered features including podcast generation, AI summaries, and contextual insight extraction",
        "Built cross-document semantic retrieval to detect related and contextual information across multiple PDFs",
        "Enhanced comprehension using AI-powered contextual retrieval",
        "Containerized the complete application using Docker for scalable and consistent execution"
      ],
      projectImages: [
        "/achievements/adobe/project/479644746-7f0883b1-c43a-42e9-9f68-c12e1e0b708c.png",
        "/achievements/adobe/project/479645728-608a8926-f9e0-4b7a-9d09-f79dd51a4b93.png"
      ],
      projectLink: "/projects/connecting-the-dots",
      certificateLink: "/achievements/adobe/certificate/2b744e4e-436a-4159-9539-6b95c5dd3b51.pdf"
    }
  },
  {
    id: "hackathon-wwt",
    title: "WWT Hackathon '25",
    subtitle: "Winner (Team of 4)",
    category: "Hackathons",
    description: "Voice-powered AI platform designed to help rural farmers and women entrepreneurs sell products online and discover government schemes.",
    date: "July 2025",
    timestamp: "2025-07",
    icon: Trophy,
    details: {
      rank: "Winner",
      team: "Team of 4",
      org: "World Wide Technology & SSF",
      location: "Online",
      problemStatement: "Rural individuals struggle with limited digital literacy, language barriers, and a lack of awareness about complex government schemes and online marketplaces.",
      solution: "Developed Udaan, a truly voice-first AI platform. Users can speak in their native language to auto-generate product listings, receive AI-driven pricing/descriptions, discover government schemes, and share products via WhatsApp.",
      techStack: [
        "Next.js 16", "TypeScript", "Tailwind CSS 4.2", "MongoDB", "Google Gemini", 
        "Groq", "LangChain", "Amazon Polly", "Web Speech API", "Cloudinary", "Serper API", "PyWhatKit"
      ],
      responsibilities: [
        "Integrated GenAI workflows for product descriptions, pricing, and multilingual voice assistance",
        "Developed voice-first interaction flows using Speech Recognition and Amazon Polly (TTS)",
        "Built personalized government scheme recommendation engines based on user profiles",
        "Managed deployment architecture and backend AI integrations for smooth platform execution"
      ],
      projectImages: [
        "/achievements/wwt/project/image.png",
        "/achievements/wwt/project/image (1).png",
        "/achievements/wwt/project/image (2).png"
      ],
      teamImages: [
        "/achievements/wwt/team/WhatsApp Image 2026-05-12 at 7.49.26 PM.jpeg",
        "/achievements/wwt/team/WhatsApp Image 2026-05-12 at 7.54.55 PM.jpeg"
      ],
      certificateLink: "/achievements/wwt/certificate/First Position WWT Certificate_Divya Jaisansaria.pdf",
      projectLink: "/projects/udaan-voice-ai"
    }
  }
]
