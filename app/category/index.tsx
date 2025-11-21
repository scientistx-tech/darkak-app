import { BannerCard } from '@/components/banner/banner-card';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { mockCategories } from '@/data/mock-data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,

    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function CategoriesPage() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const tabs = ['Phone', 'Laptop', 'Monitor', 'Accessories'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (router as any).back()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Categories</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* category tabs (horizontal) */}
      <View style={[styles.tabsContainer, { backgroundColor: colors.background }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && {
                  borderBottomColor: colors.primary ?? '#2F6AE2',
                  borderBottomWidth: 3,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab ? (colors.primary ?? '#2F6AE2') : colors.text },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* top banner (use BannerCard component) */}
        <BannerCard
          banner={{
            id: 'summer-deals',
            title: 'GET 10% OFF',
            subtitle: 'On Phone',
            image: require('@/assets/category/c1.png'),
            backgroundColor: '#2349A8',
            actionText: 'Shop Now',
          }}
          compact
          onPress={() => { /* navigate or no-op */ }}
        />

        {/* list of category cards similar to screenshot */}
        <View style={styles.listContainer}>
          {mockCategories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.card, Shadows.sm]}
              activeOpacity={0.85}
              onPress={() => (router as any).push(`/category/${cat.id}`)}
            >
              <View style={styles.cardText}>
                <Text style={styles.cardOverline}>SUMMER DEALS</Text>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{cat.name}</Text>
                <Text style={styles.cardSubtitle}>GET 10% OFF</Text>
              </View>
              <View style={styles.cardImageWrap}>
                <Image source={cat.image as any} style={styles.cardImage} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginBottom:10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: 60 ,
    paddingBottom:10
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['4xl'],
  },
  tabsContainer: {
    // backgroundColor provided inline so it matches dark/light mode
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  tabsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginRight: Spacing.md,
    borderBottomWidth: 0,
  },
  tabText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold as any,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2349A8',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  bannerText: {
    flex: 1,
  },
  bannerLabel: {
    color: '#BBD1FF',
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold as any,
    marginBottom: 6,
  },
  bannerTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold as any,
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#E6EEFF',
    fontSize: Typography.fontSizes.sm,
  },
  bannerImage: {
    width: 120,
    height: 80,
    marginLeft: Spacing.md,
  },
  listContainer: {
    marginTop: Spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  cardText: {
    flex: 1,
  },
  cardOverline: {
    color: '#2F6AE2',
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold as any,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold as any,
  },
  cardSubtitle: {
    color: '#7E8AA0',
    fontSize: Typography.fontSizes.xs,
    marginTop: 6,
  },
  cardImageWrap: {
    width: 88,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  cardImage: {
    width: 78,
    height: 78,
  },
});
