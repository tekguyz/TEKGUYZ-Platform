import { motion } from "motion/react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { RoadmapLead } from "@/lib/schemas"

interface StepContactProps {
  direction: number
  variants: any
  register: UseFormRegister<RoadmapLead>
  errors: FieldErrors<RoadmapLead>
}

export function StepContact({ direction, variants, register, errors }: StepContactProps) {
  return (
    <motion.div
      key="step5"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <h3 className="text-2xl font-bold mb-6">Mission Control</h3>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
            Full Name
          </label>
          <input
            id="name"
            {...register("name")}
            type="text"
            placeholder="John Doe"
            className="w-full min-h-[44px] bg-transparent border-b-2 dark:border-zinc-800 border-zinc-200 focus:border-primary focus-visible:outline-none focus-visible:ring-0 py-3 transition-colors"
          />
          {errors.name && (
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-rose-500 text-sm mt-2">
              {errors.name.message}
            </motion.p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
            Professional Email
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="john@company.com"
            className="w-full min-h-[44px] bg-transparent border-b-2 dark:border-zinc-800 border-zinc-200 focus:border-primary focus-visible:outline-none focus-visible:ring-0 py-3 transition-colors"
          />
          {errors.email && (
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-rose-500 text-sm mt-2">
              {errors.email.message}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-foreground/80 mb-2">
            Website URL (Optional)
          </label>
          <input
            id="website"
            {...register("website")}
            type="url"
            placeholder="https://company.com"
            className="w-full min-h-[44px] bg-transparent border-b-2 dark:border-zinc-800 border-zinc-200 focus:border-primary focus-visible:outline-none focus-visible:ring-0 py-3 transition-colors"
          />
          {errors.website && (
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-rose-500 text-sm mt-2">
              {errors.website.message}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
