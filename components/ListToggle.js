// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

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
      <View>
        {foldedNav ? (
          <TouchableOpacity
            onPress={foldOrUnfoldLists}
            style={styles.toggleWrap}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.listDeploy}
            >
              {item.title}
            </Text>
            <AntDesign
              name="down"
              size={14}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={foldOrUnfoldLists}
            style={styles.toggleWrap}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.listDeploy}
            >
              {item.title}
            </Text>
            <AntDesign name="up" size={14} color="white" style={styles.icon} />
          </TouchableOpacity>
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
    maxWidth: 120,
  },
  icon: {
    marginLeft: 5,
    marginTop: 3,
  },
});
