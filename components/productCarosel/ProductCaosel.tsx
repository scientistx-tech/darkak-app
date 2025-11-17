import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');

// Adjust card width for two items per row, considering margin
const CARD_MARGIN = 8; // Margin on each side of the card
export const CARD_WIDTH = (width / 2) - (CARD_MARGIN * 2);

interface ProductCardProps {
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: string[]; // Array of image URLs
  onPressPreOrder: () => void;
  onPressFavorite: () => void;
  onPressView: () => void;
  onPressCompare: () => void;
}

const ProductCaosel: React.FC<ProductCardProps> = ({
  productName,
  originalPrice,
  discountedPrice,
  discountPercentage,
  images,
  onPressPreOrder,
  onPressFavorite,
  onPressView,
  onPressCompare,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  // Auto-scroll logic for the image slider
  React.useEffect(() => {
    if (images.length === 0) return; // Prevent errors if no images

    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        // Scroll to the next image's position. Use CARD_WIDTH for calculation.
        scrollRef.current?.scrollTo({ x: nextIndex * CARD_WIDTH, animated: true });
        return nextIndex;
      });
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]); // Re-run effect if number of images changes

  // Handle manual scrolling to update pagination dots
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / CARD_WIDTH);
    setActiveImageIndex(currentIndex);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageSliderContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Optimize scroll event updates
        >
          {images.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={[styles.productImage, { width: CARD_WIDTH }]} />
          ))}
        </ScrollView>
        {images.length > 1 && ( // Only show pagination if more than one image
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[styles.paginationDot, activeImageIndex === index && styles.paginationDotActive]}
              />
            ))}
          </View>
        )}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={onPressFavorite}>
            <MaterialIcons name="favorite-border" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onPressView}>
            <MaterialIcons name="visibility" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onPressCompare}>
            <MaterialIcons name="compare-arrows" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{originalPrice} BDT</Text>
          <Text style={styles.discountedPrice}>{discountedPrice} BDT</Text>
        </View>
        <Text style={styles.productName} numberOfLines={2}>
          {productName}
        </Text>
        <TouchableOpacity style={styles.preOrderButton} onPress={onPressPreOrder}>
          <Text style={styles.preOrderButtonText}>Pre Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: CARD_MARGIN, // Use defined margin
    overflow: 'hidden',
    width: CARD_WIDTH, // Use the calculated card width
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imageSliderContainer: {
    width: '100%',
    height: 180, // Fixed height for the image slider (adjusted for two cards per row)
    position: 'relative',
  },
  productImage: {
    // width is set inline in renderItem
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 0,
    backgroundColor: '#003366', // Dark blue
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12, // Slightly smaller font for two cards
  },
  actionButtons: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 5,
    marginBottom: 5,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 6, // Smaller dots
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: '#003366', // Dark blue for active dot
  },
  detailsContainer: {
    padding: 10, // Reduced padding
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 12, // Smaller font
    marginRight: 8,
  },
  discountedPrice: {
    color: '#003366', // Dark blue
    fontSize: 16, // Smaller font
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 14, // Smaller font
    color: '#333',
    marginBottom: 10,
    minHeight: 36, // Ensure consistent height for 2 lines
  },
  preOrderButton: {
    backgroundColor: '#003366', // Dark blue
    paddingVertical: 10, // Reduced padding
    borderRadius: 8,
    alignItems: 'center',
  },
  preOrderButtonText: {
    color: '#fff',
    fontSize: 14, // Smaller font
    fontWeight: 'bold',
  },
});

export default ProductCaosel;