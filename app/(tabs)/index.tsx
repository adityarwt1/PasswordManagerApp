import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const theme = useTheme();
  const isDark = theme.dark ? true : false;
  return (
    <SafeAreaView style={styles.mainview}>
      <View >
        <Text
          style={[
            styles.text,
            { color: isDark ? Colors.dark.text : Colors.light.text },
          ]}
        >
          SignUp Page
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
});
