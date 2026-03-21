import { motion } from "motion/react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { RoadmapLead } from "@/lib/schemas"

interface StepLogisticsProps {
  direction: number
  variants: any
  register: UseFormRegister<RoadmapLead>
  errors: FieldErrors<RoadmapLead>
}

export function StepLogistics({ direction, variants, register, errors }: StepLogisticsProps) {
  return (
    <motion.div
      key="step3"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute inset-0 w-full"
    >
      <h3 className="text-2xl font-bold mb-6">Logistics</h3>
      <div className="space-y-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground/80 mb-2">
            Company Name
          </label>
          <input
            id="company"
            {...register("company")}
            type="text"
            placeholder="Your Company"
            className="w-full min-h-[44px] bg-transparent border-b-2 dark:border-zinc-800 border-zinc-200 focus:border-primary focus-visible:outline-none focus-visible:ring-0 py-3 transition-colors"
          />
          {errors.company && (
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-rose-500 text-sm mt-2">
              {errors.company.message}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
