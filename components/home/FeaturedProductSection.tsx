// import React, { useEffect, useState } from "react";
// import { 
//   StyleSheet, 
//   FlatList, 
//   Alert, 
//   TouchableOpacity, 
//   Text,
//   View 
// } from "react-native";
// import FeaturedProduct from "../productCarosel/FeaturedProduct"; // নতুন কম্পোনেন্ট import করুন
// import { PRODUCTS_DATA } from "@/data/mock-data";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { getFeatureProdRequest } from "@/redux/actions/featureProduct.action";

// // প্রথম 10টি প্রডাক্ট
// const initialProducts = PRODUCTS_DATA.slice(0, 10);

// const FeaturedProductSection = () => {
//     const dispatch = useDispatch();
//       const {
//     products,
//     loading,
//     error,
//     currentPage,
//     totalPages,
//     hasMore,
//   } = useSelector((state: RootState) => state.featureProductData);

//   console.log("feature data --->>>",FeaturedProductSection);
//   // Initial fetch
//   useEffect(() => {
//     dispatch(getFeatureProdRequest({
//       page: 1,
//       limit: 10,
//     }));
//   }, [dispatch]);
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const [visibleProducts, setVisibleProducts] = useState(initialProducts);
//   const [hasMore, setHasMore] = useState(PRODUCTS_DATA.length > 10);

//   const handleBuyNow = (productId: string) => {
//     const product = PRODUCTS_DATA.find((item) => item.id === productId);
//     if (product) {
//       router.push({
//         pathname: "/oder",
//         params: { 
//           productId: product.id,
//         }
//       });
//     }
//   };

//   const loadMoreProducts = () => {
//     if (visibleProducts.length < PRODUCTS_DATA.length) {
//       const nextIndex = visibleProducts.length;
//       const nextProducts = PRODUCTS_DATA.slice(nextIndex, nextIndex + 10);
//       setVisibleProducts([...visibleProducts, ...nextProducts]);
      
//       // Check if there are more products to load
//       if (visibleProducts.length + nextProducts.length >= PRODUCTS_DATA.length) {
//         setHasMore(false);
//       }
//     }
//   };

//   const renderFooter = () => {
//     if (!hasMore) return null;
    
//     return (
//       <TouchableOpacity 
//         style={styles.seeMoreButton}
//         onPress={loadMoreProducts}
//       >
//         <Text style={styles.seeMoreText}>See More</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={visibleProducts}
//         numColumns={2}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <FeaturedProduct // এখানে FeaturedProduct ব্যবহার করুন
//             id={item.id} 
//             productName={item.productName}
//             originalPrice={item.originalPrice}
//             discountedPrice={item.discountedPrice}
//             discountPercentage={item.discountPercentage}
//             images={item.images}
//             stock={item.stock}
//             onPressBuy={() => handleBuyNow(item.id)}
//             onPressAddToCart={() =>
//               Alert.alert("Added to Cart:", item.productName)
//             }
//             onPressPreOrder={() =>
//               Alert.alert("Pre-ordering:", item.productName)
//             }
//             onPressFavorite={() => Alert.alert("Favorite:", item.productName)}
//             onPressView={() => Alert.alert("Viewing:", item.productName)}
//             onPressCompare={() => Alert.alert("Comparing:", item.productName)}
//           />
//         )}
//         ListFooterComponent={renderFooter}
//         contentContainerStyle={styles.flatListContent}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f2f5",
//   },
//   flatListContent: {
//     paddingHorizontal: 1,
//     paddingBottom: 20,
//   },
//   seeMoreButton: {
//     backgroundColor: "#003366",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: "center",
//     marginHorizontal: 20,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   seeMoreText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default FeaturedProductSection;


import React, { useEffect } from "react";
import { 
  StyleSheet, 
  FlatList, 
  Alert, 
  TouchableOpacity, 
  Text,
  View,
  ActivityIndicator
} from "react-native";
import FeaturedProduct from "../productCarosel/FeaturedProduct";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFeatureProdRequest } from "@/redux/actions/featureProduct.action";
import { IProduct } from "@/redux/types/FeatureProduct";


const FeaturedProductSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
  } = useSelector((state: RootState) => state.featureProductData);

  console.log("📊 Feature products state:", {
    productsCount: products.length,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore
  });

  useEffect(() => {
    console.log("🔄 Initial fetch - Page 1");
    dispatch(getFeatureProdRequest({
      page: 1,
      limit: 10,
    }));
  }, [dispatch]);

  const handleBuyNow = (productId: number) => {
    router.push({
      pathname: "/oder",
      params: { 
        productId: productId.toString(),
      }
    });
  };

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      console.log(`🔄 Loading page ${nextPage}, current: ${currentPage}, hasMore: ${hasMore}`);
      
      dispatch(getFeatureProdRequest({
        page: nextPage,
        limit: 10,
      }));
    } else {
      console.log(`❌ Can't load more: loading=${loading}, hasMore=${hasMore}`);
    }
  };

  // API data কে FeaturedProduct props এ map করুন
  const renderProductItem = ({ item, index }: { item: IProduct; index: number }) => {
    // Calculate discount price from API data
    let discountedPrice = item.price;
    let discountPercentage = 0;
    
    // Discount calculation based on API response
    if (item.discount_type === 'percentage' && item.discount > 0) {
      discountPercentage = item.discount;
      discountedPrice = item.price - (item.price * item.discount / 100);
    } else if (item.discount_type === 'flat' && item.discount > 0) {
      discountedPrice = item.price - item.discount;
      // Calculate percentage for display
      discountPercentage = Math.round((item.discount / item.price) * 100);
    }
    
    // Get images from API response
    const images: string[] = [];
    
    // First add thumbnail if exists
    if (item.thumbnail) {
      images.push(item.thumbnail);
    }
    
    // Then add other images from Image array
    if (item.Image && item.Image.length > 0) {
      item.Image.forEach((img) => {
        if (img.url && !images.includes(img.url)) {
          images.push(img.url);
        }
      });
    }
    
    // If no images, add placeholder
    if (images.length === 0) {
      images.push('https://via.placeholder.com/200');
    }

    console.log(`📱 Rendering product ${index + 1}: ${item.title.substring(0, 30)}...`);

    return (
      <FeaturedProduct
        id={item.id.toString()}
        productName={item.title}
        originalPrice={item.price}
        discountedPrice={Math.round(discountedPrice)}
        discountPercentage={discountPercentage}
        images={images}
        stock={item.stock}
        onPressBuy={() => handleBuyNow(item.id)}
        onPressAddToCart={() =>
          Alert.alert("Added to Cart", item.title)
        }
        onPressPreOrder={() =>
          Alert.alert("Pre-order", `Pre-ordering: ${item.title}`)
        }
        onPressFavorite={() => Alert.alert("Favorite", `Added ${item.title} to favorites`)}
        onPressView={() => Alert.alert("View Product", `Viewing: ${item.title}`)}
        onPressCompare={() => Alert.alert("Compare", `Adding ${item.title} to compare`)}
      />
    );
  };

  const renderFooter = () => {
    if (loading && products.length > 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#003366" />
          <Text style={styles.loadingText}>Loading more products...</Text>
        </View>
      );
    }
    
    if (!hasMore && products.length > 0) {
      return (
        <View style={styles.endMessage}>
          <Text style={styles.endMessageText}>✨ All products loaded</Text>
        </View>
      );
    }
    
    if (!loading && hasMore && products.length > 0) {
      return (
        <TouchableOpacity 
          style={styles.seeMoreButton}
          onPress={loadMoreProducts}
          activeOpacity={0.8}
        >
          <Text style={styles.seeMoreText}>📦 Load More Products</Text>
        </TouchableOpacity>
      );
    }
    
    return null;
  };

  if (loading && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#003366" />
        <Text style={styles.loadingText}>Loading featured products...</Text>
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ Error loading products</Text>
        <Text style={styles.errorDetail}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            console.log("🔄 Retrying fetch...");
            dispatch(getFeatureProdRequest({ page: 1, limit: 10 }))
          }}
        >
          <Text style={styles.retryButtonText}>🔄 Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (products.length === 0 && !loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>📭 No products found</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => dispatch(getFeatureProdRequest({ page: 1, limit: 10 }))}
        >
          <Text style={styles.retryButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => `product-${item.id}-${item.title}`}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  flatListContent: {
    paddingHorizontal: 1,
    paddingBottom: 20,
    paddingTop: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "#d32f2f",
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorDetail: {
    fontSize: 14,
    color: "#666",
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#003366",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  seeMoreButton: {
    backgroundColor: "#003366",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  seeMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  endMessage: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  endMessageText: {
    fontSize: 14,
    color: "#666",
    fontStyle: 'italic',
  },
});

export default FeaturedProductSection;