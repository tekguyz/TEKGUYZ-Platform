"use client"

import { useState } from "react"
import { useScroll, useMotionValueEvent } from "motion/react"
import { useAiChat } from "@/hooks/useAiChat"
import { useUIStore } from "@/store/useUIStore"
import { ChatFab } from "./chat/ChatFab"
import { ChatWindow } from "./chat/ChatWindow"
import { ChatMessages } from "./chat/ChatMessages"
import { ChatInput } from "./chat/ChatInput"

export function AiStrategyBot() {
  const [isVisible, setIsVisible] = useState(false)
  const { isMobileMenuOpen } = useUIStore()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  })

  const showFab = isVisible && !isMobileMenuOpen

  const {
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
  } = useAiChat()

  if (!isMounted) return null

  return (
    <>
      <ChatFab 
        showFab={showFab} 
        hasInteracted={hasInteracted} 
        toggleAiChat={toggleAiChat} 
        isAiChatOpen={isAiChatOpen} 
      />
      
      <ChatWindow isAiChatOpen={isAiChatOpen} toggleAiChat={toggleAiChat}>
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading} 
          handleAiAction={handleAiAction} 
          messagesEndRef={messagesEndRef} 
        />
        <ChatInput 
          input={input} 
          setInput={setInput} 
          handleSend={handleSend} 
          handleKeyDown={handleKeyDown} 
          isLoading={isLoading} 
        />
      </ChatWindow>
    </>
  )
}