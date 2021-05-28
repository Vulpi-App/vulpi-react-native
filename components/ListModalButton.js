// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { buttonFlashBlue, white, deleteRed } = colors;

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
    backgroundColor: buttonFlashBlue,
    borderRadius: 8,
    padding: 15,
    textAlign: "center",
  },
  buttonTextBlue: {
    color: white,
    textAlign: "center",
    // add bold
  },
  buttonDelete: {
    padding: 15,
    textAlign: "center",
    marginTop: 20,
  },
  buttonTextDelete: {
    color: deleteRed,
    fontSize: 16,
    textAlign: "center",
    // add bold
  },
});
