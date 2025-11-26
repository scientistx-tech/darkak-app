import QuantityCard from "@/components/button/quantityButton/QuantityCard";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock cart data based on your screenshot
const CART_ITEMS = [
  {
    id: "1",
    productName: "Chic Brown Quilted Design Shoulder Bag",
    price: 1960,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.5scyD0bTOKXAplB4yjbs6wHaEA?pid=Api&P=0&h=220",
    quantity: 1,
  },
  {
    id: "2",
    productName: "Designer Patterned Tote Bag with Brown Accent",
    price: 1960,
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6c16f0171396113.646f4f9b52e9d.png",
    quantity: 1,
  },
  {
    id: "3",
    productName: "Chic Brown Quilted Design Shoulder Bag",
    price: 1960,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.5scyD0bTOKXAplB4yjbs6wHaEA?pid=Api&P=0&h=220",
    quantity: 1,
  },
  {
    id: "4",
    productName: "Designer Patterned Tote Bag with Brown Accent",
    price: 1960,
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6c16f0171396113.646f4f9b52e9d.png",
    quantity: 1,
  },
];

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(CART_ITEMS);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cartItems.find((item) => item.id === productId);
    Alert.alert("Remove Item", `Remove ${item?.productName} from cart?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
          );
        },
      },
    ]);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart Empty", "Please add items to cart before checkout");
      return;
    }
    router.push("/oder");
  };

  const handleContinueShopping = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="shopping-cart" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={handleContinueShopping}
          >
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Cart Items */}
          <View style={styles.cartItemsContainer}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                {/* Checkbox */}
                <TouchableOpacity style={styles.checkbox}>
                  <View style={styles.checkboxInner} />
                </TouchableOpacity>

                {/* Product Image */}
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="cover"
                />

                {/* Product Details */}
                <View style={styles.productDetails}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.productName}
                  </Text>

                  <View style={styles.quantitySection}>
                    <Text style={styles.quantityLabel}>Quantity</Text>
                    <QuantityCard
                      initial={item.quantity}
                      onChange={(value) => updateQuantity(item.id, value)}
                      disAble={false}
                    />
                  </View>
                </View>

                {/* Price */}
                <View style={styles.priceSection}>
                  <Text style={styles.price}>{item.price} TK</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={20}
                      color="#dc3545"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Order Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sub-Total:</Text>
              <Text style={styles.summaryValue}>{subtotal} TK</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Charge:</Text>
              <Text style={styles.summaryValue}>Will be added</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount:</Text>
              <Text style={styles.summaryValue}>0</Text>
            </View>

            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{subtotal} TK</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.continueShoppingBtn}
              onPress={handleContinueShopping}
            >
              <Text style={styles.continueShoppingBtnText}>
                Continue Shopping
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutBtnText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  continueShoppingButton: {
    backgroundColor: "#003366",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  cartItemsContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#003366",
    borderRadius: 4,
    marginRight: 12,
    marginTop: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#003366",
    borderRadius: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    lineHeight: 18,
    marginBottom: 8,
  },
  quantitySection: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityLabel: {
    fontSize: 12,
    color: "#666",
    marginRight: 8,
    fontWeight: "500",
  },
  priceSection: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 60,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
  },
  removeButton: {
    padding: 4,
  },
  summaryContainer: {
    backgroundColor: "#f8f8f8",
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 8,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 12,
  },
  continueShoppingBtn: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#003366",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  continueShoppingBtnText: {
    color: "#003366",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutBtn: {
    flex: 1,
    backgroundColor: "#003366",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cart;
