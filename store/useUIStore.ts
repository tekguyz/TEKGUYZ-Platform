import { create } from 'zustand';

interface UIState {
  isAiChatOpen: boolean;
  isMobileMenuOpen: boolean;
  activeSection: string;
  toggleAiChat: () => void;
  setAiChatOpen: (isOpen: boolean) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAiChatOpen: false,
  isMobileMenuOpen: false,
  activeSection: 'home',
  toggleAiChat: () => set((state) => ({ isAiChatOpen: !state.isAiChatOpen })),
  setAiChatOpen: (isOpen) => set({ isAiChatOpen: isOpen }),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setActiveSection: (section) => set({ activeSection: section }),
}));
