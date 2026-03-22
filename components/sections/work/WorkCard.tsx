import React, { useRef, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { CaseStudy } from "@/lib/schemas"
import { parseMetric } from "@/hooks/useWorkPortfolio"

export function WorkCard({ 
  study, 
  onClick,
  className = ""
}: { 
  study: CaseStudy
  onClick: () => void
  className?: string
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

  return (
    <motion.div
      layoutId={`card-${study.title}`}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(1) }}
      onBlur={() => { setIsFocused(false); setOpacity(0) }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      className={`relative overflow-hidden group p-8 md:p-10 rounded-3xl dark:bg-zinc-950/40 bg-white/40 backdrop-blur-xl ring-1 dark:ring-white/10 ring-black/5 hover:ring-primary/50 dark:hover:ring-primary/50 transition-all duration-500 flex flex-col hover:shadow-[0_0_30px_-5px_var(--primary)] will-change-transform cursor-pointer ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 hidden sm:block z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, color-mix(in srgb, var(--primary) 15%, transparent), transparent 40%)`,
        }}
      />
      
      <div className="mb-6 relative z-10">
        <motion.span 
          layoutId={`industry-${study.title}`}
          className="text-xs font-semibold tracking-wider text-primary uppercase mb-2 block"
        >
          {study.industry}
        </motion.span>
        <motion.h3 
          layoutId={`title-${study.title}`}
          className="text-3xl font-bold tracking-tight mb-4"
        >
          {study.title}
        </motion.h3>
      </div>
      
      <div className="mb-8 flex-grow relative z-10">
        <p className="text-muted-foreground dark:text-zinc-400 text-zinc-600 line-clamp-2">{study.problem}</p>
      </div>

      <div className="space-y-4 mt-auto relative z-10">
        <div className="flex flex-wrap gap-4 mb-6">
          {study.impactMetrics.slice(0, 2).map((metric, idx) => {
            const parsed = parseMetric(metric)
            return (
              <div key={idx} className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">{parsed.original}</span>
              </div>
            )
          })}
        </div>
        
        <div className="flex items-center text-primary font-medium text-sm group-hover:underline underline-offset-4">
          Read Case Study <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  )
}
