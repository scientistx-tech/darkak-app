import React from 'react';
import {  StyleSheet, FlatList, Alert, Text } from 'react-native';
import ProductCaosel from '../productCarosel/ProductCaosel';
import { SafeAreaView } from "react-native-safe-area-context";
//import ProductCard from './ProductCard'; // Adjust the import path as needed

// Dummy data for products
const PRODUCTS_DATA = [
  {
    id: '1',
    productName: 'Stainless Steel Watch',
    originalPrice: 16500,
    discountedPrice: 11550,
    discountPercentage: 30,
    images: [
      'https://tse4.mm.bing.net/th/id/OIP.5scyD0bTOKXAplB4yjbs6wHaEA?pid=Api&P=0&h=220', // Replace with your image URLs
      'https://tse3.mm.bing.net/th/id/OIP.j37UzeTcUGVhpTT2E-JmUwHaJ1?pid=Api&P=0&h=220',
      'https://tse4.mm.bing.net/th/id/OIP.ZgDJxBUqLB-4W73S6cHh0AHaJ4?pid=Api&P=0&h=220',
    ],
  },
  {
    id: '2',
    productName: 'womens Bag',
    originalPrice: 25000,
    discountedPrice: 20000,
    discountPercentage: 20,
    images: [
      'https://static.vecteezy.com/system/resources/previews/019/027/714/non_2x/handbag-illustration-for-graphic-design-and-decorative-element-vector.jpg',
      'https://preview.redd.it/gucci-tote-bag-link-in-cmment-v0-4f586d24srsc1.png?width=651&format=png&auto=webp&s=183dfd04519789c49063fa73478fefcb7d32c5c2',
    ],
  },
  {
    id: '3',
    productName: 'Elegant Omega Seamaster Diver 300M Black Dial Watch',
    originalPrice: 18000,
    discountedPrice: 15300,
    discountPercentage: 15,
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6c16f0171396113.646f4f9b52e9d.png',
      'https://i.etsystatic.com/49106964/r/il/794684/5795737082/il_fullxfull.5795737082_22sy.jpg',
    ],
  },
  {
    id: '4',
    productName: 'Sporty Casio G-Shock GA-2100 Carbon Core Guard Watch',
    originalPrice: 5000,
    discountedPrice: 4000,
    discountPercentage: 20,
    images: [
      'https://static-01.daraz.com.bd/p/b7e34c0c88471af29832862d68b74341.jpg',
      'https://img.freepik.com/vecteurs-premium/hudi_804951-25.jpg',
    ],
  },
  {
    id: '5',
    productName: 'Luxurious Patek Philippe Calatrava White Gold Dress Watch',
    originalPrice: 50000,
    discountedPrice: 45000,
    discountPercentage: 10,
    images: [
      'https://tse2.mm.bing.net/th/id/OIP.1L3phwDLuMs5dt8kSiBt4gHaNK?pid=Api&P=0&h=220',
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png',
    ],
  },
  {
    id: '6',
    productName: 'Fashionable Apple Watch Series 7 Midnight Aluminum Case',
    originalPrice: 12000,
    discountedPrice: 10800,
    discountPercentage: 10,
    images: [
      'https://tse2.mm.bing.net/th/id/OIP.qnsjSN9pFcbMMkHIZvKeVQHaDt?pid=Api&P=0&h=220',
      'https://cdn.powerofpositivity.com/wp-content/uploads/2022/09/10-Reasons-Why-Some-Women-Stay-Single-1536x864.jpg',
    ],
  },
];

const HomePage: React.FC = () => {
  const handlePreOrder = () => {
    Alert.alert('Pre Order', 'Pre-order button pressed!');
  };

  const handleFavorite = () => {
    Alert.alert('Favorite', 'Favorite button pressed!');
  };

  const handleView = () => {
    Alert.alert('View', 'View button pressed!');
  };

  const handleCompare = () => {
    Alert.alert('Compare', 'Compare button pressed!');
  };

  const renderProductCard = ({ item }: { item: typeof PRODUCTS_DATA[0] }) => (
    <ProductCaosel
      productName={item.productName}
      originalPrice={item.originalPrice}
      discountedPrice={item.discountedPrice}
      discountPercentage={item.discountPercentage}
      images={item.images}
      onPressPreOrder={handlePreOrder}
      onPressFavorite={handleFavorite}
      onPressView={handleView}
      onPressCompare={handleCompare}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
     
      <FlatList
        data={PRODUCTS_DATA}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2} // This is the key to two cards per row
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  flatListContent: {
    paddingHorizontal: 2, // Add padding to the FlatList content
  },
});

export default HomePage;