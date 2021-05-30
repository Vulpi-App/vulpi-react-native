// React & React Native - Imports
import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

// Icons - import
import { AntDesign } from "@expo/vector-icons";

const ListToggle = ({
  item,
  idListActive,
  foldOrUnfoldLists,
  foldedNav,
  setFoldedNav,
}) => {
  return (
    item._id === idListActive && (
      <View style={styles.toggleWrap}>
        <Text style={styles.listDeploy}>{item.title}</Text>
        {foldedNav ? (
          <AntDesign
            name="up"
            size={18}
            color="white"
            style={styles.icon}
            onPress={foldOrUnfoldLists}
          />
        ) : (
          <AntDesign
            name="down"
            size={18}
            color="white"
            style={styles.icon}
            onPress={foldOrUnfoldLists}
          />
        )}
      </View>
    )
  );
};

export default ListToggle;

const styles = StyleSheet.create({
  toggleWrap: {
    flexDirection: "row",
  },
  listDeploy: {
    color: "#fff",
    fontSize: 14,
  },
  icon: {
    marginLeft: 5,
  },
});
