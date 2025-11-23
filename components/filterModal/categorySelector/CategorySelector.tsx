import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

export interface Category {
  id: string;
  name: string;
  children?: Category[];
}

export interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: string[];
  onCategorySelect: (categoryIds: string[]) => void;
  maxSelections?: number;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategories,
  onCategorySelect,
  maxSelections = 5,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Toggle expand/collapse category
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Handle selecting/deselecting category
  const handleCategoryPress = (categoryId: string) => {
    let newSelected: string[] = [];

    if (selectedCategories.includes(categoryId)) {
      newSelected = selectedCategories.filter(id => id !== categoryId);
    } else {
      if (selectedCategories.length >= maxSelections) {
        Alert.alert(`Limit Reached`, `You can only select up to ${maxSelections} categories`);
        return;
      }
      newSelected = [...selectedCategories, categoryId];
    }

    onCategorySelect(newSelected);
  };

  const isCategorySelected = (categoryId: string): boolean => selectedCategories.includes(categoryId);

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpandedCat = expandedCategories.has(category.id);
    const isSelected = isCategorySelected(category.id);

    return (
      <View key={category.id}>
        <View style={[styles.categoryItem, { paddingLeft: 16 + level * 16 }, isSelected && styles.selectedCategory]}>
          {/* Category select area */}
          <TouchableOpacity
            style={styles.categoryContent}
            onPress={() => handleCategoryPress(category.id)}
            activeOpacity={0.7}
          >
            <View style={styles.checkbox}>
              {isSelected && <View style={styles.checkboxSelected} />}
            </View>
            <Text style={[styles.categoryName, isSelected && styles.selectedCategoryText]}>
              {category.name}
            </Text>
          </TouchableOpacity>

          {/* Expand / Collapse Button */}
          {hasChildren && (
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => toggleCategory(category.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.expandButtonText}>{isExpandedCat ? '−' : '+'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Children */}
        {hasChildren && isExpandedCat && (
          <View style={styles.childrenContainer}>
            {category.children!.map(child => renderCategory(child, level + 1))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Category</Text>
          <Text style={styles.subtitle}>
            Selected: {selectedCategories.length}/{maxSelections}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text style={styles.toggleIcon}>{isExpanded ? '−' : '+'}</Text>
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {categories.map(category => renderCategory(category))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  toggleButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
//   expandedContent: {
//     maxHeight: 300,
//   },
  scrollView: {
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingRight: 16,
    backgroundColor: '#EAF1FF',
    borderBottomWidth: 1,
    borderBottomColor: '#D6E4FF',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#7EA6FF',
    backgroundColor: '#F4F8FF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    width: 12,
    height: 12,
    backgroundColor: '#003084',
    borderRadius: 2,
  },
  categoryName: {
    fontSize: 14,
    color: '#003084',
    flex: 1,
  },
  selectedCategory: {
    backgroundColor: 'rgba(0, 48, 132, 0.12)',
  },
  selectedCategoryText: {
    color: '#003084',
    fontWeight: '600',
  },
  expandButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  expandButtonText: {
    fontSize: 16,
    color: '#003084',
    fontWeight: 'bold',
  },
  childrenContainer: {
    backgroundColor: '#F0F6FF',
  },
});
