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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUserCredentials } from "@/utils/Credentials";

const signup = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  console.log(formData);
  const handleSubmit = async () => {
    // Reset errors
    setErrors({ username: "", password: "" });

    // Validate fields
    let hasErrors = false;
    const newErrors = { username: "", password: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      hasErrors = true;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      hasErrors = true;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsloading(true);
    try {
      // Save credentials using utility function
      const userData = {
        username: formData.username,
        password: formData.password, // Note: In production, never store raw passwords!
        signupDate: new Date().toISOString(),
      };

      const signUrl = "http://10.192.205.12:3000/api/exposignup";
      const response = await fetch(signUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      console.log("resonse data", data);

      if (response.ok) {
        await saveUserCredentials(data.user);
        console.log("User registered and saved successfully!");
        router.push("/(tabs)");
      } else {
        console.log("Failed to save user credentials");
      }
    } catch (error) {
      console.log("Error saving credentials:", (error as Error).message);
      // You might want to show an error message to the user
    } finally {
      setIsloading(false);
    }
  };
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
        placeholder="username..."
        value={formData.username}
        onChangeText={(text) => {
          setFormdata({ ...formData, username: text });
          if (errors.username) setErrors({ ...errors, username: "" }); // Clear error on typing
        }}
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        style={[
          styles.inputfield,
          {
            color: isDark ? Colors.dark.text : Colors.light.text,
            borderColor: errors.username ? "#ef4444" : "#fff", // Red border on error
          },
        ]}
      />
      {errors.username ? (
        <Text style={styles.errorText}>{errors.username}</Text>
      ) : null}
      {/* Password input with toggle */}
      <View
        style={[
          styles.passwordContainer,
          {
            borderColor: errors.password ? "#ef4444" : "#fff", // Red border on error
          },
        ]}
      >
        <TextInput
          placeholder="password..."
          secureTextEntry={!showPassword}
          value={formData.password}
          onChangeText={(text) => {
            setFormdata({ ...formData, password: text });
            if (errors.password) setErrors({ ...errors, password: "" }); // Clear error on typing
          }}
          placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
          style={[
            styles.passwordInput,
            {
              color: isDark ? Colors.dark.text : Colors.light.text,
            },
          ]}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text
            style={[
              styles.eyeText,
              { color: isDark ? Colors.dark.text : Colors.light.text },
            ]}
          >
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.signubutton}
        disabled={isLoading}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "SignUp..." : "SignUp"}
        </Text>
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },

  eyeText: {
    fontSize: 15,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },
});
