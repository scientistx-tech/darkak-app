import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

interface QuantitySelectorProps {
  initial?: number;
  onChange?: (value: number) => void;
  disAble?: boolean;
}

const Quantity: React.FC<QuantitySelectorProps> = ({
  initial = 1,
  onChange,
}) => {
  const [qty, setQty] = useState(initial);

  const updateQty = (value: number) => {
    const newValue = Math.max(1, value);
    setQty(newValue);
    onChange?.(newValue);
  };

  return (
    <View style={styles.wrapper}>
      {/* Minus */}
      <TouchableOpacity
        style={styles.section}
        onPress={() => updateQty(qty - 1)}
      >
        <Text style={styles.btnText}>-</Text>
      </TouchableOpacity>

      {/* Middle Number */}
      <View style={styles.sectionCenter}>
        <Text style={styles.centerText}>{qty}</Text>
      </View>

      {/* Plus */}
      <TouchableOpacity
        style={styles.section}
        onPress={() => updateQty(qty + 1)}
      >
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quantity;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#003A92",
    borderRadius: 8,
    overflow: "hidden",
    width:'29%'
  },
  section: {
    width: 40,
    height: 40,
    backgroundColor: "#003A92",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionCenter: {
    width: 45,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  centerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
