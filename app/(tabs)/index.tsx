import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import Colors from "../../constants/Colors";

const index = () => {
  const theme = useTheme();
  const isDark = theme.dark ? true : false;
  return (
    <View style={styles.mainview}>
      <Text
        style={[
          styles.text,
          { color: isDark ? Colors.dark.text : Colors.light.text },
        ]}
      >
        index
      </Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: "red",
  },
  text: {
    fontWeight: 500,
  },
});
