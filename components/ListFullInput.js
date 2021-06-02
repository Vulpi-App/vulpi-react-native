// React & React Native - Imports
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

// Components - import
import ListEmptyContent from "./ListEmptyContent";

// Colors - import
import colors from "../assets/colors";
const { radioBg, mainBlueText, productDetails, radioBorder, midGreyText } =
  colors;

const ListFullInput = ({
  item,
  idListActive,
  setIdProductActif,
  setModalAddProductVisible,
  setInfosProductToUpdate,
}) => {
  const productRef = [];
  return (
    item._id === idListActive &&
    (item.products.length > 0 ? (
      <View>
        {item.products.map((el, index) => {
          return (
            <View style={styles.listProduct} key={index}>
              <TouchableOpacity>
                <View style={styles.listRadioButton}></View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIdProductActif(el._id);

                  setInfosProductToUpdate(el);

                  setModalAddProductVisible(true);
                }}
              >
                {/* !! Ecrire une condition pour lier le user à l'idListActive */}

                {el.quantity || el.brand || el.shop ? (
                  <Text style={styles.listCustom}>
                    {el.quantity &&
                      el.brand &&
                      el.shop &&
                      el.quantity + ", " + el.brand + ", " + el.shop}

                    {el.quantity && el.brand && el.quantity + ", " + el.brand}
                    {el.quantity && el.shop && el.quantity + ", " + el.shop}
                    {el.brand && el.shop && el.brand + ", " + el.shop}

                    {el.quantity && el.quantity}
                    {el.brand && el.brand}
                    {el.shop && el.shop}
                  </Text>
                ) : (
                  <Text style={styles.listNotCustom}>
                    Toucher pour personnaliser
                  </Text>
                )}
              </TouchableOpacity>

              {el.price ? <Text style={styles.price}>{el.price} €</Text> : null}
            </View>
          );
        })}
      </View>
    ) : (
      <ListEmptyContent />
    ))
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
    marginRight: 10,
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
