// Tools
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { buttonFlashBlue } = colors;

const ProductButtonPicture = ({
  pictureProduct,
  setProductModalPictureVisible,
  setModalAddProductVisible,
}) => {
  return (
    <TouchableOpacity
      style={styles.blockButton}
      onPress={() => {
        setProductModalPictureVisible(true);
        setModalAddProductVisible(false);
      }}
    >
      <View style={styles.buttonAddPicture}>
        <Text style={styles.textAddPicture}>
          {pictureProduct ? "Modifier la photo" : "Ajouter une photo"}
        </Text>

        {pictureProduct ? (
          <Image
            source={{ uri: pictureProduct }}
            style={styles.pictureProduct}
            resizeMode="cover"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ProductButtonPicture;

const styles = StyleSheet.create({
  blockButton: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: buttonFlashBlue,
    borderRadius: 8,
    height: 50,
    alignItems: "center",
  },
  buttonAddPicture: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textAddPicture: {
    color: buttonFlashBlue,
    fontFamily: "GilroyBold",
    fontSize: 15,
    flex: 1,
    textAlign: "center",
  },
  pictureProduct: { width: 45, height: 45, borderRadius: 8, marginRight: 1 },
});
