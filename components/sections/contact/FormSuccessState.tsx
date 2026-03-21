import { motion } from "motion/react"
import { CheckCircle2 } from "lucide-react"

export function FormSuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="flex flex-col items-center justify-center h-full text-center py-12 flex-grow absolute inset-0 m-auto"
    >
      <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6 ring-1 ring-emerald-500/50">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h3 className="text-3xl font-bold mb-4">Request Received</h3>
      <p className="text-muted-foreground text-lg max-w-md">
        We&apos;re reviewing your roadmap details. Our lead architect will be in touch within 24 hours.
      </p>
    </motion.div>
  )
}
