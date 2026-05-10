"use client"

import React from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    company: "TechNova Solutions",
    role: "Senior Full Stack Intern",
    duration: "Jan 2024 - Present",
    location: "Remote",
    description: "Leading the development of a microservices-based architecture for high-traffic e-commerce platforms. Optimized database queries resulting in a 40% reduction in load times.",
    tech: ["Next.js", "Go", "Docker", "Redis"]
  },
  {
    company: "AI Research Lab",
    role: "NLP Research Intern",
    duration: "June 2023 - Dec 2023",
    location: "Bangalore, India",
    description: "Developed and fine-tuned LLMs for specialized domain tasks. Implemented a robust RAG pipeline using LangChain and Pinecone.",
    tech: ["Python", "PyTorch", "LangChain", "Vector DB"]
  },
  {
    company: "Freelance Developer",
    role: "Full Stack Engineer",
    duration: "2022 - 2023",
    location: "Worldwide",
    description: "Built custom web solutions for international clients focusing on performance and SEO. Delivered 10+ successful projects across various industries.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"]
  }
]

export function ExperienceSection() {
  return (
    <section id="experience" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl lg:text-4xl font-heading font-black tracking-tight">Professional <span className="text-primary">Journey</span></h2>
        <p className="text-muted-foreground max-w-2xl">My career path and the companies I've had the pleasure to work with.</p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-muted text-primary shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2">
              <Briefcase className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 lg:p-8 rounded-[2rem] border bg-card/20 backdrop-blur-xl shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold font-heading">{exp.role}</h3>
                  <Badge variant="secondary" className="w-fit rounded-lg">{exp.duration}</Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ExternalLink className="w-3 h-3 text-primary" />
                    </div>
                    <span>{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed italic">{exp.description}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="text-[10px] font-black uppercase tracking-widest text-primary/60">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
