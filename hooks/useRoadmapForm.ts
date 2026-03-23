"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

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
  } = useForm({
    mode: "onChange",
    defaultValues: {
      "form-name": "roadmap",
      "bot-field": "",
      mission: "",      // Step 1
      friction: [],     // Step 2
      timeline: "",     // Step 3
      investment: "",   // Step 4
      name: "",         // Step 5
      email: "",        // Step 5
      website: "",      // Step 5
    },
  })

  // Determine which fields to validate before letting the user move to the next step
  const getFieldsForStep = (currentStep: number): string[] => {
    switch (currentStep) {
      case 1: return ["mission"]
      case 2: return ["friction"]
      case 3: return ["timeline"]
      case 4: return ["investment"]
      case 5: return ["name", "email", "website"]
      default: return []
    }
  }

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

  const onSubmit = async (data: any) => {
    try {
      // Netlify requires application/x-www-form-urlencoded
      const formData = new URLSearchParams()
      
      // Manually append the identifier fields
      formData.append("form-name", "roadmap")
      formData.append("bot-field", data["bot-field"] || "")

      // Loop through all data and append
      Object.keys(data).forEach((key) => {
        if (key !== "form-name" && key !== "bot-field") {
          const value = data[key]
          // If the value is an array (like Step 2 multi-select), join it
          if (Array.isArray(value)) {
            formData.append(key, value.join(", "))
          } else {
            formData.append(key, value)
          }
        }
      })

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        throw new Error("Netlify interception failed.")
      }
    } catch (error) {
      console.error("Submission Error:", error)
      alert("Transmission failed. Please check your connection and try again.")
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