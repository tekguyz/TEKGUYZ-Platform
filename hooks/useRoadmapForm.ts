import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RoadmapLeadSchema, type RoadmapLead } from "@/lib/schemas"

export function useRoadmapForm() {
  const [step, setStep] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RoadmapLead>({
    resolver: zodResolver(RoadmapLeadSchema),
    mode: "onChange",
  })

  const totalSteps = 4

  const nextStep = async () => {
    let fieldsToValidate: (keyof RoadmapLead)[] = []
    if (step === 1) fieldsToValidate = ["objective"]
    if (step === 2) fieldsToValidate = ["timeline", "budget"]
    if (step === 3) fieldsToValidate = ["company"]

    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid) {
      setDirection(1)
      setStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setDirection(-1)
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: RoadmapLead) => {
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'roadmap',
          ...data,
        }).toString(),
      })

      if (!res.ok) {
        throw new Error('Form submission failed')
      }

      setIsSuccess(true)
    } catch (error) {
      console.error('Submission error:', error)
    }
  }

  return {
    step,
    isSuccess,
    direction,
    totalSteps,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    nextStep,
    prevStep,
    onSubmit,
  }
}
