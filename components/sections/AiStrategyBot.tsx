"use client"

import { useRef } from "react"
import { useInView } from "motion/react"
import { useAiChat } from "@/hooks/useAiChat"
import { ChatFab } from "./chat/ChatFab"
import { ChatWindow } from "./chat/ChatWindow"
import { ChatMessages } from "./chat/ChatMessages"
import { ChatInput } from "./chat/ChatInput"

export function AiStrategyBot() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sentinelRef)
  const showFab = !isInView // Show FAB when sentinel scrolls out of view

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
      {/* The Sentinel: A hidden element at 100vh to trigger the FAB */}
      <div id="chat-sentinel" className="absolute top-[100vh] h-px w-px pointer-events-none" ref={sentinelRef} />
      
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