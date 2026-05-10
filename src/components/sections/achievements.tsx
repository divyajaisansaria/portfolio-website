"use client"

import React from "react"
import { motion } from "framer-motion"
import { Trophy, Award, FileText, Star, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const achievements = [
  {
    title: "Global AI Hackathon 2024",
    subtitle: "First Place Winner",
    category: "Hackathons",
    description: "Led a team of 4 to build an automated emergency response system using multimodal LLMs.",
    date: "March 2024",
    icon: Trophy
  },
  {
    title: "Multimodal RAG Optimization",
    subtitle: "Research Paper Published",
    category: "Publications",
    description: "Published in IEEE journal focusing on efficient table extraction from complex PDF documents.",
    date: "Dec 2023",
    icon: FileText
  },
  {
    title: "Google Cloud Professional",
    subtitle: "Certified Cloud Architect",
    category: "Certifications",
    description: "Demonstrated expertise in designing and managing robust GCP infrastructure.",
    date: "August 2023",
    icon: Award
  }
]

export function AchievementsSection() {
  return (
    <section id="achievements" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl lg:text-4xl font-heading font-black tracking-tight">Milestones & <span className="text-primary">Impact</span></h2>
        <p className="text-muted-foreground max-w-2xl">Recognition of technical contributions and continuous learning journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <Card className="h-full rounded-[2rem] border-muted-foreground/10 bg-card/20 backdrop-blur-xl hover:bg-primary/5 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
              
              <CardContent className="p-8 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{item.category}</span>
                    <span className="text-[10px] font-bold text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm font-medium text-foreground/80 italic">{item.subtitle}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats Counter Area */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
        {[
          { label: "Projects Completed", value: "25+" },
          { label: "Github Stars", value: "1.2k" },
          { label: "Hackathons Won", value: "3" },
          { label: "Lines of Code", value: "100k+" }
        ].map((stat, idx) => (
          <div key={idx} className="p-6 rounded-[1.5rem] border bg-card/20 backdrop-blur-xl text-center space-y-1">
            <div className="text-3xl font-black font-heading text-primary">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
