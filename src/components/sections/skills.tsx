"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Code2, 
  Terminal, 
  Layers, 
  Cpu, 
  Database, 
  Settings, 
  Globe
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: LayoutDashboard,
    skills: ["React.js", "Next.js 14", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js"],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/20"
  },
  {
    title: "Backend & Systems",
    icon: Database,
    skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Prisma"],
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/20"
  },
  {
    title: "AI & Machine Learning",
    icon: Cpu,
    skills: ["Gemini AI", "LangChain", "RAG Systems", "Vector DBs", "OpenAI", "PyTorch"],
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/20"
  },
  {
    title: "DevOps & Tools",
    icon: Settings,
    skills: ["Docker", "AWS", "Git", "Vercel", "Linux", "CI/CD"],
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/20"
  }
]

import { LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

export function SkillsSection() {
  return (
    <section id="skills" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl lg:text-4xl font-heading font-black tracking-tight">Technical <span className="text-primary">Arsenal</span></h2>
        <p className="text-muted-foreground max-w-2xl">A curated list of technologies I use to build robust and scalable solutions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "p-8 rounded-3xl border bg-card/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500",
              category.borderColor
            )}
          >
            {/* Background Glow */}
            <div className={cn(
              "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10",
              category.color
            )} />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-background shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-heading">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <Badge 
                    key={sIdx} 
                    variant="outline" 
                    className="px-3 py-1 rounded-lg bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-muted-foreground/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
