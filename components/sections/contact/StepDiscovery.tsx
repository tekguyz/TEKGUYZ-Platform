import { motion } from "motion/react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { RoadmapLead } from "@/lib/schemas"

interface StepDiscoveryProps {
  direction: number
  variants: any
  register: UseFormRegister<RoadmapLead>
  errors: FieldErrors<RoadmapLead>
}

export function StepDiscovery({ direction, variants, register, errors }: StepDiscoveryProps) {
  return (
    <motion.div
      key="step1"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute inset-0 w-full"
    >
      <h3 className="text-2xl font-bold mb-6">Discovery</h3>
      <div className="space-y-4">
        <label htmlFor="objective" className="block text-sm font-medium text-foreground/80">
          What is the primary objective or bottleneck you are facing?
        </label>
        <textarea
          id="objective"
          {...register("objective")}
          rows={5}
          className="w-full bg-transparent border-b-2 dark:border-zinc-800 border-zinc-200 focus:border-primary focus-visible:outline-none focus-visible:ring-0 transition-colors resize-none"
          placeholder="Describe your project goals, challenges, or the specific problem you need solved..."
        />
        {errors.objective && (
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-rose-500 text-sm mt-2"
          >
            {errors.objective.message}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
