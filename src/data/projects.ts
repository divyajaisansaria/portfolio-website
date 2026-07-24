import { Activity, MessageSquare, Network, Rocket, Palette, LucideIcon } from "lucide-react"

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  category: string
  github: string
  live: string
  image: string
  featured?: boolean
  icon: LucideIcon,
  images?: string[]
  role?: string
  date?: string
  problem?: string
  solution?: string
  features?: { title: string; description: string }[]
  paperLink?: string
}

export const projects: Project[] = [
  {
    id: "eeg-depression-detection",
    title: "EEG-Based Depression Detection",
    description: "A comparative study analyzing multichannel EEG signals using traditional ML and a hybrid CNN-BiLSTM model to accurately diagnose Major Depressive Disorder.",
    tech: ["Python", "TensorFlow/Keras", "MNE-Python", "Machine Learning", "CNN-BiLSTM", "Signal Processing"],
    category: "AI/ML Models",
    github: "https://github.com/divyajaisansaria/EEG_Depression_Detection.git",
    live: "#",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    featured: true,
    icon: Activity,
    role: "Co-Author & Presenter",
    date: "Sep 2025 - Mar 2026",
    problem: "Diagnosing depression heavily relies on subjective clinical interviews (like HAM-D or PHQ-9). While EEG offers a data-driven approach, extracting meaningful features from its complex, noisy, and non-stationary signals remains a major challenge for traditional machine learning models.",
    solution: "We developed an end-to-end automated framework utilizing a hybrid 1D CNN and BiLSTM architecture. The CNN extracts spatial features across 128 channels, while the BiLSTM captures temporal dependencies. This deep learning approach outperformed traditional models (XGBoost, RF, LR), achieving 96.2% accuracy.",
    images: [
      "/project/depression_paper/module 1 .jpeg",
      "/project/depression_paper/module 2 .jpeg"
    ],
    paperLink: "https://drive.google.com/file/d/1DTmPrKLnoaTXg6SwQT7ZyOft7IhujbAM/view?usp=sharing",
    features: [
      {
        title: "Robust Preprocessing Pipeline",
        description: "Implemented an end-to-end MNE-Python pipeline using Band-Pass Filtering, Common Average Referencing (CAR), and Independent Component Analysis (ICA) for artifact removal."
      },
      {
        title: "Hybrid Deep Learning Architecture",
        description: "Designed a sequential CNN-BiLSTM model that automatically learns hierarchical spatiotemporal features from preprocessed EEG data without manual feature extraction."
      },
      {
        title: "State-of-the-Art Accuracy",
        description: "Achieved an overall accuracy of 96.2% and a balanced F1-score of 0.95 on the MODMA dataset, surpassing the top-performing traditional XGBoost model (94.8%)."
      },
      {
        title: "Comprehensive ML Comparison",
        description: "Extracted time-domain and frequency-domain (Welch PSD) features to establish a robust comparative baseline across XGBoost, Random Forest, and Logistic Regression models."
      }
    ]
  },
  {
    id: "adani-query-ai",
    title: "Adani Query AI",
    description: "[Description needed: Tell me what this RAG system does and who it's for.]",
    tech: ["Python", "LangChain", "Vector DB", "LLMs"],
    category: "RAG Systems",
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    icon: MessageSquare
  },
  {
    id: "connecting-the-dots",
    title: "Connecting the Dots",
    description: "[Description needed: Briefly describe this AI/ML project.]",
    tech: ["Machine Learning", "Python", "Data Processing"],
    category: "AI/ML Models",
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    icon: Network
  },
  {
    id: "udaan",
    title: "Udaan",
    description: "[Description needed: Briefly describe what Udaan is.]",
    tech: ["AI", "React", "Node.js"],
    category: "AI/ML Models",
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    icon: Rocket
  },
  {
    id: "kashvi-creations",
    title: "Kashvi Creations",
    description: "[Description needed: Describe this Full Stack application.]",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    category: "Full Stack",
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
    icon: Palette
  }
]
