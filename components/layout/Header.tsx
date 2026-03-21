"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll } from "motion/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Logo } from "@/components/ui/Logo"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const { scrollYProgress } = useScroll()

  const navLinks = [
    { name: "Services", href: "/#solutions" },
    { name: "Work", href: "/#work" },
    { name: "Process", href: "/#process" },
  ]

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "unset"
      document.body.style.paddingRight = "0px";
    }
  }, [isMobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/70 backdrop-blur-2xl border-b border-white/5 shadow-sm transition-colors duration-300">
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(87,76,250,0.5)] z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50">
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
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full transition-colors z-10"
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

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4 z-50">
          <ThemeToggle />
          <Link 
            href="/#contact" 
            className="px-6 py-2.5 text-sm font-bold rounded-full bg-primary text-primary-foreground hover:bg-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all shadow-[0_0_20px_rgba(87,76,250,0.3)] hover:shadow-[0_0_30px_rgba(87,76,250,0.5)] hover:scale-105 active:scale-95 hover:animate-pulse"
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground hover:bg-secondary rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden bg-background/90 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-3xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                className="mt-8 w-full max-w-xs"
              >
                <Link 
                  href="/#contact" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block w-full py-4 text-center text-lg font-bold rounded-full bg-primary text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background shadow-[0_0_30px_rgba(87,76,250,0.4)] hover:scale-105 transition-transform"
                >
                  Start Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
