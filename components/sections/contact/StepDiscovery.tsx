import { motion } from "motion/react"
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { RoadmapLead } from "@/lib/schemas"

interface StepDiscoveryProps {
  direction: number
  variants: any
  register: UseFormRegister<RoadmapLead>
  errors: FieldErrors<RoadmapLead>
  setValue: UseFormSetValue<RoadmapLead>
  watch: UseFormWatch<RoadmapLead>
}

export function StepDiscovery({ direction, variants, register, errors, setValue, watch }: StepDiscoveryProps) {
  const selectedMission = watch("mission")

  const missions = [
    { id: "AI Automation", label: "AI Automation" },
    { id: "Custom App", label: "Custom App" },
    { id: "Digital Infrastructure", label: "Digital Infrastructure" },
  ]

  return (
    <motion.div
      key="step1"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <h3 className="text-2xl font-bold mb-6">The Mission</h3>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground/80 mb-4">
          What is your primary objective?
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {missions.map((mission) => {
            const isSelected = selectedMission === mission.id
            return (
              <button
                key={mission.id}
                type="button"
                onClick={() => setValue("mission", mission.id, { shouldValidate: true })}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected 
                    ? "border-primary glow-primary bg-primary/10" 
                    : "dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900/50 bg-white hover:border-primary/50"
                }`}
              >
                <span className={`font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {mission.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Hidden input for react-hook-form */}
        <input type="hidden" {...register("mission")} />

        {errors.mission && (
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-rose-500 text-sm mt-4"
          >
            {errors.mission.message}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
