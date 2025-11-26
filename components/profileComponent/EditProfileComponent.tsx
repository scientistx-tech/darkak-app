import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';

// Types
interface ProfileData {
  name: string;
  phone: string;
  dateOfBirth: Date | null;
  gender: string;
  maritalStatus: string;
  division: string;
  district: string;
  subDistrict: string;
  area: string;
}

interface DropdownOption {
  label: string;
  value: string;
}

interface EditProfileComponentProps {
  onBack: () => void;
  initialData?: any;
}

// Bangladesh geographical data
const BANGLADESH_DIVISIONS: DropdownOption[] = [
  { label: 'Dhaka', value: 'dhaka' },
  { label: 'Chittagong', value: 'chittagong' },
  { label: 'Rajshahi', value: 'rajshahi' },
  { label: 'Khulna', value: 'khulna' },
  { label: 'Barisal', value: 'barisal' },
  { label: 'Sylhet', value: 'sylhet' },
  { label: 'Rangpur', value: 'rangpur' },
  { label: 'Mymensingh', value: 'mymensingh' },
];

const DISTRICTS_BY_DIVISION: { [key: string]: DropdownOption[] } = {
  dhaka: [
    { label: 'Dhaka', value: 'dhaka' },
    { label: 'Gazipur', value: 'gazipur' },
    { label: 'Narayanganj', value: 'narayanganj' },
    { label: 'Tangail', value: 'tangail' },
    { label: 'Kishoreganj', value: 'kishoreganj' },
  ],
  chittagong: [
    { label: 'Chittagong', value: 'chittagong' },
    { label: 'Cox\'s Bazar', value: 'coxs_bazar' },
    { label: 'Rangamati', value: 'rangamati' },
    { label: 'Bandarban', value: 'bandarban' },
  ],
  // Add more districts for other divisions...
};

const SUB_DISTRICTS_BY_DISTRICT: { [key: string]: DropdownOption[] } = {
  dhaka: [
    { label: 'Dhanmondi', value: 'dhanmondi' },
    { label: 'Gulshan', value: 'gulshan' },
    { label: 'Mirpur', value: 'mirpur' },
    { label: 'Uttara', value: 'uttara' },
  ],
  gazipur: [
    { label: 'Gazipur Sadar', value: 'gazipur_sadar' },
    { label: 'Kaliakair', value: 'kaliakair' },
    { label: 'Kapasia', value: 'kapasia' },
  ],
  // Add more sub-districts for other districts...
};

const GENDER_OPTIONS: DropdownOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const MARITAL_STATUS_OPTIONS: DropdownOption[] = [
  { label: 'Married', value: 'married' },
  { label: 'Unmarried', value: 'unmarried' },
  { label: 'Divorced', value: 'divorced' },
];

const EditProfileComponent: React.FC<EditProfileComponentProps> = ({ onBack, initialData }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: initialData?.name || 'MD.SHAKIB AL HASAN',
    phone: initialData?.phone || '',
    dateOfBirth: null,
    gender: initialData?.gender || '',
    maritalStatus: initialData?.maritalStatus || '',
    division: '',
    district: '',
    subDistrict: '',
    area: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showMaritalStatusDropdown, setShowMaritalStatusDropdown] = useState(false);
  const [showDivisionDropdown, setShowDivisionDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showSubDistrictDropdown, setShowSubDistrictDropdown] = useState(false);

  const [availableDistricts, setAvailableDistricts] = useState<DropdownOption[]>([]);
  const [availableSubDistricts, setAvailableSubDistricts] = useState<DropdownOption[]>([]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setProfileData(prev => ({
        ...prev,
        dateOfBirth: selectedDate
      }));
    }
  };

  const handleDivisionSelect = (division: string) => {
    handleInputChange('division', division);
    setShowDivisionDropdown(false);
    
    // Reset dependent fields
    handleInputChange('district', '');
    handleInputChange('subDistrict', '');
    
    // Set available districts based on division
    const districts = DISTRICTS_BY_DIVISION[division] || [];
    setAvailableDistricts(districts);
  };

  const handleDistrictSelect = (district: string) => {
    handleInputChange('district', district);
    setShowDistrictDropdown(false);
    
    // Reset dependent field
    handleInputChange('subDistrict', '');
    
    // Set available sub-districts based on district
    const subDistricts = SUB_DISTRICTS_BY_DISTRICT[district] || [];
    setAvailableSubDistricts(subDistricts);
  };

  const handleSubDistrictSelect = (subDistrict: string) => {
    handleInputChange('subDistrict', subDistrict);
    setShowSubDistrictDropdown(false);
  };

  const handleGenderSelect = (gender: string) => {
    handleInputChange('gender', gender);
    setShowGenderDropdown(false);
  };

  const handleMaritalStatusSelect = (status: string) => {
    handleInputChange('maritalStatus', status);
    setShowMaritalStatusDropdown(false);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'mm/dd/yyyy';
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const renderDropdown = (
    visible: boolean,
    setVisible: (visible: boolean) => void,
    options: DropdownOption[],
    onSelect: (value: string) => void,
    placeholder: string,
    value: string
  ) => (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity 
        style={styles.dropdownTrigger}
        onPress={() => setVisible(!visible)}
      >
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {value ? options.find(opt => opt.value === value)?.label : placeholder}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => onSelect(item.value)}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );

  const handleUpdateProfile = () => {
    // Handle profile update logic here
    console.log('Profile Data:', profileData);
    onBack(); // Update完成后 Personal Information এ ফিরে যাবে
  };

  const handleUpdateAddress = () => {
    // Handle address update logic here
    console.log('Address Data:', {
      division: profileData.division,
      district: profileData.district,
      subDistrict: profileData.subDistrict,
      area: profileData.area
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Edit Your Profile</Text>
        
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={profileData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone"
              value={profileData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, !profileData.dateOfBirth && styles.placeholderText]}>
                {formatDate(profileData.dateOfBirth)}
              </Text>
              <Text style={styles.calendarIcon}>📅</Text>
            </TouchableOpacity>
            
            {/* {showDatePicker && (
              <DateTimePicker
                value={profileData.dateOfBirth || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )} */}
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Gender</Text>
            {renderDropdown(
              showGenderDropdown,
              setShowGenderDropdown,
              GENDER_OPTIONS,
              handleGenderSelect,
              'Select Gender',
              profileData.gender
            )}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Marital Status</Text>
            {renderDropdown(
              showMaritalStatusDropdown,
              setShowMaritalStatusDropdown,
              MARITAL_STATUS_OPTIONS,
              handleMaritalStatusSelect,
              'Select Marital Status',
              profileData.maritalStatus
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address Details</Text>

        <Text style={styles.label}>Division</Text>
        {renderDropdown(
          showDivisionDropdown,
          setShowDivisionDropdown,
          BANGLADESH_DIVISIONS,
          handleDivisionSelect,
          'Select Division',
          profileData.division
        )}

        <Text style={styles.label}>District</Text>
        {renderDropdown(
          showDistrictDropdown,
          setShowDistrictDropdown,
          availableDistricts,
          handleDistrictSelect,
          'Select District',
          profileData.district
        )}

        <Text style={styles.label}>Sub-District</Text>
        {renderDropdown(
          showSubDistrictDropdown,
          setShowSubDistrictDropdown,
          availableSubDistricts,
          handleSubDistrictSelect,
          'Select Sub-District',
          profileData.subDistrict
        )}

        <Text style={styles.label}>Area</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Area"
          value={profileData.area}
          onChangeText={(text) => handleInputChange('area', text)}
        />

        <View style={styles.separator} />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateAddress}>
          <Text style={styles.updateButtonText}>Update Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    padding: 16,
    paddingTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
    backgroundColor: 'white',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  calendarIcon: {
    fontSize: 16,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxHeight: '60%',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileComponent;