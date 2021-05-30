// React & React Native - Imports
import React from "react";
import { ScrollView, FlatList, StyleSheet, View } from "react-native";

// Components - import
import ListButtonNew from "./ListButtonNew";
import ListButtonOther from "./ListButtonOther";

const ListButtonChoice = ({
  toggleModal,
  data,
  setIdListActive,
  idListActive,
}) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={[styles.wrapper, styles.allLists]}
    >
      <View style={styles.buttonsWrap}>
        <ListButtonNew toggleModal={toggleModal} />

        <FlatList
          horizontal
          data={data.lists}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <ListButtonOther
                item={item}
                setIdListActive={setIdListActive}
                idListActive={idListActive}
              />
            );
          }}
        />
      </View>
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
  buttonsWrap: {
    flexDirection: "row",
    paddingRight: 30,
  },
});
