// React & React Native - Imports
import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { inputBg } = colors;

const ListModalInput = ({
  placeholder,
  setFunction,
  value,
  title,
  length,
  keyboardType,
}) => {
  return (
    <View>
      <Text style={styles.modalText}>{title}</Text>
      <TextInput
        maxLength={length}
        placeholder={placeholder}
        style={styles.modalInput}
        value={value}
        onChangeText={(text) => {
          setFunction(text);
        }}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default ListModalInput;

const styles = StyleSheet.create({
  modalText: {
    // add semi-bold
  },
  modalInput: {
    backgroundColor: inputBg,
    borderRadius: 8,
    padding: 15,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 25,
  },
});
