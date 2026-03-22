import { motion, AnimatePresence } from "motion/react"
import { MessageSquarePlus } from "lucide-react"

interface ChatFabProps {
  showFab: boolean
  hasInteracted: boolean
  toggleAiChat: () => void
  isAiChatOpen: boolean
}

export function ChatFab({ showFab, hasInteracted, toggleAiChat, isAiChatOpen }: ChatFabProps) {
  return (
    <AnimatePresence>
      {!isAiChatOpen && showFab && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleAiChat}
          aria-label="Open AI Strategist Chat"
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[var(--z-fab)] w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_0_20px_var(--primary)] hover:shadow-[0_0_30px_var(--primary)] transition-shadow will-change-transform"
        >
          <MessageSquarePlus className="w-6 h-6" />
          {!hasInteracted && (
            <>
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-primary rounded-full animate-ping" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-primary border-2 border-background rounded-full" />
            </>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
