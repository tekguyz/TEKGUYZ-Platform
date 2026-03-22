import { motion } from "motion/react"
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { RoadmapLead } from "@/lib/schemas"

interface StepInvestmentProps {
  direction: number
  variants: any
  register: UseFormRegister<RoadmapLead>
  errors: FieldErrors<RoadmapLead>
  setValue: UseFormSetValue<RoadmapLead>
  watch: UseFormWatch<RoadmapLead>
}

export function StepInvestment({ direction, variants, register, errors, setValue, watch }: StepInvestmentProps) {
  const selectedBudget = watch("budget")

  const budgets = [
    { id: "$5k–$10k", label: "$5k–$10k" },
    { id: "$10k–$25k", label: "$10k–$25k" },
    { id: "$25k–$50k", label: "$25k–$50k" },
    { id: "$50k+", label: "$50k+" },
  ]

  return (
    <motion.div
      key="step4"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <h3 className="text-2xl font-bold mb-6">The Investment</h3>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground/80 mb-4">
          What is your estimated budget?
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {budgets.map((budget) => {
            const isSelected = selectedBudget === budget.id
            return (
              <button
                key={budget.id}
                type="button"
                onClick={() => setValue("budget", budget.id, { shouldValidate: true })}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected 
                    ? "border-primary glow-primary bg-primary/10" 
                    : "dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900/50 bg-white hover:border-primary/50"
                }`}
              >
                <span className={`font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {budget.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Hidden input for react-hook-form */}
        <input type="hidden" {...register("budget")} />

        {errors.budget && (
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-rose-500 text-sm mt-4"
          >
            {errors.budget.message}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
