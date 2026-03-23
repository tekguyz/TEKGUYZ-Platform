"use client"

import { useState } from "react"
import { useForm, UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"

// THE MASTER SCHEMA
export interface RoadmapFormData {
  "form-name": string;
  "bot-field": string;
  mission: string;
  friction: string[];
  timeline: string;
  investment: string; // Renamed from budget
  name: string;
  email: string;
  website: string;
}

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
  } = useForm<RoadmapFormData>({
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

  const getFieldsForStep = (currentStep: number): (keyof RoadmapFormData)[] => {
    switch (currentStep) {
      case 1: return ["mission"]
      case 2: return ["friction"]
      case 3: return ["timeline"]
      case 4: return ["investment"]
      case 5: return ["name", "email", "website"]
      default: return []
    }
  }

  const onSubmit = async (data: RoadmapFormData) => {
    try {
      const formData = new URLSearchParams()
      formData.append("form-name", "roadmap")
      formData.append("bot-field", data["bot-field"] || "")

      Object.keys(data).forEach((key) => {
        if (key !== "form-name" && key !== "bot-field") {
          const value = data[key as keyof RoadmapFormData]
          if (Array.isArray(value)) {
            formData.append(key, value.join(", "))
          } else {
            formData.append(key, value as string)
          }
        }
      })

      const response = await fetch("/", {
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