// themed-text.tsx

import { StyleSheet, Text, type TextProps } from 'react-native';

import {
  FONT_SIZE_DEFAULT,
  FONT_SIZE_LARGE,
  FONT_SIZE_SMALL,
  FONT_SIZE_SUBTITLE,
  FONT_SIZE_TITLE,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_SEMIBOLD,
  LINE_HEIGHT_DEFAULT,
  LINE_HEIGHT_LINK,
  LINE_HEIGHT_SMALL,
  LINE_HEIGHT_TITLE
} from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';



export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'small' | 'large';
  /** * Scales all font sizes in this component.
   * Defaults to 1.0 (no change).
   * Sensible scaling factors:
   * - 1.25 (to size fonts up by 25%)
   * - 0.8 (to size fonts down by 20%)
   */
  fontScale?: number; 
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  fontScale = 1.0, 
  ...rest
}: ThemedTextProps) {
  const colorKey = type === 'link' ? 'link' : 'text'; 
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorKey);

  // Apply scaling factor to a size property
  const getScaledStyle = (baseStyle: any) => ({
    ...baseStyle,
    // Only scale if the base style defines a fontSize or lineHeight
    ...(baseStyle.fontSize !== undefined && { 
      fontSize: baseStyle.fontSize * fontScale 
    }),
    ...(baseStyle.lineHeight !== undefined && { 
      lineHeight: baseStyle.lineHeight * fontScale 
    }),
  });


  let baseStyle;
  switch (type) {
    case 'small':
      baseStyle = styles.small;
      break;
    case 'large':
      baseStyle = styles.large;
      break;
    case 'title':
      baseStyle = styles.title;
      break;
    case 'defaultSemiBold':
      baseStyle = styles.defaultSemiBold;
      break;
    case 'subtitle':
      baseStyle = styles.subtitle;
      break;
    case 'link':
      baseStyle = styles.link;
      break;
    case 'default':
    default:
      baseStyle = styles.default;
      break;
  }
  
  const finalStyle = [
    { color },
    getScaledStyle(baseStyle), 
    style,
  ];

  return (
    <Text
      style={finalStyle}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: FONT_SIZE_SMALL,
    lineHeight: LINE_HEIGHT_SMALL,
  },
  default: {
    fontSize: FONT_SIZE_DEFAULT,
    lineHeight: LINE_HEIGHT_DEFAULT,
  },
  defaultSemiBold: {
    fontSize: FONT_SIZE_DEFAULT,
    lineHeight: LINE_HEIGHT_DEFAULT,
    fontWeight: FONT_WEIGHT_SEMIBOLD,
  },
  title: {
    fontSize: FONT_SIZE_TITLE,
    fontWeight: FONT_WEIGHT_BOLD,
    lineHeight: LINE_HEIGHT_TITLE,
  },
  subtitle: {
    fontSize: FONT_SIZE_SUBTITLE,
    fontWeight: FONT_WEIGHT_BOLD,
  },
  link: {
    lineHeight: LINE_HEIGHT_LINK,
    fontSize: FONT_SIZE_DEFAULT,
  },
  large: {
    fontSize: FONT_SIZE_LARGE,
    lineHeight: LINE_HEIGHT_DEFAULT, 
  },
});