import { useEffect } from "react"
import { motion } from "motion/react"
import { X, Building2, Code, ChevronRight } from "lucide-react"
import { CaseStudy } from "@/lib/schemas"
import { parseMetric } from "@/hooks/useWorkPortfolio"
import { AnimatedCounter } from "./AnimatedCounter"

interface WorkModalProps {
  project: CaseStudy
  onClose: () => void
  onNext: (e: React.MouseEvent) => void
}

export function WorkModal({ project, onClose, onNext }: WorkModalProps) {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[var(--z-overlay)] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${project.title}`}
        className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] dark:bg-zinc-950 bg-white ring-1 dark:ring-white/10 ring-black/5 rounded-3xl shadow-2xl flex flex-col overflow-hidden will-change-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header for Mobile Close Button */}
        <div className="sticky top-0 right-0 z-[var(--z-overlay)] flex justify-end p-4 md:p-8 pointer-events-none">
          <button 
            onClick={onClose}
            className="pointer-events-auto min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full dark:bg-zinc-900/90 bg-zinc-100/90 backdrop-blur-md dark:text-zinc-400 text-zinc-600 hover:text-foreground dark:hover:bg-zinc-800 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors ring-1 dark:ring-white/10 ring-black/5 shadow-lg"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Background Watermark */}
        <div className="absolute -right-20 -top-20 opacity-[0.03] dark:opacity-[0.02] pointer-events-none select-none">
          <Building2 className="w-[600px] h-[600px] text-foreground" />
        </div>

        <div className="p-6 pt-0 md:p-14 md:pt-0 relative z-10 flex-grow">
          {/* Modal Header */}
          <div className="mb-16 pr-12 max-w-3xl">
            <motion.span 
              layoutId={`industry-${project.title}`}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              {project.industry}
            </motion.span>
            <motion.h2 
              layoutId={`title-${project.title}`}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground leading-[1.1]"
            >
              {project.title}
            </motion.h2>
          </div>

          {/* The Numbers (ROI) - Massive Typography */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {project.impactMetrics.map((metric, idx) => {
              const parsed = parseMetric(metric)
              return (
                <div key={idx} className="flex flex-col justify-center p-8 rounded-3xl dark:bg-accent/20 bg-accent/10 border-l-4 border-primary relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {parsed.value ? (
                    <>
                      <div className="text-7xl md:text-8xl font-extrabold text-primary tracking-tighter mb-4 flex items-baseline">
                        <AnimatedCounter value={parsed.value} suffix={parsed.suffix} />
                      </div>
                      <span className="text-lg md:text-xl text-foreground/80 font-medium uppercase tracking-wide">
                        {parsed.label}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-primary">{metric}</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* The Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-10 h-1 bg-primary mr-4 rounded-full"></span>
                The Problem
              </h4>
              <p className="text-lg md:text-xl text-muted-foreground dark:text-zinc-400 text-zinc-600 leading-relaxed font-light">
                {project.problem}
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-10 h-1 bg-primary mr-4 rounded-full"></span>
                The Strategic Solution
              </h4>
              <p className="text-lg md:text-xl text-muted-foreground dark:text-zinc-400 text-zinc-600 leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="pt-10 border-t dark:border-white/10 border-black/5">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
              Engineering Stack
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map(tech => (
                <span 
                  key={tech} 
                  className="flex items-center gap-2 dark:bg-zinc-900/80 bg-zinc-100/80 dark:text-zinc-300 text-zinc-700 text-sm font-medium px-5 py-2.5 rounded-full ring-1 dark:ring-white/10 ring-black/5 shadow-sm"
                >
                  <Code className="w-4 h-4 text-primary" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Next Case Study Footer */}
        <div 
          onClick={onNext}
          className="mt-auto border-t dark:border-white/10 border-black/5 p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-primary/5 transition-colors group"
        >
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Next Case Study</span>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Explore More Work
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_20px_var(--primary)] group-hover:scale-110 transition-transform">
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}
