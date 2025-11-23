import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { SearchBar } from "@/components/search/SearchBarNative";
import CustomDropdown from "@/components/button/customDropDownButton.tsx/CustomDropdown";
import HomePage from "@/components/home/ProductCaroselSection";
import FooterUpperSection from "@/components/home/FooterUpperSection";
import FooterQuestionSection from "@/components/home/FooterQuestionSection";
import NewsletterSubscribeCard from "@/components/newsletterSubscribeCard/NewsletterSubscribeCard";
import MobileFooter from "@/components/mobileFooter/MobileFooter";
import FilterModal from "@/components/filterModal/FilterModal";


const Cart = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>("Newer");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  const handleSelect = (item: string) => {
    setSelectedValue(item);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleCloseFilter = () => {
    setFilterModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerheader}>
        <Text>hello</Text>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 23 }}
      >
        <View style={styles.homeContent}>
          <TouchableOpacity>
            <Text style={styles.homeTxt}>Home /</Text>
          </TouchableOpacity>
          <Text style={styles.cattxt}>Category</Text>
        </View>
        
        <View style={styles.allcontainer}>
          <Text style={styles.cattxt}>All Products</Text>
        </View>
        
        <View style={styles.dropdutton}>
          <View>
            <Text style={styles.cattxt}>Sort By</Text>
          </View>
          <CustomDropdown
            data={["Newer", "Older", "Popular","Low to High Price","High To Low Price"]}
            onSelect={handleSelect}
            selectedValue={selectedValue}
            showShadow={true}
            shadowStyle={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 6,
            }}
          />
        </View>

        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={handleFilterPress} 
            placeholder="Search products..."
          />
        </View>

        <HomePage />
        <HomePage />

        <FooterUpperSection />
        <FooterQuestionSection />

        <SafeAreaView style={styles.Featcontainer}>
          <NewsletterSubscribeCard />
        </SafeAreaView>
        
        <SafeAreaView style={styles.Featcontainer}>
          <MobileFooter />
        </SafeAreaView>
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal 
        visible={filterModalVisible} 
        onClose={handleCloseFilter} 
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerheader: {
    height: "10%",
    width: "100%",
    backgroundColor: "rgb(0, 48, 132)",
  },
  homeContent: {
    padding: 20,
    flexDirection: "row",
  },
  homeTxt: {
    color: "green",
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "500",
  },
  cattxt: {
    fontSize: 15,
    fontWeight: "500",
  },
  allcontainer: {
    paddingHorizontal: 20,
  },
  dropdutton: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  Featcontainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});