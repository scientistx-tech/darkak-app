import { BannerSection } from '@/components/home/BannerSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { HotDealsSection } from '@/components/home/HotDealsSection';
import { SearchBar } from '@/components/search/SearchBarNative';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
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
    <SafeAreaView style={[styles.container, { backgroundColor: pageBackground, }]}>
      <StatusBar style="dark" />
      {/* Search Bar */}
      <View style={[styles.searchSection, { paddingHorizontal: Spacing.base, paddingTop: 60 }]}>
        <View style={{ flex: 1 }}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => { }}
            placeholder="Search products..."
          />
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <View style={{
            backgroundColor:"#BBD4FF",
            width:29,
            height:29,
            justifyContent:'center',
            alignItems:'center',
            borderRadius: '100%',
          }}>
            <Ionicons name="notifications-outline" size={22} color={colors.text} />
          </View>
          <View style={[styles.badge, { backgroundColor: colors.primary }]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner Section */}
        <View style={[styles.section, { paddingHorizontal: 5 }]}>
          <BannerSection />
        </View>

        {/* Hot Deals Section */}
        <View style={[styles.section, { paddingHorizontal: 5  }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Hot Deals</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <HotDealsSection favorites={favorites} onToggleFavorite={toggleFavorite} />
        </View>

        {/* Categories Section */}
        <View style={[styles.section, { paddingHorizontal: 5, marginVertical: Spacing.md }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Shop by Category
            </Text>
            <TouchableOpacity onPress={() => (router as any).push('/category')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <CategoriesSection onCategoryPress={(id) => (router as any).push(`/category/${id}`)} />
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
    width:"100%"
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: 5
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
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
