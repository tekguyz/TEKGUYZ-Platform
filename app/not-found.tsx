"use client"

import Link from 'next/link';
import { Hexagon, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useUIStore } from '@/store/useUIStore';

export default function NotFound() {
  const toggleAiChat = useUIStore((state) => state.toggleAiChat);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 md:px-12 text-center overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center dark:bg-zinc-950/40 bg-white/40 backdrop-blur-xl border dark:border-white/10 border-black/5 rounded-3xl p-8 md:p-16 shadow-2xl max-w-3xl w-full mx-auto">
        <motion.div 
          className="relative mb-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Hexagon className="w-40 h-40 text-primary/30 drop-shadow-[0_0_30px_var(--primary)]" strokeWidth={1} />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Glitch Effect on 404 */}
            <span className="text-5xl font-black text-primary/60 mix-blend-overlay animate-pulse">404</span>
          </div>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-foreground relative">
          <span className="relative z-10">Signal Lost</span>
          {/* Scanline overlay for text */}
          <span className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-20 pointer-events-none opacity-20 dark:opacity-40 mix-blend-overlay"></span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-lg mb-12 font-light leading-relaxed">
          We couldn&apos;t find the coordinates you&apos;re looking for. The page might have been moved, deleted, or never existed in this timeline.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
          <Link 
            href="/"
            className="group w-full sm:w-auto min-h-[44px] px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_var(--primary)] hover:shadow-[0_0_40px_var(--primary)] hover:scale-105 active:scale-95"
          >
            Return to Mission Control
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button 
            onClick={toggleAiChat}
            className="group w-full sm:w-auto min-h-[44px] px-8 py-4 rounded-full bg-primary/10 text-primary font-semibold text-base border border-primary/20 hover:bg-primary/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Consult the Strategist
          </button>
        </div>
      </div>
    </main>
  );
}
