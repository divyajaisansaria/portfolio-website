import React from "react"
import { ArrowUpRight } from "lucide-react"
import { Achievement } from "@/data/achievements"

interface AchievementListProps {
  category: string
  items: Achievement[]
  onItemClick: (id: string) => void
}

export const AchievementList = ({ category, items, onItemClick }: AchievementListProps) => {
  return (
    <section className="space-y-8 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-heading font-black tracking-tight capitalize">{category}</h2>
        <p className="text-muted-foreground">Detailed list of all {category} achievements and participations.</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => onItemClick(item.id)}
            className="p-6 rounded-2xl border bg-card/10 hover:bg-primary/5 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-primary block">{item.date}</span>
              <button className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-1">
                View Details <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
