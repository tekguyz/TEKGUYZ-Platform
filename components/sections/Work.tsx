"use client"

import { motion, AnimatePresence } from "motion/react"
import { useWorkPortfolio } from "@/hooks/useWorkPortfolio"
import { WorkFilters } from "./work/WorkFilters"
import { WorkCard } from "./work/WorkCard"
import { WorkModal } from "./work/WorkModal"

export function Work() {
  const {
    activeFilter,
    setActiveFilter,
    selectedProject,
    setSelectedProject,
    industries,
    filteredStudies,
    handleNextProject
  } = useWorkPortfolio()

  return (
    <section id="work" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-widest uppercase text-xs">Case Studies</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">Proven ROI & Technical Excellence</h2>
          <p className="text-muted-foreground dark:text-zinc-400 text-zinc-600 max-w-2xl mx-auto text-lg">
            Real-world transformations engineered for scale, efficiency, and measurable impact.
          </p>
        </motion.div>

        <WorkFilters 
          industries={industries} 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
        />

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative isolate">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, index) => {
              const isWide = index % 3 === 0
              const gridClass = isWide ? "md:col-span-2" : "md:col-span-1"

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  key={study.title}
                  className={`${gridClass} ${isWide ? 'ring-2 ring-primary/50 md:ring-0 md:scale-100 scale-[1.02] md:scale-100 rounded-3xl' : ''}`}
                >
                  <WorkCard 
                    study={study} 
                    onClick={() => setSelectedProject(study)} 
                    className="h-full"
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <WorkModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            onNext={handleNextProject} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}

