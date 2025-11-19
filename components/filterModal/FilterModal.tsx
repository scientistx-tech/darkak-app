// FilterModal.tsx
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity,
  ScrollView,
  SafeAreaView 
} from 'react-native'
import React from 'react'

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Content */}
          <ScrollView style={styles.filterContent}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            {/* Add your filter options here */}
            <Text style={styles.sectionTitle}>Categories</Text>
            {/* Add your filter options here */}
            <Text style={styles.sectionTitle}>Brand</Text>
            {/* Add your filter options here */}
          </ScrollView>

         
        </View>
      </View>
    </Modal>
  )
}

export default FilterModal

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalContent: {
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  resetButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  resetText: {
    color: '#333',
    fontWeight: '500',
  },
  applyButton: {
    padding: 15,
    backgroundColor: 'rgb(0, 48, 132)',
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  applyText: {
    color: 'white',
    fontWeight: '500',
  },
})