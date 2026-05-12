import React, { useState, useEffect, useCallback, useRef } from "react"
import { Star, ExternalLink, Cpu, Layout, Users, Code2, Calendar, Trophy, Building2, CheckCircle2, MapPin, Award, FileCheck, ChevronLeft, ChevronRight, Info } from "lucide-react"
import { Achievement } from "@/data/achievements"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence, useAnimation } from "framer-motion"

interface AchievementDetailProps {
  item: Achievement
}

export const AchievementDetail = ({ item }: AchievementDetailProps) => {
  const details = item.details
  const teamImages = details?.teamImages || []
  
  const extendedImages = teamImages.length > 1 
    ? [...teamImages.slice(-2), ...teamImages, ...teamImages.slice(0, 2)] 
    : teamImages

  const [currentIndex, setCurrentIndex] = useState(teamImages.length > 1 ? 2 : 0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const controls = useAnimation()

  const handleInfiniteLoop = useCallback(async (newIndex: number) => {
    setIsTransitioning(true)
    await controls.start({
      x: `-${newIndex * (100 / 2)}%`,
      transition: { type: "spring", damping: 25, stiffness: 120 }
    })

    if (newIndex >= teamImages.length + 2) {
      await controls.set({ x: `-${2 * (100 / 2)}%` })
      setCurrentIndex(2)
    } 
    else if (newIndex <= 1) {
      await controls.set({ x: `-${teamImages.length * (100 / 2)}%` })
      setCurrentIndex(teamImages.length + 1)
    } else {
      setCurrentIndex(newIndex)
    }
    setIsTransitioning(false)
  }, [controls, teamImages.length])

  const nextSlide = useCallback(() => {
    if (isTransitioning || teamImages.length <= 1) return
    handleInfiniteLoop(currentIndex + 1)
  }, [currentIndex, isTransitioning, teamImages.length, handleInfiniteLoop])

  const prevSlide = useCallback(() => {
    if (isTransitioning || teamImages.length <= 1) return
    handleInfiniteLoop(currentIndex - 1)
  }, [currentIndex, isTransitioning, teamImages.length, handleInfiniteLoop])

  useEffect(() => {
    if (teamImages.length <= 1) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide, teamImages.length])

  return (
    <section className="max-w-5xl space-y-10 pb-20 pt-12 mx-auto font-sans">
      {/* Hero Section */}
      <div className="relative space-y-8">
        <div className="flex flex-col gap-5 relative">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary"
          >
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">{item.category}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-foreground"
          >
            {item.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-border py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-widest">{item.date}</span>
            </div>
            <div className="w-px h-4 bg-border" />
            {details?.location && (
              <>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium uppercase tracking-widest">{details.location}</span>
                </div>
                <div className="w-px h-4 bg-border" />
              </>
            )}
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground uppercase tracking-widest">{details?.rank || "Winner"}</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-widest">{details?.org}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Problem & Solution - Side by Side */}
      {(details?.problemStatement || details?.solution) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {details?.problemStatement && (
            <div className="p-8 bg-background space-y-4">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-primary" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">The Problem</h3>
              </div>
              <p className="text-xl md:text-2xl font-bold text-foreground leading-tight tracking-tight">
                {details.problemStatement}
              </p>
            </div>
          )}
          {details?.solution && (
            <div className="p-8 bg-background space-y-4 border-l md:border-l-0">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-primary" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">The Solution</h3>
              </div>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                {details.solution}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 2. Core Contributions */}
      {details?.responsibilities && details.responsibilities.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 border-l-4 border-primary pl-6">
            <h3 className="text-base font-bold tracking-tight">Core Contributions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {details.responsibilities.map((resp, i) => (
              <div key={i} className="p-6 border border-border bg-muted/5 group hover:bg-primary/[0.02] transition-all">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                    {resp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Team Images - Infinite Apple-Style Carousel */}
      {teamImages.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-primary" />
              <h3 className="text-base font-bold tracking-tight">Team & Collaboration</h3>
            </div>
            {teamImages.length > 1 && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="w-10 h-10 border border-border flex items-center justify-center hover:bg-muted/30 transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="w-10 h-10 border border-border flex items-center justify-center hover:bg-muted/30 transition-colors disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          
          <div className="relative overflow-hidden group">
            <div className="flex md:mx-[-0.5rem]">
              <motion.div 
                className="flex"
                animate={controls}
                initial={{ x: `-${currentIndex * (100 / 2)}%` }}
              >
                {extendedImages.map((img, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "px-2 shrink-0 transition-all duration-500",
                      "w-full md:w-1/2 aspect-[16/10]"
                    )}
                  >
                    <div className="w-full h-full border border-border overflow-hidden bg-muted/20">
                      <img 
                        src={img} 
                        alt={`Team photo ${i}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Progress Indicators */}
          {teamImages.length > 1 && (
            <div className="flex justify-center gap-1.5 pt-2">
              {teamImages.map((_, i) => {
                const displayIndex = (currentIndex - 2 + teamImages.length) % teamImages.length
                return (
                  <button 
                    key={i}
                    onClick={() => handleInfiniteLoop(i + 2)}
                    className={cn(
                      "h-1 transition-all duration-300",
                      displayIndex === i ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"
                    )}
                  />
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. Project Images with Stacking Effect & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-12">
          {details?.projectImages && details.projectImages.length > 0 && (
            <>
              <div className="flex items-center gap-3 px-2 pb-3 border-b border-border sticky top-0 bg-background z-20">
                <Layout className="w-4 h-4 text-primary" />
                <h3 className="text-base font-bold tracking-tight">Platform Visuals</h3>
              </div>
              
              <div className="space-y-[10vh]">
                {details.projectImages.map((img, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="sticky top-20 border-2 border-border bg-background shadow-2xl overflow-hidden"
                    style={{
                      zIndex: i + 10,
                      marginTop: i === 0 ? 0 : "-15vh"
                    }}
                  >
                    <div className="bg-muted/30 p-2 border-b border-border flex items-center justify-between">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-2">Module {i + 1}</span>
                       <div className="flex gap-1.5 pr-2">
                          <div className="w-2 h-2 rounded-full bg-border" />
                          <div className="w-2 h-2 rounded-full bg-border" />
                          <div className="w-2 h-2 rounded-full bg-border" />
                       </div>
                    </div>
                    <img 
                      src={img} 
                      alt={`Project interface ${i + 1}`} 
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="p-6 border border-border bg-background space-y-8 shadow-sm">
            {details?.techStack && details.techStack.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Tech Stack</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {details.techStack.map((t, i) => (
                    <span key={i} className="px-3 py-1 border border-border text-[10px] font-medium hover:border-primary transition-colors cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="h-px bg-border" />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                 <Users className="w-4 h-4 text-primary" />
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Team Role</h4>
              </div>
              <p className="text-sm font-semibold text-foreground">{details?.team}</p>
            </div>

            {details?.projectLink && (
              <a 
                href={details.projectLink}
                className="flex items-center justify-between w-full p-4 bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 transition-all group shadow-lg shadow-primary/20"
              >
                <span>View Full Project</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 5. Bottom Buttons (Certificate & Know More) */}
      {(details?.certificateLink || details?.moreLink) && (
        <div className="pt-20 flex flex-col md:flex-row justify-center items-center gap-4">
          {details?.certificateLink && (
            <a 
              href={details.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border border-border bg-card/20 text-foreground font-bold text-sm hover:border-primary hover:text-primary transition-all group w-full md:w-auto justify-center"
            >
              <FileCheck className="w-5 h-5 text-primary" />
              <span>View Official Certificate</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          )}
          
          {details?.moreLink && (
            <a 
              href={details.moreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all group w-full md:w-auto justify-center"
            >
              <Info className="w-5 h-5" />
              <span>Know More</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          )}
        </div>
      )}
    </section>
  )
}
