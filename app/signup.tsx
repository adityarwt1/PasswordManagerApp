import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const theme = useColorScheme();
const isDark = theme === "dark" ? true : false;
const signup = () => {
  return (
    <SafeAreaView style={[styles.maindiv]}>
      <Text>SecuraPass Password Manager</Text>
    </SafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({
  maindiv: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: 500,
    color: isDark ? Colors.dark.text : Colors.light.text,
  },
});
