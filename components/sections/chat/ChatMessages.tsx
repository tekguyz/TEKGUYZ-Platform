import { motion, AnimatePresence } from "motion/react"
import { Bot, User } from "lucide-react"
import { Message } from "@/hooks/useAiChat"

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
  handleAiAction: (action: string) => void
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

export function ChatMessages({ messages, isLoading, handleAiAction, messagesEndRef }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {messages.map((msg, idx) => (
        <div 
          key={idx} 
          className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${
            msg.role === 'user' 
              ? 'bg-primary/20 text-primary' 
              : 'dark:bg-zinc-800 bg-zinc-200 text-foreground'
          }`}>
            {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
          </div>
          <div className="flex flex-col gap-2">
            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-tr-sm'
                : 'dark:bg-zinc-900/80 bg-zinc-100/80 backdrop-blur-xl text-foreground rounded-tl-sm ring-1 dark:ring-white/5 ring-black/5'
            }`}>
              {msg.text}
            </div>
            
            {/* Suggestion Chips */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                <AnimatePresence>
                  {msg.suggestions.map((sug, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 25 }}
                      onClick={() => handleAiAction(sug.action || sug.label)}
                      className="text-xs px-3 py-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors border border-primary/20 font-medium"
                    >
                      {sug.label}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex gap-3 max-w-[85%] mr-auto">
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 dark:bg-zinc-800 bg-zinc-200 text-foreground">
            <Bot className="w-3 h-3" />
          </div>
          <div className="p-4 rounded-2xl dark:bg-zinc-900/80 bg-zinc-100/80 backdrop-blur-xl rounded-tl-sm ring-1 dark:ring-white/5 ring-black/5 flex items-center gap-1 relative overflow-hidden">
            {/* Shimmer effect */}
            <motion.div 
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ translateX: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
