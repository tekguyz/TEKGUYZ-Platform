"use client"

import React, { useRef, useState } from "react"
import { motion, Variants } from "motion/react"
import { Brain, LayoutGrid, Zap, Code } from "lucide-react"
import { servicesData } from "@/data/site-content"

const icons = [Brain, LayoutGrid, Zap]

function SpotlightCard({ 
  children, 
  className = "", 
  isPrimary = false 
}: { 
  children: React.ReactNode, 
  className?: string,
  isPrimary?: boolean 
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01 }}
      className={`relative overflow-hidden group p-8 md:p-10 rounded-3xl dark:bg-zinc-950/40 bg-white/40 backdrop-blur-xl ring-1 dark:ring-white/10 ring-black/5 hover:ring-violet-500/50 dark:hover:ring-violet-500/50 transition-all duration-500 flex flex-col hover:shadow-[0_0_30px_-5px_rgba(87,76,250,0.3)] will-change-transform ${className} ${isPrimary ? 'dark:bg-violet-950/10 bg-violet-50/30' : ''}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 hidden sm:block z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(87,76,250,0.15), transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  )
}

export function Solutions() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  }

  return (
    <section id="solutions" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold tracking-widest uppercase text-xs">Core Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">Strategic Tech & AI-Powered Solutions</h2>
          <p className="text-muted-foreground dark:text-zinc-400 text-zinc-600 max-w-2xl mx-auto text-lg">We bridge the gap between strategy and execution, transforming complex challenges into high-ROI assets.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {servicesData.map((service, index) => {
            const Icon = icons[index]
            const isPrimary = index === 0
            
            // Bento Grid Layout Logic
            const gridClass = 
              index === 0 ? "md:col-span-2 lg:col-span-2" :
              index === 1 ? "md:col-span-1 lg:col-span-1" :
              "md:col-span-2 lg:col-span-3"

            return (
              <motion.div key={service.title} variants={cardVariants} className={gridClass}>
                <SpotlightCard isPrimary={isPrimary} className="h-full">
                  
                  {/* The Icon (Architectural) */}
                  <div className="mb-8 relative w-14 h-14 flex items-center justify-center rounded-2xl border dark:border-white/10 border-black/5 bg-background/50 backdrop-blur-md shadow-sm z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10 blur-md" />
                    <Icon className="w-7 h-7 text-primary relative z-10 drop-shadow-[0_0_8px_rgba(87,76,250,0.5)]" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight relative z-10">{service.title}</h3>
                  
                  {/* The Pitch (Strategic Insight) */}
                  <div className="mb-6 p-4 rounded-xl dark:bg-violet-950/20 bg-violet-50/50 border-l-2 border-primary relative z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">Strategic Insight</span>
                    <p className="text-foreground font-medium leading-relaxed">{service.pitch}</p>
                  </div>
                  
                  <p className="text-muted-foreground dark:text-zinc-400 text-zinc-600 mb-10 flex-grow leading-relaxed relative z-10">{service.reality}</p>
                  
                  <div className="space-y-6 mt-auto relative z-10">
                      {/* Capabilities */}
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Capabilities</h4>
                        <div className="flex flex-wrap gap-2">
                            {service.capabilities.map(cap => (
                                <span key={cap} className="dark:bg-zinc-900/80 bg-zinc-100/80 dark:text-zinc-300 text-zinc-700 text-xs font-medium px-3 py-1.5 rounded-full ring-1 dark:ring-white/10 ring-black/10 shadow-[0_0_10px_rgba(255,255,255,0.02)] dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition-shadow hover:shadow-[0_0_15px_rgba(87,76,250,0.2)]">
                                  {cap}
                                </span>
                            ))}
                        </div>
                      </div>
                      
                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Engineering Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {service.techStack.map(tech => (
                                <span key={tech} className="flex items-center gap-1.5 dark:bg-violet-950/30 bg-violet-50/50 dark:text-violet-300 text-violet-700 text-xs font-medium px-3 py-1.5 rounded-full ring-1 dark:ring-violet-500/30 ring-violet-500/30 shadow-[0_0_10px_rgba(87,76,250,0.1)]">
                                  <Code className="w-3 h-3 opacity-70" />
                                  {tech}
                                </span>
                            ))}
                        </div>
                      </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
