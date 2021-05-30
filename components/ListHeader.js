// React & React Native - Imports
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

// Components - import
import ListMainTitle from "./ListMainTitle";
import ListToggle from "./ListToggle";
import ListIconCircle from "./ListIconCircle";

const ListHeader = ({
  data,
  idListActive,
  foldOrUnfoldLists,
  foldedNav,
  setFoldedNav,
}) => {
  return (
    <View style={[styles.wrapper, styles.headerWrap]}>
      <View>
        <ListMainTitle />
        <FlatList
          data={data.lists}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <ListToggle
                item={item}
                idListActive={idListActive}
                foldedNav={foldedNav}
                setFoldedNav={setFoldedNav}
                foldOrUnfoldLists={foldOrUnfoldLists}
              />
            );
          }}
        />
      </View>

      <View style={styles.headerIcon}>
        <ListIconCircle
          color="blue"
          source={require("../assets/icon-bell.png")}
          resizeMode="contain"
        />
        <ListIconCircle
          color="blue"
          source={require("../assets/icon-share.png")}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  headerWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapper: {
    width: "94%",
    marginTop: 0,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  headerIcon: {
    flexDirection: "row",
  },
});
