import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtonRow from "@/components/profileComponent/AllProfileSectionComponent";
import ProfileCard from "@/components/profileComponent/ProfileCar";
import EditProfileComponent from "@/components/profileComponent/EditProfileComponent";
import MyReviewComponent from "@/components/profileComponent/MyReviewComponent";
import TrackOrderComponent from "@/components/profileComponent/TrackOrderComponent";
import NotificationComponent from "@/components/profileComponent/NotificationComponen";
import OrderHistoryComponent from "@/components/profileComponent/HistoryOrder";
import ReturnRefundComponent from "@/components/profileComponent/ReturnRefundComponent"; // Import করুন
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

// Active component types - returnRefund add করুন
type ActiveComponent = 'personalInfo' | 'editProfile' | 'notification' | 'orderHistory' | 'myReview' | 'trackOrder' | 'returnRefund';

const ProfileScreen = () => {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>('personalInfo');

  const handleEditAvatar = () => {
    console.log("Edit avatar clicked");
  };

  // Component selection function - returnRefund case add করুন
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'personalInfo':
        return <ProfileCard data={localProfileData} onEditAvatar={handleEditAvatar} />;
      
      case 'editProfile':
        return (
          <EditProfileComponent 
            onBack={() => setActiveComponent('personalInfo')}
            initialData={localProfileData}
          />
        );
      
      case 'notification':
        return <NotificationComponent onBack={() => setActiveComponent('personalInfo')} />;
      
      case 'orderHistory':
        return <OrderHistoryComponent onBack={() => setActiveComponent('personalInfo')} />;
      
      case 'myReview':
        return <MyReviewComponent onBack={() => setActiveComponent('personalInfo')} />;
      
      case 'trackOrder':
        return <TrackOrderComponent onBack={() => setActiveComponent('personalInfo')} />;
      
      case 'returnRefund': // New case add করুন
        return <ReturnRefundComponent onBack={() => setActiveComponent('personalInfo')} />;
      
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
            onPress={() => setActiveComponent('personalInfo')}
            isActive={activeComponent === 'personalInfo'}
          />

          <CustomButtonRow
            title="Edit Profile"
            iconName="pencil"
            iconLib="entypo"
            onPress={() => setActiveComponent('editProfile')}
            isActive={activeComponent === 'editProfile'}
          />

          <CustomButtonRow
            title="Notification"
            iconName="notifications-outline"
            iconLib="ion"
            onPress={() => setActiveComponent('notification')}
            isActive={activeComponent === 'notification'}
          />

          <CustomButtonRow
            title="Order History"
            iconName="clipboard-text"
            iconLib="material"
            onPress={() => setActiveComponent('orderHistory')}
            isActive={activeComponent === 'orderHistory'}
          />

          <CustomButtonRow
            title="My Review"
            iconName="star-outline"
            iconLib="ion"
            onPress={() => setActiveComponent('myReview')}
            isActive={activeComponent === 'myReview'}
          />

          <CustomButtonRow
            title="Track Order"
            iconName="location-outline"
            iconLib="ion"
            onPress={() => setActiveComponent('trackOrder')}
            isActive={activeComponent === 'trackOrder'}
          />

          {/* Return & Refund Button - Updated */}
          <CustomButtonRow
            title="Return & Refund"
            iconName="refresh-ccw"
            iconLib="feather"
            onPress={() => setActiveComponent('returnRefund')} // setActiveComponent call করুন
            isActive={activeComponent === 'returnRefund'}
          />

          <CustomButtonRow
            title="Customer Care"
            iconName="message-circle"
            iconLib="feather"
            onPress={() => console.log("Customer Care Pressed")}
          />
        </View>

        {/* Active Component Display */}
        <View style={styles.componentContainer}>
          {renderActiveComponent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  componentContainer: {
    marginTop: 20,
  },
});