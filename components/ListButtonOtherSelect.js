// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { buttonFlashBlue, white } = colors;

const ListButtonOtherSelect = () => {
  return (
    <TouchableOpacity style={styles.otherList}>
      <Text style={styles.otherListText}>Courses maison</Text>
    </TouchableOpacity>
  );
};

export default ListButtonOtherSelect;

const styles = StyleSheet.create({
  otherList: {
    marginRight: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: buttonFlashBlue,
  },
  otherListText: {
    color: white,
  },
});
