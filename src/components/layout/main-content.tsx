"use client"

import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, LayoutGrid, List, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MainContentProps {
  children: React.ReactNode
  activeSection: string
  searchQuery: string
  setSearchQuery: (val: string) => void
  setIsMobileMenuOpen?: (val: boolean) => void
  activeFile?: string
}

export function MainContent({ children, activeSection, searchQuery, setSearchQuery, setIsMobileMenuOpen, activeFile }: MainContentProps) {
  const showHeader = activeSection !== "about" && activeSection !== "contact" && activeSection !== "achievements" && activeSection !== "experience" && activeSection !== "projects"
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to top on section change
  React.useEffect(() => {
    const viewport = scrollRef.current?.querySelector('[data-slot="scroll-area-viewport"]')
    if (viewport) {
      viewport.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeSection])

  return (
    <main className="flex-1 h-screen overflow-hidden bg-background relative flex flex-col min-w-0">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-3 md:p-4 border-b bg-background/80 backdrop-blur-xl z-30 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(true)} className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <span className="text-sm font-bold tracking-tight text-foreground capitalize">{activeSection}</span>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-border/50">
          <img src="/images/profile.jpeg" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Search Header - Sticky-style (Hidden on mobile) */}
      {showHeader && (
        <div className="hidden md:flex h-[72px] px-8 border-b bg-background/50 backdrop-blur-xl items-center justify-between gap-4 z-20 shrink-0">
          <div className="relative flex-1 max-w-2xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder={`Search ${activeSection}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-11 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-sm rounded-xl transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-1.5 py-1 rounded bg-muted border text-[10px] font-bold text-muted-foreground uppercase">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-xl border-muted bg-muted/20">
              <Filter className="w-4 h-4" />
            </Button>
            <div className="h-6 w-px bg-border mx-1" />
            <Button variant="outline" size="icon" className="rounded-xl border-muted bg-muted/20">
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] -z-10 rounded-full" />

        <ScrollArea ref={scrollRef} className="h-full">
          <div className={cn(
            "mx-auto px-4 md:px-8 transition-all duration-500",
            (activeSection === "about" || activeSection === "contact" || activeSection === "experience") ? "max-w-5xl py-8 md:py-12" : "max-w-4xl",
            activeSection === "achievements" ? "pt-0 pb-8 md:pb-12" : "py-8 md:py-12"
          )}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
    </main>
  )
}
