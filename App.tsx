import React, { useState } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Layout} from "./src/layout/Layout";
import  SignUp  from "./src/screens/SignUp";

export default function App() {
  const isDarkMode = useColorScheme() === "dark";
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={isDarkMode ? '#121212' : '#FEBF00'}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isAuthenticated ?(
          <>
            <Layout />
          </>
        ):(
          <>
            <SignUp/>
          </>
        )
      }

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  statusbar:{
    backgroundColor:'yellow'
  }
})

