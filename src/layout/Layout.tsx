import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopNav from "../navigations/TopNav";
import BottomBar from "../navigations/BottomBar";
import { Home } from "../screens/User/Home";
import { Profile } from "../screens/User/Profile";
import { ROLE_BASED_NAVIGATION, TrustRideUserRole } from "../constants/navConfig";
import { SignUp } from "../screens/SignUp";

export const Layout = () => {
  const insets = useSafeAreaInsets();

  const userRole: TrustRideUserRole = "User";
  const navItems = ROLE_BASED_NAVIGATION[userRole].navItems;

  const [screen, setScreen] = useState(navItems[0].path); 

  const renderScreen = () => {
    console.log('this is screen', screen)
    switch (screen) {
      case "/user-dashboard":
        return <Home />;

      case "/settings":
        return <Profile />;
        
      default:
        return <Home />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopNav />

      <View style={styles.content}>{renderScreen()}</View>

      <BottomBar current={screen} onChange={setScreen} navItems={navItems} />
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
    paddingHorizontal: 16 
  },
});
