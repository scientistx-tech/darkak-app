import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
export const CARD_WIDTH = width / 2 - CARD_MARGIN * 2;

interface ProductCardProps {
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: string[];
  stock: number; // <-- stock as number
  onPressBuy: () => void;
  onPressAddToCart: () => void;
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
  stock,
  onPressBuy,
  onPressAddToCart,
  onPressPreOrder,
  onPressFavorite,
  onPressView,
  onPressCompare,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  // Auto Image Slider
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => {
        const next = (prev + 1) % images.length;
        scrollRef.current?.scrollTo({ x: next * CARD_WIDTH, animated: true });
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const onScroll = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / CARD_WIDTH);
    setActiveImageIndex(index);
  };
  const handleOnPressCard = ()=>{
    router.push('/product')
  }

  return (
    <TouchableOpacity onPress={() => handleOnPressCard()} style={styles.card}>
      {/* IMAGE SLIDER */}
      <View style={styles.imageSliderContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {images.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={[styles.productImage, { width: CARD_WIDTH }]}
            />
          ))}
        </ScrollView>

        {/* PAGINATION */}
        <View style={styles.pagination}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeImageIndex === i && styles.dotActive]}
            />
          ))}
        </View>

        {/* DISCOUNT BADGE */}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onPressFavorite}
          >
            <MaterialIcons name="favorite-border" size={24} color="#003366" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onPressView}>
            <MaterialIcons name="visibility" size={24} color="#003366" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onPressCompare}
          >
            <MaterialIcons name="compare-arrows" size={24} color="#003366" />
          </TouchableOpacity>
        </View>
      </View>

      {/* DETAILS */}
      <View style={styles.detailsContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{originalPrice} BDT</Text>
          <Text style={styles.discountedPrice}>{discountedPrice} BDT</Text>
        </View>

        <Text style={styles.productName} numberOfLines={2}>
          {productName}
        </Text>

        {/* STOCK LOGIC */}
        {stock >= 1 ? (
          <View style={styles.buyRow}>
            <TouchableOpacity style={styles.buyButton} onPress={onPressBuy}>
              <Text style={styles.buyButtonText}>BUY NOW</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cartButton}
              onPress={onPressAddToCart}
            >
              <MaterialIcons name="shopping-cart" size={22} color="#003366" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.preOrderButton}
            onPress={onPressPreOrder}
          >
            <Text style={styles.preOrderButtonText}>Pre Order</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: CARD_MARGIN,
    width: CARD_WIDTH,
    overflow: "hidden",
    elevation: 3,
  },
  imageSliderContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#fff",
    position: "relative",
  },
  productImage: {
    height: "85%",
    resizeMode: "cover",
  },

  pagination: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.2)",
    marginHorizontal: 3,
  },
  dotActive: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#003366",
    marginHorizontal: 3,
  },

  discountBadge: {
    position: "absolute",
    top: 10,
    left: 0,
    backgroundColor: "#003366",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  discountText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

  actionButtons: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  actionButton: {
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 5,
    borderRadius: 20,
    marginBottom: 5,
  },

  detailsContainer: { padding: 10 },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#999",
    fontSize: 12,
    marginRight: 6,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
  },
  productName: {
    fontSize: 14,
    color: "#333",
    marginTop: 6,
    minHeight: 38,
  },

  buyRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#003366",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  buyButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },

  cartButton: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: "#003366",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  preOrderButton: {
    backgroundColor: "#003366",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  preOrderButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ProductCaosel;
