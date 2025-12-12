import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Menu, Bell } from "lucide-react-native";

export default function TopNav() {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} />

        <View style={styles.textContainer}>
          <Text style={styles.appName}>TrustRide</Text>
          <Text style={styles.tagline}>Your Journey, Our Responsibility.</Text>
        </View>
      </View>

      <View style={styles.iconSection}>
        <Bell size={24} color="#000" />
        <Menu size={24} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FEBF00',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  textContainer: {
    flexDirection: 'column',
  },

  appName: {
    fontSize: 22,
    fontWeight: '700',
  },

  tagline: {
    fontSize: 14,
    color: '#555',
  },

  iconSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
