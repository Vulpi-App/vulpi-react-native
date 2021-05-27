import React from "react";
import { StyleSheet, TextInput } from "react-native";

function Input({
  setFunction,
  keyboardType,
  secureTextEntry,
  placeholder,
  value,
  setNewInformations,
  setDisplayMessage,
  setIsInfosModified,
}) {
  return (
    <TextInput
      style={styles.textInput}
      keyboardType={keyboardType ? keyboardType : "default"}
      secureTextEntry={secureTextEntry ? true : false}
      placeholder={placeholder}
      autoCapitalize="none"
      textContentType="none"
      value={value && value}
      onChangeText={(text) => {
        setFunction(text);
        if (setNewInformations) {
          setNewInformations(true);
        }
        if (setDisplayMessage) {
          setDisplayMessage(false);
        }
        if (setIsInfosModified) {
          setIsInfosModified(true);
        }
      }}
    />
  );
}

export default Input;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 53,
    borderBottomColor: "white",
    backgroundColor: "white",
    fontSize: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: "#EEEEEE",
    borderWidth: 1,
    paddingLeft: 15,
    fontWeight: "bold",
    borderBottomWidth: 0,
    width: "100%",
  },
});
