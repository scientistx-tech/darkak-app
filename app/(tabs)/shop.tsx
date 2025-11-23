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

//   const toggleFavorite = (productId: string) => {
//     setFavorites(prev => {
//       const newFavorites = new Set(prev);
//       if (newFavorites.has(productId)) {
//         newFavorites.delete(productId);
//       } else {
//         newFavorites.add(productId);
//       }
//       return newFavorites;
//     });
//   };

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
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Shop = () => {
  return (
    <View>
      <Text>shop</Text>
    </View>
  )
}

export default Shop

const styles = StyleSheet.create({})