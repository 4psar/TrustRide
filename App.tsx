import React, { useContext, useState } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Layout} from "./src/layout/Layout";
import  SignUp  from "./src/screens/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";

function Root() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Layout /> : <SignUp />;
}

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar backgroundColor={isDarkMode ? '#121212' : '#FEBF00'}
            barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Root/>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  statusbar:{
    backgroundColor:'yellow'
  }
})