import { CategoryCard } from '@/components/category/category-card';
import { Spacing } from '@/constants/theme';
import { mockCategories } from '@/data/mock-data';
import { StyleSheet, View } from 'react-native';

export function CategoriesSection({ onCategoryPress }: { onCategoryPress?: (id: string) => void }) {
  return (
    <View style={[styles.container]}>
      <View style={[styles.grid]}>
        {mockCategories.map((item) => (
          <View key={item.id} style={styles.item}>
            <CategoryCard
              category={item}
              onPress={() => onCategoryPress ? onCategoryPress(item.id) : undefined}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    gap: 25,
    alignItems: 'flex-start',
    //justifyContent: 'space-between',
  },
  item: {
    width: 52,
    marginBottom: Spacing.md,
  },
});
