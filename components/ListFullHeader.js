// React & React Native - Imports
import React from "react";
import { Text, View, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { radioBg, mainBlueText, orangeTotalPrice, white, darkGreyText } = colors;

const ListFullHeader = () => {
  return (
    <View style={styles.listTitle}>
      <Text style={styles.h2}>Courses maison</Text>
      <Text style={styles.nbArticles}>2 articles</Text>
      <View style={styles.totalPrice}>
        <Text style={styles.priceText}>6.90 €</Text>
      </View>
    </View>
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
  nbArticles: {
    fontSize: 14,
    color: darkGreyText,
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
});
