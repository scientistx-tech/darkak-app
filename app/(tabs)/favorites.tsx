import { ProductCard } from '@/components/product/product-card';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { mockProducts } from '@/data/mock-data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function FavoritesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1', '2', '3'])); // Mock favorites

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const favoriteProducts = mockProducts.filter(p => favorites.has(p.id));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Favorites
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {favoriteProducts.length} Products
        </Text>
      </View>

      {/* Favorites Grid */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {favoriteProducts.length > 0 ? (
          <View style={styles.productGrid}>
            {favoriteProducts.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <ProductCard
                  product={product}
                  onPress={() => {}}
                  onFavoritePress={() => toggleFavorite(product.id)}
                  isFavorite={favorites.has(product.id)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyIcon, { color: colors.textTertiary }]}>❤️</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Favorites Yet
            </Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Start adding products to your favorites
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSizes['3xl'],
    fontWeight: Typography.fontWeights.bold,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.regular,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing['2xl'],
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.base,
    gap: Spacing.md,
  },
  productItem: {
    width: '47%',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['4xl'],
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.fontSizes.base,
    textAlign: 'center',
  },
});
