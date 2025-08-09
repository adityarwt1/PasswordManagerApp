import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
      <View style={styles.tileBanner}>
        <Text
          style={[
            styles.title,
            { color: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        >
          Password Manager
        </Text>
        <Text
          style={[
            styles.text,
            { color: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        >
          Manage and secure all your passwords in one place
        </Text>
        <TouchableOpacity onPress={() => router.push("/add")}
          >
          Add Password
        </TouchableOpacity>
      </View>

      <View style={styles.mainview}>another div</View>
      <View style={styles.mainview}>another div</View>
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
});
