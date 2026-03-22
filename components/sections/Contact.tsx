"use client"

import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useRoadmapForm } from "@/hooks/useRoadmapForm"
import { StepDiscovery } from "./contact/StepDiscovery"
import { StepScope } from "./contact/StepScope"
import { StepLogistics } from "./contact/StepLogistics"
import { StepContact } from "./contact/StepContact"
import { FormSuccessState } from "./contact/FormSuccessState"

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? -100 : 100,
    opacity: 0,
  }),
}

export function Contact() {
  const {
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
  } = useRoadmapForm()

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-widest uppercase text-xs">Project Roadmap</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">Let&apos;s Build Something Extraordinary</h2>
          <p className="text-muted-foreground dark:text-zinc-400 text-zinc-600 text-lg">
            Tell us about your vision, and we&apos;ll engineer the path to get there.
          </p>
        </motion.div>

        {/* Form Container */}
        <div className="relative dark:bg-zinc-950/60 bg-white/60 backdrop-blur-2xl ring-1 dark:ring-white/10 ring-black/5 p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden min-h-[450px] flex flex-col">
          
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <FormSuccessState key="success" />
            ) : (
              <motion.div key="form" className="flex flex-col h-full flex-grow w-full">
                {/* Progress Bar */}
                <div className="w-full h-1 dark:bg-zinc-800 bg-zinc-200 rounded-full mb-10 overflow-hidden shrink-0">
                  <motion.div 
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow relative w-full">
                  <div className="flex-grow relative w-full h-[250px]">
                    <AnimatePresence mode="wait" custom={direction}>
                      {step === 1 && (
                        <StepDiscovery 
                          direction={direction} 
                          variants={variants} 
                          register={register} 
                          errors={errors} 
                        />
                      )}
                      {step === 2 && (
                        <StepScope 
                          direction={direction} 
                          variants={variants} 
                          register={register} 
                        />
                      )}
                      {step === 3 && (
                        <StepLogistics 
                          direction={direction} 
                          variants={variants} 
                          register={register} 
                          errors={errors} 
                        />
                      )}
                      {step === 4 && (
                        <StepContact 
                          direction={direction} 
                          variants={variants} 
                          register={register} 
                          errors={errors} 
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t dark:border-zinc-800 border-zinc-200 shrink-0">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex min-h-[44px] min-w-[44px] items-center text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </button>
                    ) : (
                      <div /> // Spacer
                    )}

                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex min-h-[44px] min-w-[44px] items-center bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors shadow-lg shadow-primary/20"
                      >
                        Next Step <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex min-h-[44px] min-w-[44px] items-center bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Roadmap Request"}
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hidden Form for Netlify Bots removed to fix build error. Netlify forms should be placed in public/ folder for Next.js App Router. */}
      </div>
    </section>
  )
}
