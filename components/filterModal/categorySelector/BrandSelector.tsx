import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

export interface Brand {
  id: string;
  name: string;
}

export interface BrandSelectorProps {
  brands: Brand[];
  selectedBrands: string[];
  onBrandSelect: (brandIds: string[]) => void;
  maxSelections?: number;
}

const BrandSelector: React.FC<BrandSelectorProps> = ({
  brands,
  selectedBrands,
  onBrandSelect,
  maxSelections = 10,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedBrands = showAll ? filteredBrands : filteredBrands.slice(0, 7);
  const hasMoreBrands = filteredBrands.length > 7;

  const handleBrandPress = (brandId: string) => {
    let newSelected: string[] = [];

    if (selectedBrands.includes(brandId)) {
      newSelected = selectedBrands.filter(id => id !== brandId);
    } else {
      if (selectedBrands.length >= maxSelections) {
         Alert.alert(`You can only select up to ${maxSelections} brands`);
        return;
      }
      newSelected = [...selectedBrands, brandId];
    }

    onBrandSelect(newSelected);
  };

  const isBrandSelected = (brandId: string): boolean => {
    return selectedBrands.includes(brandId);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <View style={styles.container}>
      {/* Header with Toggle Button */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Brand</Text>
          <Text style={styles.subtitle}>
            Selected: {selectedBrands.length}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text style={styles.toggleIcon}>
            {isExpanded ? '−' : '+'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Expandable Content */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          {/* Search Input */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search brand..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>

          {/* Brands List */}
          <ScrollView 
            style={styles.brandsScrollView}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <View style={styles.brandsContainer}>
              {displayedBrands.map(brand => {
                const isSelected = isBrandSelected(brand.id);
                return (
                  <TouchableOpacity
                    key={brand.id}
                    style={[
                      styles.brandButton,
                      isSelected && styles.selectedBrandButton,
                    ]}
                    onPress={() => handleBrandPress(brand.id)}
                  >
                    <Text style={[
                      styles.brandText,
                      isSelected && styles.selectedBrandText
                    ]}>
                      {brand.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Show More/Less Button */}
            {hasMoreBrands && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={toggleShowAll}
              >
                <Text style={styles.showMoreText}>
                  {showAll ? 'Show less' : `Show all (${filteredBrands.length})`}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default BrandSelector;

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

  expandedContent: {
    padding: 16,
    paddingTop: 0,
  },

  searchContainer: {
    marginBottom: 12,
  },

  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },

  brandsScrollView: {
    maxHeight: 300,
  },

  brandsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  brandButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },

  selectedBrandButton: {
    backgroundColor: '#003084',
    borderColor: '#003084',
  },

  brandText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  selectedBrandText: {
    color: 'white',
    fontWeight: '600',
  },

  showMoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  showMoreText: {
    fontSize: 14,
    color: '#003084',
    fontWeight: '600',
  },
});