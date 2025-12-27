import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ITodaysDealProduct } from '@/redux/types/TodaysDealProduct';
import TodaysDealProduct from '../productCarosel/TodaysDealProduct'; 
import { RootState } from '@/redux/store';
import { useRouter } from 'expo-router';
import { clearTodaysDealProducts, getTodaysDealProdRequest } from '@/redux/actions/todaysdeal.action';


const TodaysDealProductSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  
  // Refs to prevent duplicate API calls
  const isLoadingMore = useRef(false);
  const hasCalledInitialFetch = useRef(false);
  
  // Redux state
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    totalProducts
  } = useSelector((state: RootState) => state.todaysDealProductData);

  const thum = useSelector((state: RootState) => state.todaysDealProductData.products);
  console.log("all of the thumnail:::----->",thum)

  console.log("📊 Today's Deal state:", {
    productsCount: products.length,
    loading,
    currentPage,
    totalPages,
    hasMore,
    isLoadingMore: isLoadingMore.current
  });

  // Initial load - শুধু একবার
  useEffect(() => {
    if (!hasCalledInitialFetch.current) {
      console.log('🔥 Initial fetch - Today\'s Deal Page 1');
      hasCalledInitialFetch.current = true;
      
      dispatch(getTodaysDealProdRequest({
        page: 1,
        limit: 10,
      }));
    }
  }, [dispatch]);

  // Reset loading flag when loading completes
  useEffect(() => {
    if (!loading) {
      isLoadingMore.current = false;
    }
  }, [loading]);

  const handleRefresh = useCallback(() => {
    console.log('🔃 Refreshing today\'s deal products');
    setRefreshing(true);
    hasCalledInitialFetch.current = false;
    isLoadingMore.current = false;
    
    dispatch(clearTodaysDealProducts());
    
    setTimeout(() => {
      dispatch(getTodaysDealProdRequest({
        page: 1,
        limit: 10,
      }));
      setRefreshing(false);
    }, 500);
  }, [dispatch]);

  const handleProductPress = (productId: string | number) => {
    const id = typeof productId === 'number' ? productId.toString() : productId;
    router.push(`/product/${id}`);
  };

  const handlePressBuy = (product: ITodaysDealProduct) => {
    router.push({
      pathname: "/oder",
      params: { 
        productId: product.id.toString(),
      }
    });
  };

  const handlePressAddToCart = (product: ITodaysDealProduct) => {
    Alert.alert("Added to Cart", product.title);
  };

  const handlePressFavorite = (product: ITodaysDealProduct) => {
    Alert.alert("Favorite", `Added ${product.title} to favorites`);
  };

  const renderProductItem = ({ item, index }: { item: ITodaysDealProduct; index: number }) => {
    const getImages = () => {
      const images: string[] = [];
      
      if (item.thumbnail && item.thumbnail.trim() !== '') {
        images.push(item.thumbnail);
      }
      
      if (item.Image && item.Image.length > 0) {
        item.Image.forEach((img) => {
          if (img.url && !images.includes(img.url)) {
            images.push(img.url);
          }
        });
      }
      
      if (images.length === 0) {
        images.push('https://via.placeholder.com/200');
      }
      
      return images;
    };

    let discountedPrice = item.price;
    let discountPercentage = 0;
    
    if (item.discount_type === 'percentage' && item.discount > 0) {
      discountPercentage = item.discount;
      discountedPrice = Math.round(item.price - (item.price * item.discount / 100));
    } else if (item.discount_type === 'flat' && item.discount > 0) {
      discountedPrice = item.price - item.discount;
      discountPercentage = Math.round((item.discount / item.price) * 100);
    }

    const images = getImages();

    return (
      <TodaysDealProduct
        id={item.id.toString()}
        productName={item.title}
        originalPrice={item.price}
        discountedPrice={discountedPrice}
        discountPercentage={discountPercentage}
        images={images}
        stock={item.stock}
        onPressBuy={() => handlePressBuy(item)}
        onPressAddToCart={() => handlePressAddToCart(item)}
        onPressPreOrder={() => handlePressBuy(item)}
        onPressFavorite={() => handlePressFavorite(item)}
        onPressView={() => handleProductPress(item.id)}
        onPressCompare={() => Alert.alert("Compare", `Adding ${item.title} to compare`)}
      />
    );
  };


  

  // ✅ IMPROVED: Better load more logic
  const loadMoreProducts = useCallback(() => {
    // Prevent multiple simultaneous calls
    if (isLoadingMore.current) {
      console.log('⏳ Already loading more, skipping...');
      return;
    }

    // Check if we can load more
    if (loading || !hasMore || currentPage >= totalPages) {
      console.log(`❌ Cannot load more: loading=${loading}, hasMore=${hasMore}, currentPage=${currentPage}/${totalPages}`);
      return;
    }

    const nextPage = currentPage + 1;
    console.log(`🔄 Loading page ${nextPage}/${totalPages}`);
    
    // Set flag to prevent duplicate calls
    isLoadingMore.current = true;
    
    dispatch(getTodaysDealProdRequest({
      page: nextPage,
      limit: 10,
    }));
  }, [loading, hasMore, currentPage, totalPages, dispatch]);

  const renderFooter = () => {
    // Loading indicator for pagination
    if (loading && products.length > 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#003366" />
          <Text style={styles.loadingText}>Loading more deals...</Text>
        </View>
      );
    }
    
    // Load More Button - যখন আরো products আছে
    if (hasMore && !loading && products.length > 0) {
      return (
        <TouchableOpacity 
          style={styles.seeMoreButton}
          onPress={loadMoreProducts}
          activeOpacity={0.8}
        >
          <Text style={styles.seeMoreText}>📦 Load More Deals (Page {currentPage + 1}/{totalPages})</Text>
        </TouchableOpacity>
      );
    }
    
    // End of list message
    if (!hasMore && products.length > 0) {
      return (
        <View style={styles.endMessage}>
          <Text style={styles.endMessageText}>
            {totalProducts > 0 
              ? `✨ Showing ${products.length} of ${totalProducts} deals` 
              : '✨ All deals loaded'}
          </Text>
        </View>
      );
    }
    
    return null;
  };

  // Initial loading state
  if (loading && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#003366" />
        <Text style={styles.loadingText}>Loading todays deals...</Text>
      </View>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ Error loading deals</Text>
        <Text style={styles.errorDetail}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            hasCalledInitialFetch.current = false;
            isLoadingMore.current = false;
            dispatch(getTodaysDealProdRequest({ 
              page: 1, 
              limit: 10
            }));
          }}
        >
          <Text style={styles.retryButtonText}>🔄 Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Empty state
  if (products.length === 0 && !loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>📭 No deals found for today</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            dispatch(getTodaysDealProdRequest({ 
              page: 1, 
              limit: 10
            }));
          }}
        >
          <Text style={styles.retryButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 Todays Deals</Text>
        <Text style={styles.headerSubtitle}>Limited time offers & discounts</Text>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item, index) => `todays-deal-${item.id}-${index}`}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        
        // ✅ REMOVED: onEndReached - এখন manual button দিয়ে load করবে
        
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#003366"]}
            tintColor="#003366"
          />
        }
        
        // ✅ Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  flatListContent: {
    paddingHorizontal: 1,
    paddingBottom: 20,
    paddingTop: 10,
    minHeight: 100,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
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

export default TodaysDealProductSection;
