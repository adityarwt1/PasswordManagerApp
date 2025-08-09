import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  RefreshControl,
  FlatList,
  Button,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { clearUserCredentials, getUserCredentials } from "@/utils/Credentials";
import * as Clipboard from "expo-clipboard";

// Define the user data type
interface UserData {
  username: string;
  password: string;
  signupDate: string;
}

// Define the password object type
interface PasswordItem {
  _id: string;
  createdAt: string;
  password: string;
  plateform: string;
  updatedAt: string;
}

const index = () => {
  const theme = useColorScheme();
  const isDark = theme !== "dark" ? true : false;
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({});
   const [refreshing, setRefreshing] = useState(false);
  const loadUserData = async () => {
    try {
      const data = await getUserCredentials();
      if (data?.username) {
        const response = await fetch(
          `https://securopass.vercel.app/api/fetchPassword?username=${data.username}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const dataresponse = await response.json();
        setPasswords(dataresponse.passwords || []);
        setUserData(data);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderPasswordItem = ({ item }: { item: PasswordItem }) => (
    <View
      style={[
        styles.passwordCard,
        {
          backgroundColor: isDark ? "#000000" : "#ffffff",
          borderColor: isDark ? "#ffffff" : "#000000",
        },
      ]}
    >
      <View style={styles.passwordHeader}>
        <Text
          style={[
            styles.platformText,
            {
              color: isDark ? "#ffffff" : "#000000",
            },
          ]}
        >
          {item.plateform}
        </Text>
        <Text
          style={[
            styles.dateText,
            {
              color: isDark ? "#cccccc" : "#666666",
            },
          ]}
        >
          {formatDate(item.createdAt)}
        </Text>
      </View>

      <View style={styles.passwordRow}>
        <Text
          style={[
            styles.passwordText,
            {
              color: isDark ? "#ffffff" : "#000000",
            },
          ]}
        >
          {showPasswords[item._id] ? item.password : "••••••••"}
        </Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => togglePasswordVisibility(item._id)}
        >
          <Text
            style={[
              styles.toggleText,
              {
                color: isDark ? "#ffffff" : "#000000",
              },
            ]}
          >
            {showPasswords[item._id] ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => handleCopyPassword(item.password)}
        >
          <Text
            style={[
              styles.toggleText,
              {
                color: isDark ? "#ffffff" : "#000000",
              },
            ]}
          >
            Copy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => hadleDeletePassoword(item._id)}
        >
          <Text
            style={[
              styles.toggleText,
              {
                color: isDark ? "#ffffff" : "#000000",
              },
            ]}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {

      loadUserData();
  }, []);

  const handleCopyPassword = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const hadleDeletePassoword = async(id: string)=>{
    try {
      const response = await fetch("https://securopass.vercel.app/api/delete",{
        method: "DELETE",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({_id: id})
      });
      if(response.ok){
        loadUserData()
      }
    } catch (error) {
      console.log(error)
    }
  }
    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await loadUserData();
      setRefreshing(false);
    }, []);

      const handleLogout = async () => {
        await clearUserCredentials();
        router.replace("/signin"); // Redirect after logout
      };
  return (
    <SafeAreaView style={styles.mainview}>
      {/* Banner section */}
      <View style={[styles.tileBanner]}>
        <View style={styles.titleContainer}>
          <Image
            source={require("@/assets/images/favicon.png")}
            style={styles.iconStyle}
          />
          <Text
            style={[
              styles.title,
              { color: isDark ? Colors.light.text : Colors.dark.text },
            ]}
          >
            Password Manager
          </Text>
        </View>

        {/* Welcome or description */}
        {userData ? (
          <Text
            style={[
              styles.welcomeText,
              { color: isDark ? Colors.light.text : Colors.dark.text },
            ]}
          >
            Welcome back, {userData.username}!
          </Text>
        ) : (
          <Text
            style={[
              styles.text,
              { color: isDark ? Colors.light.text : Colors.dark.text },
            ]}
          >
            Manage and secure all your passwords in one place
          </Text>
        )}

        {/* Add Password / Get Started Button */}
        <TouchableOpacity
          style={[
            styles.addPasswordButton,
            { backgroundColor: isDark ? "#334155" : "#1e293b" },
          ]}
          onPress={() => router.push(userData ? "/add" : "/signup")}
        >
          <Text style={styles.buttonText}>
            {userData ? "Add Password" : "Get Started"}
          </Text>
        </TouchableOpacity>

        {/* Logout Button if logged in */}
        {userData && (
          <TouchableOpacity
            style={[
              styles.addPasswordButton,
              { backgroundColor: "#dc2626", marginTop: 10 }, // red button
            ]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Passwords List Section */}
      {userData && (
        <View style={styles.passwordsSection}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDark ?  "#000000": "#ffffff",
              },
            ]}
          >
            Your Passwords ({passwords.length})
          </Text>

          {passwords.length > 0 ? (
            <FlatList
              data={passwords}
              renderItem={renderPasswordItem}
              keyExtractor={(item) => item._id}
              style={styles.passwordsList}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : (
            <View style={styles.emptyState}>
              <Text
                style={[
                  styles.emptyText,
                  {
                    color: isDark ? "#ffffff" : "#000000",
                  },
                ]}
              >
                No passwords saved yet
              </Text>
              <Text
                style={[
                  styles.emptySubtext,
                  {
                    color: isDark ? "#cccccc" : "#666666",
                  },
                ]}
              >
                Add your first password to get started
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
  },
  tileBanner: {
    gap: 10,
    padding: 20,
    flexDirection: "column",
    borderWidth: 0.1,
    borderColor: "#000",
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 500,
  },
  addPasswordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconStyle: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  passwordsSection: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  passwordsList: {
    flex: 1,
  },
  passwordCard: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  platformText: {
    fontSize: 16,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 12,
  },
  passwordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordText: {
    fontSize: 14,
    fontFamily: "monospace",
    flex: 1,
  },
  toggleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
  },
});
