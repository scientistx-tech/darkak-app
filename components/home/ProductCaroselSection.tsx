import React from "react";
import { StyleSheet, FlatList, Alert } from "react-native";
import ProductCaosel from "../productCarosel/ProductCaosel";
import { PRODUCTS_DATA } from "@/data/mock-data";
import { useLocalSearchParams, useRouter } from "expo-router";

const HomePage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const handleBuyNow = (productId: string) => {
    const product = PRODUCTS_DATA.find((item) => item.id === productId);
    if (product) {
      router.push({
        pathname: "/oder",
        params: { 
          productId: product.id,
        }
      });
    }
  };

  return (
    <FlatList
      data={PRODUCTS_DATA}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCaosel
          id={item.id} 
          productName={item.productName}
          originalPrice={item.originalPrice}
          discountedPrice={item.discountedPrice}
          discountPercentage={item.discountPercentage}
          images={item.images}
          stock={item.stock}
          onPressBuy={() => handleBuyNow(item.id)}
          onPressAddToCart={() =>
            Alert.alert("Added to Cart:", item.productName)
          }
          onPressPreOrder={() =>
            Alert.alert("Pre-ordering:", item.productName)
          }
          onPressFavorite={() => Alert.alert("Favorite:", item.productName)}
          onPressView={() => Alert.alert("Viewing:", item.productName)}
          onPressCompare={() => Alert.alert("Comparing:", item.productName)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  flatListContent: {
    paddingHorizontal: 2,
  },
});

export default HomePage;