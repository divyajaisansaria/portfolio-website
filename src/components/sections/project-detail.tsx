import React from "react"
import { motion } from "framer-motion"
import { ExternalLink, Code, Calendar, Tag, User, Star, Cpu, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Project } from "@/data/projects"

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
  featuredId?: string;
  setFeaturedId?: (id: string) => void;
}

export function ProjectDetailView({ project, onBack, featuredId, setFeaturedId }: ProjectDetailViewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto space-y-12 pb-20 pt-8 font-sans"
    >
      {/* 1. Hero Section (Title & Stats Bar) */}
      <div className="relative space-y-8">
        <div className="flex flex-col gap-6 relative">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-primary"
            >
              <div className="h-[2px] w-8 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{project.category}</span>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              {project.live && project.live !== "#" && (
                <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 h-9 px-4 rounded-none bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
              {project.paperLink && (
                <a href={project.paperLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 h-9 px-4 rounded-none border border-primary bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Read Paper
                </a>
              )}
              {project.github && project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 h-9 px-4 rounded-none border border-border bg-background text-foreground text-xs font-bold uppercase tracking-widest hover:bg-muted/30 transition-all">
                  <Code className="w-3.5 h-3.5" />
                  Source
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] text-foreground"
            >
              {project.title}
            </motion.h1>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${featuredId===project.id ? 'text-yellow-400' : 'text-primary'}`}
              onClick={() => setFeaturedId?.(project.id)}
              title="Set as Featured"
            >
              <Star className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-border py-4">
            {project.date && (
              <>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium uppercase tracking-widest">{project.date}</span>
                </div>
                <div className="w-px h-4 bg-border hidden sm:block" />
              </>
            )}
            {project.role && (
              <>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium uppercase tracking-widest">{project.role}</span>
                </div>
                <div className="w-px h-4 bg-border hidden sm:block" />
              </>
            )}
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground uppercase tracking-widest">{project.category}</span>
            </div>
          </div>
        </div>
      </div>


      {/* 2b. Paper Figures */}
      <div className="mt-12">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Paper Figures
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Figure ${idx + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform hover:scale-105"
            />
          ))}
        </div>
      </div>

      {/* 3. Tech Stack Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map(t => (
          <Badge key={t} variant="secondary" className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-none border border-border bg-background">
            {t}
          </Badge>
        ))}
      </div>

      {/* 4. Problem & Solution - Side by Side (Like Achievements) */}
      {(project.problem || project.solution) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mt-12">
          {project.problem && (
            <div className="p-8 lg:p-10 bg-background space-y-6">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-primary" />
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">The Problem</h3>
              </div>
                <p className="text-sm font-bold text-foreground leading-relaxed">
                  {project.problem}
                </p>
            </div>
          )}
          
          {project.solution && (
            <div className="p-8 lg:p-10 bg-background space-y-6">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-primary" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">The Solution</h3>
              </div>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. Key Features List */}
      {project.features && project.features.length > 0 && (
        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-3 px-2 border-l-4 border-primary pl-6">
            <h3 className="text-xl font-bold tracking-tight">Key Highlights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.features.map((feature, i) => (
              <div key={i} className="p-6 border border-border bg-muted/5 group hover:bg-primary/[0.02] transition-all">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-base group-hover:text-primary transition-colors">{feature.title}</h4>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </motion.section>
  )
}

