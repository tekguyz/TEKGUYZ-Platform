import { motion } from "motion/react"
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { RoadmapLead } from "@/lib/schemas"

interface StepLogisticsProps {
  direction: number
  variants: any
  register: UseFormRegister<RoadmapLead>
  errors: FieldErrors<RoadmapLead>
  setValue: UseFormSetValue<RoadmapLead>
  watch: UseFormWatch<RoadmapLead>
}

export function StepLogistics({ direction, variants, register, errors, setValue, watch }: StepLogisticsProps) {
  const selectedTimeline = watch("timeline")

  const timelines = [
    { id: "Urgent", label: "Urgent" },
    { id: "1-2 Months", label: "1-2 Months" },
    { id: "Discovery Phase", label: "Discovery Phase" },
  ]

  return (
    <motion.div
      key="step3"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <h3 className="text-2xl font-bold mb-6">The Target</h3>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground/80 mb-4">
          When do you need to launch?
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {timelines.map((timeline) => {
            const isSelected = selectedTimeline === timeline.id
            return (
              <button
                key={timeline.id}
                type="button"
                onClick={() => setValue("timeline", timeline.id, { shouldValidate: true })}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected 
                    ? "border-primary glow-primary bg-primary/10" 
                    : "dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900/50 bg-white hover:border-primary/50"
                }`}
              >
                <span className={`font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {timeline.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Hidden input for react-hook-form */}
        <input type="hidden" {...register("timeline")} />

        {errors.timeline && (
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-rose-500 text-sm mt-4"
          >
            {errors.timeline.message}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
