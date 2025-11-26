import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity,
  ScrollView,
  SafeAreaView 
} from 'react-native'
import React, { useState } from 'react'
import { CATEGORIES_DATA, BRANDS_DATA } from '@/data/mock-data';
import PriceRangeSelector from './categorySelector/PriceRange';
import CategorySelector from './categorySelector/CategorySelector';
import BrandSelector from './categorySelector/BrandSelector';
import AvailabilitySelector from './categorySelector/AvailabilitySelector';
import WarrantySelector from './categorySelector/WarrantySelector';
import RegionSelector from './categorySelector/RegionSelector';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedWarranty, setSelectedWarranty] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  
  const categories = CATEGORIES_DATA;
  const brands = BRANDS_DATA;

  const handlePriceRangeChange = (minPrice: number, maxPrice: number) => {
    setPriceRange({ min: minPrice, max: maxPrice });
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedAvailability([]);
    setSelectedWarranty([]);
    setSelectedRegions([]);
    setPriceRange({ min: 0, max: 10000 });
  };

  const handleApply = () => {
    console.log('Selected categories:', selectedCategories);
    console.log('Selected brands:', selectedBrands);
    console.log('Selected availability:', selectedAvailability);
    console.log('Selected warranty:', selectedWarranty);
    console.log('Selected regions:', selectedRegions);
    console.log('Price range:', priceRange);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Content */}
          <ScrollView style={styles.filterContent} showsVerticalScrollIndicator={false}>
            {/* Price Range Section */}
            <PriceRangeSelector onPriceRangeChange={handlePriceRangeChange} />
            
            {/* Categories Section */}
            <CategorySelector
              categories={categories}
              selectedCategories={selectedCategories}
              onCategorySelect={setSelectedCategories}
              maxSelections={5}
            />
            
            {/* Brand Section */}
            <BrandSelector
              brands={brands}
              selectedBrands={selectedBrands}
              onBrandSelect={setSelectedBrands}
              maxSelections={10}
            />

            {/* Availability Section */}
            <AvailabilitySelector
              selectedAvailability={selectedAvailability}
              onAvailabilitySelect={setSelectedAvailability}
            />

            {/* Warranty Section */}
            <WarrantySelector
              selectedWarranty={selectedWarranty}
              onWarrantySelect={setSelectedWarranty}
            />

            {/* Region Section */}
            <RegionSelector
              selectedRegions={selectedRegions}
              onRegionSelect={setSelectedRegions}
            />
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalContent: {
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContent: {
    flex: 1,
    padding: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  resetButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  resetText: {
    color: '#333',
    fontWeight: '500',
  },
  applyButton: {
    padding: 15,
    backgroundColor: 'rgb(0, 48, 132)',
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  applyText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default FilterModal;