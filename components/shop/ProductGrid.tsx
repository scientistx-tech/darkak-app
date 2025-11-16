import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.base * 3) / 2; // 2 cards per row with gap
const IMAGE_CONTAINER_HEIGHT = 180;

interface ProductCarouselCardProps {
  product: Product;
  onPress?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

export const ProductCarouselCard: React.FC<ProductCarouselCardProps> = ({
  product,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [activeIndex, setActiveIndex] = useState(0);

  // Get all images (main image + gallery images if available)
  const images = [
    product.image,
    ...(product.gallery || []),
  ];

  const discountPercentage =
    product.discount ||
    (product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0);

  const formatPrice = (amount: number) =>
    `${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })} Tk`;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }, Shadows.md]}>
      {/* Top Image Section with Light Blue Background */}
      <View style={styles.imageSection}>
        {/* Discount Badge - Top Left */}
        {discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercentage}%</Text>
            <Text style={styles.offText}>OFF</Text>
          </View>
        )}

        {/* Favorite Button - Top Right */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? '#FF6B9D' : '#FF6B9D'}
          />
        </TouchableOpacity>

        {/* Image Carousel */}
        {images.length > 1 ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.scrollContent}
          >
            {images.map((img, index) => (
              <View key={index} style={[styles.imageWrapper, { width: CARD_WIDTH - 40 }]}>
                <Image
                  source={typeof img === 'number' ? img : { uri: img }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.imageWrapper}>
            <Image
              source={typeof images[0] === 'number' ? images[0] : { uri: images[0] }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
        )}

        {/* Pagination Dots - Only show if multiple images */}
        {images.length > 1 && (
          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeIndex === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        )}
      </View>

      {/* Bottom White Section */}
      <View style={[styles.infoSection, { backgroundColor: colors.surface }]}>
        {/* Price */}
        <Text style={[styles.price, { color: colors.text }]}>{formatPrice(product.price)}</Text>

        {/* Product Name */}
        <Text style={[styles.productName, { color: colors.text }]} numberOfLines={1}>
          {product.name}
        </Text>

        {/* Subtitle (specs) */}
        <Text style={[styles.specs, { color: colors.textSecondary }]} numberOfLines={1}>
          ({product.brand || '12GB/512GB'})
        </Text>

        {/* Buttons Row */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.buyButton, { backgroundColor: '#003D82' }]}
            onPress={onPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buyButtonText}>BUY NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cartButton, { backgroundColor: '#003D82' }]}
            onPress={onPress}
            activeOpacity={0.8}
          >
            <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  imageSection: {
    width: '100%',
    height: IMAGE_CONTAINER_HEIGHT,
    backgroundColor: '#E8F0FF', // Light blue background
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#003D82',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  offText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    ...Shadows.sm,
  },
  scrollContent: {
    alignItems: 'center',
  },
  imageWrapper: {
    width: CARD_WIDTH - 40,
    height: IMAGE_CONTAINER_HEIGHT - 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '85%',
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#4A90E2',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: '#D1D5DB',
  },
  infoSection: {
    padding: Spacing.md,
    paddingTop: Spacing.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  specs: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: Spacing.xs,
  },
  buyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cartButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },
});