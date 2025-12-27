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
import { INewArrivalProduct } from '@/redux/types/NewArrivalProduct';
import NewArrivalProduct from '../productCarosel/NewArrivalProduct';
import { RootState } from '@/redux/store';
import { useRouter } from 'expo-router';
import { clearNewArrivalProducts, getNewArrivalProdRequest } from '@/redux/actions/newArrivalProduct.action';

const NewArrivalProductSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  
  const isLoadingMore = useRef(false);
  const hasCalledInitialFetch = useRef(false);
  
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    totalProducts
  } = useSelector((state: RootState) => state.newArrivalProductData);

  // Initial load
  useEffect(() => {
    if (!hasCalledInitialFetch.current) {
      console.log('🆕 Initial fetch - New Arrival Page 1');
      hasCalledInitialFetch.current = true;
      
      dispatch(getNewArrivalProdRequest({
        page: 1,
        limit: 10,
      }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      isLoadingMore.current = false;
    }
  }, [loading]);

  const handleRefresh = useCallback(() => {
    console.log('🔃 Refreshing new arrival products');
    setRefreshing(true);
    hasCalledInitialFetch.current = false;
    isLoadingMore.current = false;
    
    dispatch(clearNewArrivalProducts());
    
    setTimeout(() => {
      dispatch(getNewArrivalProdRequest({
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

  const handlePressBuy = (product: INewArrivalProduct) => {
    router.push({
      pathname: "/oder",
      params: { 
        productId: product.id.toString(),
      }
    });
  };

  const handlePressAddToCart = (product: INewArrivalProduct) => {
    Alert.alert("Added to Cart", product.title);
  };

  const handlePressFavorite = (product: INewArrivalProduct) => {
    Alert.alert("Favorite", `Added ${product.title} to favorites`);
  };

  const renderProductItem = ({ item }: { item: INewArrivalProduct }) => {
    const getImages = () => {
      const images: string[] = [];
      
      if (item.thumbnail && item.thumbnail.trim() !== '') {
        images.push(item.thumbnail);
      }
      
      if (item.Image?.length > 0) {
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
      <NewArrivalProduct
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

  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore.current) return;
    if (loading || !hasMore || currentPage >= totalPages) return;

    const nextPage = currentPage + 1;
    console.log(`🔄 Loading page ${nextPage}/${totalPages}`);
    
    isLoadingMore.current = true;
    
    dispatch(getNewArrivalProdRequest({
      page: nextPage,
      limit: 10,
    }));
  }, [loading, hasMore, currentPage, totalPages, dispatch]);

  const renderFooter = () => {
    if (loading && products.length > 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#003366" />
          <Text style={styles.loadingText}>Loading more new arrivals...</Text>
        </View>
      );
    }
    
    if (hasMore && !loading && products.length > 0) {
      return (
        <TouchableOpacity 
          style={styles.seeMoreButton}
          onPress={loadMoreProducts}
          activeOpacity={0.8}
        >
          <Text style={styles.seeMoreText}>📦 Load More (Page {currentPage + 1}/{totalPages})</Text>
        </TouchableOpacity>
      );
    }
    
    if (!hasMore && products.length > 0) {
      return (
        <View style={styles.endMessage}>
          <Text style={styles.endMessageText}>
            {totalProducts > 0 
              ? `✨ Showing ${products.length} of ${totalProducts} new arrivals` 
              : '✨ All new arrivals loaded'}
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
        <Text style={styles.loadingText}>Loading new arrival products...</Text>
      </View>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ Error loading new arrivals</Text>
        <Text style={styles.errorDetail}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            hasCalledInitialFetch.current = false;
            isLoadingMore.current = false;
            dispatch(getNewArrivalProdRequest({ 
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
        <Text style={styles.emptyText}>📭 No new arrival products found</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            dispatch(getNewArrivalProdRequest({ 
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🆕 New Arrivals</Text>
        <Text style={styles.headerSubtitle}>Freshly added products</Text>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => `new-arrival-${item.id}`}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#003366"]}
            tintColor="#003366"
          />
        }
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

export default NewArrivalProductSection;