import { BannerCard } from '@/components/banner/banner-card';
import { CategoryCard } from '@/components/category/category-card';
import { ProductCard } from '@/components/product/product-card';
import { SearchBar } from '@/components/search/search-bar';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { featuredProducts, mockBanners, mockCategories } from '@/data/mock-data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  // Use a simple light gray background similar to the provided mock
  const pageBackground = '#F4F7FB';
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const screenWidth = Dimensions.get('window').width;
  const bannerWidth = screenWidth - Spacing.base * 2; // full-width minus horizontal padding
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  // Hot deals paging (2 items per page)
  const hotListRef = useRef<FlatList<any> | null>(null);
  const [hotPageIndex, setHotPageIndex] = useState(0);
  const hotPageWidth = bannerWidth; // use same page width as banner
  const hotPages = useMemo(() => {
    const pages: any[] = [];
    for (let i = 0; i < featuredProducts.length; i += 2) {
      pages.push(featuredProducts.slice(i, i + 2));
    }
    return pages;
  }, [featuredProducts]);

  // Category slider
  const categoryListRef = useRef<FlatList<any> | null>(null);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const categoryItemWidth = 72 + Spacing.md; // matches CategoryCard width + right margin
  const categoryCount = mockCategories.length;

  // Auto-play banners
  useEffect(() => {
    if (!mockBanners || mockBanners.length <= 1) return;
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % mockBanners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Scroll FlatList when index changes
  useEffect(() => {
    if (!flatListRef.current) return;
    const offset = bannerIndex * (bannerWidth + Spacing.md);
    try {
      flatListRef.current.scrollToOffset({ offset, animated: true });
    } catch (e) {
      // ignore scroll errors
    }
  }, [bannerIndex, bannerWidth]);

  // Auto-play hot deals pages
  useEffect(() => {
    if (!hotPages || hotPages.length <= 1) return;
    const interval = setInterval(() => {
      setHotPageIndex((prev) => (prev + 1) % hotPages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hotPages]);

  // Scroll hot deals when page index changes
  useEffect(() => {
    if (!hotListRef.current) return;
    const offset = hotPageIndex * (hotPageWidth + Spacing.md);
    try {
      hotListRef.current.scrollToOffset({ offset, animated: true });
    } catch (e) {
      // ignore
    }
  }, [hotPageIndex, hotPageWidth]);

  // Auto-play categories
  useEffect(() => {
    if (!categoryCount || categoryCount <= 1) return;
    const interval = setInterval(() => {
      setCategoryIndex((prev) => (prev + 1) % categoryCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [categoryCount]);

  // Scroll categories when index changes
  useEffect(() => {
    if (!categoryListRef.current) return;
    const offset = categoryIndex * categoryItemWidth;
    try {
      categoryListRef.current.scrollToOffset({ offset, animated: true });
    } catch (e) {
      // ignore
    }
  }, [categoryIndex, categoryItemWidth]);

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: pageBackground }]}>
      <StatusBar style="dark" />
      
 

      {/* Search Bar */}
      <View style={[styles.searchSection, { paddingHorizontal: Spacing.base }]}>
        <View style={{ flex: 1 }}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => {}}
            placeholder="Search products..."
          />
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={22} color={colors.text} />
          <View style={[styles.badge, { backgroundColor: colors.primary }]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner Section */}
        <View style={[styles.section, { paddingHorizontal: Spacing.base }]}> 
          <FlatList
            ref={(ref) => { flatListRef.current = ref; }}
            horizontal
            data={mockBanners}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
            snapToAlignment="center"
            // account for item margin when snapping
            snapToInterval={bannerWidth + Spacing.md}
            contentContainerStyle={[styles.bannerList, { paddingHorizontal: Spacing.base }]}
            renderItem={({ item }) => (
              <View style={{ width: bannerWidth, marginRight: Spacing.md }}>
                <BannerCard
                  banner={item}
                  onPress={() => {}}
                />
              </View>
            )}
          />
          {/* Pagination dots */}
          <View style={styles.dotsContainer}>
            {mockBanners.map((_, idx) => (
              <View
                key={`dot-${idx}`}
                style={[
                  styles.dot,
                  { backgroundColor: idx === bannerIndex ? colors.primary : '#D6E1F2' },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Hot Deals Section */}
        <View style={[styles.section, { paddingHorizontal: Spacing.base }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Hot Deals</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            ref={(ref) => { hotListRef.current = ref; }}
            horizontal
            data={hotPages}
            keyExtractor={(_, idx) => `hot-page-${idx}`}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
            snapToAlignment="center"
            snapToInterval={hotPageWidth + Spacing.md}
            contentContainerStyle={[styles.bannerList, { paddingHorizontal: Spacing.base }]}
            renderItem={({ item }) => (
              <View style={{ width: hotPageWidth, flexDirection: 'row', justifyContent: 'space-between', marginRight: Spacing.md }}>
                {item.map((product: any) => (
                  <View key={product.id} style={{ width: '48%' }}>
                    <ProductCard
                      product={product}
                      onPress={() => (router as any).push(`/product/${product.id}`)}
                      onFavoritePress={() => toggleFavorite(product.id)}
                      isFavorite={favorites.has(product.id)}
                    />
                  </View>
                ))}
              </View>
            )}
          />
        </View>

  {/* Categories Section */}
  <View style={[styles.section, { paddingHorizontal: Spacing.base, marginVertical: Spacing.md }]}> 
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Shop by Category
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            ref={(ref) => { categoryListRef.current = ref; }}
            horizontal
            data={mockCategories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                onPress={() => (router as any).push(`/category/${item.id}`) }
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            decelerationRate="fast"
            snapToAlignment="start"
            snapToInterval={categoryItemWidth}
            // update index when user scrolls manually
            onMomentumScrollEnd={(ev) => {
              const x = ev.nativeEvent.contentOffset.x;
              const idx = Math.round(x / categoryItemWidth);
              setCategoryIndex(idx);
            }}
          />
        </View>

       
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  greeting: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.regular,
  },
  userName: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  searchSection: {
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // Increase bottom padding so floating tab bar does not overlap content
    paddingBottom: Spacing['4xl'] * 2, // ~96
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
  },
  seeAll: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
  },
  bannerList: {
    paddingHorizontal: Spacing.base,
  },
  categoryList: {
    paddingHorizontal: Spacing.base,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  productItem: {
    width: '48%',
    marginBottom: Spacing.md,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
});
