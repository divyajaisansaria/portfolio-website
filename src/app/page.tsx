"use client"

import React from "react"
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
  const [searchQuery, setSearchQuery] = React.useState("")

  const renderSection = () => {
    switch (activeSection) {
      case "about": return <AboutSection />
      case "skills": return <SkillsSection />
      case "projects": return <ProjectsSection />
      case "experience": return <ExperienceSection />
      case "achievements": return <AchievementsSection />
      case "contact": return <ContactSection />
      default: return <AboutSection />
    }
  }

  const showExplorer = activeSection !== "about"

  return (
    <div className="flex min-h-screen bg-background overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* 3-Column Layout */}
      
      {/* Column 1: Sidebar (Sticky/Fixed) */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Column 2: Explorer (Conditional) */}
      {showExplorer && <Explorer activeSection={activeSection} />}

      {/* Column 3: Main Content (Active View) */}
      <MainContent 
        activeSection={activeSection} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      >
        {renderSection()}
      </MainContent>
    </div>
  );
}
