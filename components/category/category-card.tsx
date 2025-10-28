import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Category } from '@/types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const bg = category.backgroundColor ?? 'transparent';
  const nameColor = colors.text;

  // Resolve image source robustly to support numeric requires, uri strings, and module objects
  let imageSource: any = undefined;
  if (typeof category.image === 'number') {
    imageSource = category.image;
  } else if (typeof category.image === 'string') {
    imageSource = { uri: category.image };
  } else if (category.image && typeof category.image === 'object') {
    // handle ESM imports or objects like { default: 'url' } or { uri: '...' }
    const imgObj: any = category.image as any;
    if (imgObj.uri) imageSource = { uri: imgObj.uri };
    else if (imgObj.default) imageSource = imgObj.default;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.container}
    >
      <View style={[styles.outerCircle, { backgroundColor: bg }, Shadows.sm] }>
        <View style={styles.innerCircle}>
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.icon}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </View>
      <Text numberOfLines={1} style={[styles.label, { color: nameColor }]}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 72,
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  outerCircle: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  innerCircle: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
  },
  label: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium as any,
    textAlign: 'center',
  },
});


