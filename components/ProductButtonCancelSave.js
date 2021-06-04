// Tools
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";

// Colors - import
import colors from "../assets/colors";
const { white, buttonFlashBlue } = colors;

const ProductButtonCancelSave = ({
  closeModalProduct,
  submitInfosProduct,
  isLoading,
}) => {
  return (
    <View style={styles.blockButtonsCancelSave}>
      <TouchableOpacity
        style={[styles.button, styles.buttonCancel]}
        onPress={closeModalProduct}
      >
        <Text style={styles.textCancel}>Annuler</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonSave]}
        onPress={() => {
          Haptics.selectionAsync();
          submitInfosProduct();
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={white} />
        ) : (
          <Text style={styles.textSave}>Enregistrer</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProductButtonCancelSave;

const styles = StyleSheet.create({
  blockButtonsCancelSave: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonCancel: { backgroundColor: white },
  buttonSave: { backgroundColor: buttonFlashBlue },
  textCancel: { color: buttonFlashBlue, fontFamily: "GilroyBold" },
  textSave: { color: white, fontFamily: "GilroyBold" },
});
