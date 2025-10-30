import { Spacing } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ChipsProps {
  chips?: string[];
  onPress?: (chip: string) => void;
}

export const Chips: React.FC<ChipsProps> = ({ chips = ['2k', '5k', 'Apple', 'Samsung', 'Xiaomi', 'Google'], onPress }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {chips.map((c) => (
          <TouchableOpacity key={c} style={styles.chip} onPress={() => onPress?.(c)}>
            <Text style={styles.chipText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { paddingVertical: Spacing.sm },
  scroll: { paddingLeft: Spacing.base, paddingRight: Spacing.base, alignItems: 'center' },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderRadius: 999,
    marginRight: Spacing.sm,
    elevation: 1,
    backgroundColor: 'transparent',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
