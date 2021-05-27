// React & React Native - Imports
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { radioBg, mainBlueText, productDetails, radioBorder, midGreyText } =
  colors;

const ListFullInput = ({ name, price, custom }) => {
  return (
    <View style={styles.listProduct}>
      <TouchableOpacity>
        <View style={styles.listRadioButton}></View>
      </TouchableOpacity>

      <View>
        <Text style={styles.listProductText}>{name}</Text>
        {custom === false ? (
          <Text style={styles.listNotCustom}>Toucher pour personnaliser</Text>
        ) : (
          <Text style={styles.listCustom}>2 paquets, Haribo</Text>
        )}
      </View>

      <Text style={styles.price}>{price} €</Text>
    </View>
  );
};

export default ListFullInput;

const styles = StyleSheet.create({
  listProduct: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  listRadioButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: radioBg,
    borderWidth: 1,
    borderColor: radioBorder,
    marginRight: 20,
  },
  listProductText: {
    fontSize: 16,
    fontWeight: "bold",
    color: mainBlueText,
    lineHeight: 19,
  },
  listNotCustom: {
    fontSize: 14,
    color: midGreyText,
  },
  listCustom: {
    fontSize: 14,
    color: productDetails,
    // add medium
  },
  price: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 16,
    color: midGreyText,
  },
});
