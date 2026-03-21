import { Send, Loader2 } from "lucide-react"

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  handleSend: (e?: React.FormEvent) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  isLoading: boolean
}

export function ChatInput({ input, setInput, handleSend, handleKeyDown, isLoading }: ChatInputProps) {
  return (
    <form onSubmit={handleSend} className="p-4 border-t dark:border-white/10 border-black/5 bg-background/50">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about our process..."
          className="w-full bg-transparent border dark:border-zinc-800 border-zinc-200 focus:border-primary outline-none py-3 pl-4 pr-14 rounded-full text-sm transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-1 min-w-[44px] min-h-[44px] flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </form>
  )
}
