// React & React Native - Imports
import React from "react";
import { Text, StyleSheet } from "react-native";

const ListMainTitle = () => {
  return <Text style={styles.h2}>Mes listes de courses</Text>;
};

export default ListMainTitle;

const styles = StyleSheet.create({
  h2: {
    color: "#fff",
    fontSize: 23,
    fontFamily: "GilroySemiBold",
  },
});
