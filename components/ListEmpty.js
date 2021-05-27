// React & React Native - Imports
import React from "react";
import { View, StyleSheet } from "react-native";

// Components - import
import ListEmptyHeader from "./ListEmptyHeader";
import ListEmptyContent from "./ListEmptyContent";

const ListEmpty = () => {
  return (
    <View style={styles.list}>
      <ListEmptyHeader />
      <ListEmptyContent />
    </View>
  );
};

export default ListEmpty;

const styles = StyleSheet.create({
  list: {
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
});
