import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface QuantitySelectorProps {
  initial?: number;
  onChange?: (value: number) => void;
  disAble?:boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ initial = 1, onChange }) => {
  const [qty, setQty] = useState(initial);

  const updateQty = (value: number) => {
    const newValue = Math.max(1, value);
    setQty(newValue);
    onChange?.(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quantity</Text>

      <View style={styles.box}>
        {/* Minus Button */}
        <TouchableOpacity
          style={styles.sideBtn}
          onPress={() => updateQty(qty - 1)}
        >
          <Text style={styles.sideBtnText}>-</Text>
        </TouchableOpacity>

        {/* Middle Number */}
        <View style={styles.centerBox}>
          <Text style={styles.centerText}>{qty}</Text>
        </View>

        {/* Plus Button */}
        <TouchableOpacity
          style={styles.sideBtn}
          onPress={() => updateQty(qty + 1)}
        >
          <Text style={styles.sideBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuantitySelector;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    overflow: "hidden",
  },
  sideBtn: {
    width: 45,
    height: 45,
    backgroundColor: "#003A92",
    justifyContent: "center",
    alignItems: "center",
  },
  sideBtnText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  centerBox: {
    width: 50,
    height: 45,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
