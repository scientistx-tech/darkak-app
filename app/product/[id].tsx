import AnimatedProductDetailsTabs from "@/components/animatedProductDetailsTabs/AnimatedProductDetailsTabs";
import QuantitySelector from "@/components/button/quantityButton/QuantityButton";
import DeliveryDetails from "@/components/deliveryDetails/DeliveryDetails";
import MobileFooter from "@/components/mobileFooter/MobileFooter";
import NewsletterSubscribeCard from "@/components/newsletterSubscribeCard/NewsletterSubscribeCard";
import ProductCaosel from "@/components/productCarosel/ProductCaosel";
import { deliveryData, PRODUCTS_DATA } from "@/data/mock-data";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8; // Product item width

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  console.log("iii::", id);
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const horizontalScrollRef = useRef<ScrollView>(null);

  const product = PRODUCTS_DATA.find((item) => item.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  //
  const handleAddToCart = () => {
    // Shudhu product er basic info pathabo
    const productInfo = {
      id: product.id,
      productName: product.productName,
      price: product.discountedPrice,
      image: product.images[0],
      quantity: 1,
    };

    router.push({
      pathname: "/cart",
      params: {
        newProduct: JSON.stringify(productInfo), // quantity charao shudhu product info
      },
    });

    Alert.alert("Success", `${product.productName} added to cart!`);
  };

  const handleBuyNow = () => {
    if (product) {
      router.push({
        pathname: "/oder",
        params: {
          productId: product.id,
          //quantity: quantity
        },
      });
    }
  };

  // Filter out current product from related products
  const relatedProducts = PRODUCTS_DATA.filter((item) => item.id !== id);

  const scrollToIndex = (index: number) => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollTo({
        x: index * ITEM_WIDTH,
        animated: true,
      });
      setCurrentProductIndex(index);
    }
  };

  const handleLeftArrowPress = () => {
    if (currentProductIndex > 0) {
      scrollToIndex(currentProductIndex - 1);
    }
  };

  const handleRightArrowPress = () => {
    if (currentProductIndex < relatedProducts.length - 1) {
      scrollToIndex(currentProductIndex + 1);
    }
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / ITEM_WIDTH);
    setCurrentProductIndex(newIndex);
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
        <Text style={styles.headerTitle}>Product Details</Text>
        {/* <TouchableOpacity style={styles.favoriteButton}>
          <MaterialIcons name="favorite-border" size={24} color="#003366" />
        </TouchableOpacity> */}
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
            <Text style={styles.discountText}>
              {product.discountPercentage}% OFF
            </Text>
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
                selectedImageIndex === index && styles.thumbnailActive,
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
            <Text style={styles.discountedPrice}>
              {product.discountedPrice} BDT
            </Text>
            <Text style={styles.originalPrice}>
              {product.originalPrice} BDT
            </Text>
          </View>

          {/* Product Name */}
          <Text style={styles.productName}>{product.productName}</Text>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <Text
              style={[
                styles.stockText,
                product.stock > 0 ? styles.inStock : styles.outOfStock,
              ]}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Description</Text>
            <Text style={styles.description}>
              This is a premium quality product with excellent features.
              Designed for comfort and durability, it offers great value for
              money.
            </Text>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.pwtxt}>Product Code: MA394031</Text>
            <Text style={styles.pwtxt}>Warranty Type: darkak (7)</Text>
          </View>
          <View style={styles.quantityBtn}>
            <QuantitySelector
              initial={1}
              onChange={(value) => {}}
              disAble={false}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              আমাদের এই সুপার প্রিমিয়াম ব্যাগটি ব্যবহারে আপনার লুক হবে আরও
              স্টাইলিশ, ট্রেন্ডি, আকর্ষণীয় এবং আপনার ব্যক্তিত্ব দারুণভাবে
              ফুটিয়ে তুলবে। প্রতিটি ব্যাগ চমৎকার ডিজাইন ও টপ কোয়ালিটি উপকরণের
              সমন্বয়ে তৈরি, যা ব্যবহারের সময় আপনার আত্মবিশ্বাস আরও বাড়িয়ে
              তুলবে। অফিস, ভ্রমণ বা দৈনন্দিন ব্যবহারে—সব ক্ষেত্রেই এটি একদম
              পারফেক্ট চয়েস। আজই কিনে নিন DarkakMart থেকে!
            </Text>
          </View>
          <View>
            <DeliveryDetails data={deliveryData} />
          </View>

          {/* Related Products Section */}
          <View style={styles.relatedProductsContainer}>
            <View style={styles.relatedView}>
              <Text style={styles.related}>RELATED PRODUCTS</Text>
              <View style={styles.mainbtn}>
                <TouchableOpacity
                  style={[
                    styles.arrowButton,
                    currentProductIndex === 0 && styles.arrowButtonDisabled,
                  ]}
                  onPress={handleLeftArrowPress}
                  disabled={currentProductIndex === 0}
                >
                  <FontAwesome6
                    name="arrow-left-long"
                    size={20}
                    color={currentProductIndex === 0 ? "#ccc" : "#003366"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.arrowButton,
                    currentProductIndex === relatedProducts.length - 1 &&
                      styles.arrowButtonDisabled,
                  ]}
                  onPress={handleRightArrowPress}
                  disabled={currentProductIndex === relatedProducts.length - 1}
                >
                  <FontAwesome6
                    name="arrow-right-long"
                    size={20}
                    color={
                      currentProductIndex === relatedProducts.length - 1
                        ? "#ccc"
                        : "#003366"
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Horizontal ScrollView for Products */}
            <ScrollView
              ref={horizontalScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScroll={handleScroll}
              scrollEventThrottle={16}
              // contentContainerStyle={styles.horizontalScrollContent}
              snapToInterval={ITEM_WIDTH}
              decelerationRate="fast"
            >
              {relatedProducts.map((item) => (
                <View key={item.id} style={styles.productItem}>
                  <ProductCaosel
                    id={item.id}
                    productName={item.productName}
                    originalPrice={item.originalPrice}
                    discountedPrice={item.discountedPrice}
                    discountPercentage={item.discountPercentage}
                    images={item.images}
                    stock={item.stock}
                    onPressBuy={() => Alert.alert("Buying:", item.productName)}
                    onPressAddToCart={() =>
                      Alert.alert("Added to Cart:", item.productName)
                    }
                    onPressPreOrder={() =>
                      Alert.alert("Pre-ordering:", item.productName)
                    }
                    onPressFavorite={() =>
                      Alert.alert("Favorite:", item.productName)
                    }
                    onPressView={() =>
                      Alert.alert("Viewing:", item.productName)
                    }
                    onPressCompare={() =>
                      Alert.alert("Comparing:", item.productName)
                    }
                  />
                </View>
              ))}
            </ScrollView>
            <View style={styles.scrollIndicator}>
              {relatedProducts.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicatorDot,
                    index === currentProductIndex && styles.indicatorDotActive,
                  ]}
                />
              ))}
            </View>
            <AnimatedProductDetailsTabs />
            <View style={{ marginTop: 20 }}>
              <NewsletterSubscribeCard />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <MobileFooter />
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
    //justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 80,
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
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  pwtxt: {
    fontSize: 15,
    fontWeight: "400",
  },
  quantityBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionContainer: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#333333",
    textAlign: "justify",
    fontWeight: "400",
  },
  related: {
    fontSize: 20,
    fontWeight: "600",
    color: "#003366",
  },
  relatedView: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowButton: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  arrowButtonDisabled: {
    borderColor: "#ccc",
    backgroundColor: "#f8f8f8",
  },
  mainbtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  relatedProductsContainer: {
    marginTop: 20,
  },
  horizontalScrollContent: {
    paddingHorizontal: 10,
  },
  productItem: {
    marginHorizontal: 2,
  },
  scrollIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    gap: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
  indicatorDotActive: {
    backgroundColor: "#003366",
    width: 20,
  },
});

export default ProductDetails;
