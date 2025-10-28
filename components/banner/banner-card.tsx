import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Banner } from '@/types';
import { readableTextColor } from '@/utils/color';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BannerCardProps {
  banner: Banner;
  onPress?: () => void;
}

export const BannerCard: React.FC<BannerCardProps> = ({ banner, onPress }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const bg = banner.backgroundColor || colors.primary;
  const textColor = readableTextColor(bg);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bg }, Shadows.md]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.contentRow}>
        <View style={styles.textContainer}>
          {banner.discount && (
            <Text style={[styles.discount, { color: textColor }]}>{banner.discount}</Text>
          )}
          <Text style={[styles.title, { color: textColor }]}>{banner.title}</Text>
          {banner.subtitle && (
            <Text style={[styles.subtitle, { color: textColor }]}>{banner.subtitle}</Text>
          )}

          {banner.actionText && (
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={[styles.buttonText, { color: bg }]}>
                  {banner.actionText}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: banner.image }} style={styles.image} resizeMode="contain" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginRight: Spacing.base,
    width: '100%',
    height: 160,
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  textContainer: {
    width: '60%',
  },
  discount: {
    color: '#FFFFFF',
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: Typography.fontSizes['2xl'],
    fontWeight: Typography.fontWeights.bold,
    marginBottom: 4,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.regular,
  },
  buttonContainer: {
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },
  buttonText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
  },
  imageContainer: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
