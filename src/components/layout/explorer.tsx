"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronRight, 
  ChevronDown,
  Folder, 
  FileCode, 
  FileText, 
  Layers, 
  Cpu, 
  Globe,
  Database,
  Trophy,
  Award,
  Search,
  X,
  Command
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { achievements } from "@/data/achievements"

interface ExplorerItem {
  label: string
  icon: any
  count?: number
  href?: string
  id?: string
  items?: ExplorerItem[]
}

interface FolderProps {
  title: string
  items: ExplorerItem[]
  activeFile?: string
  onFileClick?: (id: string) => void
  level?: number
  searchQuery?: string
}

const FolderSection = ({ title, items, activeFile, onFileClick, level = 0, searchQuery = "" }: FolderProps) => {
  const [isOpen, setIsOpen] = React.useState(true)

  // A folder matches if its own title matches OR any of its children match
  const folderMatches = title.toLowerCase().includes(searchQuery.toLowerCase())
  
  const filteredItems = items.filter(item => {
    // If the parent folder matches, show everything
    if (folderMatches) return true
    
    // Check if the item itself matches
    if (item.label.toLowerCase().includes(searchQuery.toLowerCase())) return true
    
    // If it's a folder, check if any of its descendants match (recursive-like check)
    if (item.items) {
      const checkDescendants = (subItems: ExplorerItem[]): boolean => {
        return subItems.some(sub => 
          sub.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (sub.items && checkDescendants(sub.items))
        )
      }
      return checkDescendants(item.items)
    }
    return false
  })

  const hasItems = filteredItems.length > 0

  if (searchQuery && !folderMatches && filteredItems.length === 0) return null

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-1.5 hover:bg-muted/30 transition-colors group w-full text-left pr-3"
        style={{ paddingLeft: `${level * 18 + 8}px` }}
      >
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {hasItems && (
            isOpen ? (
              <ChevronDown className="w-3 h-3 text-muted-foreground/60 transition-transform" />
            ) : (
              <ChevronRight className="w-3 h-3 text-muted-foreground/60 transition-transform" />
            )
          )}
        </div>
        <Folder className="w-4 h-4 text-primary/60 fill-primary/10 shrink-0" />
        <span className={cn(
          "text-[12.5px] font-medium truncate flex-1",
          level === 0 ? "text-foreground/90" : "text-muted-foreground/90"
        )}>
          {title}
        </span>
        <span className="text-[10px] text-muted-foreground/50 font-medium shrink-0">
          {folderMatches ? items.length : filteredItems.length}
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col"
          >
            {filteredItems.map((item, idx) => {
              if (item.items) {
                return (
                  <FolderSection 
                    key={idx} 
                    title={item.label} 
                    items={item.items} 
                    activeFile={activeFile}
                    onFileClick={onFileClick}
                    level={level + 1}
                    searchQuery={folderMatches ? "" : searchQuery}
                  />
                )
              }

              const isLink = !!item.href
              const Tag = isLink ? 'a' : 'button'
              const isActive = item.id === activeFile
              
              return (
                <Tag
                  key={idx}
                  href={item.href}
                  target={isLink ? "_blank" : undefined}
                  rel={isLink ? "noopener noreferrer" : undefined}
                  onClick={() => !isLink && item.id && onFileClick?.(item.id)}
                  className={cn(
                    "relative flex items-center gap-2.5 py-1.5 transition-all group text-left pr-3",
                    isActive 
                      ? "bg-primary/5 text-primary" 
                      : "hover:bg-muted/20 text-muted-foreground hover:text-foreground"
                  )}
                  style={{ paddingLeft: `${(level + 1) * 18 + 24}px` }}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                  )}
                  <item.icon className={cn(
                    "w-3.5 h-3.5 shrink-0",
                    isActive ? "text-primary" : "opacity-40 group-hover:opacity-100"
                  )} />
                  <span className="text-[12.5px] truncate flex-1 leading-tight">{item.label}</span>
                  {item.count && (
                    <span className="text-[10px] text-muted-foreground/50 font-medium shrink-0">{item.count}</span>
                  )}
                </Tag>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Explorer({ 
  activeSection, 
  activeFile, 
  onFileClick 
}: { 
  activeSection: string
  activeFile?: string
  onFileClick?: (id: string) => void
}) {
  const [searchQuery, setSearchQuery] = React.useState("")

  const getExplorerContent = () => {
    switch (activeSection) {
      case "projects":
        return (
          <FolderSection 
            title="Projects" 
            activeFile={activeFile}
            onFileClick={onFileClick}
            searchQuery={searchQuery}
            items={[
              { id: "all-projects", label: "All Projects", icon: Globe, count: 8 },
              { id: "rag-systems", label: "RAG Systems", icon: Cpu },
              { id: "ai-ml-models", label: "AI/ML Models", icon: Database },
              { id: "e-commerce", label: "E-Commerce", icon: Layers },
              { id: "full-stack", label: "Full Stack", icon: FileCode },
            ]} 
          />
        )
      case "skills":
        return (
          <FolderSection 
            title="Skills & Tools" 
            activeFile={activeFile}
            onFileClick={onFileClick}
            searchQuery={searchQuery}
            items={[
              { id: "frontend", label: "Frontend", icon: FileCode },
              { id: "backend", label: "Backend", icon: Database },
              { id: "devops", label: "DevOps", icon: Globe },
            ]} 
          />
        )
      case "experience":
        return (
          <FolderSection 
            title="Experience" 
            activeFile={activeFile}
            onFileClick={onFileClick}
            searchQuery={searchQuery}
            items={[
              { id: "resume", label: "Resume.pdf", icon: FileText, href: "/resume.pdf" },
              { id: "work-history", label: "Work History", icon: Layers },
            ]} 
          />
        )
      case "achievements":
        const hackathonCount = achievements.filter(a => a.category === "Hackathons").length
        const paperCount = achievements.filter(a => a.category === "Publications").length
        const certCount = achievements.filter(a => a.category === "Certifications").length
        
        const showOverview = !searchQuery || "overview".includes(searchQuery.toLowerCase())
        return (
          <div className="flex flex-col">
            {showOverview && (
              <button
                onClick={() => onFileClick?.("overview")}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 transition-all group text-left",
                  activeFile === "overview" 
                    ? "bg-primary/5 text-primary" 
                    : "hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                )}
              >
                {activeFile === "overview" && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                )}
                <FileText className={cn("w-4 h-4", activeFile === "overview" ? "text-primary" : "opacity-40")} />
                <span className="text-[13px] font-medium flex-1">Overview</span>
                <span className="text-[10px] text-muted-foreground font-medium pr-2">{achievements.length}</span>
              </button>
            )}
            
            <FolderSection 
              title="Hackathons" 
              activeFile={activeFile}
              onFileClick={onFileClick}
              searchQuery={searchQuery}
              items={achievements
                .filter(a => a.category === "Hackathons")
                .map(a => ({ id: a.id, label: a.title, icon: FileText }))
              } 
            />
            <FolderSection 
              title="Research Papers" 
              activeFile={activeFile}
              onFileClick={onFileClick}
              searchQuery={searchQuery}
              items={achievements
                .filter(a => a.category === "Publications")
                .map(a => ({ id: a.id, label: a.title, icon: FileCode }))
              } 
            />
            <FolderSection 
              title="Certifications" 
              activeFile={activeFile}
              onFileClick={onFileClick}
              searchQuery={searchQuery}
              items={achievements
                .filter(a => a.category === "Certifications")
                .map(a => ({ id: a.id, label: a.title, icon: FileText }))
              } 
            />
          </div>
        )
      case "contact":
        return (
          <FolderSection 
            title="Communication" 
            activeFile={activeFile}
            onFileClick={onFileClick}
            searchQuery={searchQuery}
            items={[
              { id: "email", label: "Email", icon: Globe },
              { id: "socials", label: "Socials", icon: Globe },
              { id: "form", label: "Form", icon: FileText },
            ]} 
          />
        )
      default:
        return null
    }
  }

  const getTitle = () => {
    switch (activeSection) {
      case "projects": return "Writing Library"
      case "skills": return "Technical Stack"
      case "experience": return "Career Path"
      case "achievements": return "Awards & Papers"
      case "contact": return "Get In Touch"
      default: return "Explorer"
    }
  }

  return (
    <div className="w-80 h-screen border-r bg-card/10 flex flex-col hidden lg:flex">
      {/* Header Title Area */}
      <div className="p-4 border-b">
        <h3 className="text-[14px] font-bold text-foreground">{getTitle()}</h3>
      </div>

      {/* Search Area */}
      <div className="p-3">
        <div className="relative group">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search folder or file"
            className="h-8 pl-8 pr-12 text-[12px] bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-primary/30 rounded-md placeholder:text-muted-foreground/50"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery("")}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            ) : (
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border bg-muted/50 text-[9px] font-mono text-muted-foreground/60 pointer-events-none">
                <Command className="w-2 h-2" />
                <span>K</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explorer Content */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {getExplorerContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Footer / Stats */}
      <div className="p-4 border-t bg-muted/10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Active Workspace</span>
        </div>
      </div>
    </div>
  )
}



