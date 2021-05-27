// React & React Native - Imports
import React from "react";
import { Text, StyleSheet } from "react-native";

const ListToggle = () => {
  return <Text style={styles.listDeploy}>Courses maison ∨</Text>;
};

export default ListToggle;

const styles = StyleSheet.create({
  listDeploy: {
    color: "#fff",
    fontSize: 14,
  },
});
