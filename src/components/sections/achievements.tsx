import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutGrid, List as ListIcon, Search, ChevronDown, SlidersHorizontal } from "lucide-react"
import { achievements, Achievement } from "@/data/achievements"
import { AchievementCard } from "./achievements/achievement-card"
import { AchievementDetail } from "./achievements/achievement-detail"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface AchievementsSectionProps {
  activeFile?: string
  setActiveFile?: (id: string) => void
}

type CategoryType = 'All Categories' | 'Hackathons' | 'Publications' | 'Certifications'

export function AchievementsSection({ activeFile, setActiveFile }: AchievementsSectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<CategoryType>('All Categories')

  const handleItemClick = (id: string) => {
    setActiveFile?.(id)
  }

  const filteredAndSortedItems = useMemo(() => {
    let items = [...achievements]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      items = items.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      )
    }

    if (categoryFilter !== 'All Categories') {
      items = items.filter(item => item.category === categoryFilter)
    }

    items.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return items
  }, [searchQuery, categoryFilter, sortOrder])

  const renderHeader = (title: string, description: string) => (
    <div className="space-y-3 mb-8 pt-6 font-sans">
      {/* 1. Advanced Controls Hub */}
      <div className="flex flex-col lg:flex-row items-center gap-2 w-full">
        {/* Search Bar */}
        <div className="relative w-full lg:flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="h-8 pl-9 pr-4 bg-muted/10 border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40 rounded-none text-xs font-medium placeholder:text-muted-foreground/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Category Dropdown */}
          <div className="relative group flex-1 lg:flex-none min-w-[130px]">
             <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CategoryType)}
              className="w-full h-8 pl-3 pr-8 bg-muted/10 border border-border/60 rounded-none text-[11px] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all cursor-pointer"
             >
                <option value="All Categories">All Categories</option>
                <option value="Hackathons">Hackathons</option>
                <option value="Publications">Research Papers</option>
                <option value="Certifications">Certifications</option>
             </select>
             <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/60 pointer-events-none group-hover:text-primary transition-colors" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative group flex-1 lg:flex-none min-w-[130px]">
             <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="w-full h-8 pl-3 pr-8 bg-muted/10 border border-border/60 rounded-none text-[11px] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all cursor-pointer"
             >
                <option value="newest">Latest First</option>
                <option value="oldest">Oldest First</option>
             </select>
             <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/60 pointer-events-none group-hover:text-primary transition-colors" />
          </div>

          {/* View Mode Toggles */}
          <div className="flex items-center bg-muted/10 border border-border/60 p-0.5 rounded-none h-8">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "h-full px-2 transition-all rounded-none",
                viewMode === 'grid' ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "h-full px-2 transition-all rounded-none",
                viewMode === 'list' ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
              title="List View"
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* 2. Title & Description */}
      <div className="space-y-1 pb-1">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-none text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground max-w-xl text-sm font-medium opacity-80">
          {description}
        </p>
      </div>
    </div>
  )

  const renderItems = (items: Achievement[]) => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${sortOrder}-${categoryFilter}-${searchQuery}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="font-sans"
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-none bg-muted/5">
              <SlidersHorizontal className="w-10 h-10 text-muted-foreground/20 mb-3" />
              <p className="text-sm font-medium text-muted-foreground text-center">No achievements match your search.</p>
              <button 
                onClick={() => {setSearchQuery(""); setCategoryFilter('All Categories')}}
                className="mt-3 text-xs font-semibold text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 pb-12">
              {items.map((item, idx) => (
                <AchievementCard 
                  key={item.id} 
                  item={item} 
                  idx={idx} 
                  onClick={handleItemClick} 
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2 pb-12">
              {items.map((item, idx) => (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="p-5 border border-border bg-card/10 hover:bg-primary/[0.02] transition-all flex items-center justify-between group cursor-pointer rounded-none"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 border border-border bg-muted/20 flex items-center justify-center group-hover:border-primary transition-colors rounded-none">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="text-[11px] font-bold text-primary bg-primary/5 px-2 py-0.5 border border-primary/20">{item.date}</span>
                    <span className="text-[11px] font-medium text-muted-foreground">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    )
  }

  const renderContent = () => {
    if (!activeFile || activeFile === "overview") {
      return (
        <section className="space-y-2">
          {renderHeader("Awards & Recognition", "A collection of my technical awards, hackathon wins, and research publications.")}
          {renderItems(filteredAndSortedItems)}
        </section>
      )
    }

    const categoryMap: Record<string, CategoryType> = {
      'hackathons-main': 'Hackathons',
      'papers-main': 'Publications',
      'certifications-main': 'Certifications'
    }

    if (categoryMap[activeFile]) {
      const category = categoryMap[activeFile]
      const descriptionMap = {
        'Hackathons': "Full-scale applications built in high-pressure competitive environments.",
        'Publications': "Research papers and technical publications on software and AI.",
        'Certifications': "Professional certifications from industry-leading organizations."
      }
      
      return (
        <section className="space-y-2">
          {renderHeader(category === 'Publications' ? 'Research Papers' : category, descriptionMap[category])}
          {renderItems(filteredAndSortedItems.filter(a => a.category === category))}
        </section>
      )
    }

    const selectedItem = achievements.find(a => a.id === activeFile)
    if (selectedItem) {
      return <AchievementDetail item={selectedItem} />
    }

    return null
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFile || "overview"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
