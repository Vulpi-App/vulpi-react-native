// React & React Native - Imports
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ListEmptyHeader = () => {
  return (
    <View style={styles.listTitle}>
      <Text style={styles.h2}>Courses maison</Text>
    </View>
  );
};

export default ListEmptyHeader;

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
});
