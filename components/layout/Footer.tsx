"use client"

import { Twitter, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/ui/Logo"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background transition-colors duration-300 border-t dark:border-white/5 border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <Logo />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
              Architecting premium digital infrastructure and AI solutions for teams that refuse to lose.
            </p>
            <div className="flex items-center gap-5">
              <a href="https://twitter.com/tekguyz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://github.com/tekguyz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com/company/tekguyz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Links Matrix */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Services */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground text-sm mb-2">Services</h4>
              {/* Pointing to the Solutions section */}
              <Link href="/#solutions" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300 w-fit">AI Workflows</Link>
              <Link href="/#solutions" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300 w-fit">Digital Infrastructure</Link>
              <Link href="/#solutions" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300 w-fit">Strategic Consulting</Link>
            </div>
            
            {/* Company */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground text-sm mb-2">Company</h4>
              <Link href="/#work" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300 w-fit">Work</Link>
              <Link href="/#process" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300 w-fit">Process</Link>
              <Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300 w-fit">Contact</Link>
            </div>
            
            {/* Legal */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground text-sm mb-2">Legal</h4>
              {/* Pointing to dedicated pages (we will build these next) */}
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300 w-fit">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300 w-fit">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t dark:border-white/5 border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TEKGUYZ. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  )
}