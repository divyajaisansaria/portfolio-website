"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronRight, 
  Folder, 
  FileCode, 
  FileText, 
  Layers, 
  Cpu, 
  Globe,
  Database,
  Trophy
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface FolderProps {
  title: string
  items: { label: string; icon: any; count?: number; href?: string }[]
}

const FolderSection = ({ title, items }: FolderProps) => {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-colors group w-full text-left"
      >
        <ChevronRight className={cn(
          "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-90"
        )} />
        <Folder className="w-4 h-4 text-primary/60 fill-primary/10" />
        <span className="text-[13px] font-medium text-foreground/80">{title}</span>
        <span className="ml-auto text-[10px] text-muted-foreground bg-muted px-1.5 rounded-md">{items.length}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden ml-4 border-l pl-2 flex flex-col gap-0.5"
          >
            {items.map((item, idx) => {
              const isLink = !!item.href
              const Tag = isLink ? 'a' : 'button'
              
              return (
                <Tag
                  key={idx}
                  href={item.href}
                  target={isLink ? "_blank" : undefined}
                  rel={isLink ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-primary/5 hover:text-primary transition-all text-muted-foreground group text-left"
                >
                  <item.icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  <span className="text-[12px] truncate">{item.label}</span>
                </Tag>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Explorer({ activeSection }: { activeSection: string }) {
  const getExplorerContent = () => {
    switch (activeSection) {
      case "projects":
        return (
          <FolderSection 
            title="Projects" 
            items={[
              { label: "All Projects", icon: Globe },
              { label: "RAG Systems", icon: Cpu },
              { label: "AI/ML Models", icon: Database },
              { label: "E-Commerce", icon: Layers },
              { label: "Full Stack", icon: FileCode },
            ]} 
          />
        )
      case "skills":
        return (
          <FolderSection 
            title="Skills & Tools" 
            items={[
              { label: "Frontend", icon: FileCode },
              { label: "Backend", icon: Database },
              { label: "DevOps", icon: Globe },
            ]} 
          />
        )
      case "experience":
        return (
          <FolderSection 
            title="Experience" 
            items={[
              { label: "Resume.pdf", icon: FileText, href: "/resume.pdf" },
              { label: "Work History", icon: Layers },
            ]} 
          />
        )
      case "achievements":
        return (
          <FolderSection 
            title="Achievements" 
            items={[
              { label: "Hackathons", icon: Trophy },
              { label: "Research Papers", icon: FileText },
              { label: "Certifications", icon: FileText },
            ]} 
          />
        )
      case "contact":
        return (
          <FolderSection 
            title="Communication" 
            items={[
              { label: "Email", icon: Globe },
              { label: "Socials", icon: Globe },
              { label: "Form", icon: FileText },
            ]} 
          />
        )
      default:
        return null
    }
  }

  const getTitle = () => {
    switch (activeSection) {
      case "projects": return "Project Files"
      case "skills": return "Technical Stack"
      case "experience": return "Career Path"
      case "achievements": return "Awards & Papers"
      case "contact": return "Get In Touch"
      default: return "Explorer"
    }
  }

  return (
    <div className="w-72 h-screen border-r bg-card/10 flex flex-col hidden lg:flex">
      {/* Header */}
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{getTitle()}</h3>
          <Layers className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>

      {/* Explorer Content */}
      <ScrollArea className="flex-1 px-3">
        <div className="flex flex-col gap-4 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {getExplorerContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Footer / Stats */}
      <div className="p-4 border-t bg-muted/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Active Workspace</span>
        </div>
      </div>
    </div>
  )
}
