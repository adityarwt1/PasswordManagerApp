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
import React, { useState, useEffect } from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { getUserCredentials } from "@/utils/Credentials";

// Define the user data type
interface UserData {
  username: string;
  password: string;
  signupDate: string;
}

const add = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormdata] = useState({
    sitename: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState({
    sitename: "",
    password: "",
  });

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getUserCredentials();
        setUserData(data);
        console.log("User data:", data);
      } catch (error) {
        console.error("Error loading user data:", error);
        // Redirect to signin if no user data
        router.push("/signin");
      }
    };

    loadUserData();
  }, []);

  console.log(formData);

  const handleSubmit = async () => {
    // Reset errors
    setErrors({ sitename: "", password: "" });

    // Validate fields
    let hasErrors = false;
    const newErrors = { sitename: "", password: "" };

    if (!formData.sitename.trim()) {
      newErrors.sitename = "Site name is required";
      hasErrors = true;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      hasErrors = true;
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    if (!userData?.username) {
      console.error("No username found");
      router.push("/signin");
      return;
    }

    setIsloading(true);
    try {
      const addUrl = `https://securopass.vercel.app/api/add?username=${userData.username}&plateform=${formData.sitename}&password=${formData.password}`;
      const response = await fetch(addUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Password added successfully!", data);
        // Clear form on success
        setFormdata({ sitename: "", password: "" });
        // Show success message or navigate back
        router.push("/(tabs)");
      } else {
        // Show server error message
        setErrors({
          sitename: "",
          password: data.message || "Failed to add password",
        });
        console.log("Failed to add password:", data.message);
      }
    } catch (error) {
      console.log("Error adding password:", (error as Error).message);
      setErrors({
        sitename: "",
        password: "Network error. Please try again.",
      });
    } finally {
      setIsloading(false);
    }
  };

  // Show loading or redirect if no user data
  if (!userData) {
    return (
      <SafeAreaView style={styles.maindiv}>
        <Text style={[styles.titleText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.maindiv}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("@/assets/images/favicon.png")}
      />
      {/* this is the title of the add password page */}
      <Text
        style={[
          styles.titleText,
          { color: isDark ? Colors.dark.text : Colors.light.text },
        ]}
      >
        Add New Password
      </Text>
      
      {/* Welcome message */}
      <Text
        style={[
          styles.welcomeText,
          { color: isDark ? Colors.dark.text : Colors.light.text },
        ]}
      >
        Hi {userData.username}, add a new password
      </Text>
      
      {/* Site Name Input */}
      <TextInput
        placeholder="Site name (e.g., Gmail, Facebook)..."
        value={formData.sitename}
        onChangeText={(text) => {
          setFormdata({ ...formData, sitename: text });
          if (errors.sitename) setErrors({ ...errors, sitename: "" });
        }}
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        style={[
          styles.inputfield,
          {
            color: isDark ? Colors.dark.text : Colors.light.text,
            borderColor: errors.sitename ? "#ef4444" : "#fff",
          },
        ]}
      />
      {errors.sitename ? (
        <Text style={styles.errorText}>{errors.sitename}</Text>
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

      {/* Add Password Button */}
      <TouchableOpacity
        style={styles.addButton}
        disabled={isLoading}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Adding..." : "Add Password"}
        </Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity
        style={[
          styles.cancelButton,
          { borderColor: isDark ? Colors.dark.text : Colors.light.text },
        ]}
        onPress={() => router.push("/(tabs)")}
      >
        <Text
          style={[
            styles.cancelButtonText,
            { color: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default add;

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
  welcomeText: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 10,
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
  addButton: {
    backgroundColor: "#22c55e", // Green color for add action
    padding: 12,
    width: "80%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    padding: 12,
    width: "80%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
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
