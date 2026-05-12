"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Cpu, 
  Bot, 
  Network, 
  SquareTerminal, 
  BrainCircuit, 
  Workflow, 
  Boxes,
  Zap,
  Layers
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "programming", label: "Programming Languages" },
  { id: "frontend", label: "Frontend / Web" },
  { id: "backend", label: "Backend / APIs" },
  { id: "ai_ml", label: "AI / Machine Learning" },
  { id: "libraries", label: "Libraries & Tools" },
  { id: "core", label: "Core Subjects" },
  { id: "dev_tools", label: "Developer Tools" },
  { id: "database", label: "Databases" },
]

interface Skill {
  name: string
  icon?: string
  lucideIcon?: any
}

const skillsData: Record<string, Skill[]> = {
  programming: [
    { name: "C", icon: "https://cdn.simpleicons.org/c" },
    { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus" },
    { name: "Python", icon: "https://cdn.simpleicons.org/python" },
    { name: "Javascript", icon: "https://cdn.simpleicons.org/javascript" },
  ],
  frontend: [
    { name: "HTML", icon: "https://cdn.simpleicons.org/html5" },
    { name: "CSS", icon: "https://cdn.simpleicons.org/css3" },
    { name: "React", icon: "https://cdn.simpleicons.org/react" },
    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
    { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss" },
  ],
  backend: [
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
    { name: "Express", icon: "https://cdn.simpleicons.org/express" },
    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
  ],
  ai_ml: [
    { name: "Generative AI", lucideIcon: Cpu },
    { name: "Large Language Models", lucideIcon: Bot },
    { name: "Agentic Workflows", lucideIcon: Workflow },
    { name: "MCPs", lucideIcon: SquareTerminal },
    { name: "RAG", lucideIcon: BrainCircuit },
    { name: "Machine Learning", lucideIcon: Boxes },
    { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain" },
  ],
  libraries: [
    { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy" },
    { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas" },
    { name: "Scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn" },
    { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
    { name: "Cloudinary", icon: "https://cdn.simpleicons.org/cloudinary" },
  ],
  core: [
    { name: "DSA", lucideIcon: Layers },
    { name: "DBMS", lucideIcon: Zap },
    { name: "OOP", lucideIcon: Boxes },
    { name: "Machine Learning", lucideIcon: Boxes },
    { name: "Deep Learning", lucideIcon: BrainCircuit },
    { name: "NLP", lucideIcon: Workflow },
    { name: "Reinforcement Learning", lucideIcon: BrainCircuit },
  ],
  dev_tools: [
    { name: "Git", icon: "https://cdn.simpleicons.org/git" },
    { name: "GitHub", icon: "https://cdn.simpleicons.org/github" },
    { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode" },
    { name: "Postman", icon: "https://cdn.simpleicons.org/postman" },
  ],
  database: [
    { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
    { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql" },
  ]
}

const SkillIcon = ({ skill }: { skill: Skill }) => {
  const [error, setError] = useState(false)

  if (skill.lucideIcon) {
    const Icon = skill.lucideIcon
    return <Icon className="w-8 h-8 text-primary transition-all duration-500 group-hover:scale-110" />
  }

  if (skill.icon && !error) {
    return (
      <img 
        src={skill.icon} 
        alt={skill.name} 
        className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(var(--primary),0.3)] group-hover:drop-shadow-[0_0_12px_rgba(var(--primary),0.6)] transition-all duration-500 group-hover:scale-110"
        onError={() => setError(true)}
      />
    )
  }

  return (
    <span className="text-2xl font-black text-primary/40 group-hover:text-primary transition-colors">
      {skill.name.charAt(0)}
    </span>
  )
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("programming")

  return (
    <section id="skills" className="space-y-10 py-4">
      <div className="text-center space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-primary"
        >
          My Skills
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-5xl font-black tracking-tight"
        >
          Technologies & Tools
        </motion.h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </div>

      {/* Tabs Layout */}
      <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-5 py-2.5 rounded-full text-[11px] font-black transition-all duration-300 border uppercase tracking-widest",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                : "bg-card/40 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="min-h-[200px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {skillsData[activeCategory].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group p-8 rounded-[2.5rem] bg-card/20 backdrop-blur-xl border border-border/40 hover:border-primary/40 hover:bg-card/30 transition-all duration-500 flex flex-col items-center justify-center text-center gap-6 min-h-[160px] relative overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-16 h-16 rounded-2xl bg-background/50 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-border/20">
                  <SkillIcon skill={skill} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors relative z-10">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
