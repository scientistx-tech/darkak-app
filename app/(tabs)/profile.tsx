// import { StyleSheet, Text, View, ScrollView } from "react-native";
// import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import CustomButtonRow from "@/components/profileComponent/AllProfileSectionComponent";
// import ProfileCard from "@/components/profileComponent/ProfileCar";
// import EditProfileComponent from "@/components/profileComponent/EditProfileComponent";
// import MyReviewComponent from "@/components/profileComponent/MyReviewComponent";
// import TrackOrderComponent from "@/components/profileComponent/TrackOrderComponent";
// import NotificationComponent from "@/components/profileComponent/NotificationComponen";
// import OrderHistoryComponent from "@/components/profileComponent/HistoryOrder";
// import ReturnRefundComponent from "@/components/profileComponent/ReturnRefundComponent"; // Import করুন
// import HeaderComponent from "@/components/headerComponent/HeaderComponent";

// const localProfileData = {
//   name: "Shakib Al Hasan",
//   email: "shakib@example.com",
//   phone: "+880123456789",
//   dob: "1995-03-24",
//   gender: "Male",
//   maritalStatus: "Single",
//   address: "Dhaka, Bangladesh",
//   avatarUrl: "https://i.pravatar.cc/150?img=12",
// };

// // Active component types - returnRefund add করুন
// type ActiveComponent = 'personalInfo' | 'editProfile' | 'notification' | 'orderHistory' | 'myReview' | 'trackOrder' | 'returnRefund';

// const ProfileScreen = () => {
//   const [activeComponent, setActiveComponent] = useState<ActiveComponent>('personalInfo');

//   const handleEditAvatar = () => {
//     console.log("Edit avatar clicked");
//   };

//   // Component selection function - returnRefund case add করুন
//   const renderActiveComponent = () => {
//     switch (activeComponent) {
//       case 'personalInfo':
//         return <ProfileCard data={localProfileData} onEditAvatar={handleEditAvatar} />;
      
//       case 'editProfile':
//         return (
//           <EditProfileComponent 
//             onBack={() => setActiveComponent('personalInfo')}
//             initialData={localProfileData}
//           />
//         );
      
//       case 'notification':
//         return <NotificationComponent onBack={() => setActiveComponent('personalInfo')} />;
      
//       case 'orderHistory':
//         return <OrderHistoryComponent onBack={() => setActiveComponent('personalInfo')} />;
      
//       case 'myReview':
//         return <MyReviewComponent onBack={() => setActiveComponent('personalInfo')} />;
      
//       case 'trackOrder':
//         return <TrackOrderComponent onBack={() => setActiveComponent('personalInfo')} />;
      
//       case 'returnRefund': // New case add করুন
//         return <ReturnRefundComponent onBack={() => setActiveComponent('personalInfo')} />;
      
//       default:
//         return <ProfileCard data={localProfileData} onEditAvatar={handleEditAvatar} />;
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <HeaderComponent/>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingVertical: 10 }}
//       >
//         {/* Menu Buttons */}
//         <View style={{ paddingHorizontal: 10 }}>
//           <CustomButtonRow
//             title="Personal Information"
//             iconName="person"
//             iconLib="ion"
//             onPress={() => setActiveComponent('personalInfo')}
//             isActive={activeComponent === 'personalInfo'}
//           />

//           <CustomButtonRow
//             title="Edit Profile"
//             iconName="pencil"
//             iconLib="entypo"
//             onPress={() => setActiveComponent('editProfile')}
//             isActive={activeComponent === 'editProfile'}
//           />

//           <CustomButtonRow
//             title="Notification"
//             iconName="notifications-outline"
//             iconLib="ion"
//             onPress={() => setActiveComponent('notification')}
//             isActive={activeComponent === 'notification'}
//           />

//           <CustomButtonRow
//             title="Order History"
//             iconName="clipboard-text"
//             iconLib="material"
//             onPress={() => setActiveComponent('orderHistory')}
//             isActive={activeComponent === 'orderHistory'}
//           />

//           <CustomButtonRow
//             title="My Review"
//             iconName="star-outline"
//             iconLib="ion"
//             onPress={() => setActiveComponent('myReview')}
//             isActive={activeComponent === 'myReview'}
//           />

//           <CustomButtonRow
//             title="Track Order"
//             iconName="location-outline"
//             iconLib="ion"
//             onPress={() => setActiveComponent('trackOrder')}
//             isActive={activeComponent === 'trackOrder'}
//           />

//           {/* Return & Refund Button - Updated */}
//           <CustomButtonRow
//             title="Return & Refund"
//             iconName="refresh-ccw"
//             iconLib="feather"
//             onPress={() => setActiveComponent('returnRefund')} 
//             isActive={activeComponent === 'returnRefund'}
//           />

//           <CustomButtonRow
//             title="Customer Care"
//             iconName="message-circle"
//             iconLib="feather"
//             onPress={() => console.log("Customer Care Pressed")}
//           />
//         </View>

//         {/* Active Component Display */}
//         <View style={styles.componentContainer}>
//           {renderActiveComponent()}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   componentContainer: {
//     marginTop: 20,
//   },
// });


import { StyleSheet, Text, View, ScrollView, Modal } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtonRow from "@/components/profileComponent/AllProfileSectionComponent";
import ProfileCard from "@/components/profileComponent/ProfileCar";
import EditProfileComponent from "@/components/profileComponent/EditProfileComponent";
import MyReviewComponent from "@/components/profileComponent/MyReviewComponent";
import TrackOrderComponent from "@/components/profileComponent/TrackOrderComponent";
import NotificationComponent from "@/components/profileComponent/NotificationComponen";
import OrderHistoryComponent from "@/components/profileComponent/HistoryOrder";
import ReturnRefundComponent from "@/components/profileComponent/ReturnRefundComponent";
import HeaderComponent from "@/components/headerComponent/HeaderComponent";

const localProfileData = {
  name: "Shakib Al Hasan",
  email: "shakib@example.com",
  phone: "+880123456789",
  dob: "1995-03-24",
  gender: "Male",
  maritalStatus: "Single",
  address: "Dhaka, Bangladesh",
  avatarUrl: "https://i.pravatar.cc/150?img=12",
};

// Active component types
type ActiveComponent = 'personalInfo' | 'editProfile' | 'notification' | 'orderHistory' | 'myReview' | 'trackOrder' | 'returnRefund';

const ProfileScreen = () => {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>('personalInfo');
  const [modalVisible, setModalVisible] = useState(false);

  const handleEditAvatar = () => {
    console.log("Edit avatar clicked");
  };

  const handleButtonPress = (component: ActiveComponent) => {
    if (component === 'personalInfo') {
      // Personal Information সরাসরি দেখানো হবে (modal-এ নয়)
      setActiveComponent('personalInfo');
      setModalVisible(false);
    } else {
      // অন্যান্য কম্পোনেন্ট মডালে দেখানো হবে
      setActiveComponent(component);
      setModalVisible(true);
    }
  };

  // Component selection function
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'personalInfo':
        return <ProfileCard data={localProfileData} onEditAvatar={handleEditAvatar} />;
      
      case 'editProfile':
        return (
          <EditProfileComponent 
            onBack={() => setModalVisible(false)}
            initialData={localProfileData}
          />
        );
      
      case 'notification':
        return <NotificationComponent onBack={() => setModalVisible(false)} />;
      
      case 'orderHistory':
        return <OrderHistoryComponent onBack={() => setModalVisible(false)} />;
      
      case 'myReview':
        return <MyReviewComponent onBack={() => setModalVisible(false)} />;
      
      case 'trackOrder':
        return <TrackOrderComponent onBack={() => setModalVisible(false)} />;
      
      case 'returnRefund':
        return <ReturnRefundComponent onBack={() => setModalVisible(false)} />;
      
      default:
        return <ProfileCard data={localProfileData} onEditAvatar={handleEditAvatar} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {/* Menu Buttons */}
        <View style={{ paddingHorizontal: 10 }}>
          <CustomButtonRow
            title="Personal Information"
            iconName="person"
            iconLib="ion"
            onPress={() => handleButtonPress('personalInfo')}
            isActive={activeComponent === 'personalInfo' && !modalVisible}
          />

          <CustomButtonRow
            title="Edit Profile"
            iconName="pencil"
            iconLib="entypo"
            onPress={() => handleButtonPress('editProfile')}
            isActive={activeComponent === 'editProfile' && modalVisible}
          />

          <CustomButtonRow
            title="Notification"
            iconName="notifications-outline"
            iconLib="ion"
            onPress={() => handleButtonPress('notification')}
            isActive={activeComponent === 'notification' && modalVisible}
          />

          <CustomButtonRow
            title="Order History"
            iconName="clipboard-text"
            iconLib="material"
            onPress={() => handleButtonPress('orderHistory')}
            isActive={activeComponent === 'orderHistory' && modalVisible}
          />

          <CustomButtonRow
            title="My Review"
            iconName="star-outline"
            iconLib="ion"
            onPress={() => handleButtonPress('myReview')}
            isActive={activeComponent === 'myReview' && modalVisible}
          />

          <CustomButtonRow
            title="Track Order"
            iconName="location-outline"
            iconLib="ion"
            onPress={() => handleButtonPress('trackOrder')}
            isActive={activeComponent === 'trackOrder' && modalVisible}
          />

          <CustomButtonRow
            title="Return & Refund"
            iconName="refresh-ccw"
            iconLib="feather"
            onPress={() => handleButtonPress('returnRefund')}
            isActive={activeComponent === 'returnRefund' && modalVisible}
          />

          <CustomButtonRow
            title="Customer Care"
            iconName="message-circle"
            iconLib="feather"
            onPress={() => console.log("Customer Care Pressed")}
          />
        </View>

        {/* Personal Information Display (Always Visible) */}
        <View style={styles.componentContainer}>
          <ProfileCard data={localProfileData} onEditAvatar={handleEditAvatar} />
        </View>
      </ScrollView>

      {/* Modal for other components */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {renderActiveComponent()}
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  componentContainer: {
    marginTop: 20,
  },
});