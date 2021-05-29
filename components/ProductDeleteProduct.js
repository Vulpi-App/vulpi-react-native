// Tools
import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

const ProductDeleteProduct = ({
  setModalAddProductVisible,
  setModalDeleteProductVisible,
}) => {
  return (
    <View>
      <TouchableHighlight
        style={styles.buttonDeleteProduct}
        onPress={() => {
          setModalDeleteProductVisible(true);
          setModalAddProductVisible(false);
        }}
      >
        <Text style={styles.textDeleteProduct}>Supprimer cet article</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ProductDeleteProduct;

const styles = StyleSheet.create({
  buttonDeleteProduct: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#3443B9",
  },
  textDeleteProduct: { color: "#CA2121", fontWeight: "bold" },
});
