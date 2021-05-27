// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ListModalButton = ({ name, color }) => {
  return color === "blue" ? (
    <TouchableOpacity style={styles.buttonBlue}>
      <Text style={styles.buttonTextBlue}>{name}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.buttonDelete}>
      <Text style={styles.buttonTextDelete}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ListModalButton;

const styles = StyleSheet.create({
  buttonBlue: {
    backgroundColor: "#3443B9",
    borderRadius: 8,
    padding: 15,
    textAlign: "center",
  },
  buttonTextBlue: {
    color: "#fff",
    textAlign: "center",
    // add bold
  },
  buttonDelete: {
    padding: 15,
    textAlign: "center",
    marginTop: 20,
  },
  buttonTextDelete: {
    color: "#CA2121",
    fontSize: 16,
    textAlign: "center",
    // add bold
  },
});
