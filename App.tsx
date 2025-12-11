import React, { useState } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Layout} from "./src/layout/Layout";

export default function App() {
  const isDarkMode = useColorScheme() === "dark";
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={isDarkMode ? '#121212' : '#FEBF00'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Layout/>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  statusbar:{
    backgroundColor:'yellow'
  }
})

