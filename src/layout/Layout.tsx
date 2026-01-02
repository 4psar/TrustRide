import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopNav from "../navigations/TopNav";
import BottomBar from "../navigations/BottomBar";
import { Home } from "../screens/User/Home";
import { Profile } from "../screens/User/Profile";
import { ROLE_BASED_NAVIGATION, TrustRideUserRole } from "../constants/navConfig";
import { DriverDashboard } from "../screens/Driver/DriverDashboard";
import { RidesList } from "../screens/Driver/RidesList";
import DriverEarningsScreen from "../screens/Driver/DriverEarningsScreen";
import { DriverProfile } from "../screens/Driver/DriverProfile";
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

export const Layout = () => {
  const insets = useSafeAreaInsets();

  const userRole: TrustRideUserRole = "Driver";
  const navItems = ROLE_BASED_NAVIGATION[userRole].navItems;

  const [screen, setScreen] = useState(navItems[0].path); 

  const Stack = createNativeStackNavigator();

  const StackScrens =["/account", "/settings", "/book-ride"];

  function AccountStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={DriverProfile} />
      </Stack.Navigator>
    );
  }

  const renderScreen = () => {
    console.log('this is screen', screen)
    switch (screen) {
      case "/user-dashboard":
        return <Home />;

      case "/settings":
        return <Profile />;

      case "/driver-dashboard":
        return <DriverDashboard/>;

      case "/available-rides":
        return <RidesList/>;
      
      case "/earnings":
        return <DriverEarningsScreen/>;
      
      case "/account":
        return <AccountStack/>;
         

      default:
        return <Home />;
    }
  };

  

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {StackScrens.find(a=>a===screen)?
      <>
        <View style={styles.content}>{renderScreen()}</View>
        <BottomBar current={screen} onChange={setScreen} navItems={navItems} />
      </>:
      <>
        <TopNav />
        <View style={styles.content}>{renderScreen()}</View>
        <BottomBar current={screen} onChange={setScreen} navItems={navItems} />
      </>
      
      }  
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  content: { 
    flex: 1,
  },
});

