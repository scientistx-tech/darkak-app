import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

export interface Region {
  id: string;
  name: string;
  code: string;
}

export interface RegionSelectorProps {
  selectedRegions: string[];
  onRegionSelect: (regionIds: string[]) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegions,
  onRegionSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const regions: Region[] = [
    { id: 'bd', name: 'Bangladesh', code: 'BD' },
    { id: 'af', name: 'Afghanistan', code: 'AF' },
    { id: 'al', name: 'Albania', code: 'AL' },
    { id: 'dz', name: 'Algeria', code: 'DZ' },
    { id: 'as', name: 'American Samoa', code: 'AS' },
    { id: 'ad', name: 'Andorra', code: 'AD' },
    // আপনি চাইলে আরও দেশ যোগ করতে পারেন
  ];

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    region.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegionPress = (regionId: string) => {
    let newSelected: string[] = [];

    if (selectedRegions.includes(regionId)) {
      newSelected = selectedRegions.filter(id => id !== regionId);
    } else {
      newSelected = [...selectedRegions, regionId];
    }

    onRegionSelect(newSelected);
  };

  const isRegionSelected = (regionId: string): boolean => {
    return selectedRegions.includes(regionId);
  };

  return (
    <View style={styles.container}>
      {/* Header with Toggle Button */}
      <View style={styles.header}>
        <Text style={styles.title}>Region</Text>
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
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>

          {/* Regions List */}
          <ScrollView 
            style={styles.regionsScrollView}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {filteredRegions.map(region => {
              const isSelected = isRegionSelected(region.id);
              return (
                <TouchableOpacity
                  key={region.id}
                  style={styles.regionItem}
                  onPress={() => handleRegionPress(region.id)}
                >
                  <View style={styles.checkbox}>
                    {isSelected && <View style={styles.checkboxSelected} />}
                  </View>
                  <Text style={styles.regionCode}>{region.code}</Text>
                  <Text style={styles.regionName}>{region.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

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

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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

  regionsScrollView: {
    maxHeight: 200,
  },

  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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

  regionCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003084',
    width: 30,
    marginRight: 8,
  },

  regionName: {
    fontSize: 14,
    color: '#003084',
    fontWeight: '500',
    flex: 1,
  },
});

export default RegionSelector;