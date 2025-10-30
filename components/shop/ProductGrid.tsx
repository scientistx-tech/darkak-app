import { ProductCard } from '@/components/product/product-card';
import { Spacing } from '@/constants/theme';
import type { Product } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface ProductGridProps {
  products: Product[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onProductPress?: (id: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, favorites, onToggleFavorite, onProductPress }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      <View style={styles.grid}>
        {products.map((product) => (
          <View style={styles.item} key={product.id}>
            <ProductCard
              product={product}
              onPress={() => onProductPress?.(product.id)}
              onFavoritePress={() => onToggleFavorite(product.id)}
              isFavorite={favorites.has(product.id)}
            />
          </View>
        ))}
      </View>
      {products.length === 0 && <View style={{ height: Spacing['4xl'] }} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: Spacing['2xl'] },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.base,
    gap: Spacing.md,
  },
  item: { width: '47%' },
});
