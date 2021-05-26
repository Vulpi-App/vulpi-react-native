// React & React Native - Imports
import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

const ListModalInput = ({ placeholder }) => {
  return (
    <View>
      <Text style={styles.modalText}>Nom de la liste</Text>
      <TextInput placeholder={placeholder} style={styles.modalInput} />
    </View>
  );
};

export default ListModalInput;

const styles = StyleSheet.create({
  modalText: {
    // add semi-bold
  },
  modalInput: {
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    padding: 15,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 30,
  },
});
