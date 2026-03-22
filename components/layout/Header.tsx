"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Logo } from "@/components/ui/Logo"
import { useUIStore } from "@/store/useUIStore"

export function Header() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const { scrollYProgress } = useScroll()

  // GPU-accelerated scroll bar
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  const navLinks = [
    { name: "Services", href: "/#solutions" },
    { name: "Work", href: "/#work" },
    { name: "Process", href: "/#process" },
  ]

  // Body lock to prevent background scrolling
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[var(--z-header)] bg-background/70 backdrop-blur-2xl border-b border-white/5 shadow-sm transition-colors duration-300">
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_var(--primary)] z-[calc(var(--z-header)+10)]"
          style={{ scaleX, transformOrigin: "0%", willChange: "transform" }}
        />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group z-[calc(var(--z-header)+20)]">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 relative">
            {navLinks.map((link, index) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                {link.name}
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 z-[calc(var(--z-header)+20)]">
            <ThemeToggle />
            <Link 
              href="/#contact" 
              className="px-6 py-2.5 text-sm font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-[0_0_20px_var(--primary)]"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile UI */}
          <div className="md:hidden flex items-center gap-4 z-[calc(var(--z-header)+20)]">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} 
              className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary rounded-full outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY - MOVED OUTSIDE HEADER TO FIX BLUR-TRAP */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[var(--z-overlay)] md:hidden bg-background flex flex-col pt-32 px-8"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-3xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <Link 
                  href="/#contact" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="inline-block w-full py-4 text-center text-lg font-bold rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_var(--primary)]"
                >
                  Start Project
                </Link>
              </motion.div>
            </div>

            {/* Subtle Brand Watermark in menu */}
            <div className="mt-auto pb-12 opacity-20 italic text-sm">
              Architecting the Advantage.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}