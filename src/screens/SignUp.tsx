import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Car,
  CheckCircle,
  Mail,
  Shield,
  Badge,
  Smartphone,
} from "lucide-react-native";
import { AuthService } from "../services/authservice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDatasFromSession } from "../hooks/useSession";
import { AuthContext } from "../context/AuthContext";

const { height } = Dimensions.get("window");

interface UsersData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  isDriver: boolean;
  licenseNumber: string;
  vehicleNumber: string;
}

export default function SignUp() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"customer" | "driver">(
    "customer"
  );
  const { login, register } = useContext(AuthContext);

  const [formData, setFormData] = useState<UsersData>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    isDriver: false,
    licenseNumber: "",
    vehicleNumber: "",
  });

  const cardAnim = useState(new Animated.Value(60))[0];

  useEffect(() => {
    Animated.spring(cardAnim, {
      toValue: 0,
      tension: 40,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      isDriver: selectedRole === "driver",
    }));
  }, [selectedRole]);

  const handleInputChange = (field: keyof UsersData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleSubmit = async () => {
    try {
      if (isSignIn) {
        const payload = {
          email: formData.email,
          password: formData.password
        }
        await login(payload);
        Alert.alert("Success", "Logged in");
      } else {
        if (formData.password !== formData.confirmPassword) {
          return Alert.alert("Error", "Passwords do not match");
        }

        await register(formData);
        Alert.alert("Success", "Registered successfully");
        setIsSignIn(true);
      }
    } catch (e: any) {
      Alert.alert("Error", e?.response?.data?.message || "Something went wrong");
    }
  };

  // const handleSubmit = async() => {
  //   if (!formData.userName || !formData.email || !formData.password) {
  //     Alert.alert("Error", "Please fill all required fields");
  //     return;
  //   }

  //   if (!isSignIn) {
  //     if (formData.password !== formData.confirmPassword) {
  //       Alert.alert("Error", "Passwords do not match");
  //       return;
  //     }

  //     if (formData.isDriver) {
  //       if (!formData.licenseNumber || !formData.vehicleNumber) {
  //         Alert.alert("Error", "Driver details are required");
  //         return;
  //       }
  //     }
  //   }

  //   const service = AuthService.getInstance();


  //   const payload = {
  //     userName: formData.userName,
  //     email: formData.email,
  //     password: formData.password,
  //     phoneNumber: formData.phoneNumber,
  //     isDriver: formData.isDriver,
  //     licenseNumber: formData.isDriver ? formData.licenseNumber : "",
  //     vehicleNumber: formData.isDriver ? formData.vehicleNumber : "",
  //   };

  //   try{

  //     if(isSignIn){
  //       const res = await service.login(payload);
  //       if(res){
  //         console.log("USER DATA:", payload);
  //         await setDatasFromSession(res);
  //         Alert.alert("Success", isSignIn ? "Signed In" : "Registered Successfully");
  //       }
  //     }else{
  //       const res = await service.register(payload);
  //       console.log("this is response:", res);
  //       if(res){
  //         setIsSignIn(true);
  //         console.log("USER DATA:", payload);
  //         Alert.alert("Success", isSignIn ? "Signed In" : "Registered Successfully");
  //       }
  //     }
  //   }catch (err: any) {
  //     console.log("Register error:", err);

  //     Alert.alert(
  //       "Registration Failed",
  //       err?.response?.data?.message || "Network error. Please try again."
  //     );
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logoIcon}
            />
          </View>
          <Text style={styles.appName}>TrustRide</Text>
        </View>

        <Text style={styles.headerText}>
          {isSignIn ? "SIGN IN" : "REGISTER"}
        </Text>
      </View>

      {/* CONTENT */}
      <View style={styles.contentWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View
            style={[styles.card, { transform: [{ translateY: cardAnim }] }]}
          >
            {/* ROLE */}
            {!isSignIn && (
              <View style={styles.roleContainer}>
                <View style={styles.roleButtonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      selectedRole === "customer" &&
                        styles.roleButtonSelected,
                    ]}
                    onPress={() => setSelectedRole("customer")}
                  >
                    <User size={26} color="#666" />
                    <Text>Customer</Text>
                    {selectedRole === "customer" && (
                      <CheckCircle size={18} color="#4D8CFF" />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      selectedRole === "driver" &&
                        styles.roleButtonSelected,
                    ]}
                    onPress={() => setSelectedRole("driver")}
                  >
                    <Car size={26} color="#666" />
                    <Text>Driver</Text>
                    {selectedRole === "driver" && (
                      <CheckCircle size={18} color="#4D8CFF" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* FORM */}
            <Text style={styles.label}>USERNAME</Text>
            <View style={styles.inputWrapper}>
              <User size={18} />
              <TextInput
                value={formData.userName}
                onChangeText={text =>
                  handleInputChange("userName", text)
                }
                placeholder="Enter username"
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>EMAIL</Text>
            <View style={styles.inputWrapper}>
              <Mail size={18} />
              <TextInput
                value={formData.email}
                onChangeText={text => handleInputChange("email", text)}
                placeholder="Enter email"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>

            {!isSignIn && (
              <>
                <Text style={styles.label}>MOBILE</Text>
                <View style={styles.inputWrapper}>
                  <Smartphone size={18} />
                  <TextInput
                    value={formData.phoneNumber}
                    onChangeText={text =>
                      handleInputChange("phoneNumber", text)
                    }
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                    style={styles.input}
                  />
                </View>

                {formData.isDriver && (
                  <>
                    <Text style={styles.label}>LICENSE</Text>
                    <View style={styles.inputWrapper}>
                      <Badge size={18} />
                      <TextInput
                        value={formData.licenseNumber}
                        onChangeText={text =>
                          handleInputChange("licenseNumber", text)
                        }
                        placeholder="License number"
                        style={styles.input}
                      />
                    </View>

                    <Text style={styles.label}>VEHICLE</Text>
                    <View style={styles.inputWrapper}>
                      <Car size={18} />
                      <TextInput
                        value={formData.vehicleNumber}
                        onChangeText={text =>
                          handleInputChange("vehicleNumber", text)
                        }
                        placeholder="Vehicle number"
                        style={styles.input}
                      />
                    </View>
                  </>
                )}
              </>
            )}

            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <Shield size={18} />
              <TextInput
                value={formData.password}
                onChangeText={text =>
                  handleInputChange("password", text)
                }
                placeholder="Password"
                secureTextEntry
                style={styles.input}
              />
            </View>

            {!isSignIn && (
              <>
                <Text style={styles.label}>CONFIRM PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <Shield size={18} />
                  <TextInput
                    value={formData.confirmPassword}
                    onChangeText={text =>
                      handleInputChange("confirmPassword", text)
                    }
                    placeholder="Confirm password"
                    secureTextEntry
                    style={styles.input}
                  />
                </View>
              </>
            )}

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleSubmit}
            >
              <Text style={styles.actionText}>
                {isSignIn ? "SIGN IN" : "REGISTER"}
              </Text>
            </TouchableOpacity>

            <View style={styles.toggleContainer}>
              <Text>
                {isSignIn
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </Text>
              <TouchableOpacity onPress={() => setIsSignIn(!isSignIn)}>
                <Text style={styles.toggleLink}>
                  {isSignIn ? " Register" : " Sign In"}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E1E" },

  headerContainer: {
    height: 300,
    backgroundColor: "#FFBF00",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 10,
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
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#1E1E1E",
    textAlign:'center',
    marginBottom:10
   },

  headerText: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },

  circle1: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255,255,255,0.15)",
    top: -40,
    right: -40,
  },

  circle2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    bottom: 40,
    left: -20,
  },

  contentWrapper: { flex: 1, marginTop: -120 },

  scrollContainer: { paddingBottom: 40 },

  card: {
    backgroundColor: "#F5F3ED",
    borderRadius: 24,
    padding: 24,
    width: "88%",
    alignSelf: "center",
    elevation: 10,
    marginBottom: 20,
  },

  roleContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  roleLabel: { textAlign: "center", fontWeight: "700", marginBottom: 12 },

  roleButtonsContainer: { flexDirection: "row", gap: 12 },

  roleButton: {
    flex: 1,
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
    position: "relative",
  },

  roleButtonSelected: {
    borderWidth: 2,
    borderColor: "#4D8CFF",
  },

  roleIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  roleIconContainerSelected: { backgroundColor: "#E8F0FE" },

  roleText: { color: "#666", fontWeight: "600" },
  roleTextSelected: { color: "#4D8CFF" },

  roleBadge: {
    marginTop: 12,
    alignSelf: "center",
    backgroundColor: "#E8F0FE",
    padding: 8,
    borderRadius: 20,
  },

  roleBadgeText: { fontSize: 12 },
  roleBadgeHighlight: { fontWeight: "700", color: "#4D8CFF" },

  label: { fontSize: 12, fontWeight: "700", marginBottom: 6, marginTop: 4 },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  input: { flex: 1, fontSize: 14 },

  // Forgot Password
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: -8,
    marginBottom: 16,
  },

  forgotPasswordText: {
    color: "#4D8CFF",
    fontSize: 13,
    fontWeight: "600",
  },

  // Terms and Conditions
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
    gap: 10,
  },

  termsText: {
    fontSize: 12,
    color: "#666",
    flex: 1,
    flexWrap: "wrap",
  },

  termsLink: {
    color: "#4D8CFF",
    fontWeight: "600",
  },

  // Action Button
  actionBtn: {
    backgroundColor: "#4D8CFF",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
    shadowColor: "#4D8CFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  actionText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  // Toggle between Sign In and Register
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  toggleText: {
    color: "#666",
    fontSize: 14,
  },

  toggleLink: {
    color: "#4D8CFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },

  // Divider
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },

  dividerText: {
    marginHorizontal: 12,
    color: "#999",
    fontSize: 12,
    fontWeight: "600",
  },

  // Social Login
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },

  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  socialIcon: {
    fontSize: 18,
    fontWeight: "bold",
  },
});