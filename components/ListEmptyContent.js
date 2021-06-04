// React & React Native - Imports
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { darkGreyText } = colors;

const ListEmptyContent = () => {
  return (
    <View style={styles.listEmptyContent}>
      <Image
        source={require("../assets/illustrations/illu_empty_state.png")}
        style={styles.iconEmptyList}
        resizeMode="contain"
      />
      <Text style={styles.listEmptyText}>Votre liste est vide</Text>
      <Text style={[styles.listEmptyText, styles.listEmptyTextNext]}>
        Ajoutez un produit pour commencer une nouvelle liste
      </Text>
    </View>
  );
};

export default ListEmptyContent;

const styles = StyleSheet.create({
  iconEmptyList: {
    width: 250,
    height: 200,
    marginVertical: 5,
  },
  listEmptyContent: {
    alignItems: "center",
  },
  listEmptyText: {
    color: darkGreyText,
    fontSize: 14,
    fontFamily: "GilroyMedium",
  },
  listEmptyTextNext: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 10,
    paddingBottom: 30,
    fontFamily: "GilroyMedium",
  },
});
