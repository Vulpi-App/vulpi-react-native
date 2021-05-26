// React & React Native - Imports
import React from "react";
import { View, StyleSheet } from "react-native";

// Components - import
import ListFullHeader from "./ListFullHeader";
import ListFullInput from "./ListFullInput";

const ListFull = () => {
  return (
    <View style={styles.list}>
      <ListFullHeader />

      <View style={styles.listContent}>
        <ListFullInput name="Bananes" price="2.80" custom={false} />
        <ListFullInput name="Bonbons" price="4.10" custom={true} />
      </View>
    </View>
  );
};

export default ListFull;

const styles = StyleSheet.create({
  list: {
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  listContent: {
    paddingTop: 15,
  },
});
