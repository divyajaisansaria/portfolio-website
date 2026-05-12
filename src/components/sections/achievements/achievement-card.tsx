import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Trophy, FileText, Award } from "lucide-react"
import { Achievement } from "@/data/achievements"
import { cn } from "@/lib/utils"

interface AchievementCardProps {
  item: Achievement
  idx: number
  onClick: (id: string) => void
}

export const AchievementCard = ({ item, idx, onClick }: AchievementCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7,
        delay: idx * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group"
      onClick={() => onClick(item.id)}
    >
      <div className="relative h-full transition-all duration-500 hover:-translate-y-1 cursor-pointer">
        {/* Shadow Bloom Effect on Hover */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10" />
        
        <Card className="h-full rounded-none border border-border/50 bg-card/20 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 overflow-hidden">
          <CardContent className="p-7 flex flex-col h-full space-y-5">
            {/* Top Bar: Icon and Date */}
            <div className="flex items-start justify-between">
              <div className="p-2.5 bg-muted/20 border border-border/40 group-hover:border-primary/40 group-hover:bg-primary/[0.03] transition-all duration-500">
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-semibold text-muted-foreground/60 tracking-wider">
                  {item.date}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                   {item.details?.rank && (
                    <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold bg-primary/10 text-primary border border-primary/20">
                      {item.details.rank}
                    </span>
                  )}
                  <span className="text-[10px] font-medium text-muted-foreground opacity-60">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
              </div>
              
              <p className="text-xs text-muted-foreground font-medium leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                {item.description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-foreground/70">View Case Study</span>
              </div>
              <div className="w-6 h-6 flex items-center justify-center border border-border/60 group-hover:border-primary/60 group-hover:bg-primary text-muted-foreground group-hover:text-primary-foreground transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
