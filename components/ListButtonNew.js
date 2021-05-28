// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { buttonNewList } = colors;

const ListButtonNew = ({ toggleModal }) => {
  return (
    <TouchableOpacity style={styles.addNewList} onPress={toggleModal}>
      <Text style={styles.addNewListText}>+ Nouvelle liste</Text>
    </TouchableOpacity>
  );
};

export default ListButtonNew;

const styles = StyleSheet.create({
  addNewList: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: buttonNewList,
    borderStyle: "dashed",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addNewListText: {
    color: buttonNewList,
  },
});
