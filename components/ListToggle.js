// React & React Native - Imports
import React from "react";
import { Text, StyleSheet, View } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { whiteWithOpacity } = colors;

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
            size={14}
            color="white"
            style={styles.icon}
            onPress={foldOrUnfoldLists}
          />
        ) : (
          <AntDesign
            name="down"
            size={14}
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
    alignItems: "center",
  },
  listDeploy: {
    marginTop: 3,
    color: whiteWithOpacity,
    fontSize: 14,
    fontFamily: "GilroySemiBold",
  },
  icon: {
    marginLeft: 5,
    marginTop: 3,
  },
});
