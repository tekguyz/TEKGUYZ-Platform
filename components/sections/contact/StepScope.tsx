import { motion } from "motion/react"
import { UseFormRegister } from "react-hook-form"
import { RoadmapLead } from "@/lib/schemas"

interface StepScopeProps {
  direction: number
  variants: any
  register: UseFormRegister<RoadmapLead>
}

export function StepScope({ direction, variants, register }: StepScopeProps) {
  return (
    <motion.div
      key="step2"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute inset-0 w-full"
    >
      <h3 className="text-2xl font-bold mb-6">Scope</h3>
      <div className="space-y-8">
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-foreground/80 mb-2">
            Ideal Timeline
          </label>
          <select
            id="timeline"
            {...register("timeline")}
            className="w-full min-h-[44px] bg-transparent border-b-2 dark:border-zinc-800 border-zinc-200 focus:border-primary focus-visible:outline-none focus-visible:ring-0 py-3 transition-colors appearance-none"
          >
            <option value="" disabled className="dark:bg-zinc-900 bg-white">Select a timeline</option>
            <option value="ASAP" className="dark:bg-zinc-900 bg-white">ASAP (Less than 1 month)</option>
            <option value="1-3 months" className="dark:bg-zinc-900 bg-white">1-3 months</option>
            <option value="3-6 months" className="dark:bg-zinc-900 bg-white">3-6 months</option>
            <option value="6+ months" className="dark:bg-zinc-900 bg-white">6+ months</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-foreground/80 mb-2">
            Estimated Budget
          </label>
          <select
            id="budget"
            {...register("budget")}
            className="w-full min-h-[44px] bg-transparent border-b-2 dark:border-zinc-800 border-zinc-200 focus:border-primary focus-visible:outline-none focus-visible:ring-0 py-3 transition-colors appearance-none"
          >
            <option value="" disabled className="dark:bg-zinc-900 bg-white">Select a budget range</option>
            <option value="< $10k" className="dark:bg-zinc-900 bg-white">Under $10,000</option>
            <option value="$10k - $50k" className="dark:bg-zinc-900 bg-white">$10,000 - $50,000</option>
            <option value="$50k - $100k" className="dark:bg-zinc-900 bg-white">$50,000 - $100,000</option>
            <option value="$100k+" className="dark:bg-zinc-900 bg-white">$100,000+</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}
