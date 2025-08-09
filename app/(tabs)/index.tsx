import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const index = () => {
  const theme = useTheme();
  const isDark = theme.dark ? true : false;
  const router = useRouter();
  return (
    <SafeAreaView style={styles.mainview}>
      {/* this is the bannerpage */}
      <View
        style={[
          styles.tileBanner,
          {
            borderColor: isDark
              ? Colors.dark.background
              : Colors.light.background,
            borderWidth: 2, // Set border width according to the color theme
          },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              { color: isDark ? Colors.dark.text : Colors.light.text },
            ]}
          >
            Password Manager
          </Text>
        </View>
        <Text
          style={[
            styles.text,
            { color: isDark ? Colors.dark.text : Colors.light.text },
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
          <Text style={[styles.buttonText, { color: "#ffffff" }]}>
            Add Password
          </Text>
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
    flex: 1,
    flexDirection: "column",
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
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
