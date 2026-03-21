import { useState, useEffect, useRef } from "react"
import { useUIStore } from "@/store/useUIStore"

export type Suggestion = { label: string; action: string };
export type Message = { role: 'user' | 'model', text: string, suggestions?: Suggestion[], autoAction?: string | null };

const DEFAULT_MESSAGE: Message = { 
  role: 'model', 
  text: "Hey! I’m here to help you figure out the best path for your project. Whether you have a specific question about how we work or just want to see if we’re a good fit, what’s on your mind?",
  suggestions: [
    { label: "How do you usually work?", action: "NAV_TO_PROCESS" },
    { label: "I have a project in mind", action: "OPEN_ROADMAP" }
  ]
};

export function useAiChat() {
  const { isAiChatOpen, toggleAiChat } = useUIStore()
  
  const [messages, setMessages] = useState<Message[]>([DEFAULT_MESSAGE]);
  const [hasInteracted, setHasInteracted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // --- PERSISTENCE & INTERACTION ---
  useEffect(() => {
    setIsMounted(true);
    // Cache Buster: Force the browser to load the new greeting instead of the old cached one
    sessionStorage.removeItem('ai_chat_messages');
    
    const savedMessages = sessionStorage.getItem('ai_chat_messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse saved messages", e);
      }
    }
    
    const savedInteracted = sessionStorage.getItem('ai_chat_interacted');
    if (savedInteracted === 'true') {
      setHasInteracted(true);
    } else {
      setHasInteracted(false);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem('ai_chat_messages', JSON.stringify(messages));
    }
  }, [messages, isMounted]);

  useEffect(() => {
    if (isMounted && isAiChatOpen && !hasInteracted) {
      setHasInteracted(true);
      sessionStorage.setItem('ai_chat_interacted', 'true');
    }
  }, [isAiChatOpen, hasInteracted, isMounted]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  // --- ACTION LOGIC ---
  const handleAiAction = (action: string) => {
    if (action === 'NAV_TO_CONTACT' || action === 'OPEN_ROADMAP') {
      toggleAiChat();
      window.location.href = '#contact';
    } else if (action === 'NAV_TO_WORK') {
      toggleAiChat();
      window.location.href = '#work';
    } else if (action === 'NAV_TO_PROCESS') {
      toggleAiChat();
      window.location.href = '#process';
    } else {
      // Treat as a normal message reply
      handleSend(undefined, action);
    }
  };

  // --- AUTO-REDIRECT ---
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'model' && lastMessage.autoAction) {
      const action = lastMessage.autoAction;
      const timer = setTimeout(() => {
        handleAiAction(action);
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // --- SEND MESSAGE ---
  const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault()
    const userMessage = textOverride || input.trim()
    if (!userMessage || isLoading) return

    setInput("")
    const newMessages = [...messages, { role: 'user' as const, text: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      // Gemini API requires the history to start with a user message.
      let validHistory = newMessages;
      if (validHistory.length > 0 && validHistory[0].role === 'model') {
        validHistory = validHistory.slice(1);
      }

      const history = validHistory.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history }),
      })

      if (!res.ok) {
        throw new Error('Failed to fetch response')
      }

      const data = await res.json()
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: data.text || "",
        suggestions: data.suggestions,
        autoAction: data.autoAction
      }])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm currently experiencing a connection issue. Please try again or contact our team directly." }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return {
    isMounted,
    messages,
    hasInteracted,
    input,
    setInput,
    isLoading,
    messagesEndRef,
    handleSend,
    handleKeyDown,
    handleAiAction,
    isAiChatOpen,
    toggleAiChat
  }
}
