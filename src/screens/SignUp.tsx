import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import logo from "../assets/images/logo.png";

const { height } = Dimensions.get('window');

export default function SignUp() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [cardAnim] = useState(new Animated.Value(-height));
  const [formAnim] = useState(new Animated.Value(0));
  const [buttonAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Initial card slide in animation
    Animated.spring(cardAnim, {
      toValue: 0,
      tension: 40,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleToggleMode = () => {
    // Fade out form
    Animated.parallel([
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      setIsSignIn(!isSignIn);
      // Fade in form
      Animated.parallel([
        Animated.spring(formAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(buttonAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const formOpacity = formAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const formTranslateY = formAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const buttonScale = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Animated Header */}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
            <View style={styles.logo}>
                <Image source={require('../assets/images/logo.png')} style={styles.logoIcon}/>
            </View>
            <Text style={styles.appName}>TrustRide</Text>
        </View>
        <Animated.Text 
          style={[
            styles.headerText,
            {
              opacity: formOpacity,
              transform: [{ translateY: formTranslateY }]
            }
          ]}
        >
          {isSignIn ? "SIGN IN" : "REGISTER"}
        </Animated.Text>
        
        {/* Decorative circles */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>

      {/* Animated Registration/Login Card */}
      <Animated.View 
        style={[
          styles.card,
          {
            transform: [{ translateY: cardAnim }]
          }
        ]}
      >
        
        <Animated.View 
          style={{
            opacity: formOpacity,
            transform: [{ translateY: formTranslateY }]
          }}
        >
          <Text style={styles.label}>USER NAME</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIcon}>
              <Text style={styles.iconText}>👤</Text>
            </View>
            <TextInput 
              placeholder="Enter user name" 
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          {!isSignIn && (
            <>
              <Text style={styles.label}>MOBILE NUMBER</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <Text style={styles.iconText}>📱</Text>
                </View>
                <TextInput 
                  placeholder="Enter mobile number" 
                  keyboardType="phone-pad" 
                  style={styles.input}
                  placeholderTextColor="#999"
                />
              </View>
            </>
          )}

          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIcon}>
              <Text style={styles.iconText}>🔒</Text>
            </View>
            <TextInput 
              placeholder="Enter password" 
              secureTextEntry 
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          {!isSignIn && (
            <>
              <Text style={styles.label}>CONFIRM PASSWORD</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <Text style={styles.iconText}>🔐</Text>
                </View>
                <TextInput 
                  placeholder="Enter confirm password" 
                  secureTextEntry 
                  style={styles.input}
                  placeholderTextColor="#999"
                />
              </View>
            </>
          )}

          {isSignIn && (
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ scale: buttonScale }]
          }}
        >
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>
              {isSignIn ? "SIGN IN" : "REGISTER"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={handleToggleMode}>
          <Text style={styles.smallText}>
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <Text style={styles.linkText}>
              {isSignIn ? "sign up" : "sign in"}
            </Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
    },
    headerContainer: {
        width: "100%",
        position: "relative",
        backgroundColor: "#FFBF00",
        height: 340,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        overflow: "hidden",
    },
    logoContainer: {
        display:'flex',
        flexDirection:'row',
        position: "absolute",
        top: 10,
        width: "100%",
        alignItems: "center",
        gap:10,
        padding:10,
    },
    logo: {
        width: 60,
        height: 60,
        backgroundColor: "#1E1E1E",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        marginBottom: 12,
    },
    logoIcon: {
        width:60,
        height:60,
        textAlign:'center',
        justifyContent:'center'
    },
    appName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "1E1E1E",
        letterSpacing: 1,
        textAlign:'center',
        marginBottom:10,
    },
    headerText: {
        position: "absolute",
        top: 90,
        width: "100%",
        textAlign: "center",
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        letterSpacing: 3,
        textShadowColor: "rgba(0, 0, 0, 0.1)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    circle1: {
        position: "absolute",
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        top: -50,
        right: -30,
    },
    circle2: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        bottom: 30,
        left: -20,
    },
    card: {
        marginTop: -180,
        backgroundColor: "#F5F3ED",
        borderRadius: 24,
        width: "88%",
        alignSelf: "center",
        padding: 24,
        paddingTop: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    label: {
        fontSize: 12,
        fontWeight: "700",
        marginBottom: 8,
        color: "#333",
        letterSpacing: 0.5,
    },
    inputWrapper: {
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 12,
        height: 52,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    inputIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    iconText: {
        fontSize: 16,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#333",
    },
    forgotPassword: {
        textAlign: "right",
        color: "#4D8CFF",
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 10,
        marginTop: -8,
    },
    actionBtn: {
        backgroundColor: "#4D8CFF",
        paddingVertical: 15,
        borderRadius: 14,
        marginTop: 8,
        shadowColor: "#4D8CFF",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    actionText: {
        color: "white",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
        letterSpacing: 1,
    },
    smallText: {
        textAlign: "center",
        marginTop: 20,
        color: "#666",
        fontSize: 14,
    },
    linkText: {
        color: "#4D8CFF",
        fontWeight: "600",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#D0D0D0",
    },
    dividerText: {
        marginHorizontal: 12,
        color: "#999",
        fontSize: 12,
        fontWeight: "600",
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
    },
    socialBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    socialIcon: {
        fontSize: 20,
        fontWeight: "bold",
    },
});