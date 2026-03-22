import { motion, AnimatePresence } from "motion/react"
import { X, Bot } from "lucide-react"

interface ChatWindowProps {
  isAiChatOpen: boolean
  toggleAiChat: () => void
  children: React.ReactNode
}

export function ChatWindow({ isAiChatOpen, toggleAiChat, children }: ChatWindowProps) {
  return (
    <AnimatePresence>
      {isAiChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-[120] w-full h-full rounded-none md:inset-auto md:bottom-6 md:right-6 md:z-[70] md:w-[480px] md:h-[750px] md:max-h-[85vh] md:rounded-3xl flex flex-col dark:bg-zinc-950/90 bg-white/90 backdrop-blur-3xl ring-1 dark:ring-white/10 ring-black/5 shadow-2xl overflow-hidden will-change-transform"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-white/10 border-black/5 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">TEKGUYZ AI Strategist</h3>
                <p className="text-xs text-primary font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <button 
              onClick={toggleAiChat}
              className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
            >
              <span className="text-xs font-medium md:hidden">Close</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
