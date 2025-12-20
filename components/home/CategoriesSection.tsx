// import { CategoryCard } from "@/components/category/category-card";
// import { Spacing } from "@/constants/theme";
// import { mockCategories } from "@/data/mock-data";
// import { FlatList, StyleSheet, View } from "react-native";

// export function CategoriesSection({
//   onCategoryPress,
// }: {
//   onCategoryPress?: (id: string) => void;
// }) {
//   const renderSeparator = () => <View style={{ width: Spacing.md }} />;
//   return (
//     <View style={[styles.container]}>
//       <View style={[styles.grid]}>
//         {/* {mockCategories.map((item) => (
//           <View key={item.id} style={styles.item}>
//             <CategoryCard
//               category={item}
//               onPress={() => onCategoryPress ? onCategoryPress(item.id) : undefined}
//             />
//           </View>
//         ))} */}
//         <FlatList
//           data={mockCategories}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={(item:any) => item.id.toString()}
//           renderItem={({ item  }) => (
//             <View style={styles.item}>
//               <CategoryCard
//                 category={item}
//                 onPress={() =>
//                   onCategoryPress ? onCategoryPress(item.id) : undefined
//                 }
//               />
//             </View>
//           )}
//           contentContainerStyle={styles.container}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {},
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     paddingHorizontal: 5,
//     gap: 25,
//     alignItems: "flex-start",
//     //justifyContent: 'space-between',
//   },
//   item: {
//     width: 52,
//     marginBottom: Spacing.md,
//   },
// });

import { CategoryCard } from "@/components/category/category-card";
import { Spacing } from "@/constants/theme";
import { mockCategories } from "@/data/mock-data";
import { FlatList, StyleSheet, View } from "react-native";

export function CategoriesSection({
  onCategoryPress,
}: {
  onCategoryPress?: (id: string) => void;
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => onCategoryPress ? onCategoryPress(item.id) : undefined}
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg, 
    paddingVertical: Spacing.sm, 
  },
});