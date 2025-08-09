import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const index = () => {
  const theme = useColorScheme();
  const isDark = theme !== "dark" ? true : false;
  const router = useRouter();
  return (
    <SafeAreaView style={styles.mainview}>
      {/* this is the bannerpage */}
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
        <Text
          style={[
            styles.text,
            { color: isDark ? Colors.light.text : Colors.dark.text },
          ]}
        >
          Manage and secure all your passwords in one place
        </Text>
        <TouchableOpacity
          style={[
            styles.addPasswordButton,
            { backgroundColor: isDark ? "#1e293b" : "#334155" },
          ]}
          onPress={() => router.push("/add")}
        >
          <Text style={styles.buttonText}>Add Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainview}>
        <Text
          style={[
            styles.text,
            { color: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        >
          another div
        </Text>
      </View>
      <View style={styles.mainview}>
        <Text
          style={[
            styles.text,
            { color: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        >
          another div
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
  },
  tileBanner: {
    gap: 10,
    padding: 20,
    flex: 0,
    flexDirection: "column",
    borderWidth: 0.1,
    borderColor: "#000",
    borderRadius: 8, // optional: adds rounded corners
    height: "auto",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 500,
  },
  addPasswordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24, // px-6
    paddingVertical: 12, // py-3
    borderRadius: 12, // rounded-xl
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // for Android shadow
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "600", // font-semibold
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
});
