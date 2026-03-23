"use client"

import { useState } from "react"
import { useForm, UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"

import type { RoadmapLead } from "@/lib/schemas"

export function useRoadmapForm() {
  const [step, setStep] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [direction, setDirection] = useState(0)
  const totalSteps = 5

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoadmapLead>({
    resolver: async (data, context, options) => {
      const { zodResolver } = await import("@hookform/resolvers/zod")
      const { RoadmapLeadSchema } = await import("@/lib/schemas")
      return zodResolver(RoadmapLeadSchema)(data, context, options)
    },
    mode: "onChange",
    defaultValues: {
      "form-name": "roadmap",
      "bot-field": "",
      mission: "",
      friction: [] as string[],
      timeline: "",
      investment: "",
      name: "",
      email: "",
      website: "",
    },
  })

  const nextStep = async () => {
    const fields = getFieldsForStep(step)
    const isValid = await trigger(fields as any)
    if (isValid && step < totalSteps) {
      setDirection(1)
      setStep((s) => s + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1)
      setStep((s) => s - 1)
    }
  }

  const getFieldsForStep = (currentStep: number): (keyof RoadmapLead)[] => {
    switch (currentStep) {
      case 1: return ["mission"]
      case 2: return ["friction"]
      case 3: return ["timeline"]
      case 4: return ["investment"]
      case 5: return ["name", "email", "website"]
      default: return []
    }
  }

  const onSubmit = async (data: RoadmapLead) => {
    try {
      const formData = new URLSearchParams()
      formData.append("form-name", "roadmap")
      formData.append("bot-field", data["bot-field"] || "")

      Object.keys(data).forEach((key) => {
        if (key !== "form-name" && key !== "bot-field") {
          const value = data[key as keyof RoadmapLead]
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach((v) => formData.append(key, v))
            } else {
              formData.append(key, value as string)
            }
          }
        }
      })

      const response = await fetch("/netlify-forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      })

      if (response.ok) setIsSuccess(true)
    } catch (error) {
      console.error("Submission Error:", error)
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