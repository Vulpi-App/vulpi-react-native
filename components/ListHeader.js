// React & React Native - Imports
import React from "react";
import { View, StyleSheet } from "react-native";

// Components - import
import ListMainTitle from "./ListMainTitle";
import ListToggle from "./ListToggle";
import ListIconCircle from "./ListIconCircle";

const ListHeader = () => {
  return (
    <View style={[styles.wrapper, styles.headerWrap]}>
      <View>
        <ListMainTitle />
        <ListToggle />
      </View>

      <View style={styles.headerIcon}>
        {/* Ci-dessous en props : color="blue/orange" source={} resizeMode="contain" */}
        <ListIconCircle color="orange" />
        <ListIconCircle color="blue" />
        <ListIconCircle color="blue" />
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
