import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface ProductData {
  specification: string;
  description: string;
  warranty: string;
}

interface SimpleProductDetailsTabsProps {
  productData?: Partial<ProductData>;
}

const AnimatedProductDetailsTabs: React.FC<SimpleProductDetailsTabsProps> = ({
  productData = {},
}) => {
  const [activeTab, setActiveTab] = useState<
    "description" | "specification" | "warranty"
  >("description");

  const defaultProductData: ProductData = {
    specification: `Warranty Type: darkak (7 days)
Material: Premium Quilted Fabric
Color: Brown
Dimensions: 12" x 8" x 4"
Closure: Zipper
Compartments: Main section, inner pocket
Strap: Adjustable shoulder strap`,

    description: `Elevate your style with this chic brown shoulder bag featuring a quilted design. Crafted with premium materials and attention to detail, this bag combines functionality with fashion.`,

    warranty: `7-day warranty provided by darkak
Covers manufacturing defects
Warranty starts from purchase date`,
  };

  const mergedProductData: ProductData = {
    ...defaultProductData,
    ...productData,
  };

  const handleTabPress = (
    tab: "description" | "specification" | "warranty"
  ) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    let content = "";
    switch (activeTab) {
      case "description":
        content = mergedProductData.description;
        break;
      case "specification":
        content = mergedProductData.specification;
        break;
      case "warranty":
        content = mergedProductData.warranty;
        break;
    }

    return (
      <View style={styles.contentContainer}>
        <ScrollView>
          <Text style={styles.contentText}>{content}</Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "description" && styles.activeTab]}
          onPress={() => handleTabPress("description")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "description" && styles.activeTabText,
            ]}
          >
            Description
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "specification" && styles.activeTab,
          ]}
          onPress={() => handleTabPress("specification")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "specification" && styles.activeTabText,
            ]}
          >
            Specification
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "warranty" && styles.activeTab]}
          onPress={() => handleTabPress("warranty")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "warranty" && styles.activeTabText,
            ]}
          >
            Warranty
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minHeight: 200,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  contentContainer: {
    padding: 16,
    minHeight: 120,
    maxHeight: 200,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
});

export default AnimatedProductDetailsTabs;
