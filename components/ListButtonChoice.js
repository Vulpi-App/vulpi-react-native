// React & React Native - Imports
import React from "react";
import { View, StyleSheet } from "react-native";

// Components - import
import ListButtonNew from "./ListButtonNew";
import ListButtonOtherSelect from "./ListButtonOtherSelect";
import ListButtonOther from "./ListButtonOther";

const ListButtonChoice = ({ toggleModal }) => {
  return (
    <View style={[styles.wrapper, styles.allLists]}>
      <ListButtonNew toggleModal={toggleModal} />
      <ListButtonOtherSelect />
      <ListButtonOther />
    </View>
  );
};

export default ListButtonChoice;

const styles = StyleSheet.create({
  allLists: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    width: "94%",
    marginTop: 0,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
