import React from "react"
import { motion } from "framer-motion"
import { 
  Code, 
  ExternalLink, 
  Monitor,
  Star,
  Search,
  ChevronDown
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Laptop3D } from "@/components/ui/laptop-3d"
import { projects, Project } from "@/data/projects"
import { ProjectDetailView } from "./project-detail"

interface ProjectsSectionProps {
  activeFile?: string
  setActiveFile?: (id: string) => void
}

export function ProjectsSection({ activeFile, setActiveFile }: ProjectsSectionProps) {
  const [filter, setFilter] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const initialFeaturedId = React.useMemo(() => projects.find(p => p.featured)?.id || projects[0].id, [])
  const [featuredId, setFeaturedId] = React.useState(initialFeaturedId)

  const categories = ["All", "AI/ML Models", "RAG Systems", "Full Stack"]

  const featuredProject = projects.find(p => p.id === featuredId)!;
  const matchesSearch = (p: Project | undefined): boolean => {
  if (!p) return false;
  if (!searchQuery) return true;
  const q = searchQuery.toLowerCase();
  return (
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tech.some(t => t.toLowerCase().includes(q)) ||
    p.category?.toLowerCase().includes(q)
  );
};

const showFeatured = (filter === "All" || featuredProject?.category === filter) && matchesSearch(featuredProject);

  const filteredProjects = React.useMemo(() => {
    // Start from all projects (including the featured one) to ensure comprehensive search
    let items = projects

    // Apply search query across title, description, tech tags, and category
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      items = items.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some(t => t.toLowerCase().includes(q)) ||
        p.category?.toLowerCase().includes(q)
      )
    }

    // Apply category filter unless "All" is selected
    if (filter !== "All") {
      items = items.filter(p => p.category === filter)
    }

    // Exclude the featured project from the grid if it is being shown as hero
    if (showFeatured) {
      items = items.filter(p => p.id !== featuredId)
    }

    return items
  }, [projects, searchQuery, filter, showFeatured, featuredId])

  if (activeFile && activeFile !== "overview") {
    const activeProject = projects.find(p => p.id === activeFile)
    if (activeProject) {
      return <ProjectDetailView project={activeProject} onBack={() => setActiveFile?.("overview")} featuredId={featuredId} setFeaturedId={setFeaturedId} />
    }
  }

  return (
    <section id="projects" className="space-y-16">
      <div className="space-y-3 mb-8 pt-0 font-sans">
        {/* Advanced Controls Hub */}
        <div className="flex flex-col lg:flex-row items-center gap-2 w-full">
          {/* Search Bar */}
          <div className="relative w-full lg:flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="h-8 pl-9 pr-4 bg-muted/10 border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40 rounded-none text-xs font-medium placeholder:text-muted-foreground/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Category Dropdown */}
            <div className="relative group flex-1 lg:flex-none min-w-[130px]">
               <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full h-8 pl-3 pr-8 bg-muted/10 border border-border/60 rounded-none text-[11px] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all cursor-pointer"
               >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
               </select>
               <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/60 pointer-events-none group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
        
        <div className="h-px bg-border w-full" />
        
        <div className="space-y-1 pb-1">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-none text-foreground">
            Featured <span className="text-primary">Creations</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm font-medium opacity-80">
            A showcase of technical excellence and creative problem solving.
          </p>
        </div>
      </div>

      {/* 3D Feature Area */}
      {showFeatured && featuredProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full rounded-2xl bg-linear-to-b from-primary/5 to-transparent border border-primary/10 overflow-hidden p-4 md:p-6 lg:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side: text */}
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-none px-4 py-1">Featured Project</Badge>
              <h3 className="text-4xl lg:text-5xl font-bold">{featuredProject.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{featuredProject.description}</p>
              <div className="flex flex-wrap gap-3">
                {featuredProject.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="bg-primary/10 text-primary px-2 py-1 text-[10px] uppercase tracking-wider font-bold">{t}</Badge>
                ))}
              </div>
              <div className="flex gap-4">
                <Button
                  className="rounded-xl px-8 h-12 gap-2 font-bold"
                  onClick={() => {
                    setActiveFile?.(featuredProject.id)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  View in Detail
                </Button>
                <Button variant="outline" className="rounded-xl px-8 h-12 gap-2">
                  <ExternalLink className="w-4 h-4" /> View Code
                </Button>
              </div>
            </div>
            {/* Right side: image */}
            <div className="relative group overflow-hidden">
              <img
                src={featuredProject.images?.[0] || featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out group-hover:brightness-50 group-hover:scale-105"
              />
              {/* Hover overlay for paper link with animated black background */}
              {featuredProject.paperLink && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-900/70 to-transparent">
                  <a
                    href={featuredProject.paperLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 bg-primary/80 text-white px-2 py-1 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Paper
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="group h-full flex flex-col rounded-xl overflow-hidden border-muted bg-card/20 backdrop-blur-xl hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:brightness-50 group-hover:scale-105 transition-all duration-300 ease-in-out"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-900/70 to-transparent">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full ${featuredId===project.id ? 'text-yellow-400' : 'text-primary'}`}
                      onClick={() => setFeaturedId(project.id)}
                      title="Set as Featured"
                    >
                      <Star className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-5 md:p-8 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px] uppercase tracking-wider font-bold">{t}</Badge>
                  ))}
                </div>
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-2xl font-bold leading-tight">{project.title}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="shrink-0 -mt-2 -mr-2 text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10 transition-colors"
                    onClick={() => {
                      setFeaturedId(project.id)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    title="Set as Highlighted"
                  >
                    <Star className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              </CardContent>
              <CardFooter className="p-5 md:p-8 pt-0 md:pt-0">
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-bold text-primary hover:text-primary/80 group/btn"
                  onClick={() => {
                    setActiveFile?.(project.id)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  View in Detail
                  <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
