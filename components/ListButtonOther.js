// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { buttonNewList } = colors;

const ListButtonOther = () => {
  return (
    <TouchableOpacity style={styles.otherList}>
      <Text style={styles.otherListText}>Anniversaire</Text>
    </TouchableOpacity>
  );
};

export default ListButtonOther;

const styles = StyleSheet.create({
  otherList: {
    marginRight: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#181D39",
  },
  otherListText: {
    color: buttonNewList,
  },
});
