"use client"

import React, { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion"
import { 
  Download, 
  Sparkles, 
  Code2, 
  Rocket, 
  Briefcase, 
  Users, 
  Star, 
  GitBranch, 
  Terminal,
  GraduationCap,
  Quote,
  RefreshCw,
  Copy,
  Check,
  Zap,
  BarChart3,
  ArrowRight
} from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SkillsSection } from "./skills"

const Counter = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/[0-9]/g, "")
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, numericValue, { 
      duration: 2,
      ease: "easeOut",
      delay: 0.5
    })
    return controls.stop
  }, [numericValue, count])

  return (
    <motion.span>{rounded}</motion.span>
  )
}

const HighlightCard = ({ label, value, index, icon: Icon }: { label: string; value: string; index: number; icon: any }) => {
  const suffix = value.replace(/[0-9]/g, "")
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      className="relative p-6 rounded-3xl bg-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-500">
        <Icon className="w-16 h-16 text-primary" />
      </div>
      <div className="relative z-10">
        <div className="text-3xl font-black text-primary mb-2 tracking-tighter group-hover:translate-x-1 transition-transform">
          <Counter value={value} />{suffix}
        </div>
        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] leading-tight">{label}</div>
      </div>
    </motion.div>
  )
}

const DashboardCard = ({ 
  title, 
  tag, 
  icon: Icon, 
  footerLeft, 
  footerRight,
  children,
  className 
}: { 
  title: string; 
  tag: string; 
  icon?: any; 
  footerLeft?: React.ReactNode; 
  footerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "p-10 rounded-[3rem] bg-card/20 backdrop-blur-xl border border-border/40 flex flex-col justify-between min-h-[360px] group transition-all duration-500",
      className
    )}
  >
    <div className="flex justify-between items-start">
      {title && (
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500">
            {Icon && <Icon className="w-5 h-5" />}
          </div>
          <span className="text-[11px] font-black tracking-[0.25em] uppercase text-muted-foreground/60">{title}</span>
        </div>
      )}
      {tag && <span className="text-[11px] font-black tracking-[0.25em] uppercase text-muted-foreground/30">{tag}</span>}
    </div>

    <div className="py-10">
      {children}
    </div>

    {(footerLeft || footerRight) && (
      <div className="flex justify-between items-end border-t border-border/10 pt-8">
        {footerLeft}
        {footerRight}
      </div>
    )}
  </motion.div>
)

const SkillBar = ({ label, percentage, delay, color }: { label: string; percentage: number; delay: number; color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground/80">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        className={cn("h-full rounded-full transition-all duration-500", color)}
      />
    </div>
  </div>
)

export function AboutSection({ setActiveSection }: { setActiveSection?: (id: string) => void }) {
  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section id="about" className="relative">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Main Content Area: Bio */}
          <div className="flex-[2] space-y-12">
            <div className="flex flex-wrap gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 shadow-sm shadow-blue-500/5"
              >
                <span className="text-xs font-bold tracking-wide uppercase">Intern @ Wells Fargo</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shadow-sm shadow-emerald-500/5"
              >
                <span className="text-xs font-bold tracking-wide uppercase">Former Intern @ Genus</span>
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-sans font-black tracking-tight leading-[1.05]"
              >
                Building Impactful <br />
                <span className="text-gradient">AI</span> Solutions.
              </motion.h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed text-lg italic">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6 not-italic font-medium"
                >
                  <p>
                    I’m an AI/ML enthusiast who loves building real-world tech solutions that are practical and impactful. 
                    I’m currently pursuing B.Tech in Artificial Intelligence at <strong className="text-foreground">SVNIT Surat</strong>, where I’ve worked on projects 
                    involving Generative AI, RAG systems, and intelligent automation.
                  </p>
                  <p>
                    I enjoy exploring ideas through hackathons, research, and hands-on projects. Over time, I’ve built AI-powered platforms 
                    ranging from multilingual chatbot systems to document intelligence tools.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6 not-italic text-base opacity-80"
                >
                  <p>
                    I’ve also worked on research in deep learning and healthcare AI, including a published paper on EEG-based depression detection.
                    Apart from tech, I’ve been actively involved in leadership roles, growing as a developer and team player. 
                  </p>
                  <p>
                    I’ve participated in 25+ national-level hackathons, earning multiple wins while collaborating with amazing teams under pressure.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Profile & Quick Stats Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full space-y-8 lg:sticky lg:top-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-[280px] mx-auto rounded-[2.5rem] overflow-hidden border-4 border-background shadow-2xl group"
            >
              <img 
                src="/images/profile.jpeg" 
                alt="Divya Jaisansaria" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
                <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Open to Work</span>
              </div>
            </motion.div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <HighlightCard index={1} label="Major Projects" value="10+" icon={Rocket} />
              <HighlightCard index={2} label="Hackathon Wins" value="3+" icon={Star} />
              <HighlightCard index={3} label="GitHub Contributions" value="150+" icon={GitBranch} />
              <HighlightCard index={4} label="Coding Problems" value="300+" icon={Terminal} />
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3"
            >
              <Button 
                size="lg" 
                onClick={() => setActiveSection?.("projects")}
                className="w-full rounded-2xl h-14 px-8 text-md font-bold gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
              >
                <Rocket className="w-5 h-5" />
                Explore Projects
              </Button>
              <a 
                href="/resume.pdf" 
                download="Divya_Jaisansaria_Resume.pdf"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full rounded-2xl h-14 px-8 text-md font-bold gap-3 hover:bg-muted transition-all duration-300"
                )}
              >
                <Download className="w-5 h-5" />
                Get Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Grid: Education & Top Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardCard
          title="Education"
          tag="SVNIT"
          icon={GraduationCap}
          footerLeft={
            <div className="space-y-1">
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Class of</div>
              <div className="text-2xl font-black">2027</div>
            </div>
          }
          footerRight={
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">
              Surat, Gujarat
            </div>
          }
        >
          <h3 className="text-3xl lg:text-4xl font-sans font-black leading-tight tracking-tight group-hover:text-primary transition-colors">
            Sardar Vallabhbhai <br />
            National Institute <br />
            of Technology
          </h3>
          <p className="mt-4 text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Department of Artificial Intelligence
          </p>
        </DashboardCard>

        <DashboardCard
          title="Top Skills"
          tag="STACK"
          icon={BarChart3}
          footerLeft={
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              Core Expertise
            </div>
          }
          footerRight={null}
        >
          <div className="space-y-5">
            <SkillBar label="C++" percentage={90} delay={0.1} color="bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]" />
            <SkillBar label="LangChain" percentage={95} delay={0.2} color="bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
            <SkillBar label="AI Workflows" percentage={85} delay={0.3} color="bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]" />
            <SkillBar label="ML/DL" percentage={88} delay={0.4} color="bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]" />
            <SkillBar label="Next.js" percentage={80} delay={0.5} color="bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.4)]" />
          </div>
        </DashboardCard>
      </div>

      <SkillsSection />

      {/* Replaced: Final CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full p-10 lg:p-14 rounded-[3rem] bg-card/20 border border-border/40 backdrop-blur-xl flex flex-col items-center text-center gap-8 overflow-hidden relative group"
      >
        {/* Background Ambience - More subtle */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/5 blur-[80px] rounded-full" />

        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-muted/40 border border-border/40 text-[10px] font-black uppercase tracking-[0.15em]">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Available for work</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-black tracking-tight max-w-2xl leading-[1.2]">
          Let's create something <br />
          new for big move
        </h2>

        <Button 
          size="lg" 
          onClick={() => setActiveSection?.("contact")}
          className="rounded-full px-10 h-14 text-sm font-black gap-2 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
        >
          Get In Touch
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  )
}
