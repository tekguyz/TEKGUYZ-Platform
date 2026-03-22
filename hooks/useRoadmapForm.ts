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
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RoadmapLead>({
    resolver: zodResolver(RoadmapLeadSchema),
    mode: "onChange",
    defaultValues: {
      friction: [],
    }
  })

  const totalSteps = 5

  const nextStep = async () => {
    let fieldsToValidate: (keyof RoadmapLead)[] = []
    if (step === 1) fieldsToValidate = ["mission"]
    if (step === 2) fieldsToValidate = ["friction"]
    if (step === 3) fieldsToValidate = ["timeline"]
    if (step === 4) fieldsToValidate = ["budget"]
    if (step === 5) fieldsToValidate = ["name", "email", "website"]

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
          mission: data.mission,
          friction: data.friction.join(', '),
          timeline: data.timeline,
          budget: data.budget,
          name: data.name,
          email: data.email,
          website: data.website || '',
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
    setValue,
    watch,
  }
}
