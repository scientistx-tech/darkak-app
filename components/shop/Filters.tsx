import { Spacing, Typography } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FiltersProps {
  onFilterPress?: () => void;
  onSortPress?: () => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterPress, onSortPress }) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sortButton} onPress={onSortPress}>
        <Text style={styles.filterText}>Sort by</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  filterButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    marginRight: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortButton: {
    width: 100,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
  },
});
