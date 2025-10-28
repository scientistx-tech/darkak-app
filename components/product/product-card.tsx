import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Product } from '@/types';
import { readableTextColor } from '@/utils/color';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const discountPercentage = product.discount || 
    (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  const formatPrice = (amount: number) => `${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })} TK`;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface }, Shadows.md]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Image Container */}
      <View style={[styles.imageContainer, { backgroundColor: product.backgroundColor ?? colors.background }]}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <View style={[styles.discountBadge, { backgroundColor: colors.discountBadge }]}> 
            <Text style={[styles.discountText, { color: readableTextColor(colors.discountBadge) }]}>{discountPercentage}%</Text>
          </View>
        )}

        {/* New Badge */}
        {product.isNew && (
          <View style={[styles.newBadge, { backgroundColor: colors.newBadge }]}>
            <Text style={[styles.badgeText, { color: readableTextColor(colors.newBadge) }]}>NEW</Text>
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: colors.surface }]}
          onPress={onFavoritePress}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? colors.accent : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {/* Brand */}
        <Text style={[styles.brand, { color: colors.textSecondary }]} numberOfLines={1}>
          {product.brand}
        </Text>

        {/* Product Name */}
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={colors.ratingActive} />
          <Text style={[styles.rating, { color: colors.text }]}>
            {product.rating.toFixed(1)}
          </Text>
          <Text style={[styles.reviewCount, { color: colors.textTertiary }]}>
            ({product.reviewCount})
          </Text>
        </View>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.primary }]}>
            {formatPrice(product.price)}
          </Text>
          {product.originalPrice && product.originalPrice > product.price && (
            <Text style={[styles.originalPrice, { color: colors.textTertiary }]}>
              {formatPrice(product.originalPrice)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    padding: Spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
  },
  newBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  infoContainer: {
    padding: Spacing.md,
  },
  brand: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
    marginBottom: Spacing.xs,
    minHeight: 32,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  rating: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: Typography.fontSizes.xs,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  price: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
  },
  originalPrice: {
    fontSize: Typography.fontSizes.sm,
    textDecorationLine: 'line-through',
  },
});
