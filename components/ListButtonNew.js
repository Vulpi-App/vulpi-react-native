// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

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
    borderColor: "rgba(255, 255, 255, 0.32)",
    borderStyle: "dashed",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addNewListText: {
    color: "rgba(255, 255, 255, 0.32)",
  },
});
