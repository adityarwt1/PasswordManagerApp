import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

const signup = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });
  console.log(formData);
  return (
    <SafeAreaView style={styles.maindiv}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("@/assets/images/favicon.png")}
      />
      {/* this is the tile of the sighnhp page */}
      <Text
        style={[
          styles.titleText,
          { color: isDark ? Colors.dark.text : Colors.light.text },
        ]}
      >
        SecuraPass SignUp
      </Text>
      <TextInput
        placeholder="Enter your username..."
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        style={[
          styles.inputfield,
          { color: isDark ? Colors.dark.text : Colors.light.text },
        ]}
      />
      <TextInput
        placeholder="Enter your password..."
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        style={[
          styles.inputfield,
          { color: isDark ? Colors.dark.text : Colors.light.text },
        ]}
      />
      <TouchableOpacity style={styles.signubutton}>
        <Text style={styles.buttonText}>SignUp</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({
  maindiv: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "500",
  },
  inputfield: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: "80%",
    fontSize: 16,
  },
  signubutton: {
    backgroundColor: "#fff",
    padding: 12,
    width: "80%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
