import { motion } from "motion/react"

interface WorkFiltersProps {
  industries: string[]
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export function WorkFilters({ industries, activeFilter, setActiveFilter }: WorkFiltersProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-wrap justify-center gap-4 mb-16"
    >
      {industries.map((industry) => (
        <button
          key={industry}
          onClick={() => setActiveFilter(industry)}
          className={`relative min-h-[44px] px-5 py-2 rounded-full text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-300 ${
            activeFilter === industry
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="relative z-10">{industry}</span>
          {activeFilter === industry && (
            <motion.div
              layoutId="activeFilterDot"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </motion.div>
  )
}
