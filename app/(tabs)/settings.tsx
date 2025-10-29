// settings.tsx - Refactored to use a modular, theme-aware Segmented Control

import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Fonts } from "@/constants/theme";
import { fontScaleSize } from '@/constants/types';
import useAppSettings from '@/utils/appState';
import { setItem } from '@/utils/asyncStorage';
 

// Define the keys and options using the official type
const FONT_SCALE_KEY = 'fontScale';
const FONT_SCALE_OPTIONS: fontScaleSize[] = ['small', 'default', 'large', 'extra-large'];


interface FontScaleSegmentedControlProps {
  currentScale: fontScaleSize;
  onScaleChange: (newScale: fontScaleSize) => void;
}

/**
 * A theme-aware segmented control for selecting the application's font scale.
 */
const FontScaleSegmentedControl: React.FC<FontScaleSegmentedControlProps> = ({ 
  currentScale, 
  onScaleChange 
}) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  
  // Colors for the segmented control
  const tintColor = themeColors.tint;
  const containerBackgroundColor = themeColors.background; // Match page background
  const containerBorderColor = themeColors.border; // Soft border for container

  return (
    <View 
      style={[
        styles.segmentedControlContainer, 
        { 
          backgroundColor: containerBackgroundColor, 
          borderColor: containerBorderColor 
        }
      ]}
    >
      {FONT_SCALE_OPTIONS.map((value) => {
        const isSelected = currentScale === value;
        
        // Helper to capitalize and replace hyphens for a cleaner button label
        const label = value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ');

        // Determine the text color based on selection and theme
        const segmentTextColor = isSelected 
          ? themeColors.background // Text color is background color when segment is tinted (white/dark gray)
          : themeColors.text;      // Use default text color when not selected

        return (
          <TouchableOpacity
            key={value}
            style={[
              styles.segment,
              isSelected && { backgroundColor: tintColor }, // Tint color for selected background
            ]}
            onPress={() => onScaleChange(value)}
          >
            <ThemedText
              // Use ThemedText type for sizing instead of hardcoded style
              type="defaultSemiBold" 
              style={{ 
                color: segmentTextColor, // Dynamic text color
              }}
            >
              {label}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


// --- Main Component: Settings ---

export default function Settings() {
  // Get the current state value and the setter from Zustand
  const { fontScale, updatefontScale } = useAppSettings();

  /**
   * Handles updating the font scale, ensuring both the Zustand store (for immediate UI update)
   * and AsyncStorage (for persistence) are updated simultaneously.
   * @param newScale The new font scale size (e.g., 'default').
   */
  const handleFontScaleChange = async (newScale: fontScaleSize) => {
    // 1. Update Zustand state (This is the critical step for immediate UI change)
    updatefontScale(newScale);

    // 2. Persist the new value to AsyncStorage
    try {
      await setItem(FONT_SCALE_KEY, newScale);
      console.log(`Settings: Successfully updated and persisted fontScale to: ${newScale}`);
    } catch (error) {
      console.error('Settings Error: Failed to save fontScale to AsyncStorage', error);
      // In a production app, you might revert the Zustand change or show a toast message
    }
  };


  return (
    <ThemedView style={styles.pageContainer}>
      <ThemedText
        type="title"
        style={{
          fontFamily: Fonts.rounded,
          marginBottom: 24,
        }}
      >
        Settings
      </ThemedText>

      {/* Font Scaling Section */}
      <ThemedView style={styles.settingSection}>
        <ThemedText type="subtitle" style={styles.settingTitle}>
          App Font Size
        </ThemedText>
        <ThemedText type="default" style={styles.settingDescription}>
          Adjust the global font size for better readability.
        </ThemedText>

        <FontScaleSegmentedControl 
          currentScale={fontScale}
          onScaleChange={handleFontScaleChange}
        />
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 32,
  },
  settingSection: {
    marginBottom: 32,
    gap: 8,
  },
  settingTitle: {
    marginBottom: 4,
  },
  settingDescription: {
    marginBottom: 12,
    fontSize: 14,
  },
  // --- Segmented Control Styles ---
  segmentedControlContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 2, 
    borderColor: 'yellow', // TODO
    overflow: 'hidden', 
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
