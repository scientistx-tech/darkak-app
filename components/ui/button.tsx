import React from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

type ButtonVariant = 'filled' | 'outline' | 'ghost';

export interface ButtonProps {
  /** Text shown inside the button. If you pass children, children will be shown instead. */
  title?: string;
  /** Optional custom children (if you want custom layout). */
  children?: React.ReactNode;
  /** Optional icon element (React element) shown to the left of the text. */
  icon?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  /** When true, layout uses space-between so icon and text are justified between the button edges. */
  justifyBetween?: boolean;
  testID?: string;
}

export default function Button({
  title,
  children,
  icon,
  onPress,
  variant = 'filled',
  style,
  textStyle,
  disabled = false,
  justifyBetween = false,
  testID,
}: ButtonProps) {
  const backgroundColor = variant === 'filled' ? '#5694FF' : 'transparent';
  const borderWidth = variant === 'outline' ? 1 : 0;
  const borderColor = variant === 'outline' ? '#5694FF' : 'transparent';
  const textColor = variant === 'filled' ? '#FFFFFF' : '#5694FF';

  // If an icon React element is provided, clone it and set its color to match the
  // button text color so the icon is visible on each variant by default.
  const renderedIcon =
    icon && React.isValidElement(icon)
      ? React.cloneElement(icon as React.ReactElement<any>, ({ color: textColor } as any))
      : icon;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, borderWidth, borderColor, opacity: disabled ? 0.6 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      <View style={[styles.inner, justifyBetween ? styles.justifyBetween : undefined]}>
 

        {children ? (
          children
        ) : (
          <Text style={[styles.text, { color: textColor }, textStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
         {renderedIcon ? <View style={styles.iconWrapper}>{renderedIcon}</View> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8 as unknown as number, // RN <0.71 doesn't support gap; including for newer runtimes. Fallback margins used below.
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  iconWrapper: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
