"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Phone, Sparkles, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3.5Z" />
    <path d="M11 11a4 4 0 1 0 4 4" />
  </svg>
)

export function ContactSection() {
  console.log("ContactSection rendered")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting form...", formData)
    setStatus('sending')

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log("Server response:", result)

      if (response.ok) {
        setStatus('success')
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        console.error("Submission failed:", result)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      console.error("Fetch error:", error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="space-y-12 pb-24">
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
        >
          Contact
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl lg:text-4xl font-sans font-black tracking-tight uppercase"
        >
          Get In Touch
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-sm max-w-2xl font-medium"
        >
          I'm currently open to new opportunities and collaborations. Feel free to reach out via the form below or my direct contact details.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 p-8 rounded-2xl border bg-card/40 space-y-8 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Your Name</label>
                <Input 
                  required
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 rounded-xl bg-background/50 border-border/50 focus-visible:ring-primary/20 font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                <Input 
                  required
                  type="email" 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 rounded-xl bg-background/50 border-border/50 focus-visible:ring-primary/20 font-medium" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Subject</label>
              <Input 
                required
                placeholder="Inquiry about project" 
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="h-12 rounded-xl bg-background/50 border-border/50 focus-visible:ring-primary/20 font-medium" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Message</label>
              <Textarea 
                required
                placeholder="How can I help you?" 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[160px] rounded-xl bg-background/50 border-border/50 focus-visible:ring-primary/20 resize-none p-4 font-medium" 
              />
            </div>
            
            <Button 
              type="submit"
              disabled={status === 'sending'} 
              className={cn(
                "w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest gap-2 transition-all duration-300",
                status === 'success' && "bg-green-600 hover:bg-green-600",
                status === 'error' && "bg-destructive hover:bg-destructive"
              )}
            >
              {status === 'sending' && (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Message Sent!
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle className="w-4 h-4" />
                  Failed to Send
                </>
              )}
              {status === 'idle' && (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <ContactInfoCard 
            icon={Mail} 
            label="Email" 
            value="divyajaisansaria503@gmail.com" 
            href="mailto:divyajaisansaria503@gmail.com"
          />
          <ContactInfoCard 
            icon={MapPin} 
            label="Location" 
            value="Remote / Bangalore / Surat, India" 
          />
          <ContactInfoCard 
            icon={LinkedinIcon} 
            label="LinkedIn" 
            value="divya-jaisansaria-7768342a9" 
            href="https://www.linkedin.com/in/divya-jaisansaria-7768342a9" 
          />
          <ContactInfoCard 
            icon={WhatsAppIcon} 
            label="WhatsApp" 
            value="+91 9413185801" 
            href="https://wa.me/919413185801" 
          />
        </motion.div>
      </div>
    </section>
  )
}

function ContactInfoCard({ icon: Icon, label, value, href }: { icon: any, label: string, value: string, href?: string }) {
  const Wrapper = href ? 'a' : 'div'
  
  return (
    <Wrapper 
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      className={cn(
        "p-6 rounded-xl border bg-card/40 flex items-center gap-5 transition-all duration-300 group",
        href ? "hover:border-primary/50 hover:bg-card/60 cursor-pointer" : ""
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0 transition-colors group-hover:text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">{label}</p>
        <p className="text-sm font-bold truncate tracking-tight">{value}</p>
      </div>
    </Wrapper>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
