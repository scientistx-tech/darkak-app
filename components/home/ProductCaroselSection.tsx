// import React from "react";
// import { StyleSheet, FlatList, Alert, Text } from "react-native";
// import ProductCaosel from "../productCarosel/ProductCaosel";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { PRODUCTS_DATA } from "@/data/mock-data";
// //import ProductCard from './ProductCard'; // Adjust the import path as needed



// const HomePage = () => {
//   return (
//     // <View style={{ flex: 1 }}>
//       <FlatList
//         data={PRODUCTS_DATA}
//         numColumns={2}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <ProductCaosel
//           id={item.id}
//             productName={item.productName}
//             originalPrice={item.originalPrice}
//             discountedPrice={item.discountedPrice}
//             discountPercentage={item.discountPercentage}
//             images={item.images}
//             stock={item.stock}
//             onPressBuy={() => Alert.alert("Buying:", item.productName)}
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
//       />
//     // </View>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f2f5",
//   },
//   flatListContent: {
//     paddingHorizontal: 2, // Add padding to the FlatList content
//   },
// });

// export default HomePage;

import React from "react";
import { StyleSheet, FlatList, Alert } from "react-native";
import ProductCaosel from "../productCarosel/ProductCaosel";
import { PRODUCTS_DATA } from "@/data/mock-data";

const HomePage = () => {
  return (
    <FlatList
      data={PRODUCTS_DATA}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCaosel
          id={item.id} // নতুন prop যোগ করুন
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