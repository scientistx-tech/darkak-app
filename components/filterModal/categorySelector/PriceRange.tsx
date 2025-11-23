import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

interface PriceRangeSelectorProps {
  onPriceRangeChange?: (minPrice: number, maxPrice: number) => void;
}

const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({ onPriceRangeChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [minPrice, setMinPrice] = useState<string>('0');
  const [maxPrice, setMaxPrice] = useState<string>('10000');

  const handleMinPriceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setMinPrice(numericValue);
    onPriceRangeChange?.(Number(numericValue), Number(maxPrice));
  };

  const handleMaxPriceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setMaxPrice(numericValue);
    onPriceRangeChange?.(Number(minPrice), Number(numericValue));
  };

  const incrementMinPrice = () => {
    const newMin = String(Number(minPrice) + 100);
    setMinPrice(newMin);
    onPriceRangeChange?.(Number(newMin), Number(maxPrice));
  };

  const decrementMinPrice = () => {
    const newMin = Math.max(0, Number(minPrice) - 100);
    setMinPrice(String(newMin));
    onPriceRangeChange?.(newMin, Number(maxPrice));
  };

  const incrementMaxPrice = () => {
    const newMax = String(Number(maxPrice) + 100);
    setMaxPrice(newMax);
    onPriceRangeChange?.(Number(minPrice), Number(newMax));
  };

  const decrementMaxPrice = () => {
    const newMax = Math.max(Number(minPrice), Number(maxPrice) - 100);
    setMaxPrice(String(newMax));
    onPriceRangeChange?.(Number(minPrice), newMax);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header with Toggle Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Price Range</Text>
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
          <View style={styles.priceInputsContainer}>
            {/* From Price Input */}
            <View style={styles.priceInputWrapper}>
              <Text style={styles.inputLabel}>From</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity 
                  style={styles.decrementButton}
                  onPress={decrementMinPrice}
                >
                  <Text style={styles.buttonText}>−</Text>
                </TouchableOpacity>
                
                <View style={styles.textInputWrapper}>
                  <Text style={styles.currencySymbol}>৳</Text>
                  <TextInput
                    style={styles.textInput}
                    value={minPrice}
                    onChangeText={handleMinPriceChange}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                </View>
                
                <TouchableOpacity 
                  style={styles.incrementButton}
                  onPress={incrementMinPrice}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* To Price Input */}
            <View style={styles.priceInputWrapper}>
              <Text style={styles.inputLabel}>To</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity 
                  style={styles.decrementButton}
                  onPress={decrementMaxPrice}
                >
                  <Text style={styles.buttonText}>−</Text>
                </TouchableOpacity>
                
                <View style={styles.textInputWrapper}>
                  <Text style={styles.currencySymbol}>৳</Text>
                  <TextInput
                    style={styles.textInput}
                    value={maxPrice}
                    onChangeText={handleMaxPriceChange}
                    keyboardType="numeric"
                    placeholder="10000"
                  />
                </View>
                
                <TouchableOpacity 
                  style={styles.incrementButton}
                  onPress={incrementMaxPrice}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
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
  headerTitle: {
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
  priceInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  priceInputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  decrementButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
  },
  incrementButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  currencySymbol: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    padding: 0,
  },
});

export default PriceRangeSelector;