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
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[70] w-[calc(100vw-2rem)] md:w-[380px] h-[550px] max-h-[80vh] flex flex-col dark:bg-zinc-950/90 bg-white/90 backdrop-blur-2xl ring-1 dark:ring-white/10 ring-black/5 rounded-3xl shadow-2xl overflow-hidden will-change-transform"
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
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
