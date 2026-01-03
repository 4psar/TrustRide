import React, { useEffect, useState } from "react";
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
import { getUserFromSession } from "../hooks/useSession";
import { UserRidesList } from "../screens/User/userRideList";
import { UserProfileSettings  } from "../screens/User/userSetting";
import {BookRide} from "../screens/User/bookRide";
import {AdminridesList} from"../screens/Admin/rideList"
import {AdminProfileSettings} from"../screens/Admin/adminSetting"
import {DashboardScreen} from "../screens/Admin/adminDashboard"
import {FleetManagementScreen} from "../screens/Admin/user"


interface RoleProps{
  id:number;
  name:string;
}

export const Layout = () => {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<any>({});
  
  const Role:RoleProps[] = [
    {
      id:1,
      name:'Customer'
    },{
      id:2,
      name:'Driver'
    },
    {id:3,
      name:'Admin'
    },{
      id:0,
      name: 'Guest'
    }
  ];

  useEffect(()=>{
    const fetchUser =async()=>{
      const user = await getUserFromSession();
      setUser(user);
    }

    fetchUser();
  },[])

  const userRole: TrustRideUserRole = Role.find((r:any)=> r.id == user.roleId)?.name as TrustRideUserRole || "Guest";
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
      
      case "/settings": //Driver
        return <Profile />;

      case "/driver-dashboard":
        return <DriverDashboard/>;

      case "/available-rides":
        return <RidesList/>;
      
      case "/earnings":
        return <DriverEarningsScreen/>;
      
      case "/account":
        return <AccountStack/>;
         
       case "/dashboard": // Admin
        return <DashboardScreen />;  

      case "/users": 
        return <FleetManagementScreen />;

      case "/settings":
        return <AdminProfileSettings />;

      case "/analytics": 
        return <AdminridesList />;
  
      case "/user-settings": //User
        return <UserProfileSettings />;

      case "/ride-history":
        return <RidesList/>; 
        
      case "/book-ride":
        return <BookRide/>  

      case "/user-dashboard":
        return <Home />;

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

