// import Button from '@/components/ui/button';
// import { Header } from '@/components/ui/Header';
// import { Colors, Spacing, Typography } from '@/constants/theme';
// import { mockProducts } from '@/data/mock-data';
// import { useColorScheme } from '@/hooks/use-color-scheme';
// import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,

//   View,
// } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";


// export default function ProductScreen() {
//   const { id } = useLocalSearchParams() as { id?: string };
//   const router = useRouter();
//   const colorScheme = useColorScheme() ?? 'light';
//   const colors = Colors[colorScheme];

//   const product = mockProducts.find((p) => p.id === id) ?? mockProducts[0];

//   const formatPrice = (amount: number) => `${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })} TK`;

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
//       <StatusBar style="dark" />

//       {/* Header */}
//       <Header
//         showBack
//         onBack={() => router.back()}
//         title="Product"
//         rightIcon={<Ionicons name="git-compare-outline" size={20} color={colors.text} />}
//         onRightPress={() => { /* share / more */ }}
//       />



//       <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
//         <View style={styles.imageWrap}>
//           <View style={[styles.imageCard, { backgroundColor: product.backgroundColor ?? colors.surface }]}>
//             <Image
//               source={typeof product.image === 'number' ? product.image : { uri: product.image }}
//               style={styles.image}
//               resizeMode="contain"
//             />
//           </View>
//           {/* small pagination dots mock */}
//           <View style={styles.dotsRow}>
//             <View style={[styles.dot, { backgroundColor: colors.primary }]} />
//             <View style={[styles.dot, { backgroundColor: '#D6E1F2' }]} />
//             <View style={[styles.dot, { backgroundColor: '#D6E1F2' }]} />
//           </View>
//         </View>

//         <View style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           width: '100%',
//           marginTop: Spacing.md,
//         }}>
//           <Button
//             variant="outline"
//             title="12GB/128GB"
//             icon={<FontAwesome name="angle-down" size={18} color="#FFFFFF" />}
//             onPress={() => console.log('pressed')}
//             style={{ flex: 1, marginRight: Spacing.sm }}
//           />
//           <Button
//             variant="outline"
//             title="BLACK"
//             icon={<FontAwesome name="angle-down" size={18} color="#FFFFFF" />}
//             onPress={() => console.log('pressed')}
//             style={{ paddingHorizontal: 18, flex: 1, marginLeft: Spacing.sm }}
//           />
//           <View style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: "#5694FF",
//             width: 36,
//             height: 36,
//             borderRadius: 28,
//             marginLeft: Spacing.sm,
//           }}>
//             <Entypo name="heart" size={22} color='#FFFFFF' />
//           </View>
//         </View>

//         <View style={styles.card}>
//           <Text style={[styles.brand, { color: colors.textSecondary }]}>{product.brand}</Text>
//           <Text style={[styles.name, { color: colors.text }]}>{product.name}</Text>

//           <View style={styles.rowBetween}>
//             <View style={styles.ratingRow}>
//               <Ionicons name="star" size={16} color={colors.ratingActive} />
//               <Text style={[styles.ratingText, { color: colors.text }]}>{product.rating.toFixed(1)}</Text>
//               <Text style={[styles.reviewCount, { color: colors.textTertiary }]}>({product.reviewCount})</Text>
//             </View>
//             <Text style={[styles.price, { color: colors.primary }]}>{formatPrice(product.price)}</Text>
//           </View>

//           <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
//           <Text style={[styles.description, { color: colors.textSecondary }]}>{product.description}</Text>

//           <View style={{ height: 120 }} />
//         </View>
//       </ScrollView>

//       {/* Bottom action bar */}
//       <View style={[styles.bottomBar, { backgroundColor: colors.surface }]}>
//         <Button
//           variant="filled"
//           title="BUY NOW"
//           onPress={() => {}}
//           style={styles.buyButton}
//           textStyle={styles.buyText}
//         />
//         <Button
//           variant="outline"
//           title="ADD TO CART"
//           onPress={() => {}}
//           style={styles.cartButton}
//           textStyle={styles.cartText}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const screenWidth = Dimensions.get('window').width;
// const imageSize = screenWidth * 0.7;

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: Spacing.base,
//     paddingVertical: Spacing.sm,
//   },
//   iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
//   headerTitle: { fontSize: Typography.fontSizes.lg, fontWeight: Typography.fontWeights.semibold },
//   scrollContent: { paddingBottom: Spacing['4xl'], paddingHorizontal: Spacing.base },
//   imageWrap: {
//     alignItems: 'center',
//     width: '100%',
//     marginTop: Spacing.md,
//   },
//   imageCard: {
//     width: '100%',
//     height: imageSize,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: Spacing.md,
//   },
//   image: { width: '100%', height: '100%' },
//   dotsRow: { flexDirection: 'row', marginTop: Spacing.sm },
//   dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 6 },
//   card: { marginTop: Spacing.md, paddingHorizontal: 0 },
//   brand: { fontSize: Typography.fontSizes.xs, textTransform: 'uppercase', marginBottom: 6 },
//   name: { fontSize: Typography.fontSizes['2xl'], fontWeight: Typography.fontWeights.bold, marginBottom: Spacing.sm },
//   rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
//   ratingRow: { flexDirection: 'row', alignItems: 'center' },
//   ratingText: { marginLeft: 6, fontSize: Typography.fontSizes.sm },
//   reviewCount: { marginLeft: 6, fontSize: Typography.fontSizes.xs },
//   price: { fontSize: Typography.fontSizes['2xl'], fontWeight: Typography.fontWeights.bold },
//   sectionTitle: { marginTop: Spacing.md, marginBottom: Spacing.xs, fontSize: Typography.fontSizes.sm, fontWeight: Typography.fontWeights.semibold },
//   description: { fontSize: Typography.fontSizes.base, lineHeight: 20 },
//   bottomBar: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     flexDirection: 'row',
//     padding: Spacing.md,
//     gap: Spacing.sm,
//     alignItems: 'center',
//   },
//   buyButton: {
//     flex: 1,
//     paddingVertical: Spacing.md,
//       borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buyText: { fontWeight: Typography.fontWeights.bold },
//   cartButton: {
//     marginLeft: Spacing.sm,
//     paddingVertical: Spacing.md,
//     paddingHorizontal: Spacing.lg,
//     borderRadius: 50,
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cartText: { fontWeight: Typography.fontWeights.semibold 
//   },
// });

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { PRODUCTS_DATA } from "@/data/mock-data";

const { width } = Dimensions.get("window");

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // প্রোডাক্ট ডাটা খুঁজে বের করুন
  const product = PRODUCTS_DATA.find(item => item.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = () => {
    Alert.alert("Success", `${product.productName} added to cart!`);
  };

  const handleBuyNow = () => {
    Alert.alert("Buy Now", `Proceeding to buy ${product.productName}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <MaterialIcons name="favorite-border" size={24} color="#003366" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Image */}
        <View style={styles.mainImageContainer}>
          <Image
            source={{ uri: product.images[selectedImageIndex] }}
            style={styles.mainImage}
            resizeMode="contain"
          />
          
          {/* Discount Badge */}
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discountPercentage}% OFF</Text>
          </View>
        </View>

        {/* Thumbnail Images */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailContainer}
          contentContainerStyle={styles.thumbnailContent}
        >
          {product.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImageIndex(index)}
              style={[
                styles.thumbnail,
                selectedImageIndex === index && styles.thumbnailActive
              ]}
            >
              <Image
                source={{ uri: image }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.discountedPrice}>{product.discountedPrice} BDT</Text>
            <Text style={styles.originalPrice}>{product.originalPrice} BDT</Text>
          </View>

          {/* Product Name */}
          <Text style={styles.productName}>{product.productName}</Text>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <Text style={[
              styles.stockText,
              product.stock > 0 ? styles.inStock : styles.outOfStock
            ]}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Description</Text>
            <Text style={styles.description}>
              This is a premium quality product with excellent features. 
              Designed for comfort and durability, it offers great value for money.
            </Text>
          </View>

          {/* Features */}
          {/* <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={16} color="#28a745" />
              <Text style={styles.featureText}>High quality materials</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={16} color="#28a745" />
              <Text style={styles.featureText}>Premium finish</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={16} color="#28a745" />
              <Text style={styles.featureText}>Warranty included</Text>
            </View>
          </View> */}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <MaterialIcons name="shopping-cart" size={20} color="#003366" />
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: "space-between",
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
  },
  favoriteButton: {
    padding: 8,
  },
  mainImageContainer: {
    width: width,
    height: width,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mainImage: {
    width: "80%",
    height: "80%",
  },
  discountBadge: {
    position: "absolute",
    top: 16,
    left: 0,
    backgroundColor: "#003366",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  discountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  thumbnailContainer: {
    paddingVertical: 16,
    backgroundColor: "#f8f8f8",
  },
  thumbnailContent: {
    paddingHorizontal: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  thumbnailActive: {
    borderColor: "#003366",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  detailsContainer: {
    padding: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#999",
  },
  productName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  stockContainer: {
    marginBottom: 20,
  },
  stockText: {
    fontSize: 14,
    fontWeight: "500",
  },
  inStock: {
    color: "#28a745",
  },
  outOfStock: {
    color: "#dc3545",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  actionContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  cartButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: "#003366",
    borderRadius: 8,
    marginRight: 12,
  },
  cartButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
    marginLeft: 8,
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#003366",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#003366",
    fontWeight: "bold",
  },
});

export default ProductDetails;