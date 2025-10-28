// utils/appState.ts

import { AppStore } from '@/constants/types';
import { create } from 'zustand';

const useAppSettings = create<AppStore>((set) => ({
  // State 
  fontScale: 'default', // Default value
  isHydrated: false,

  // Actions
  updatefontScale: (size) => set({ fontScale: size }),
  setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),
}));

export default useAppSettings;