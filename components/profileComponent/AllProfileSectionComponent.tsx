// import React, { useState } from "react";
// import { TouchableOpacity, Text, StyleSheet } from "react-native";
// import {
//   Ionicons,
//   Feather,
//   MaterialIcons,
//   Entypo,
//   FontAwesome,
// } from "@expo/vector-icons";

// type IconLibrary = "ion" | "feather" | "material" | "entypo" | "fa";

// const iconSets: Record<IconLibrary, any> = {
//   ion: Ionicons,
//   feather: Feather,
//   material: MaterialIcons,
//   entypo: Entypo,
//   fa: FontAwesome,
// };

// type Props = {
//   title: string;
//   iconName: string; // dynamic name allowed
//   iconLib: IconLibrary;
//   onPress?: () => void;
//   isActive?:boolean;
// };



// const CustomButtonRow = ({ title, iconName, iconLib, onPress,isActive }: Props) => {
//   const [pressed, setPressed] = useState(false);

//   const Icon = iconSets[iconLib];

//   return (
//     <TouchableOpacity
//       onPress={() => {
//         setPressed(!pressed);
//         onPress && onPress();
//       }}
//       activeOpacity={0.7}
//       style={[
//         styles.container,
//         { backgroundColor: pressed ? "#D5E4FF" : "#EAF1FF" },
//       ]}
//     >
//       <Icon name={iconName as any} size={20} color="#000" style={styles.icon} />
//       <Text style={styles.title}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// export default CustomButtonRow;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 13,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   icon: {
//     marginRight: 12,
//   },
//   title: {
//     fontSize: 16,
//     color: "#000",
//   },
// });

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

type IconLibrary = "ion" | "feather" | "material" | "entypo" | "fa";

const iconSets: Record<IconLibrary, any> = {
  ion: Ionicons,
  feather: Feather,
  material: MaterialIcons,
  entypo: Entypo,
  fa: FontAwesome,
};

type Props = {
  title: string;
  iconName: string; // dynamic name allowed
  iconLib: IconLibrary;
  onPress?: () => void;
  isActive?: boolean;
};

const CustomButtonRow = ({ title, iconName, iconLib, onPress, isActive }: Props) => {
  const Icon = iconSets[iconLib];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        isActive ? styles.activeContainer : styles.inactiveContainer
      ]}
    >
      <Icon 
        name={iconName as any} 
        size={20} 
        color={isActive ? "#007AFF" : "#000"} 
        style={styles.icon} 
      />
      <Text style={[
        styles.title,
        isActive ? styles.activeTitle : styles.inactiveTitle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButtonRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
  },
  activeContainer: {
    backgroundColor: "#EAF1FF", 
    borderColor: "#007AFF", 
  },
  inactiveContainer: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0", 
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  activeTitle: {
    color: "#007AFF", 
  },
  inactiveTitle: {
    color: "#666666", 
  },
});