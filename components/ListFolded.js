// React & React Native - Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { mainBlueText, darkGreyText } = colors;

const LisFolded = () => {
  return (
    <View style={styles.list}>
      <View style={styles.listTitle}>
        <Text style={styles.h2}>Courses maison</Text>
        <Text style={styles.text}>2 articles</Text>
      </View>
    </View>
  );
};

export default LisFolded;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  listTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  h2: {
    color: mainBlueText,
    fontSize: 24,
    marginBottom: 5,
    // add semi-bold
  },
  text: {
    color: darkGreyText,
  },
});
