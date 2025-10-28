// Define the possible string values for fontScale
export type fontScaleSize = 'small' | 'default' | 'large' | 'extra-large';

interface AppState {
  fontScale: fontScaleSize;
  isHydrated: boolean; // Flag to indicate if state has been loaded from storage
}

interface AppActions {
  updatefontScale: (size: fontScaleSize) => void;
  setHydrated: (hydrated: boolean) => void;
}

// Combine the state and actions into the main store type
export type AppStore = AppState & AppActions;