<<<<<<< HEAD
import { decrement, increment } from "@/redux/actions/counter.actions";
import { RootState } from "@/redux/store";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
=======
// components/button/quantityButton/QuantityButton.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
>>>>>>> 33233d9b6d3106c261911d2a5a8e6b10c46be77f

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
<<<<<<< HEAD
  //const [quantity, setQuantity] = React.useState(initial);

  const dispatch = useDispatch();
  const quantity = useSelector((state:RootState) => state.counter.value);

  const handleDecrease = () => {
    // if (quantity > 1) {
    //   const newQuantity = quantity - 1;
    //   setQuantity(newQuantity);
    //   onChange?.(newQuantity);
    // }
    dispatch(decrement())
  };

  const handleIncrease = () => {
    // const newQuantity = quantity + 1;
    // setQuantity(newQuantity);
    // onChange?.(newQuantity);
    dispatch(increment());
  };

  console.log("increment:::::--->",handleIncrease);
  console.log("decrement:::------>",handleDecrease);

=======
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

>>>>>>> 33233d9b6d3106c261911d2a5a8e6b10c46be77f
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

<<<<<<< HEAD
export default QuantityCard;
=======
export default QuantityCard;
>>>>>>> 33233d9b6d3106c261911d2a5a8e6b10c46be77f
