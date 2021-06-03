// Tools
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

// Colors - import
import colors from "../assets/colors";
const { buttonDarkBlue } = colors;

const ProductDeleteProduct = ({
  setModalAddProductVisible,
  setModalDeleteProductVisible,
  isLoadingDelete,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.buttonDeleteProduct}
        onPress={() => {
          setModalDeleteProductVisible(true);
          setModalAddProductVisible(false);
        }}
      >
        {isLoadingDelete ? (
          <ActivityIndicator size="small" color={buttonDarkBlue} />
        ) : (
          <Text style={styles.textDeleteProduct}>Supprimer cet article</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProductDeleteProduct;

const styles = StyleSheet.create({
  buttonDeleteProduct: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#3443B9",
    borderRadius: 10,
  },
  textDeleteProduct: { color: "#CA2121", fontWeight: "bold" },
});
