"use client"

import { motion, Variants } from "motion/react"
import { Sparkles, ArrowRight, Zap } from "lucide-react"
import { useUIStore } from "@/store/useUIStore"
import Link from "next/link"

export function Hero() {
  const toggleAiChat = useUIStore((state) => state.toggleAiChat)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
  }

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-16 overflow-hidden">
      
      {/* --- High-End Background Effects --- */}
      {/* 1. Animated Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      {/* 2. Primary Aurora Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none" />
      {/* 3. Secondary Indigo Glow for Depth */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-500/20 blur-[100px] rounded-[100%] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 text-center max-w-5xl w-full flex flex-col items-center"
      >
        {/* Eyebrow Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border dark:border-white/10 border-black/5 dark:bg-zinc-900/50 bg-white/50 backdrop-blur-md text-sm font-medium tracking-wide shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-foreground">Architecting the Intelligent Enterprise</span>
          </div>
        </motion.div>

        {/* The Copywriting Punch-Up */}
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 text-foreground leading-[1.05]">
          End manual work fatigue. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-violet-400 to-violet-600">
            Refuse to lose.
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          We engineer bespoke digital platforms and AI workflows that eliminate busywork, find hidden revenue, and scale without friction.
        </motion.p>

        {/* Action Row */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mb-16">
          <Link 
            href="#contact" 
            className="group w-full sm:w-auto min-h-[44px] px-8 py-4 rounded-full bg-foreground text-background font-semibold text-base hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
          >
            Start Your Roadmap
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button 
            onClick={toggleAiChat}
            className="group w-full sm:w-auto min-h-[44px] px-8 py-4 rounded-full bg-primary/10 text-primary font-semibold text-base border border-primary/20 hover:bg-primary/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Talk to AI Strategist
          </button>
        </motion.div>

        {/* Trust/ROI Indicator (The "WOW" Detail) */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-8 pt-8 border-t dark:border-white/10 border-black/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full dark:bg-zinc-900 bg-zinc-100 flex items-center justify-center ring-1 dark:ring-white/10 ring-black/5">
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground">Average 40%</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Operational Time Saved</p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}