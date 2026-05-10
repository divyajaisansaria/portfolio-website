"use client"

import React from "react"
import { motion } from "framer-motion"
import { Download, Sparkles, Code2, Rocket } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TechIcon = ({ icon: Icon, className }: { icon: any; className?: string }) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={cn(
      "absolute p-3 rounded-2xl glass shadow-lg backdrop-blur-xl z-20",
      className
    )}
  >
    <Icon className="w-6 h-6 text-primary" />
  </motion.div>
)

export function AboutSection() {
  return (
    <section id="about" className="relative min-h-[70vh] flex flex-col justify-center">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase"
          >
            <Sparkles className="w-3 h-3" />
            <span>Open to opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-heading font-black tracking-tight"
          >
            Building the <span className="text-gradient">Future</span> of AI & Web.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            I'm a full-stack developer passionate about creating high-performance, 
            intelligent web applications. Specializing in RAG systems, 
            interactive UIs, and scalable architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="rounded-2xl h-14 px-8 text-md font-bold gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
              <Rocket className="w-5 h-5" />
              View My Work
            </Button>
            <a 
              href="/resume.pdf" 
              download="Divya_Jaisansaria_Resume.pdf"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-2xl h-14 px-8 text-md font-bold gap-2 hover:bg-muted transition-all duration-300"
              )}
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Hero Illustration / Image Area */}
        <div className="relative flex-1 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-80 h-80 lg:w-[450px] lg:h-[450px]"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
            
            {/* Main Circle */}
            <div className="absolute inset-4 rounded-3xl border border-primary/20 bg-card/40 backdrop-blur-3xl shadow-2xl overflow-hidden group">
               <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000" 
                alt="Workspace" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
            </div>

            {/* Floating Icons */}
            <TechIcon icon={Code2} className="-top-4 -left-4" />
            <TechIcon icon={Rocket} className="top-1/4 -right-8" />
            <div className="absolute -bottom-8 left-1/4 p-4 rounded-2xl glass-dark shadow-2xl z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary">5+</div>
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Years of</div>
                  <div className="text-sm font-bold">Experience</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
