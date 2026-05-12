import React from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, CheckCircle2, Trophy, Users, Briefcase } from "lucide-react"
import { experiences } from "@/data/experience"
import { cn } from "@/lib/utils"

export function ExperienceSection() {
  return (
    <section id="experience" className="space-y-16  font-sans">
      <div className="space-y-4">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Experience & Leadership
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg font-medium opacity-80">
          A track record of technical internships and community leadership roles.
        </p>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-0 before:left-5 md:before:left-1/2 before:-translate-x-px before:h-full before:w-[1px] before:bg-border/60">
        {[...experiences].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()).map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2, margin: "-100px 0px -100px 0px" }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-start md:odd:flex-row-reverse group"
          >
            {/* Timeline Dot */}
            <div className="absolute left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-background group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500 z-10">
              <exp.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            {/* Content Card */}
            <div className="ml-16 md:ml-0 md:w-[calc(50%-3rem)] p-8 border border-border/50 rounded-xl bg-card/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group-hover:bg-primary/[0.01]">
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-primary bg-primary/5 px-2 py-0.5 border border-primary/20 rounded-md w-fit">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.duration}</span>
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-foreground">{exp.role}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="text-foreground font-bold">{exp.company}</span>
                    </div>
                    <div className="h-4 w-px bg-border/60" />
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 opacity-60" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground font-medium leading-relaxed opacity-90">
                  {exp.description}
                </p>

                {/* Contributions */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Key Contributions</h4>
                  <ul className="space-y-2.5">
                    {exp.contributions.map((contribution, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-3 text-sm text-muted-foreground group/li">
                        <CheckCircle2 className="w-4 h-4 text-primary/40 mt-0.5 flex-shrink-0 group-hover/li:text-primary transition-colors" />
                        <span className="group-hover/li:text-foreground transition-colors leading-relaxed">{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack / Focus Areas */}
                {(exp.tech || exp.focusAreas) && (
                  <div className="pt-4 border-t border-border/30">
                     <div className="flex flex-wrap gap-2">
                        {(exp.tech || exp.focusAreas)?.map((item) => (
                          <span 
                            key={item} 
                            className="px-2 py-1 bg-muted/30 border border-border/60 rounded-md text-[10px] font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
                          >
                            {item}
                          </span>
                        ))}
                     </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
