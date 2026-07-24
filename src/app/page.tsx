"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar } from "@/components/layout/sidebar";
import { Explorer } from "@/components/layout/explorer";
import { MainContent } from "@/components/layout/main-content";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { AchievementsSection } from "@/components/sections/achievements";
import { ContactSection } from "@/components/sections/contact";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeSection, setActiveSection] = React.useState("about")
  const [activeFile, setActiveFile] = React.useState<string | undefined>("overview")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Update active file when section changes
  React.useEffect(() => {
    if (activeSection === "achievements" || activeSection === "projects") {
      setActiveFile("overview")
    } else {
      setActiveFile(undefined)
    }
  }, [activeSection])

  const renderSection = () => {
    switch (activeSection) {
      case "about": return <AboutSection setActiveSection={setActiveSection} />
      case "projects": return <ProjectsSection activeFile={activeFile} setActiveFile={setActiveFile} />
      case "experience": return <ExperienceSection />
      case "achievements": return <AchievementsSection activeFile={activeFile} setActiveFile={setActiveFile} />
      case "contact": return <ContactSection />
      default: return <AboutSection setActiveSection={setActiveSection} />
    }
  }

  const showExplorer = activeSection !== "about" && activeSection !== "contact" && activeSection !== "experience"

  return (
    <div className="flex min-h-screen bg-background overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* 3-Column Layout */}
      
      {/* Column 1: Sidebar (Sticky/Fixed) */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Column 2: Explorer (Conditional) */}
      <AnimatePresence mode="wait">
        {showExplorer && (
          <Explorer 
            activeSection={activeSection} 
            activeFile={activeFile}
            onFileClick={(id) => setActiveFile(id)}
          />
        )}
      </AnimatePresence>

      {/* Column 3: Main Content (Active View) */}
      <MainContent 
        activeSection={activeSection} 
        activeFile={activeFile}
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      >
        <div className="h-full">
          {renderSection()}
        </div>
      </MainContent>
    </div>
  );
}

