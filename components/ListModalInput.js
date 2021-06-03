// React & React Native - Imports
import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { inputBg, midGreyText } = colors;

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
        placeholderTextColor={midGreyText}
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
    fontFamily: "GilroySemiBold",
  },
  modalInput: {
    backgroundColor: inputBg,
    borderRadius: 8,
    padding: 15,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 25,
    fontFamily: "GilroySemiBold",
  },
});
