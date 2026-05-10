"use client"

import React from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Share2, Code, Globe, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="space-y-12 pb-24">
      <div className="space-y-4">
        <h2 className="text-3xl lg:text-4xl font-heading font-black tracking-tight">Let's <span className="text-primary">Connect</span></h2>
        <p className="text-muted-foreground max-w-2xl">Interested in collaboration or just want to say hi? My inbox is always open.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 lg:p-12 rounded-[2.5rem] border bg-card/20 backdrop-blur-xl space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Name</label>
                <Input placeholder="John Doe" className="h-12 rounded-2xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Email</label>
                <Input type="email" placeholder="john@example.com" className="h-12 rounded-2xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Subject</label>
              <Input placeholder="Collaboration Request" className="h-12 rounded-2xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/20" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Message</label>
              <Textarea placeholder="Tell me about your project..." className="min-h-[150px] rounded-2xl bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/20 resize-none" />
            </div>
            
            <Button disabled={isSubmitted} className="w-full h-14 rounded-2xl text-md font-bold gap-2 shadow-xl shadow-primary/10 transition-all duration-300">
              {isSubmitted ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Contact Info & Socials */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between gap-12"
        >
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading">Email Me</h4>
                <p className="text-muted-foreground font-medium">hello@divyajaisansaria.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading">Location</h4>
                <p className="text-muted-foreground font-medium">Remote / Bangalore, India</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[2rem] border bg-linear-to-br from-primary/5 to-secondary/5 space-y-6">
            <h4 className="text-xl font-bold font-heading">Follow My Journey</h4>
            <div className="flex gap-4">
              {[
                { icon: Code, label: "Github" },
                { icon: Share2, label: "Linkedin" },
                { icon: Globe, label: "Twitter" }
              ].map((social, idx) => (
                <Button key={idx} variant="outline" size="icon" className="w-12 h-12 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <social.icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              I share updates on my latest projects, technical articles, and design explorations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
