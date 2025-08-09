import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const signup = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  return (
    <SafeAreaView style={styles.maindiv}>
      <Text
        style={[
          styles.titleText,
          { color: isDark ? Colors.dark.text : Colors.light.text },
        ]}
      >
        SecuraPass Password Manager
      </Text>
    </SafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({
  maindiv: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 10,
    fontWeight: "500",
  },
});
