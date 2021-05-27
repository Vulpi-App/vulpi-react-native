// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

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
    backgroundColor: "#4556C8",
  },
  otherListText: {
    color: "#fff",
  },
});
