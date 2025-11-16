import { BannerCard } from '@/components/banner/banner-card';
import { ProductCard } from '@/components/product/product-card';
import { Header } from '@/components/ui/Header';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { mockCategories, mockProducts } from '@/data/mock-data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Dimensions,


  ScrollView,
  StyleSheet,
  Text,

  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function CategoryScreen() {
  const { id } = useLocalSearchParams() as { id?: string };
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const category = mockCategories.find((c) => c.id === id) ?? mockCategories[0];

  // Show products for this category by brand matching category name
  const products = mockProducts.filter((p) => p.brand?.toUpperCase() === category.name.toUpperCase());

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <StatusBar style="dark" />

      <Header
        showBack
        onBack={() => router.back()}
        title="Categories"
        rightIcon={<Ionicons name="search" size={20} color={colors.text} />}
        onRightPress={() => { /* search */ }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero / banner for category (reusable BannerCard) */}
        <BannerCard
          banner={{
            id: `category-${category.id}`,
            title: category.name,
            subtitle: `${category.productCount} items`,
            image: category.image as any,
            backgroundColor: category.backgroundColor ?? colors.primary,
            // actionText: 'Shop Now',
          }}
          compact
          onPress={() => { /* noop or navigate if needed */ }}
        />

        {/* Products grid */}
        <View style={styles.productsSection}>
          {products.length > 0 ? (
            <View style={styles.grid}>
              {products.map((product) => (
                <View key={product.id} style={styles.productItem}>
                  <ProductCard
                    product={product}
                    onPress={() => (router as any).push(`/product/${product.id}`)}
                    onFavoritePress={() => {}}
                    isFavorite={false}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No products in this category</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;
const heroHeight = 140;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: Typography.fontSizes.lg, fontWeight: Typography.fontWeights.semibold },
  scrollContent: { paddingBottom: Spacing['4xl'], paddingHorizontal: Spacing.base },
  hero: {
    height: heroHeight,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  heroText: { flex: 1 },
  heroSmall: { fontSize: Typography.fontSizes.xs, fontWeight: Typography.fontWeights.semibold, opacity: 0.95 },
  heroTitle: { fontSize: Typography.fontSizes.xl, fontWeight: Typography.fontWeights.bold, marginTop: 6 },
  heroSub: { fontSize: Typography.fontSizes.sm, marginTop: 4, opacity: 0.9 },
  heroImage: { width: screenWidth * 0.32, height: heroHeight * 0.9 },
  productsSection: { marginTop: Spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productItem: { width: '48%', marginBottom: Spacing.md },
  emptyState: { padding: Spacing.lg, alignItems: 'center' },
  emptyText: { fontSize: Typography.fontSizes.base },
});
