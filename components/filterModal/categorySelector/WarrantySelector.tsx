import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export interface WarrantyOption {
  id: string;
  name: string;
}

export interface WarrantySelectorProps {
  selectedWarranty: string[];
  onWarrantySelect: (warrantyIds: string[]) => void;
}

const WarrantySelector: React.FC<WarrantySelectorProps> = ({
  selectedWarranty,
  onWarrantySelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const warrantyOptions: WarrantyOption[] = [
    { id: 'official', name: 'Official' },
    { id: 'darkak', name: 'Darkak' },
  ];

  const handleWarrantyPress = (warrantyId: string) => {
    let newSelected: string[] = [];

    if (selectedWarranty.includes(warrantyId)) {
      newSelected = selectedWarranty.filter(id => id !== warrantyId);
    } else {
      newSelected = [...selectedWarranty, warrantyId];
    }

    onWarrantySelect(newSelected);
  };

  const isWarrantySelected = (warrantyId: string): boolean => {
    return selectedWarranty.includes(warrantyId);
  };

  return (
    <View style={styles.container}>
      {/* Header with Toggle Button */}
      <View style={styles.header}>
        <Text style={styles.title}>Warranty</Text>
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
          {warrantyOptions.map(option => {
            const isSelected = isWarrantySelected(option.id);
            return (
              <TouchableOpacity
                key={option.id}
                style={styles.optionItem}
                onPress={() => handleWarrantyPress(option.id)}
              >
                <View style={styles.checkbox}>
                  {isSelected && <View style={styles.checkboxSelected} />}
                </View>
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            );
          })}
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

  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
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

  optionText: {
    fontSize: 14,
    color: '#003084',
    fontWeight: '500',
  },
});

export default WarrantySelector;