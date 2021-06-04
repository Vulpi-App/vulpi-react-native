// Tools
import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

// Colors - import
import colors from "../assets/colors";
const { white, greenButton, greenUnderlay, greyInput } = colors;

const ProductBottomBlockAdd = ({
  setModalAddProductVisible,
  valueInputAddQuickly,
  setValueInputAddQuickly,
  dataProducts,
  setDataProductsDisplay,
}) => {
  // Autocomplete dataProducts
  const navigation = useNavigation();
  const handleSearchProductsInDB = (text) => {
    const newDataProducts = [];
    for (let i of dataProducts) {
      if (i.name.indexOf(text.toLowerCase()) !== -1) {
        if (newDataProducts.length <= 2) {
          newDataProducts.push(i);
        } else {
          break;
        }
      }
    }
    setDataProductsDisplay(newDataProducts);
    setValueInputAddQuickly(text);
  };

  return (
    <View
      style={[
        styles.bottomBlockAdd,
        {
          borderTopLeftRadius: valueInputAddQuickly ? 0 : 15,
          borderTopRightRadius: valueInputAddQuickly ? 0 : 15,
          shadowColor: valueInputAddQuickly ? null : "grey",
          shadowOpacity: valueInputAddQuickly ? 0 : 5,
          shadowOffset: valueInputAddQuickly ? null : { height: -1 },
        },
      ]}
    >
      <View style={styles.blockInput}>
        <Ionicons
          name="add"
          size={28}
          color="#797979"
          onPress={() => {
            setModalAddProductVisible(true);
          }}
        />
        <TextInput
          style={styles.inputAddQuickly}
          placeholder="Ajout rapide"
          placeholderTextColor="#797979"
          onChangeText={handleSearchProductsInDB}
          value={valueInputAddQuickly}
        ></TextInput>
      </View>

      <TouchableOpacity
        style={styles.blockScan}
        underlayColor={greenUnderlay}
        onPress={() => {
          navigation.navigate("BarCodeScanner");
        }}
      >
        <FontAwesome5 name="barcode" size={24} color="white" />
      </TouchableOpacity>

      {/* Add Modal to Add Product */}
    </View>
  );
};

export default ProductBottomBlockAdd;

const styles = StyleSheet.create({
  bottomBlockAdd: {
    backgroundColor: white,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blockInput: {
    backgroundColor: greyInput,
    borderRadius: 15,
    padding: 8,
    paddingRight: 15,
    flexDirection: "row",
    flex: 1,
    height: 45,
    marginRight: 10,
  },
  inputAddQuickly: {
    marginLeft: 5,
    fontSize: 15,
    color: "black",
    flex: 1,
    fontFamily: "GilroyMedium",
  },
  blockScan: {
    width: 45,
    height: 45,
    backgroundColor: greenButton,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    shadowColor: greenButton,
    shadowOpacity: 1,
    shadowOffset: { height: 1 },
  },
});
