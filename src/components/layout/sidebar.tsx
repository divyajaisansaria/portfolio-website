import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, 
  Briefcase, 
  Trophy, 
  Mail, 
  Moon, 
  Sun,
  LayoutDashboard,
  MapPin,
  Calendar,
  Phone,
  FileText
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { achievements } from "@/data/achievements"
import { projects } from "@/data/projects"
import { experiences } from "@/data/experience"

const contactData = [
  { icon: Mail, label: "Email", value: "divyajaisansaria503@gmail.com", href: "mailto:divyajaisansaria503@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 9413185801", href: "tel:+919413185801" },
  { icon: Calendar, label: "Birthday", value: "June 27, 2004" },
  { icon: MapPin, label: "Location", value: "Surat, Gujarat" },
]

// Custom Brand Icons (SVG) for GitHub and LinkedIn
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const roles = [
  "AI/ML Engineer",
  "Software Developer",
  "Full Stack Developer"
]

function RotatingRoles() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-4 overflow-hidden relative w-full flex items-center justify-start">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-xs text-muted-foreground font-normal whitespace-nowrap"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export function Sidebar({ 
  activeSection, 
  setActiveSection 
}: { 
  activeSection: string; 
  setActiveSection: (id: string) => void 
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { id: "about", icon: User, label: "Home", count: 1 },
    { id: "projects", icon: LayoutDashboard, label: "Projects", count: projects.length },
    { id: "achievements", icon: Trophy, label: "Achievements", count: achievements.length },
    { id: "experience", icon: Briefcase, label: "Experience", count: experiences.length },
    { id: "contact", icon: Mail, label: "Contact", count: 1 },
  ]

  if (!mounted) {
    return (
      <aside className="w-[280px] h-screen sticky top-0 flex flex-col border-r bg-background p-6 gap-8">
        <div className="flex-1" />
      </aside>
    )
  }

  return (
    <aside className="w-[280px] h-screen sticky top-0 flex flex-col border-r bg-background overflow-y-auto no-scrollbar">
      <div className="p-6 min-h-full flex flex-col">
        {/* Profile Section & Theme Toggle */}
        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border">
              <img 
                src="/images/profile.jpeg" 
                alt="Divya Jaisansaria" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="text-sm font-semibold tracking-tight text-foreground truncate">
                Divya Jaisansaria
              </h2>
              <RotatingRoles />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <Moon className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 mb-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                activeSection === item.id 
                  ? "bg-foreground text-background" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-4 h-4",
                  activeSection === item.id ? "text-background" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span>{item.label}</span>
              </div>
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded min-w-[18px] text-center",
                activeSection === item.id 
                  ? "bg-background/20 text-background" 
                  : "bg-muted text-muted-foreground"
              )}>
                {item.count}
              </span>
            </button>
          ))}
        </nav>

        {/* Spacer to push contact section to bottom */}
        <div className="flex-1" />

        {/* Contact Info Section - Pushed to Bottom */}
        <div className="flex flex-col gap-5 pt-10 border-t mt-auto">
          {contactData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center border border-border/50">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-none mb-1">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="text-[12px] font-medium text-foreground hover:text-primary transition-colors truncate">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-[12px] font-medium text-foreground truncate">{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Social Icons - Bottom Bar */}
        <div className="flex items-center justify-center gap-6 pt-8 pb-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedinIcon />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FileText className="w-5 h-5" />
          </a>
          <a
            href="mailto:divyajaisansaria503@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </aside>
  )
}
