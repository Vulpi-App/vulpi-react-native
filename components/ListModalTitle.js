// React & React Native - Imports
import React from "react";
import { Text, StyleSheet } from "react-native";

const ListModalTitle = ({ title }) => {
  return <Text style={styles.modalTitle}>{title}</Text>;
};

export default ListModalTitle;

const styles = StyleSheet.create({
  modalTitle: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 10,
    // add semi-bold
  },
});
