// React & React Native - Imports
import React from "react";
import { Text, StyleSheet } from "react-native";

const ListToggle = ({ item, idListActive }) => {
  return (
    item._id === idListActive && (
      <Text style={styles.listDeploy}>{item.title} ∨</Text>
    )
  );
};

export default ListToggle;

const styles = StyleSheet.create({
  listDeploy: {
    color: "#fff",
    fontSize: 14,
  },
});
