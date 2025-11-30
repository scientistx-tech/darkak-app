// import { ProductGrid } from '@/components/shop/ProductGrid';
// import { Header } from '@/components/ui/Header';
// import { Colors, Spacing, Typography } from '@/constants/theme';
// import { mockProducts } from '@/data/mock-data';
// import { useColorScheme } from '@/hooks/use-color-scheme';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { useState } from 'react';
// import {
//   Platform,

//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function ShopScreen() {
//   const colorScheme = useColorScheme() ?? 'light';
//   const colors = Colors[colorScheme];
//   const router = useRouter();
//   const [favorites, setFavorites] = useState<Set<string>>(new Set());
//   const tabs = ['ZTE', 'ASUS', 'Apple', 'SAMSUNG'];
//   const [activeTab, setActiveTab] = useState(tabs[0]);

  // const handleCloseFilter = () => {
  //   setFilterModalVisible(false);
  // };

//   // For now show all products (search removed from this screen UI)
//   const filteredProducts = mockProducts;

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
//       <StatusBar style="dark" />
//       {/* Compact Header */}
//       <Header compact title="Phone" subtitle={`${filteredProducts.length} Products`} />

//       {/* Chips / category filters (horizontal) - redesigned to match screenshot */}
//       <View style={styles.chipsWrapper}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.chipsScroll}
//         >
//           {tabs.map((t) => {
//             const active = activeTab === t;
//             return (
//               <TouchableOpacity
//                 key={t}
//                 activeOpacity={0.85}
//                 onPress={() => setActiveTab(t)}
//                 style={[
//                   styles.chip,
//                   active
//                     ? { backgroundColor: "#BBD4FF",  borderWidth: 0 }
//                     : { backgroundColor: colors.background, borderColor: colors.primary, borderWidth: 1 },
//                 ]}
//               >
//                 <Text style={[styles.chipText, active ? { color: colors.primary } : { color: colors.primary }]}>{t}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>
//       </View>

//       {/* Filter / Sort row - redesigned */}
//       <View style={styles.filterRow}>
//         <TouchableOpacity style={[styles.filterPill, { backgroundColor: "#BBD4FF"  }]} onPress={() => {}}>
//           <Ionicons name="filter" size={16} style={{ marginRight: 8 }} />
//           <Text style={[styles.filterText, ]}>Filter</Text>
//         </TouchableOpacity>

//         <Text style={[styles.sortLabel, { color: colors.text }]}>SORT BY</Text>

//         <TouchableOpacity style={[styles.sortPill, { backgroundColor: "#BBD4FF" }]} onPress={() => {}}>
//           <Text style={[styles.filterText]}>Best match</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       {/* <View style={styles.searchSection}>
//         <SearchBar
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           onFilterPress={() => {}}
//           placeholder="Search products..."
//         />
//       </View> */}

//       {/* Products Grid */}
//       <ProductGrid
//         products={filteredProducts}
//         favorites={favorites}
//         onToggleFavorite={toggleFavorite}
//         onProductPress={(id) => (router as any).push(`/product/${id}`)}
//       />

//       {filteredProducts.length === 0 && (
//         <View style={styles.emptyState}>
//           <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No products found</Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     paddingHorizontal: Spacing.base,
//     paddingTop: Spacing.md,
//     paddingBottom: Spacing.sm,
//   },
//   title: {
//     fontSize: Typography.fontSizes['3xl'],
//     fontWeight: Typography.fontWeights.bold,
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: Typography.fontSizes.base,
//     fontWeight: Typography.fontWeights.regular,
//   },
//   searchSection: {
//     paddingVertical: Spacing.md,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: Spacing['2xl'],
//   },
//   productGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: Spacing.base,
//     gap: Spacing.md,
//   },
//   productItem: {
//     width: '47%',
//   },
//   chipsWrapper: {
//     marginTop: Spacing.md,
//     paddingVertical: Spacing.sm,
//   },
//   chipsScroll: {
//     paddingLeft: Spacing.base,
//     paddingRight: Spacing.base,
//     alignItems: 'center',
//     gap: Spacing.sm,
//   },
//   chip: {
//     paddingVertical: Platform.OS === 'ios' ? 8 : 6,
//     paddingHorizontal: Spacing.md,
//     borderRadius: 999,
//     marginRight: Spacing.sm,
//     elevation: 1,
//   },
//   chipText: {
//     fontSize: Typography.fontSizes.sm,
//     fontWeight: Typography.fontWeights.medium,
//   },
//   headerCompact: {
//     paddingHorizontal: Spacing.base,
//     paddingTop: Spacing.md,
//     paddingBottom: Spacing.xs,
//   },
//   titleCompact: {
//     fontSize: Typography.fontSizes['2xl'],
//     fontWeight: Typography.fontWeights.bold,
//   },
//   subtitleCompact: {
//     fontSize: Typography.fontSizes.sm,
//     fontWeight: Typography.fontWeights.regular,
//     marginTop: 4,
//   },
//   filterRow: {
//     flexDirection: 'row',
//     marginTop: Spacing.md,
//     justifyContent: 'space-between',
//     paddingHorizontal: Spacing.base,
//     paddingBottom: Spacing.sm,
//   },
//   filterButton: {
//     flex: 1,
//     paddingVertical: Spacing.sm,
//     borderRadius: 8,
//     marginRight: Spacing.sm,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sortButton: {
//     width: 100,
//     paddingVertical: Spacing.sm,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   filterText: {
//     fontSize: Typography.fontSizes.sm,
//     fontWeight: Typography.fontWeights.medium,
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: Spacing['4xl'],
//   },
//   emptyText: {
//     fontSize: Typography.fontSizes.lg,
//     fontWeight: Typography.fontWeights.medium,
//   },
//   filterPill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: Spacing.sm,
//     paddingHorizontal: Spacing.md,
//     borderRadius: 999,
//     minWidth: 110,
//     justifyContent: 'center',
//   },
//   sortPill: {
//     paddingVertical: Spacing.sm,
//     paddingHorizontal: Spacing.lg,
//     borderRadius: 999,
//     minWidth: 120,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sortLabel: {
//     fontSize: Typography.fontSizes.xs,
//     fontWeight: Typography.fontWeights.semibold as any,
//     letterSpacing: 1,
//   },
// });
import CustomDropdown from "@/components/button/customDropDownButton.tsx/CustomDropdown";
import FilterModal from "@/components/filterModal/FilterModal";
import FooterQuestionSection from "@/components/home/FooterQuestionSection";
import FooterUpperSection from "@/components/home/FooterUpperSection";
import HomePage from "@/components/home/ProductCaroselSection";
import MobileFooter from "@/components/mobileFooter/MobileFooter";
import NewsletterSubscribeCard from "@/components/newsletterSubscribeCard/NewsletterSubscribeCard";
import { SearchBar } from "@/components/search/SearchBarNative";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>("Newer");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const handleSelect = (item: string) => {
    setSelectedValue(item);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleCloseFilter = () => {
    setFilterModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerheader}>
        <Text>hello</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 23 }}
      >
        <View style={styles.homeContent}>
          <TouchableOpacity>
            <Text style={styles.homeTxt}>Home /</Text>
          </TouchableOpacity>
          <Text style={styles.cattxt}>Category</Text>
        </View>

        <View style={styles.allcontainer}>
          <Text style={styles.cattxt}>All Products</Text>
        </View>

        <View style={styles.dropdutton}>
          <View>
            <Text style={styles.cattxt}>Sort By</Text>
          </View>
          <CustomDropdown
            data={[
              "Newer",
              "Older",
              "Popular",
              "Low to High Price",
              "High To Low Price",
            ]}
            onSelect={handleSelect}
            selectedValue={selectedValue}
            showShadow={true}
            shadowStyle={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 6,
            }}
          />
        </View>

        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={handleFilterPress}
            placeholder="Search products..."
          />
        </View>

        <HomePage />
        <HomePage />

        <FooterUpperSection />
        <FooterQuestionSection />

        <SafeAreaView style={styles.Featcontainer}>
          <NewsletterSubscribeCard />
        </SafeAreaView>
        <SafeAreaView style={styles.Featcontainer}>
          <MobileFooter />
        </SafeAreaView>
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal visible={filterModalVisible} onClose={handleCloseFilter} />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerheader: {
    height: "10%",
    width: "100%",
    backgroundColor: "rgb(0, 48, 132)",
  },
  homeContent: {
    padding: 20,
    flexDirection: "row",
  },
  homeTxt: {
    color: "green",
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "500",
  },
  cattxt: {
    fontSize: 15,
    fontWeight: "500",
  },
  allcontainer: {
    paddingHorizontal: 20,
  },
  dropdutton: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  Featcontainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});
