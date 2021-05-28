// Tools
import React from "react";
import { Text, StyleSheet, TouchableHighlight } from "react-native";

const ProductButtonPicture = () => {
  return (
    <TouchableHighlight style={styles.buttonAddPicture}>
      <Text style={styles.textAddPicture}>Ajouter une photo</Text>
    </TouchableHighlight>
  );
};

export default ProductButtonPicture;

const styles = StyleSheet.create({
  buttonAddPicture: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#3443B9",
  },
  textAddPicture: { color: "#3443B9", fontWeight: "bold" },
});
