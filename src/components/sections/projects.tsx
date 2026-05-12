import React from "react"
import { motion } from "framer-motion"
import { 
  Code, 
  ExternalLink, 
  Monitor
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop3D } from "@/components/ui/laptop-3d"
import { projects } from "@/data/projects"

export function ProjectsSection() {
  const [filter, setFilter] = React.useState("All")
  const categories = ["All", "AI/ML", "RAG", "E-Commerce", "Full Stack"]

  const featuredProject = projects.find(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  const filteredProjects = filter === "All" 
    ? otherProjects 
    : otherProjects.filter(p => p.category === filter)

  return (
    <section id="projects" className="space-y-16">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Featured <span className="text-primary">Creations</span></h2>
          <p className="text-muted-foreground max-w-xl">A showcase of technical excellence and creative problem solving.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat)}
              className="rounded-xl px-6 transition-all duration-300"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* 3D Feature Area */}
      {featuredProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full rounded-[2.5rem] bg-linear-to-b from-primary/5 to-transparent border border-primary/10 overflow-hidden p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-primary/20 text-primary border-none px-4 py-1">Featured Project</Badge>
              <h3 className="text-4xl lg:text-5xl font-black">{featuredProject.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {featuredProject.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {featuredProject.tech.map((t) => (
                  <span key={t} className="text-sm font-medium text-primary/80">#{t}</span>
                ))}
              </div>
                  <div className="flex gap-4">
                <Button className="rounded-2xl gap-2 px-8">
                  <Monitor className="w-4 h-4" />
                  Live Demo
                </Button>
                <Button variant="outline" className="rounded-2xl gap-2 px-8">
                  <Code className="w-4 h-4" />
                  Codebase
                </Button>
              </div>
            </div>
            
            <div className="relative">
               <Laptop3D />
            </div>
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="group h-full flex flex-col rounded-[2rem] overflow-hidden border-muted bg-card/20 backdrop-blur-xl hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Code className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-8 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px] uppercase tracking-wider font-bold">{t}</Badge>
                  ))}
                </div>
                <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button variant="ghost" className="p-0 h-auto font-bold text-primary hover:text-primary/80 group/btn">
                  View Case Study
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
