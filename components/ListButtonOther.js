// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { buttonNewList, buttonFlashBlue, white } = colors;

const ListButtonOther = ({
  item,
  idListActive,
  setIdListActive,
  setTitleListActive,
}) => {
  // Function to check the right list selected
  const changeListActiveAndTitle = () => {
    setIdListActive(item._id);
    setTitleListActive(item.title);
  };

  return (
    <TouchableOpacity
      onPress={changeListActiveAndTitle}
      style={
        item._id === idListActive ? styles.otherListBlue : styles.otherList
      }
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={
          item._id === idListActive
            ? styles.otherListTextWhite
            : styles.otherListText
        }
      >
        {item.emoji} {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ListButtonOther;

const styles = StyleSheet.create({
  otherList: {
    marginRight: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#181D39",
    maxWidth: 160,
    justifyContent: "center",
  },
  otherListText: {
    color: buttonNewList,
    fontFamily: "GilroySemiBold",
    marginTop: -2,
  },
  otherListBlue: {
    marginRight: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: buttonFlashBlue,
    maxWidth: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  otherListTextWhite: {
    color: white,
    fontFamily: "GilroySemiBold",
    marginTop: -2,
  },
});
