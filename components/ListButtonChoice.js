// React & React Native - Imports
import React from "react";
import { ScrollView, FlatList, Text, StyleSheet } from "react-native";

// Components - import
import ListButtonNew from "./ListButtonNew";
import ListButtonOtherSelect from "./ListButtonOtherSelect";
import ListButtonOther from "./ListButtonOther";

const ListButtonChoice = ({ toggleModal }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={[styles.wrapper, styles.allLists]}
    >
      <ListButtonNew toggleModal={toggleModal} />
      <ListButtonOtherSelect />
      <ListButtonOther />
    </ScrollView>
  );
};

export default ListButtonChoice;

const styles = StyleSheet.create({
  allLists: {
    flexDirection: "row",
  },
  wrapper: {
    marginBottom: 30,
    marginLeft: "-3%",
    marginRight: "-3%",
    paddingLeft: "6%",
  },
});
