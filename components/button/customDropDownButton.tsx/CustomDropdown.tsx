import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ListRenderItem,
} from 'react-native';

interface CustomDropdownProps {
  data?: string[];
  onSelect: (item: string) => void;
  placeholder?: string;
  selectedValue?: string;
  // Container Styles
  containerStyle?: ViewStyle;
  // Dropdown Button Styles
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  arrowStyle?: TextStyle;
  // Dropdown List Styles
  listStyle?: ViewStyle;
  listContainerStyle?: ViewStyle;
  // Item Styles
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  selectedItemStyle?: ViewStyle;
  selectedItemTextStyle?: TextStyle;
  // Modal Styles
  modalStyle?: ViewStyle;
  overlayStyle?: ViewStyle;
  // Shadow Props
  showShadow?: boolean;
  shadowStyle?: ViewStyle;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data = [],
  onSelect,
  placeholder = "Select an option",
  selectedValue,
  containerStyle,
  buttonStyle,
  buttonTextStyle,
  arrowStyle,
  listStyle,
  listContainerStyle,
  itemStyle,
  itemTextStyle,
  selectedItemStyle,
  selectedItemTextStyle,
  modalStyle,
  overlayStyle,
  showShadow = true,
  shadowStyle,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleSelect = (item: string) => {
    onSelect(item);
    setVisible(false);
  };

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        itemStyle,
        selectedValue === item && [styles.selectedItem, selectedItemStyle]
      ]}
      onPress={() => handleSelect(item)}
    >
      <Text style={[
        styles.dropdownItemText,
        itemTextStyle,
        selectedValue === item && [styles.selectedItemText, selectedItemTextStyle]
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          showShadow && styles.buttonShadow,
          shadowStyle,
          buttonStyle,
        ]}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.dropdownButtonText, buttonTextStyle]}>
          {selectedValue || placeholder}
        </Text>
        <Text style={[styles.arrow, arrowStyle]}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={[styles.modalOverlay, overlayStyle]}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.modalContent, modalStyle]}>
            <View style={[
              styles.dropdownList,
              styles.listShadow,
              listContainerStyle
            ]}>
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                style={[styles.list, listStyle]}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
    minWidth: 150,
  },
  buttonShadow: {
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Android Shadow
    elevation: 3,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  arrow: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
  },
  dropdownList: {
    backgroundColor: 'white',
    borderRadius: 8,
    maxHeight: 300,
  },
  listShadow: {
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // Android Shadow
    elevation: 8,
  },
  list: {
    borderRadius: 8,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 48, 132, 0.1)',
  },
  selectedItemText: {
    color: 'rgb(0, 48, 132)',
    fontWeight: '500',
  },
});

export default CustomDropdown;