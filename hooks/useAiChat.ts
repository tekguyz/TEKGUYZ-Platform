"use client"

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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true);
    const savedMessages = sessionStorage.getItem('ai_chat_messages');
    if (savedMessages) {
      try { setMessages(JSON.parse(savedMessages)); } catch (e) { console.error(e); }
    }
    const savedInteracted = sessionStorage.getItem('ai_chat_interacted');
    setHasInteracted(savedInteracted === 'true');
  }, []);

  useEffect(() => {
    if (isMounted) sessionStorage.setItem('ai_chat_messages', JSON.stringify(messages));
  }, [messages, isMounted]);

  useEffect(() => {
    if (isMounted && isAiChatOpen && !hasInteracted) {
      setHasInteracted(true);
      sessionStorage.setItem('ai_chat_interacted', 'true');
    }
  }, [isAiChatOpen, hasInteracted, isMounted]);

  const handleAiAction = (action: string) => {
    if (['NAV_TO_CONTACT', 'OPEN_ROADMAP'].includes(action)) {
      toggleAiChat(); window.location.href = '#contact';
    } else if (action === 'NAV_TO_WORK') {
      toggleAiChat(); window.location.href = '#work';
    } else if (action === 'NAV_TO_PROCESS') {
      toggleAiChat(); window.location.href = '#process';
    } else {
      handleSend(undefined, action);
    }
  };

  const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault()
    const userMessage = textOverride || input.trim()
    if (!userMessage || isLoading) return

    setInput("")
    const newMessages = [...messages, { role: 'user' as const, text: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      // Logic shift: We are fetching our own internal API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: newMessages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))})
      });

      if (!response.ok) throw new Error("Failed to reach AI server");

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: data.text || "",
        suggestions: data.suggestions,
        autoAction: data.autoAction
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, I'm having trouble connecting to mission control. Try again in a second?" }]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  return { isMounted, messages, hasInteracted, input, setInput, isLoading, messagesEndRef, handleSend, handleKeyDown, handleAiAction, isAiChatOpen, toggleAiChat }
}