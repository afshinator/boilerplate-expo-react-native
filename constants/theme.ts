/* theme.ts
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

import { Platform } from 'react-native';

// --- 🎨 Color Constants ---
const COLOR_TINT_LIGHT = '#0a7ea4';
const COLOR_TINT_DARK = '#fff';

const COLOR_TEXT_LIGHT = '#11181C';
const COLOR_BACKGROUND_LIGHT = '#fff';
const COLOR_ICON_DEFAULT_LIGHT = '#687076';

const COLOR_TEXT_DARK = '#ECEDEE';
const COLOR_BACKGROUND_DARK = '#151718';
const COLOR_ICON_DEFAULT_DARK = '#9BA1A6';

// --- 📏 Typography Constants ---
export const FONT_SIZE_SMALL = 14;      
export const FONT_SIZE_DEFAULT = 16;
export const FONT_SIZE_LARGE = 20;      
export const FONT_SIZE_SUBTITLE = 20;   
export const FONT_SIZE_TITLE = 32;

// Line Heights
export const LINE_HEIGHT_SMALL = 20;    
export const LINE_HEIGHT_DEFAULT = 24;
export const LINE_HEIGHT_TITLE = 32;
export const LINE_HEIGHT_LINK = 30;

// Font Weights
export const FONT_WEIGHT_SEMIBOLD = '600';
export const FONT_WEIGHT_BOLD = 'bold';

// --- 💻 Platform/Color Definitions ---

export const Colors = {
  light: {
    text: COLOR_TEXT_LIGHT,
    background: COLOR_BACKGROUND_LIGHT,
    tint: COLOR_TINT_LIGHT,
    icon: COLOR_ICON_DEFAULT_LIGHT,
    tabIconDefault: COLOR_ICON_DEFAULT_LIGHT,
    tabIconSelected: COLOR_TINT_LIGHT,
    link: COLOR_TINT_LIGHT,
  },
  dark: {
    text: COLOR_TEXT_DARK,
    background: COLOR_BACKGROUND_DARK,
    tint: COLOR_TINT_DARK,
    icon: COLOR_ICON_DEFAULT_DARK,
    tabIconDefault: COLOR_ICON_DEFAULT_DARK,
    tabIconSelected: COLOR_TINT_DARK,
    link: COLOR_TINT_DARK,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});