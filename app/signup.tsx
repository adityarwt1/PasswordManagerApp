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
import { useRouter } from "expo-router";

const signup = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const router = useRouter();
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
          {
            color: isDark ? Colors.dark.text : Colors.light.text,
            paddingVertical: 15,
          },
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

      {/* Horizontal line with "or" text */}
      <View style={styles.orContainer}>
        <View
          style={[
            styles.line,
            { backgroundColor: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        />
        <Text
          style={[
            styles.orText,
            { color: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        >
          or
        </Text>
        <View
          style={[
            styles.line,
            { backgroundColor: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        />
      </View>

      {/* Sign In button */}
      <TouchableOpacity
        style={[
          styles.signinButton,
          { borderColor: isDark ? Colors.dark.text : Colors.light.text },
        ]}
        onPress={() => router.push("/signin")}
      >
        <Text
          style={[
            styles.signinButtonText,
            { color: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        >
          Sign In
        </Text>
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
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    width: "80%",
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  signinButton: {
    backgroundColor: "transparent",
    padding: 12,
    width: "80%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  signinButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
