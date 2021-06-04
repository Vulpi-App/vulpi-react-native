// React & React Native - Imports
import React from "react";
import { Text, View, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { radioBg, mainBlueText } = colors;

const ListEmptyHeader = ({ item, idListActive }) => {
  return (
    item._id === idListActive && (
      <View style={styles.listTitle}>
        <Text style={styles.h2}>{item.title}</Text>
      </View>
    )
  );
};

export default ListEmptyHeader;

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
    fontFamily: "GilroySemiBold",
  },
});
