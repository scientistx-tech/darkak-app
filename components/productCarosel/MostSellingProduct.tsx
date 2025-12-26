import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Same interface as MostVisitedProduct
export interface MostSellingProductProps {
  id: string; // string হিসেবে রাখুন
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: string[];
  stock: number;
  onPressBuy: () => void;
  onPressAddToCart: () => void;
  onPressPreOrder: () => void;
  onPressFavorite: () => void;
  onPressView: () => void;
  onPressCompare: () => void;
}

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
export const CARD_WIDTH = width / 2 - CARD_MARGIN * 2;

const MostSellingProduct: React.FC<MostSellingProductProps> = ({
  id, 
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
  const router = useRouter();

  const handleOnPressCard = () => {
    router.push(`/product/${id}`);
  };

  // শুধু প্রথম ইমেজটি নিন
  const mainImage = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/200';

  return (
    <TouchableOpacity onPress={() => handleOnPressCard()} style={styles.card}>
      {/* SINGLE IMAGE (NO SLIDER) */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: mainImage }}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* DISCOUNT BADGE */}
        {discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
          </View>
        )}

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
          {discountPercentage > 0 ? (
            <>
              <Text style={styles.originalPrice}>{originalPrice} BDT</Text>
              <Text style={styles.discountedPrice}>{discountedPrice} BDT</Text>
            </>
          ) : (
            <Text style={styles.discountedPrice}>{originalPrice} BDT</Text>
          )}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: 0,
    backgroundColor: "#003366",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  discountText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 10 
  },
  actionButtons: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  actionButton: {
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 4,
    borderRadius: 20,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailsContainer: { 
    padding: 12,
    paddingBottom: 14 
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#999",
    fontSize: 12,
    marginRight: 6,
    fontFamily: "System",
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
    fontFamily: "System",
  },
  productName: {
    fontSize: 14,
    color: "#333",
    minHeight: 40,
    marginBottom: 10,
    lineHeight: 18,
    fontFamily: "System",
  },
  buyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#003366",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  buyButtonText: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "bold",
    fontFamily: "System",
  },
  cartButton: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#003366",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  preOrderButton: {
    backgroundColor: "#003366",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  preOrderButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "System",
  },
});

export default MostSellingProduct;