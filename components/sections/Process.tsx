"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { Search, Code, Rocket } from "lucide-react"
import { processData } from "@/data/site-content"

const icons = [Search, Code, Rocket]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="process" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold tracking-widest uppercase text-xs">Methodology</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">The 3-Phase Velocity</h2>
          <p className="text-muted-foreground dark:text-zinc-400 text-zinc-600 max-w-2xl mx-auto text-lg">
            We move from strategy to execution with zero friction. Total transparency, zero surprises.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* The Vertical Line (Background) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] dark:bg-zinc-800 bg-zinc-200 -translate-x-1/2 rounded-full" />
          
          {/* The Filling Vertical Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary -translate-x-1/2 rounded-full origin-top z-0"
            style={{ scaleY }}
          />

          {/* The Phases */}
          <div className="space-y-16 md:space-y-24">
            {processData.map((phase, index) => {
              const Icon = icons[index % icons.length]
              const isEven = index % 2 === 0

              return (
                <div key={phase.phaseTitle} className="relative flex flex-col md:flex-row items-start md:items-center w-full">
                  
                  {/* Connecting Nerve Line (Desktop) */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ margin: "-20%", once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-primary z-0 ${
                      isEven ? 'right-1/2 w-16 origin-right' : 'left-1/2 w-16 origin-left'
                    }`}
                  />

                  {/* Connecting Nerve Line (Mobile) */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ margin: "-20%", once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="md:hidden absolute top-12 -translate-y-1/2 left-4 w-12 h-[2px] bg-primary origin-left z-0"
                  />

                  {/* Desktop Layout: Alternating sides */}
                  <div className={`hidden md:flex w-1/2 ${isEven ? 'justify-end pr-16' : 'justify-start pl-16 order-last'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ margin: "-20%", once: true }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      className="w-full relative z-10"
                    >
                      <PhaseCard phase={phase} index={index} />
                    </motion.div>
                  </div>

                  {/* The Ghost Column to balance the flexbox on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* The Node (Center on Desktop, Left on Mobile) */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ 
                      backgroundColor: "var(--primary)",
                      color: "#ffffff",
                      scale: 1, 
                      opacity: 1,
                      boxShadow: "0 0 20px var(--primary)" 
                    }}
                    viewport={{ margin: "-20%", once: true }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-4 md:left-1/2 top-12 md:top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-20 ring-4 dark:ring-background ring-background text-zinc-500 dark:text-zinc-400 dark:bg-zinc-800 bg-zinc-200"
                  >
                    <motion.div
                      initial={{ scale: 1, opacity: 0 }}
                      whileInView={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      viewport={{ margin: "-20%", once: true }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute inset-0 rounded-full bg-primary -z-10"
                    />
                    <Icon className="w-5 h-5 relative z-10" />
                  </motion.div>

                  {/* Mobile Layout: Content always on the right */}
                  <div className="md:hidden w-full pl-16 pr-0 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ margin: "-20%", once: true }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                      <PhaseCard phase={phase} index={index} />
                    </motion.div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

function PhaseCard({ phase, index }: { phase: typeof processData[0], index: number }) {
  const num = (index + 1).toString().padStart(2, '0')
  return (
    <div className="relative p-8 rounded-3xl dark:bg-zinc-950/40 bg-white/40 backdrop-blur-md ring-1 dark:ring-white/10 ring-black/5 hover:ring-primary/30 transition-all duration-300 flex flex-col hover:shadow-xl overflow-hidden group">
      
      {/* Editorial Background Numeral */}
      <div className="absolute -right-4 -top-8 text-[150px] leading-none font-black opacity-[0.03] dark:opacity-[0.05] dark:text-white text-black pointer-events-none select-none z-0 group-hover:scale-110 group-hover:opacity-[0.05] dark:group-hover:opacity-[0.08] transition-all duration-700">
        {num}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Row: Title & Duration */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">{phase.phaseTitle}</h3>
          <span className="dark:bg-accent/50 bg-accent/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full ring-1 ring-primary/20 w-fit whitespace-nowrap">
            {phase.duration}
          </span>
        </div>

        {/* Middle: Focus */}
        <p className="text-muted-foreground dark:text-zinc-400 text-zinc-600 mb-8 leading-relaxed">
          {phase.focus}
        </p>

        {/* Bottom: Deliverables */}
        <div className="mb-8">
          <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-3">Deliverables</h4>
          <div className="flex flex-wrap gap-2">
            {phase.deliverables.map(item => (
              <span 
                key={item} 
                className="dark:bg-zinc-900 bg-zinc-100 dark:text-zinc-300 text-zinc-700 text-xs font-medium px-3 py-1.5 rounded-full ring-1 dark:ring-white/5 ring-black/5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Outcome */}
        <div className="mt-auto dark:bg-primary/10 bg-primary/5 border-l-2 border-primary p-4 rounded-r-lg">
          <p className="text-sm font-medium text-foreground dark:text-zinc-200 italic">
            <span className="font-semibold text-primary not-italic mr-2">Outcome:</span>
            {phase.outcome}
          </p>
        </div>
      </div>
    </div>
  )
}