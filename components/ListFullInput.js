// React & React Native - Imports
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

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
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.19)",
    marginRight: 20,
  },
  listProductText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#181725",
    lineHeight: 19,
  },
  listNotCustom: {
    fontSize: 14,
    color: " rgba(144, 145, 154, 0.69)",
  },
  listCustom: {
    fontSize: 14,
    color: "#3E4685",
    // add medium
  },
  price: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 16,
    color: "rgba(24, 23, 37, 0.31)",
  },
});
