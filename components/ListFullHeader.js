// React & React Native - Imports
import React from "react";
import { Text, View, StyleSheet } from "react-native";

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
    borderBottomColor: "rgba(0, 0, 0, 0.06)",
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  h2: {
    color: "#181725",
    fontSize: 24,
    // add semi-bold
  },
  nbArticles: {
    fontSize: 14,
    color: "#8E94A0",
  },
  totalPrice: {
    backgroundColor: "#F3AB3F",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  priceText: {
    color: "#fff",
  },
});
