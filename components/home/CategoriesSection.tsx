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