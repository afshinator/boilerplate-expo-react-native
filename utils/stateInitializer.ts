import { fontScaleSize } from "@/constants/types";
import useAppSettings from "./appState";
import { getItem, setItem } from "./asyncStorage";

// Define the keys we want to load from AsyncStorage.
const ASYNC_STORAGE_KEYS = ["fontScale"];

/**
 * Loads specific state values from AsyncStorage and uses Zustand setters to initialize the store.
 * If a key is missing in AsyncStorage, it is created with its default value and saved.
 */
export const initializeAppStateFromStorage = async (): Promise<void> => {
  // Get the setters AND the default state values once from the store definition
  const {
    updatefontScale,
    setHydrated,
    fontScale: defaultFontScale,
  } = useAppSettings.getState();

  try {
    // 1. Fetch all items concurrently
    const values = await Promise.all(
      ASYNC_STORAGE_KEYS.map((key) => getItem(key))
    );
    console.log("in stateInitiazlier, values", values);

    // 2. Map values back to their original keys
    const storedState: Record<string, string | null> = {};
    ASYNC_STORAGE_KEYS.forEach((key, index) => {
      storedState[key] = values[index];
    });

    // 3. Process each key to check for existence, initialize if needed, and update Zustand

    // Font Scaling initialization
    let fontScaleValue = storedState["fontScale"];
    // const defaultFontScale is now retrieved from useAppSettings.getState()

    if (fontScaleValue === null) {
      // Key is missing: set to default value retrieved from the store
      fontScaleValue = defaultFontScale;

      // Persist the default value back to AsyncStorage
      await setItem("fontScale", defaultFontScale);
      console.log(
        `👉 AsyncStorage: Initialized missing key 'fontScale' with default value: ${defaultFontScale}`
      );
    }

    // Update the Zustand store using the retrieved or defaulted value
    if (fontScaleValue) {
      // NOTE: Casting as fontScaleSize, assuming storage holds a valid value from the defined type.
      updatefontScale(fontScaleValue as fontScaleSize);
      console.log(`👌 Initialized Font Scaling: ${fontScaleValue}`);
    }

    // 4. Mark the store as hydrated/loaded
    setHydrated(true);
  } catch (error) {
    console.error("🤢 Failed to initialize app state from AsyncStorage:", error);
    // Ensure hydration completes even on error
    setHydrated(true);
  }
};
