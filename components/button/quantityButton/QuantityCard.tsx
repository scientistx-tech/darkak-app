import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface QuantitySelectorProps {
  initial?: number;
  onChange?: (value: number) => void;
  disAble?: boolean;
}

const QuantityCard: React.FC<QuantitySelectorProps> = ({
  initial = 1,
  onChange,
  disAble = false,
}) => {
  const [quantity, setQuantity] = React.useState(initial);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange?.(newQuantity);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, disAble && styles.buttonDisabled]}
        onPress={handleDecrease}
        disabled={disAble || quantity <= 1}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity
        style={[styles.button, disAble && styles.buttonDisabled]}
        onPress={handleIncrease}
        disabled={disAble}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 6,
    padding: 4,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  button: {
    width: 28,
    height: 28,
    backgroundColor: "#003366",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
  },
});

export default QuantityCard;