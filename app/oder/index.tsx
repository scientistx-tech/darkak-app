import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { PRODUCTS_DATA } from '@/data/mock-data';
import { SafeAreaView } from "react-native-safe-area-context";
import NewsletterSubscribeCard from '@/components/newsletterSubscribeCard/NewsletterSubscribeCard';
import MobileFooter from '@/components/mobileFooter/MobileFooter';

const OrderPage = () => {
  const { productId, quantity } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [couponCode, setCouponCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Modal states
  const [divisionModalVisible, setDivisionModalVisible] = useState(false);
  const [districtModalVisible, setDistrictModalVisible] = useState(false);

  // Customer Information States
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    division: '',
    district: '',
    address: '',
  });

  // Bangladesh Divisions and Districts
  const divisions = [
    'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 
    'Sylhet', 'Rangpur', 'Mymensingh'
  ];

  const districts: { [key: string]: string[] } = {
    Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Manikganj', 'Narsingdi', 'Kishoreganj'],
    Chattogram: ['Chattogram', 'Coxs Bazar', 'Rangamati', 'Bandarban', 'Khagrachhari', 'Feni', 'Noakhali'],
    Rajshahi: ['Rajshahi', 'Bogra', 'Pabna', 'Sirajganj', 'Naogaon', 'Natore', 'Chapainawabganj'],
    Khulna: ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat', 'Jhenaidah', 'Magura', 'Narail'],
    Barishal: ['Barishal', 'Patuakhali', 'Bhola', 'Jhalokati', 'Pirojpur', 'Barguna'],
    Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
    Rangpur: ['Rangpur', 'Dinajpur', 'Nilphamari', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Thakurgaon'],
    Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
  };

  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (productId) {
      const foundProduct = PRODUCTS_DATA.find(item => item.id === productId);
      setProduct(foundProduct);
    }
    if (quantity) {
      setSelectedQuantity(Number(quantity));
    }
  }, [productId, quantity]);

  useEffect(() => {
    if (customerInfo.division && districts[customerInfo.division]) {
      setAvailableDistricts(districts[customerInfo.division]);
    } else {
      setAvailableDistricts([]);
    }
  }, [customerInfo.division]);

  const handlePlaceOrder = () => {
    // Validation
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.division || 
        !customerInfo.district || !customerInfo.address) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to Terms and Conditions');
      return;
    }

    Alert.alert(
      'Order Placed Successfully!',
      `Your order for ${selectedQuantity} x ${product?.productName} has been placed.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const calculateSubtotal = () => {
    if (product) {
      return product.discountedPrice * selectedQuantity;
    }
    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + 120; // 120 BDT delivery charge
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === '') {
      Alert.alert('Error', 'Please enter a coupon code');
      return;
    }
    Alert.alert('Coupon Applied', 'Your coupon has been applied successfully!');
  };

  const selectDivision = (division: string) => {
    setCustomerInfo({
      ...customerInfo,
      division: division,
      district: '' // Reset district when division changes
    });
    setDivisionModalVisible(false);
  };

  const selectDistrict = (district: string) => {
    setCustomerInfo({
      ...customerInfo,
      district: district
    });
    setDistrictModalVisible(false);
  };

  const increaseQuantity = () => {
    setSelectedQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(prev => prev - 1);
    }
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        
        {/* Payment Method Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <TouchableOpacity 
            style={[
              styles.paymentOption,
              paymentMethod === 'cod' && styles.paymentOptionSelected
            ]}
            onPress={() => setPaymentMethod('cod')}
          >
            <View style={styles.radioContainer}>
              <View style={[
                styles.radio,
                paymentMethod === 'cod' && styles.radioSelected
              ]}>
                {paymentMethod === 'cod' && <View style={styles.radioInner} />}
              </View>
            </View>
            <Text style={styles.paymentText}>Cash on Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.paymentOption,
              paymentMethod === 'online' && styles.paymentOptionSelected
            ]}
            onPress={() => setPaymentMethod('online')}
          >
            <View style={styles.radioContainer}>
              <View style={[
                styles.radio,
                paymentMethod === 'online' && styles.radioSelected
              ]}>
                {paymentMethod === 'online' && <View style={styles.radioInner} />}
              </View>
            </View>
            <Text style={styles.paymentText}>Online Payment</Text>
          </TouchableOpacity>

          {/* Payment Method Specific Help Line - Billing Details এর উপরে */}
          <View style={styles.helpLineContainer}>
            <View style={styles.helpLineCard}>
              <MaterialIcons name="support-agent" size={20} color="#003366" />
              <Text style={styles.helpLineText}>
                {paymentMethod === 'online' 
                  ? 'অনলাইন পেমেন্ট সংক্রান্ত সহায়তার জন্য হেল্পলাইন - 01711726501'
                  : 'অর্ডার সংক্রান্ত যেকোনো প্রয়োজনে কথা বলুন আমাদের কাস্টমার সার্ভিস প্রতিনিধির সাথে - 01711726501'
                }
              </Text>
            </View>
          </View>

          <View style={styles.divider} />
        </View>

        {/* Billing Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing Details</Text>
          
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Full Name<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={customerInfo.fullName}
              onChangeText={(text) => setCustomerInfo({...customerInfo, fullName: text})}
              placeholder="Full Name"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={customerInfo.email}
              onChangeText={(text) => setCustomerInfo({...customerInfo, email: text})}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Phone Number<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={customerInfo.phone}
              onChangeText={(text) => setCustomerInfo({...customerInfo, phone: text})}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
          </View>

          {/* Division */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Division<Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity 
              style={styles.input}
              onPress={() => setDivisionModalVisible(true)}
            >
              <Text style={customerInfo.division ? styles.inputText : styles.placeholderText}>
                {customerInfo.division || 'Select Division'}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#666" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          {/* District */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              District<Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity 
              style={[
                styles.input,
                !customerInfo.division && styles.disabledInput
              ]}
              onPress={() => customerInfo.division && setDistrictModalVisible(true)}
              disabled={!customerInfo.division}
            >
              <Text style={
                customerInfo.district ? styles.inputText : 
                !customerInfo.division ? styles.disabledPlaceholderText : styles.placeholderText
              }>
                {customerInfo.district || 
                 (!customerInfo.division ? 'Select Division First' : 'Select District')}
              </Text>
              <MaterialIcons 
                name="arrow-drop-down" 
                size={24} 
                color={!customerInfo.division ? '#ccc' : '#666'} 
                style={styles.dropdownIcon} 
              />
            </TouchableOpacity>
          </View>

          {/* Additional Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Additional Address<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={customerInfo.address}
              onChangeText={(text) => setCustomerInfo({...customerInfo, address: text})}
              placeholder="Additional address details"
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Terms and Conditions */}
          <TouchableOpacity 
            style={styles.termsContainer}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            <View style={[
              styles.checkbox,
              agreedToTerms && styles.checkboxChecked
            ]}>
              {agreedToTerms && <MaterialIcons name="check" size={16} color="#fff" />}
            </View>
            <Text style={styles.termsText}>
              I have read and agree to the Terms and Conditions and Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        {/* Order Details Section - নিচে */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Order Details</Text>
          
          {/* Product Card */}
          <View style={styles.productCard}>
            <Image source={{ uri: product.images[0] }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.productName}</Text>
              <Text style={styles.productDescription}>
                {product.description || 'Premium quality product'}
              </Text>
              <View style={styles.priceQuantityContainer}>
                <Text style={styles.productPrice}>{product.discountedPrice} BDT</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton} 
                    onPress={decreaseQuantity}
                    disabled={selectedQuantity <= 1}
                  >
                    <MaterialIcons 
                      name="remove" 
                      size={20} 
                      color={selectedQuantity <= 1 ? '#ccc' : '#003366'} 
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>× {selectedQuantity}</Text>
                  <TouchableOpacity 
                    style={styles.quantityButton} 
                    onPress={increaseQuantity}
                  >
                    <MaterialIcons name="add" size={20} color="#003366" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Coupon Code */}
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              value={couponCode}
              onChangeText={setCouponCode}
              placeholder="Coupon Code"
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyCoupon}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Order Summary */}
          <View style={styles.orderSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{calculateSubtotal()} BDT</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Charge</Text>
              <Text style={styles.summaryValue}>120 BDT</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{calculateTotal()} BDT</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.orderButton,
            (!agreedToTerms || !customerInfo.fullName || !customerInfo.phone || 
             !customerInfo.division || !customerInfo.district || !customerInfo.address) && 
            styles.orderButtonDisabled
          ]} 
          onPress={handlePlaceOrder}
          disabled={!agreedToTerms || !customerInfo.fullName || !customerInfo.phone || 
                   !customerInfo.division || !customerInfo.district || !customerInfo.address}
        >
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>

      {/* Division Selection Modal */}
      <Modal
        visible={divisionModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDivisionModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Division</Text>
              <TouchableOpacity onPress={() => setDivisionModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={divisions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectDivision(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* District Selection Modal */}
      <Modal
        visible={districtModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDistrictModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select District</Text>
              <TouchableOpacity onPress={() => setDistrictModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={availableDistricts}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectDistrict(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
         
      </Modal>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 16,
  },
  
  // Payment Method Styles
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentOptionSelected: {
    backgroundColor: '#f0f8ff',
  },
  radioContainer: {
    marginRight: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#003366',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#003366',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },

  // Help Line Styles
  helpLineContainer: {
    marginTop: 16,
  },
  helpLineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  helpLineText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    lineHeight: 20,
  },

  // Input Styles
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  disabledPlaceholderText: {
    fontSize: 16,
    color: '#ccc',
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  // Terms and Conditions
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#003366',
    borderColor: '#003366',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

  // Product Card Styles
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginHorizontal: 12,
  },

  // Coupon Styles
  couponContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  applyButton: {
    backgroundColor: '#003366',
    paddingHorizontal: 20,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Order Summary Styles
  orderSummary: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },

  // Footer Styles
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  orderButton: {
    backgroundColor: '#003366',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonDisabled: {
    backgroundColor: '#ccc',
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },

  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#003366',
    fontWeight: 'bold',
  },
});

export default OrderPage;