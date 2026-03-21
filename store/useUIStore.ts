import { create } from 'zustand';

interface UIState {
  isAiChatOpen: boolean;
  activeSection: string;
  toggleAiChat: () => void;
  setAiChatOpen: (isOpen: boolean) => void;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAiChatOpen: false,
  activeSection: 'home',
  toggleAiChat: () => set((state) => ({ isAiChatOpen: !state.isAiChatOpen })),
  setAiChatOpen: (isOpen) => set({ isAiChatOpen: isOpen }),
  setActiveSection: (section) => set({ activeSection: section }),
}));
