import { ProductCard } from '@/components/product/product-card';
import { Spacing } from '@/constants/theme';
import { featuredProducts } from '@/data/mock-data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

interface HotDealsSectionProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function HotDealsSection({ favorites, onToggleFavorite }: HotDealsSectionProps) {
  useColorScheme();
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const bannerWidth = screenWidth - Spacing.base * 2;

  // create pages of 2 items
  const hotPages = useMemo(() => {
    const pages: any[] = [];
    for (let i = 0; i < featuredProducts.length; i += 2) {
      pages.push(featuredProducts.slice(i, i + 2));
    }
    return pages;
  }, []);

  const hotListRef = useRef<FlatList<any> | null>(null);
  const [hotPageIndex, setHotPageIndex] = useState(0);

  useEffect(() => {
    if (!hotPages || hotPages.length <= 1) return;
    const interval = setInterval(() => {
      setHotPageIndex((prev) => (prev + 1) % hotPages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hotPages]);

  useEffect(() => {
    if (!hotListRef.current) return;
    const offset = hotPageIndex * (bannerWidth + Spacing.md);
    try {
      hotListRef.current.scrollToOffset({ offset, animated: true });
    } catch {
      // ignore
    }
  }, [hotPageIndex, bannerWidth]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={(r) => { hotListRef.current = r; }}
        horizontal
        data={hotPages}
        keyExtractor={(_, idx) => `hot-page-${idx}`}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="center"
        snapToInterval={bannerWidth + Spacing.md}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={{ width: bannerWidth, flexDirection: 'row', justifyContent: 'space-between'}}>
            {item.map((product: any) => (
              <View key={product.id} style={{ width: '48%' }}>
                <ProductCard
                  product={product}
                  onPress={() => (router as any).push(`/product/${product.id}`)}
                  onFavoritePress={() => onToggleFavorite(product.id)}
                  isFavorite={favorites.has(product.id)}
                />
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  list: {
    paddingHorizontal: Spacing.base,
  },
});
