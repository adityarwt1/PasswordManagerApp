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
import { saveUserCredentials } from "@/utils/Credentials";

const signin = () => {
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
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsloading(true);
    try {
      const signUrl = "http://10.192.205.12:3000/api/exposignin";
      const response = await fetch(signUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();

      if (response.ok) {
        await saveUserCredentials(data.user);
        console.log("User signed in successfully!");
        router.push("/(tabs)");
      } else {
        // Show server error message
        setErrors({
          username: "",
          password: data.message || "Invalid credentials",
        });
        console.log("Failed to sign in:", data.message);
      }
    } catch (error) {
      console.log("Error signing in:", (error as Error).message);
      setErrors({
        username: "",
        password: "Network error. Please try again.",
      });
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
      {/* this is the title of the signin page */}
      <Text
        style={[
          styles.titleText,
          { color: isDark ? Colors.dark.text : Colors.light.text },
        ]}
      >
        SecuraPass SignIn
      </Text>

      <TextInput
        placeholder="username..."
        value={formData.username}
        onChangeText={(text) => {
          setFormdata({ ...formData, username: text });
          if (errors.username) setErrors({ ...errors, username: "" });
        }}
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        style={[
          styles.inputfield,
          {
            color: isDark ? Colors.dark.text : Colors.light.text,
            borderColor: errors.username ? "#ef4444" : "#fff",
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
            borderColor: errors.password ? "#ef4444" : "#fff",
          },
        ]}
      >
        <TextInput
          placeholder="password..."
          secureTextEntry={!showPassword}
          value={formData.password}
          onChangeText={(text) => {
            setFormdata({ ...formData, password: text });
            if (errors.password) setErrors({ ...errors, password: "" });
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
        style={styles.signinButton}
        disabled={isLoading}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Signing In..." : "Sign In"}
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

      {/* Sign Up button */}
      <TouchableOpacity
        style={[
          styles.signupButton,
          { borderColor: isDark ? Colors.dark.text : Colors.light.text },
        ]}
        onPress={() => router.push("/signup")}
      >
        <Text
          style={[
            styles.signupButtonText,
            { color: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default signin;

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
  signinButton: {
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
  signupButton: {
    backgroundColor: "transparent",
    padding: 12,
    width: "80%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  signupButtonText: {
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
