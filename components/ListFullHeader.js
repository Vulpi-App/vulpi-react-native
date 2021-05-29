// React & React Native - Imports
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

// Colors - import
import colors from "../assets/colors";
const {
  radioBg,
  mainBlueText,
  orangeTotalPrice,
  white,
  darkGreyText,
  buttonFlashBlue,
} = colors;

const ListFullHeader = ({ item, idListActive }) => {
  return (
    item._id === idListActive && (
      <View style={styles.listTitle}>
        <View>
          <Text style={styles.h2}>{item.title}</Text>
        </View>

        <View style={styles.headerDetailsWrap}>
          {item.products.length > 0 ? (
            <View style={styles.headerDetailsWrap}>
              <View style={styles.totalPrice}>
                <Text style={styles.priceText}>6 €</Text>
              </View>
              <Text style={styles.nbArticles}>2 articles</Text>
            </View>
          ) : null}

          <TouchableOpacity>
            <View style={styles.blueDot}></View>
            <View style={[styles.blueDot, styles.marginDot]}></View>
            <View style={styles.blueDot}></View>
          </TouchableOpacity>
        </View>
        {/* <View>
                <Text style={styles.nbArticles}>2 articles</Text>
                <View style={styles.totalPrice}>
                  <Text style={styles.priceText}>6 €</Text>
                </View>
              </View> */}
      </View>
    )
  );
};

export default ListFullHeader;

const styles = StyleSheet.create({
  listTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: radioBg,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  h2: {
    color: mainBlueText,
    fontSize: 24,
    // add semi-bold
  },
  headerDetailsWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  nbArticles: {
    fontSize: 14,
    color: darkGreyText,
    marginHorizontal: 20,
  },
  totalPrice: {
    backgroundColor: orangeTotalPrice,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  priceText: {
    color: white,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: buttonFlashBlue,
  },
  marginDot: {
    marginVertical: 3,
  },
});
