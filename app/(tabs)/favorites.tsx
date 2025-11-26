import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Type definition for FavoriteItem
interface FavoriteItemType {
  id: string;
  name: string;
  brand: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
}

// Props interface for FavoriteItem component
interface FavoriteItemProps {
  item: FavoriteItemType;
}

const FavoriteScreen = () => {
  const navigation = useNavigation();

  const favoriteItems: FavoriteItemType[] = [
    {
      id: "1",
      name: "Modern Beige and Brown Diamond\nPattern Tote Bag",
      brand: "Brand: Miss Alita",
      originalPrice: 2800,
      discountedPrice: 1960,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.5scyD0bTOKXAplB4yjbs6wHaEA?pid=Api&P=0&h=220",
    },
    {
      id: "2",
      name: "Leather Crossbody Bag With Gold Hardware",
      brand: "Brand: Luxe Accessories",
      originalPrice: 3200,
      discountedPrice: 2400,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.5scyD0bTOKXAplB4yjbs6wHaEA?pid=Api&P=0&h=220",
    },
    {
      id: "3",
      name: "Vintage Canvas Backpack Water Resistant",
      brand: "Brand: Outdoor Gear",
      originalPrice: 1800,
      discountedPrice: 1350,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.5scyD0bTOKXAplB4yjbs6wHaEA?pid=Api&P=0&h=220",
    },
  ];

  const FavoriteItem = ({ item }: FavoriteItemProps) => (
    <View style={styles.itemContainer}>
      {/* Left Side - Image with Delete Button */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        {/* Delete Icon - Below Image */}
        <TouchableOpacity style={styles.deleteButton}>
          <MaterialIcons name="delete-outline" size={20} color="#FF0000" />
        </TouchableOpacity>
      </View>

      {/* Right Side - Content */}
      <View style={styles.contentContainer}>
        {/* Product Info */}
        <View style={styles.textContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.brand}>{item.brand}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.discountedPrice}>
              {item.discountedPrice} BDT
            </Text>
            <Text style={styles.originalPrice}>{item.originalPrice} BDT</Text>
          </View>
        </View>

        {/* Buttons - Cart Icon and Buy Now */}
        <View style={styles.buttonContainer}>
          {/* Cart Icon Button */}
          <TouchableOpacity style={styles.cartIconButton}>
            <Ionicons name="cart" size={20} color="#007AFF" />
          </TouchableOpacity>

          {/* Buy Now Button - Blue Color */}
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {favoriteItems.map((item) => (
          <FavoriteItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    alignItems: "center",
    marginRight: 12,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#F5E8D4",
  },
  deleteButton: {
    marginTop: 8,
    padding: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  textContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    lineHeight: 18,
    marginBottom: 4,
  },
  brand: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999999",
    textDecorationLine: "line-through",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cartIconButton: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 12,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buyNowText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default FavoriteScreen;